import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { seo } from '../../../Components/Layout'
import {UploadUrl} from '../../../Configs/Url'
import { Container, Breadcrumb, Card, Badge  } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
//import moment from 'moment'
//import 'moment/locale/id'

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            status: '',
            tgl: '',
            jam: '',
            nama_sem: '',
            id_reg: '',
            nama: '',
            bank: '',
            metode: '',
            jumlah: '',
            pemilik_rek: '',
            info: '',
            bukti: '',
            url: UploadUrl(),
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        this.setState({
            id : id
        })
        API.GetIdPembayaran(id).then(res=>{
            setTimeout(() => this.setState({
                status: res.data[0].status_bayar,
                tgl: res.data[0].tgl_transfer,
                jam: res.data[0].jam_transfer,
                nama_sem: res.data[0].nm_seminar,
                id_reg: res.data[0].id_peserta,
                nama: res.data[0].nama_peserta,
                bank: res.data[0].nm_bank,
                metode: res.data[0].bank_transfer,
                jumlah: res.data[0].jml_transfer,
                pemilik_rek: res.data[0].nm_pemilik_rek,
                info: res.data[0].informasi_tambahan,
                bukti: res.data[0].img_bayar,
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
           <title data-react-helmet="true">Detail Pembayaran - { seo.title }</title>
            <meta data-react-helmet="true" name="description" content={seo.description} />
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/pembayaran" }}>Daftar Pembayaran</Breadcrumb.Item>
                        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Detail Pembayaran</h5>
                            <dl className="row">
                            <dt className="col-sm-3">No. Pembayaran</dt>
                            <dd className="col-sm-9">{this.state.id}</dd>

                            <dt className="col-sm-3">Status Bayar</dt>
                            <dd className="col-sm-9"><Badge variant="primary">{this.state.status}</Badge></dd>

                            <dt className="col-sm-3">Tanggal Bayar</dt>
                            <dd className="col-sm-9">{this.state.tgl}</dd>

                            <dt className="col-sm-3">Waktu Bayar</dt>
                            <dd className="col-sm-9">{this.state.jam}</dd>

                            <dt className="col-sm-3">Nama Seminar</dt>
                            <dd className="col-sm-9">{this.state.nama_sem}</dd>

                            <dt className="col-sm-3">No. Registrasi</dt>
                            <dd className="col-sm-9">{this.state.id_reg}</dd>

                            <dt className="col-sm-3">Nama Peserta</dt>
                            <dd className="col-sm-9">{this.state.nama}</dd>

                            <dt className="col-sm-3">Bank</dt>
                            <dd className="col-sm-9">{this.state.bank}</dd>

                            <dt className="col-sm-3">Metode Bayar</dt>
                            <dd className="col-sm-9">{this.state.metode}</dd>

                            <dt className="col-sm-3">Jumlah Bayar</dt>
                            <dd className="col-sm-9">Rp.{this.state.jumlah}</dd>

                            <dt className="col-sm-3">A/n Pemilik Rekening</dt>
                            <dd className="col-sm-9">{this.state.pemilik_rek}</dd>

                            <dt className="col-sm-3">Informasi Tambahan</dt>
                            <dd className="col-sm-9">{this.state.info}</dd>

                            <dt className="col-sm-3">Bukti Pembayaran/Kuitansi</dt>
                            <dd className="col-sm-9"><a href={this.state.url+this.state.bukti} alt="" target="_blank" rel="noopener noreferrer"><img src={this.state.url+this.state.bukti} width="150" alt=""/></a></dd>


                            </dl>

                        </Card>
                       
                        </>
                }
                    
                   
                </Container>
            </>
        )
    }
}

export default Detail