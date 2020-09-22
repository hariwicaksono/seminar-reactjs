import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Breadcrumb, Button, Row, Col, Alert, Table, Card } from 'react-bootstrap'
import Loader from 'react-loader'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import { Printer } from 'react-bootstrap-icons'

const TITLE = 'Dashboard - Seminar App'
//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }
 
    render() {

        return (
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container fluid>
                <Breadcrumb className="card px-3 mb-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="text-light mb-3">Dashboard</h1>
                <Row>
                    <Col>
                    <Card className="shadow" bg={'primary'} text={'light'} body>This is some text within a card body.</Card>
                    </Col>
                    <Col>
                    <Card className="shadow" bg={'success'} text={'light'} body>This is some text within a card body.</Card>
                    </Col>
                    <Col>
                    <Card className="shadow" bg={'warning'} text={'dark'} body>This is some text within a card body.</Card>
                    </Col>
                    <Col>
                    <Card className="shadow" bg={'danger'} text={'light'} body>This is some text within a card body.</Card>
                    </Col>
                </Row>
                
            </Container>
            </>
        )
    }
}


export default index