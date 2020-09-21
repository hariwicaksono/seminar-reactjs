import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card, Carousel } from 'react-bootstrap'
import { CalendarEvent, GeoAlt, ArrowRepeat, Calendar3, InfoCircle } from "react-bootstrap-icons"
import API from '../Configs/Axios'
//import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'
import { isLogin } from '../Utils'
import moment from 'moment'
import 'moment/locale/id'
//import FullCalendar from '@fullcalendar/react'
//import dayGridPlugin from '@fullcalendar/daygrid'
//import listPlugin from '@fullcalendar/list'; 
//import "@fullcalendar/common/main.css"  
//import "@fullcalendar/daygrid/main.css"  
//import "@fullcalendar/list/main.css"

//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AktifSeminar: [],
            ArsipSeminar: [],
            loading: true
         
        }
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        })
        API.GetAktifSeminar().then(res => {
            setTimeout(() => this.setState({
                AktifSeminar: res.data,
                loading: false
            }), 500);
        })
        API.GetArsipSeminar().then(res => {
            setTimeout(() => this.setState({
                ArsipSeminar: res.data,
                loading: false
            }), 500);
        })

        /*API.GetKalender().then(res=>{
            setTimeout(() => this.setState({
                Kalender : res.data,
                loading: false
            }), 100);
        })*/

    }
    render() {
        if (isLogin()) {
            return( <Redirect to="/member" /> )
        }
        
        const ListAktif = this.state.AktifSeminar.map((s, i) => (
            <div key={i + 1}>
                    <h1 className="h2">{s.nm_seminar}</h1>
                    <p><CalendarEvent/> {s.tgl_seminar}, Pukul {moment(s.jam_seminar, "HH:mm:ss").format('HH:mm')} &mdash; <GeoAlt/> {s.lokasi_seminar}</p>
                    <p className="lead">{s.headline_seminar}</p>
                    <p>{s.deskripsi_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary" >DETAIL</Link>&nbsp;
                    <Link to="/register" className="btn btn-success" >DAFTAR</Link>
            </div>
        ))
        
        const ListArsip = this.state.ArsipSeminar.map((s, i) => (
            <div key={i + 1}>
                    <h5>{s.nm_seminar} ({s.tgl_seminar})</h5>
                    <p>{s.headline_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary" >DETAIL</Link>
             </div> 
        ))

        return (
            <>
                <Container>
                   
                    <Row>
                        <Col>
                        <Jumbotron className="shadow text-center">
                        {this.state.loading ?
                        <>
                        <h1 className="h2"><Skeleton height={40} /></h1>
                        <p><Skeleton height={20} /></p>
                        <p><Skeleton height={40} /></p>
                        <p className="my-3"><Skeleton count={2} /></p>
                        <Skeleton width={100} height={35} />
                        <Skeleton width={100} height={35} />
                        </>
                        :
                        <>
                        {ListAktif}
                        </>
                        }
                        </Jumbotron>

                        <div className="mb-3">
                            <Row>
                                <Col>
                                <Card as={Link} to="/caradaftar" bg="primary" text="light" className="mb-0" body><ArrowRepeat size="20"/> <strong>Cara Daftar</strong></Card>
                                </Col>
                                <Col>
                                <Card as={Link} to="/kalender" bg="info" text="light" className="mb-0" body><Calendar3 size="20"/> <strong>Kalender</strong></Card>
                                </Col>
                                
                                <Col>
                                <Card as={Link} to="/kontak" bg="warning" text="light" className="mb-0" body><InfoCircle size="20"/> Kontak</Card>
                                </Col>
                            </Row>
                            
                        </div>

                        <Card className="shadow" body>
                        {this.state.loading ?
                        <>
                        <h5><Skeleton /></h5>
                        <p><Skeleton count={2} /></p>
                        <Skeleton width={100} height={35} />
                        </>
                        :
                        <>
                        {ListArsip}
                        </>
                        }
                        </Card>

                        {/*<FullCalendar   
                        headerToolbar={{
                            left: 'prev,next',
                            right: 'title'
                        }} 
                            plugins={[listPlugin, dayGridPlugin]}  
                            events={this.state.Kalender}  
                            initialView="listWeek"
                        />*/}

                        </Col>
                    </Row>
                    
                </Container>

              
            </>
        )
    }
}

export default Home