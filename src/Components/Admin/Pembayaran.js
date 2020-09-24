import React, { Component, useState, useMemo } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Modal, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {UploadUrl} from '../../Configs/Url'
import TbPeserta from './TbPeserta'
import Loader from 'react-loader'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import Dialog from 'react-bootstrap-dialog'

const TITLE = 'Pembayaran - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class Pembayaran extends Component {
    constructor(props) {
        super(props)
        this.state = {
           Daftar: [],
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
          name: 'Tgl Bayar',
          selector: 'tgl_transfer',
          sortable: true,
        },
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
          name: 'Bank',
          selector: 'nm_bank',
          sortable: true,
        },
        {
          name: 'Jumlah Bayar Rp.',
          sortable: true,
          cell: row => <>Rp.{row.jml_transfer}</>,
        },
        {
          name: 'Status Bayar',
          sortable: true,
          cell: row => <>{row.status_bayar}</>,
        },
        {
          name: 'Opsi',
          sortable: false,
          cell: row => <><Button as={Link} to={'/pb/detail/'+row.id_pembayaran} variant="light" size="sm">Detail</Button>&nbsp;
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
              }} variant="danger" size="sm">Hapus</Button></>,
        },
      ];
      const state = { toggledClearRows: false }
      const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
      };
      const handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows})
      }
      const TextField = styled.input`
      height: 32px;
      width: 200px;
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
      height: 32px;
      width: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
        <TextField id="search" type="text" placeholder="Filter By Nama" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton type="button" onClick={onClear}>X</ClearButton>
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
          onSelectedRowsChange={handleChange}
          clearSelectedRows={this.state.toggledClearRows}
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



export default Pembayaran