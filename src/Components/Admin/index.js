import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { FileEarmark, People, FileEarmarkPlus, FileEarmarkX } from 'react-bootstrap-icons'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
import Clock from 'react-live-clock'

const TITLE = 'Admin - Seminar App'
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
            setTimeout(() => this.setState({
                JumlahSeminar: res.data,
                loading: false
              }), 100);
        })
        API.CountPeserta().then(res=>{
            setTimeout(() => this.setState({
                JumlahPeserta: res.data,
                loading: false
              }), 100);
        })
        API.CountBayarnew().then(res=>{
            setTimeout(() => this.setState({
                BayarNew: res.data[0].new,
                loading: false
              }), 100);
        })
        API.CountBayarcancel().then(res=>{
            setTimeout(() => this.setState({
                BayarCancel: res.data[0].cancel,
                loading: false
              }), 100);
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
                <h3 className="text-light mb-3 text-right"><Clock format={'D MMMM YYYY, HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} /></h3>
                
                {this.state.loading ?
                        <>
                        <Row>
                        <Col>
                        <Skeleton height={120} />
                        </Col>
                        <Col>
                        <Skeleton height={120} />
                        </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Col>
                        <Skeleton height={120} />
                        </Col>
                        <Col>
                        <Skeleton height={120} />
                        </Col>
                        </Row>
                        </>
                        :
                        <>
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
                </>
                }
            </Container>
            </>
        )
    }
}


export default index