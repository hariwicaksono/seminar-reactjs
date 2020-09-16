import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card } from 'react-bootstrap'
import API from '../Configs/Axios'
import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'
import { isLogin } from '../Utils'
import { BsCalendar, BsGeoAlt , BsChevronDoubleRight } from "react-icons/bs";

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
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

    }
    render() {
        if (isLogin()) {
            return( <Redirect to="/user" /> )
        }
        
        const ListAktif = this.state.AktifSeminar.map(s => (
            <div key={s.id_seminar}>
            
                    <h1>{s.nm_seminar}</h1>
                    <p><BsCalendar/> {s.tgl_seminar} Pukul {s.jam_seminar} &mdash; <BsGeoAlt/> {s.lokasi_seminar}</p>
                    <p className="lead">{s.headline_seminar}</p>
                    <p>{s.deskripsi_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary" >DETAIL</Link>&nbsp;
                    <Link to="/register" className="btn btn-success" >DAFTAR</Link>
            </div>
        ))

        const ListArsip = this.state.ArsipSeminar.map((s, i) => (
            <div key={s.id_seminar}>
               
                    <h5>{i + 1} {s.nm_seminar} ({s.tgl_seminar})</h5>
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
                        <h5><Skeleton height={50} /></h5>
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
                       
                       
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}

export default Home