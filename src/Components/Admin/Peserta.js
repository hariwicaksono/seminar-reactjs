import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {UploadUrl} from '../../Configs/Url'
import TbPeserta from './TbPeserta'
import Loader from 'react-loader'
import DataTable from 'react-data-table-component';


const TITLE = 'Peserta - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const columns = [
    {
      name: 'ID',
      selector: 'id_peserta',
      sortable: true,
    },
    {
      name: 'Nama',
      selector: 'nama_peserta',
      sortable: true,
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
class Peserta extends Component {
    constructor(props) {
        super(props)
        this.state = {
           Daftar: [],
           loading: true
            
        }

    }

    componentDidMount = () => {
        API.GetPeserta().then(res => {
          this.setState({
                Daftar: res.data,
                loading: false
            })
        })
    }     
    
 

    render() {
       
        return (
            <> 
            <Helmet>
            <title>{ "Admin"+" - "+TITLE }</title>
            </Helmet>
                <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Cara Daftar</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Daftar Peserta</h3> 
                            
                        { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                           
                            <DataTable
        title="Daftar"
        columns={columns}
        data={this.state.Daftar}
        selectableRows={true}
        onSelectedRowsChange={handleChange}
        clearSelectedRows={this.state.toggledClearRows}
        Clicked
        subHeader
        pagination={true}
        paginationPerPage={5}
        
      />
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



export default Peserta