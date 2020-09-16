import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container,Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Kontak - Seminar'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Tentang extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            loading: true
        }
    }

    componentDidMount = () => {
        API.GetProfilWeb().then(res=>{
            setTimeout(() => this.setState({
                nama : res.data[0].isi_profil,
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
                        <Breadcrumb.Item active>Tentang</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card className="mb-2" body>
                        {this.state.loading ?
                        <>
                        <h5><Skeleton height={25} /></h5>
                        <p><Skeleton count={3} /></p>
                        </>
                        :
                        <>
                        <h4>Tentang Kami</h4>
                        <p>{this.state.nama}<br/>
                        </p>
                        </>
                        }
                        
                        </Card>         
                   
                </Container>
            </>
        )
    }
}

export default Tentang