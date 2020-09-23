import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {UploadUrl} from '../../Configs/Url'

const TITLE = 'Peserta - Seminar App'


class Peserta extends Component {
    constructor(props) {
        super(props)
        this.state = {
           Produk: [],
           loading: true
            
        }

    }

    componentDidMount = () => {
        API.GetPeserta().then(res => {
            setTimeout(() => this.setState({
                Produk: res.data,
                loading: false
            }), 100);
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
                            
                

                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}



export default Peserta