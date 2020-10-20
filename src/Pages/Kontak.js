import React, { Component } from 'react'
import API from '../Configs/Axios'
import { seo } from '../Components/Layout'
import { Link } from 'react-router-dom'
import { Container,Breadcrumb, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
//import {ImagesUrl} from '../Configs/Axios'
//import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'

//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
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
           <title data-react-helmet="true">Kontak - { seo.title }</title>
            <meta data-react-helmet="true" name="description" content={'Kontak'+seo.description} />
            </Helmet>
                <Container>
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Kontak</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card className="shadow" body>
                        {this.state.loading ?
                        <>
                        <h3 className="mb-3"><Skeleton height={30} /></h3>
                        <p><Skeleton count={6} /></p>
                        </>
                        :
                        <>
                        <h3 className="mb-3">Kontak</h3>
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