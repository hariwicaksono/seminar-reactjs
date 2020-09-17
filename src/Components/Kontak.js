import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container,Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import {ImagesUrl} from '../Configs/Axios'
import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Kontak - Seminar & Webinar'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Kontak extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            alamat : '',
            kodepos: '',
            telp: '',
            email: '',
            url: '',
            loading: true
        }
    }

    componentDidMount = () => {
        API.GetIdentitasWeb().then(res=>{
            setTimeout(() => this.setState({
                nama : res.data[0].nama_pt,
                alamat: res.data[0].alamat_pt,
                kodepos: res.data[0].kode_pos,
                telp: res.data[0].tlp_pt,
                email: res.data[0].email_pt,
                url: res.data[0].url,
                loading: false
            }), 100);
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <>
           <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    
              
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Kontak</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card className="mb-2" body>
                        {this.state.loading ?
                        <>
                        <h5><Skeleton height={25} /></h5>
                        <p><Skeleton count={6} /></p>
                        </>
                        :
                        <>
                        <h4>Kontak</h4>
                        <p>{this.state.nama}<br/>
                        Alamat: {this.state.alamat}<br/>
                        Kodepos: {this.state.kodepos}<br/>
                        Telp: {this.state.telp}<br/>
                        Email: {this.state.email}<br/>
                        Web: {this.state.url}
                        
                        </p>
                        </>
                        }
                        
                        </Card>         
                   
                </Container>
            </>
        )
    }
}

export default Kontak