import React, { Component, useState, useMemo } from 'react'
import {Link} from 'react-router-dom'
import API from '../../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Button, Form} from 'react-bootstrap'
import { PencilSquare, TrashFill } from 'react-bootstrap-icons'
import { Formik } from 'formik';
//import * as yup from 'yup';
import Loader from 'react-loader'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import Dialog from 'react-bootstrap-dialog'

const TITLE = 'Seminar - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
          Seminar: [],
          sertifikat: [],
           loading: true
            
        }

    }

    componentDidMount = () => {
        API.GetSeminar().then(res => {
          if (res.data.length > 0) {
            setTimeout(() => this.setState({
                Seminar: res.data,
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
      API.GetSertifikat().then(res => {
        this.setState({
            sertifikat: res.data,
            loading: false
        })
    })
    }  
    
    render() {
      const columns = [
        {
          name: 'ID Seminar',
          selector: 'id_seminar',
          sortable: true
        },
        {
          name: 'Nama Seminar',
          selector: 'nm_seminar',
          sortable: true
        },
        {
          name: 'Aktif',
          sortable: true,
          cell: row => <>
          <Formik
                            initialValues={{ 
                                id: row.id_seminar, 
                                aktif_seminar: ''
                            }}
                            onSubmit={(values, actions) => {
                                alert('Apakah anda yakin akan mengubah data ini?');
                                API.PutStatusSeminar(values).then(res=>{
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
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form onChange={handleSubmit}>
                            <Form.Control as="select" name="aktif_seminar" onChange={handleChange} defaultValue={row.aktif_seminar} onBlur={handleBlur} size="sm" custom>
                            <option value="Y" >{isSubmitting ? 
                           "loading..." : "Aktif"}
                           </option>
                            <option value='N' >{isSubmitting ? 
                             "loading..." : "Tidak Aktif"}
                             </option>
 
                            </Form.Control>
       
                     </Form>
                     )}
                    </Formik>
          </>,
        },
        {
          name: 'Sertifikat',
          sortable: true,
          cell: row => <>
          <Formik
                            initialValues={{ 
                                id: row.id_seminar, 
                                id_sertifikat: '',
                                
                            }}
                            onSubmit={(values, actions) => {
                                alert('Apakah anda yakin akan mengubah data ini?');
                                API.PutSertifikatSeminar(values).then(res=>{
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
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form onChange={handleSubmit}>
                            <Form.Control as="select" name="id_sertifikat" onChange={handleChange} defaultValue={row.id_sertifikat} onBlur={handleBlur} size="sm" custom>
                            <option value="">Pilih Sertifikat</option>
                            {this.state.sertifikat.map((b, i) => (<option value={b.id_sertifikat} key={i}>{isSubmitting ? 
                           "loading..." : b.id_sertifikat}</option>))}
 
                            </Form.Control>
                           
                     </Form>
                     )}
                    </Formik>
          </>,
        },
        {
          name: 'Aksi',
          sortable: false,
          cell: row => <><Button as={Link} to={'/seminar/edit/'+row.id_seminar} size="sm" title="Edit" alt="Edit"><PencilSquare/></Button>&nbsp;
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
                      API.DeleteSeminar(row.id_seminar).then(res => {
                        if (res.status === 1) {
                            window.location.href = '/seminar';
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
              }} variant="danger" size="sm" title="Hapus" alt="Hapus"><TrashFill/></Button></>,
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
          Tanggal Dibuat: {data.cr_dt_seminar} {data.cr_tm_seminar}<br/>
          Tanggal Diubah: {data.md_dt_seminar} {data.md_tm_seminar}<br/>
        </p>
      </ExpandedStyle>
    );

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
      <Button as={Link} to="/seminar/tambah" variant="primary" style={{ position: 'absolute', left: '0', marginLeft: '15px'}}>Tambah</Button>
        <TextField id="search" type="text" placeholder="Filter By Nama" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );
    
    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Seminar.filter(item => item.nm_seminar && item.nm_seminar.toLowerCase().includes(filterText.toLowerCase()) 
       );
    
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
          title="Master Seminar"
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
            <title>{ "Admin"+
                    " - "+
                    TITLE }</title>
            </Helmet>
                <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Master Seminar</Breadcrumb.Item>
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