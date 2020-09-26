import React, { Component, useState, useMemo } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../../Configs/Axios'
import {UploadUrl} from '../../../Configs/Url'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Button, Form} from 'react-bootstrap'
import { EyeFill, TrashFill } from 'react-bootstrap-icons'
import { Formik } from 'formik';
//import * as yup from 'yup';
import Loader from 'react-loader'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import Dialog from 'react-bootstrap-dialog'

const TITLE = 'Pembayaran - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
           Daftar: [],
           url: UploadUrl(),
           loading: true
            
        }

    }

    componentDidMount = () => {
        API.GetPembayaran().then(res => {
          if (res.data.length > 0) {
            setTimeout(() => this.setState({
                Daftar: res.data,
                loading: false
            }), 100);
          } else {
            this.setState({
                error: "No Data Found",
                loading: false
            })
        }
        }).catch(err => {
          console.log(err.response)
      })
    }  
    
    
    render() {

      const columns = [
        {
          name: 'No. Pembayaran',
          selector: 'id_pembayaran',
          sortable: true,
        },
        {
          name: 'Ke Bank',
          sortable: true,
          cell: row => <>{row.no_rek} / {row.nm_bank}</>,
        },
        {
          name: 'Jumlah Rp.',
          selector: 'jml_transfer',
          sortable: true,
        },
        {
          name: 'Peserta',
          sortable: true,
          cell: row => <>{row.id_peserta} / {row.nama_peserta}</>,
        },
        {
          name: 'Status Bayar',
          sortable: true,
          cell: row => <>
          <Formik
                            initialValues={{ 
                                id: row.id_pembayaran, 
                                status_bayar: '',
                                
                            }}
                            onSubmit={(values, actions) => {
                                alert('Apakah anda yakin akan mengubah data ini?');
                                
                                API.PutPembayaran(values).then(res=>{
                                  //console.log(res)
                                  if (res.status === 1 ) {
                                      NotificationManager.success('Data berhasil disimpan');
                                  } 
                                  
                              }).catch(err => {
                                  console.log(err.response)
                                  NotificationManager.warning('Tidak ada data yang diubah');

                              })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                isSubmitting
                            }) => (
                        <Form onChange={handleSubmit}>
                            <Form.Control as="select" name="status_bayar" onChange={handleChange} onBlur={handleBlur} defaultValue={row.status_bayar} size="sm" custom>
                            <option value="Baru" >{isSubmitting ? 
                           "loading..." : "Baru"}
                           </option>
                            <option value='Menunggu' >{isSubmitting ? 
                             "loading..." : "Menunggu"}
                             </option>
                            <option value='Lunas' >{isSubmitting ? 
                             "loading..." : "Lunas"}
                             </option>
                            <option value='Batal' >{isSubmitting ? 
                              "loading..." : "Batal"}
                              </option>
                            </Form.Control>
       
                     </Form>
                     )}
                    </Formik>
          </>,
        },
        {
          name: 'Opsi',
          sortable: false,
          cell: row => <><Button as={Link} to={'/pembayaran/detail/'+row.id_pembayaran} size="sm" title="Detail" alt="Detail"><EyeFill/></Button>&nbsp;
          <Button onClick={() => {
                this.dialog.show({
                  title: 'Konfirmasi',
                  body: 'Apakah anda yakin akan menghapus data ini?',
                  bsSize: 'lg',
                  actions: [
                    Dialog.CancelAction(() => {
                      console.log('Cancel was clicked!')
                    }),
                    Dialog.OKAction(() => {
                      API.DeletePembayaran(row.id_pembayaran).then(res => {
                        if (res.status === 1) {
                            window.location.href = '/pembayaran';
                            NotificationManager.success('Hapus data berhasil');
                        } else {
                            console.log('gagal')
                        }
                      })
                    })
                  ],
                  onHide: (dialog) => {
                    dialog.hide()
                    console.log('closed by clicking background.')
                  }
                })
              }} title="Hapus" alt="Hapus" variant="danger" size="sm"><TrashFill/></Button></>,
        },
      ];

      const customStyles = {
        rows: {
          style: {
            fontSize: '14px',
          }
        },
        headCells: {
          style: {
            fontSize: '14px',
          },
        },
        cells: {
          style: {
            fontSize: '14px',
          },
        },
    };
    const TextField = styled.input`
      font-size: 14px;
      height: 34px;
      width: 250px;
      border-radius: 3px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e5e5e5;
      padding: 0 32px 0 16px;
      &:hover {
        cursor: pointer;
      }
    `;
    const ClearButton = styled(Button)`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      height: 34px;
      width: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const ExpandedStyle = styled.div`
      padding: 10px;
      display: block;
      width: 100%;

      p {
        font-size: 14px;
        font-weight: 400;
        word-break: break-all;
      }
    `;

    const ExpandedComponent = ({ data }) => (
      <ExpandedStyle>
        <p>
          Seminar: {data.nm_seminar}<br/>
          Tanggal Bayar: {data.tgl_transfer}<br/>
          Bukti Bayar: <br/><a href={this.state.url+data.img_bayar} alt="" target="_blank"><img src={this.state.url+data.img_bayar} width="100" alt=""/></a>
        </p>
      </ExpandedStyle>
    );

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
        <TextField id="search" type="text" placeholder="Filter By Nama" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );
    
    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Daftar.filter(item => item.nama_peserta && item.nama_peserta.toLowerCase().includes(filterText.toLowerCase()));
    
      const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };
    
        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
      }, [filterText, resetPaginationToggle]);
      
    
      return (
        <DataTable
          title="Daftar Pembayaran"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          //selectableRows
          //selectableRowsHighlight
          persistTableHead
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandedComponent />}
          customStyles={customStyles}
        />
      );
    };

        return (
          
            <> 
             
            <Helmet>
            <title>{ "Admin"+" - "+TITLE }</title>
            </Helmet>
                <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Daftar Pembayaran</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card className="shadow" body> 
                        { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                           
                           <BasicTable />
                           <Dialog ref={(component) => { this.dialog = component }} />
                        </>
                        }
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}



export default index