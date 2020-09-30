import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../Configs/Axios'
import { Container, Breadcrumb, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
import moment from 'moment'
import 'moment/locale/id'

const TITLE = ' - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            headline : '',
            deskripsi: '',
            tanggal:'',
            jam:'',
            lokasi:'',
            biaya:'',
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        API.GetIdSeminar(id).then(res=>{
            setTimeout(() => this.setState({
                nama : res.data[0].nm_seminar,
                headline: res.data[0].headline_seminar,
                deskripsi: res.data[0].deskripsi_seminar,
                tanggal: res.data[0].tgl_seminar,
                jam: res.data[0].jam_seminar,
                lokasi: res.data[0].lokasi_seminar,
                biaya: res.data[0].biaya_seminar,
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
        <title>{this.state.nama} { TITLE }</title>
            </Helmet>
                <Container>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card shadow px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Detail Seminar</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h2>{this.state.nama}</h2>
                            <p className="lead">{this.state.headline}</p>
                            <p>{this.state.deskripsi}</p>
                        </Card>
                        <Card className="shadow mb-2" body>
                            <h3>Deskripsi</h3>
                            <p>Tanggal: {moment(this.state.tanggal).format('DD MMMM YYYY')}</p>
                            <p>Pukul: {moment(this.state.jam, "HH:mm:ss").format('HH:mm')}</p>
                            <p>Lokasi: {this.state.lokasi}</p>
                            <p>Biaya: Rp.{this.state.biaya}</p>
                        </Card>
                        </>
                }
                    
                   
                </Container>
            </>
        )
    }
}

export default Detail