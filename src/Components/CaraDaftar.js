import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container,Breadcrumb, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import {UploadUrl} from '../Configs/Url'
//import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'

const seo = {
    title: 'Seminar App',
    description: 'Seminar App Dengan ReactJS dan CodeIgniter 3',
    image: '',
    url: '',
}
//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class CaraDaftar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isi: '',
            img: '',
            aktif: '',
            url: UploadUrl(),
            error: '',
            loading: true
        }
    }

    componentDidMount = () => {
        API.GetCaraDaftar().then(res=>{
            if (res.data.length > 0) {
            setTimeout(() => this.setState({
                isi : res.data[0].isi_caradaftar,
                img : res.data[0].img_caradaftar,
                aktif: res.data[0].aktif_caradaftar,
                loading: false
            }), 100);
            } else {
                this.setState({
                    error: "No Data Found",
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err.response)
        })
    }
    render() {
        return (
            <>
           <Helmet>
           <title>Cara Daftar - { seo.title }</title>
            <meta name="description" content={'Cara Daftar'+seo.description} />
            </Helmet>
                <Container>
                    
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cara Pendaftaran</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Cara Pendaftaran</h3>

                        <p className="lead text-center">
                        {this.state.error}
                        </p>

                        {this.state.loading ?
                            <>
                            <p><Skeleton height={800} /></p>
                            </>
                            :
                            <>
                            <p>{this.state.isi}</p>
                           {this.state.img ?
                            <p className="text-center">
                                <img src={this.state.url+this.state.img} className="img-fluid" alt="Cara Daftar" />
                            </p>
                            :
                             ""
                            }
                           
                            </>

                        }
                        
                        
                        </Card>         
                   
                </Container>
            </>
        )
    }
}

export default CaraDaftar