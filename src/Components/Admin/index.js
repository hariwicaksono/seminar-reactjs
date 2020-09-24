import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Breadcrumb, Button, Row, Col, Alert, Table, Card } from 'react-bootstrap'
import Loader from 'react-loader'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import { FileEarmark, People, FileEarmarkPlus, FileEarmarkX } from 'react-bootstrap-icons'

const TITLE = 'Admin - Seminar App'
//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            JumlahSeminar: '',
            JumlahPeserta: '',
            BayarNew: '',
            BayarCancel: '',
            loading: true
        }
    }

    componentDidMount = () => {
        API.CountSeminar().then(res=>{
            this.setState({
                JumlahSeminar: res.data
              })
        })
        API.CountPeserta().then(res=>{
            this.setState({
                JumlahPeserta: res.data
              })
        })
        API.CountBayarnew().then(res=>{
            this.setState({
                BayarNew: res.data[0].new
              })
        })
        API.CountBayarcancel().then(res=>{
            this.setState({
                BayarCancel: res.data[0].cancel
              })
        })

    }
 
    render() {

        return (
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container fluid>
                <Breadcrumb className="card px-3 mb-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className="text-light mb-3">Dashboard <small className="text-muted">Administrator</small></h2>
                <Row>
                    <Col>
                    <Card as={Link} to="/seminar" className="shadow" bg={'primary'} text={'light'} body>
                        <h2 className="h1">{this.state.JumlahSeminar}
                        <FileEarmark size="60" className="float-right" style={{color: 'rgba(0, 0, 0, 0.3)'}}/>
                        </h2>
                        Jumlah Seminar yang Ada
                        
                    </Card>
                    </Col>
                    <Col>
                    <Card as={Link} to="/peserta" className="shadow" bg={'success'} text={'light'} body>
                    <h2 className="h1">{this.state.JumlahPeserta}
                    <People size="60" className="float-right" style={{color: 'rgba(0, 0, 0, 0.3)'}}/>
                    </h2>
                        Jumlah Peserta Seminar
                    </Card>
                    </Col>
                    </Row>
                <Row>
                    <Col>
                    <Card as={Link} to="/pembayaran" className="shadow" bg={'warning'} text={'light'} body>
                        <h2 className="h1">
                        {this.state.BayarNew}
                        <FileEarmarkPlus size="60" className="float-right" style={{color: 'rgba(0, 0, 0, 0.3)'}}/>
                        </h2>
                    Jumlah Konfirmasi Pembayaran Baru
                        </Card>
                    </Col>
                    <Col>
                    <Card as={Link} to="/pembayaran" className="shadow" bg={'danger'} text={'light'} body>
                    <h2 className="h1">
                    {this.state.BayarCancel}
                    <FileEarmarkX size="60" className="float-right" style={{color: 'rgba(0, 0, 0, 0.3)'}}/>
                    </h2>
                    Jumlah Konfirmasi Pembayaran Batal
                        </Card>
                    </Col>
                </Row>
                
            </Container>
            </>
        )
    }
}


export default index