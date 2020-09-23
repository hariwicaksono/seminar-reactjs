import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container,Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
//import Loader from 'react-loader'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Profil Kami - Seminar App'
//var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Profil extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            error: '',
            loading: true
        }
    }

    componentDidMount = () => {
        API.GetProfilWeb().then(res=>{
            if (res.data.length > 0) {
            setTimeout(() => this.setState({
                nama : res.data[0].isi_profil,
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
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    
              
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Profil</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Profil Kami</h3>
                        <p className="lead text-center">
                        {this.state.error}
                        </p>
                        {this.state.loading ?
                        <>
                        <p><Skeleton count={3} /></p>
                        </>
                        :
                        <>
                        <p>{this.state.nama}</p>
                        </>
                        }
                        
                        </Card>         
                   
                </Container>
            </>
        )
    }
}

export default Profil