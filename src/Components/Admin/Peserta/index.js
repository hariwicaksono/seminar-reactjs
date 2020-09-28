import React, { Component, useState, useMemo } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Modal, Form} from 'react-bootstrap'
import { EyeFill, TrashFill } from 'react-bootstrap-icons'
import { Formik } from 'formik';
//import * as yup from 'yup';
//import TbPeserta from './TbPeserta'
import Loader from 'react-loader'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import Dialog from 'react-bootstrap-dialog'

const TITLE = 'Peserta - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
           Daftar: [],
           Seminar: [],
           loading: true
            
        }

    }

    componentDidMount = () => {
        API.GetPeserta().then(res => {
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
    }  
    
    
    render() {
      
      const columns = [
        {
          name: 'No. Registrasi',
          selector: 'id_peserta',
          sortable: true,
        },
        {
          name: 'Nama Peserta',
          selector: 'nama_peserta',
          sortable: true,
        },
        {
          name: 'Email',
          selector: 'email_peserta',
          sortable: true,
        },
        {
          name: 'Aksi',
          sortable: false,
          cell: row => <><Button as={Link} to={'/peserta/detail/'+row.id_peserta} size="sm" title="Detail" alt="Detail"><EyeFill/></Button>&nbsp;
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
                      API.DeletePeserta(row.id_peserta).then(res => {
                        if (res.status === 1) {
                            window.location.href = '/peserta';
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
    const Select = styled.select`
      width: 350px;
      height: 34px;
      padding: 0 10px 0 5px;
      font-size: 14px;
      border-radius: 3px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e5e5e5;
      margin-right: 10px;
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
          Tanggal Daftar: {data.tgl_daftar}<br/>
          Kartu Identitas: {data.jns_kartuid} / No: {data.no_kartuid}
        </p>
      </ExpandedStyle>
    );

    const ListSeminar = this.state.Seminar.map((s,i) => (
        <option value={s.nm_seminar} key={i+1}>{s.nm_seminar}</option>
    ));

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
      <Select className="custom-select" id="select" onChange={onFilter}>
      <option value=''>Filter by Seminar</option>
      {ListSeminar}
    </Select>
        <TextField id="search" type="text" placeholder="Filter by Nama" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );
    
    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Daftar.filter(item => item.nama_peserta && item.nama_peserta.toLowerCase().includes(filterText.toLowerCase()) || item.nm_seminar && item.nm_seminar.toLowerCase().includes(filterText.toLowerCase()) );
    
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
          title="Daftar Peserta"
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
                <Breadcrumb.Item active>Daftar Peserta</Breadcrumb.Item>
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