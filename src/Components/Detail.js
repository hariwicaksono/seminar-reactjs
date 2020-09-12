import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import {ImagesUrl} from '../Configs/Axios'

const TITLE = ' - Nita Mart'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            kategori : '',
            harga : '',
            des :'',
            foto :'',
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        API.GetProdukId(id).then(res=>{
            this.setState({
                nama : res.nama_produk,
                harga: res.harga_produk,
                des:res.desk_produk,
                foto : ImagesUrl()+res.foto_produk,
                stok: res.stok,
                diskon: res.diskon,
                kategori: res.kategori,
                suplier: res.suplier
            })
        })
    }
    render() {
        return (
            <>
           <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    
                
                        <Card className="mb-2">
                            <Card.Body>
                                <Row>
                                    <Col md="4">
                                    <img width="320" height="200" className="img-fluid" src={this.state.foto} alt="name" />
                                    </Col>
                                    <Col md="8">
                                    <h2>{this.state.nama}</h2>
                                <h3 className="text-danger my-4">Rp{this.state.harga}</h3>
                                <p>Stok: {this.state.stok}</p>
                                <p>Pengiriman:</p>
                                <p>Kuantitas:</p>
                                <Link className="btn btn-danger btn-lg disabled">Beli Sekarang</Link>
                                <hr/>
                                <div className="alert alert-danger">
                                    <p>YOU MUST BE LOGIN</p>
                                </div>
                                    </Col>
                                    
                                </Row>
                                
                                
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                            <Row>
                            <Col>
                                    <h5>Spesifikasi Produk</h5>
                                    <p>{this.state.kategori}</p>
                                    <h5>Deskripsi Produk</h5>
                              
                              <p>{this.state.des}</p>
                                    </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                   
                </Container>
            </>
        )
    }
}

export default Detail