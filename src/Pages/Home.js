import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card, Carousel } from 'react-bootstrap'
import { CalendarEvent, GeoAlt, ArrowRepeat, Calendar3, InfoCircle } from "react-bootstrap-icons"
import API from '../Configs/Axios'
import Skeleton from 'react-loading-skeleton'
import { isLogin, isAdmin } from '../Utils'
import moment from 'moment'
import 'moment/locale/id'
import ArsipSeminar from "../Components/ArsipSeminar"
//import Loader from 'react-loader'

//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AktifSeminar: [],
            Seminar: [],
            loading: true
        }
    }

    componentDidMount = () => {
        API.GetAktifSeminar().then(res => {
           this.setState({
                AktifSeminar: res.data,
            })
        })
        API.GetArsipSeminar().then(res => {
            setTimeout(() => this.setState({
                Seminar: res.data,
                loading: false
            }), 100);
        })
    }

    render() {
        if (isLogin()) {
            return( <Redirect to="/member" /> )
        } 
        if (isAdmin()) {
            return( <Redirect to="/admin" /> )
        }
        
        const ListAktif = this.state.AktifSeminar.map((s, i) => (
            <div key={i + 1}>
                    <h1 className="h2">{s.nm_seminar}</h1>
                    <p className="mb-3"><CalendarEvent/> {moment(s.tgl_seminar).format('DD-MM-YYYY')}, Pukul {moment(s.jam_seminar, "HH:mm:ss").format('HH:mm')} &mdash; <GeoAlt/> {s.lokasi_seminar}</p>
                    <p className="lead">{s.headline_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary btn-lg">DETAIL</Link>&nbsp;
                    <Link to="/register" className="btn btn-outline-success btn-lg" >DAFTAR</Link>
            </div>
        ))

        const ListAktif_withSlide = this.state.AktifSeminar.map((s, i) => (
            <Carousel.Item key={i + 1}>
                    <h1 className="h2">{s.nm_seminar}</h1>
                    <p className="mb-3"><CalendarEvent/> {moment(s.tgl_seminar).format('DD-MM-YYYY')}, Pukul {moment(s.jam_seminar, "HH:mm:ss").format('HH:mm')} &mdash; <GeoAlt/> {s.lokasi_seminar}</p>
                    <p className="lead">{s.headline_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-outline-primary btn-lg">DETAIL</Link>&nbsp;
                    <Link to="/register" className="btn btn-outline-success btn-lg" >DAFTAR</Link>
            </Carousel.Item>
        ))
 
        return (
            <>
                <Container> 
                    <Row>
                        <Col>
                        <Jumbotron className="shadow text-center bg-white py-5 mb-2">
                        {this.state.loading ?
                        <>
                        <h1 className="h2"><Skeleton height={40} /></h1>
                        <p className="mb-3"><Skeleton height={20} /></p>
                        <p className="lead"><Skeleton height={48} /></p>
                        <Skeleton width={100} height={47} />
                        <Skeleton width={100} height={47} />
                        </>
                        :
                            (this.state.AktifSeminar.length > 1 ?
                            <>
                            <Carousel indicators={false}>
                            {ListAktif_withSlide}
                            </Carousel>
                            </>
                            :
                            <>
                            {ListAktif}
                            </>
                            )
                        
                        }
                        </Jumbotron>

                        <div className="mb-2" style={{fontWeight: '700'}}>
                            <Row>
                                <Col>
                                <Card as={Link} to="/caradaftar" bg="primary" text="light" className="mb-0" body><ArrowRepeat size="20"/> Cara Daftar</Card>
                                </Col>
                                <Col>
                                <Card as={Link} to="/kalender" bg="info" text="light" className="mb-0" body><Calendar3 size="20"/> Kalender</Card>
                                </Col>
                                
                                <Col>
                                <Card as={Link} to="/kontak" bg="warning" text="light" className="mb-0" body><InfoCircle size="20"/> Kontak</Card>
                                </Col>
                            </Row>
                            
                        </div>

                        <Card className="shadow" body>
                        <h5 style={{fontWeight: '700'}}>Seminar yang lalu</h5>
                        <hr className="mt-0"/>
                        {this.state.loading ?
                        <>
                        <h5><Skeleton /></h5>
                        <p><Skeleton count={2} /></p>
                        <Skeleton width={100} height={35} />
                        </>
                        :
                        <>
                        <ArsipSeminar data={this.state.Seminar} />
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

export default Home