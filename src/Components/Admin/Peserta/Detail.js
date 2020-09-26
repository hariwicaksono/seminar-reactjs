import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { Container, Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
//import {ImagesUrl} from '../Configs/Axios'
import Loader from 'react-loader'
import moment from 'moment'
import 'moment/locale/id'

const TITLE = ' - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class PsDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            tgl: '',
            nama_sem: '',
            jenis_kartu: '',
            no_kartu: '',
            nama: '',
            pendidikan: '',
            usia: '',
            email: '',
            alamat: '',
            kota: '',
            kodepos: '',
            nohp: '',
            status: '',
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        this.setState({
            id : id
        })
        API.GetIdPeserta(id).then(res=>{
            setTimeout(() => this.setState({
                tgl: res.data[0].tgl_daftar,
                nama_sem: res.data[0].nm_seminar,
                jenis_kartu: res.data[0].jns_kartuid,
                no_kartu: res.data[0].no_kartuid,
                nama: res.data[0].nama_peserta,
                pendidikan: res.data[0].pendidikan,
                usia: res.data[0].range_usia,
                email: res.data[0].email_peserta,
                alamat: res.data[0].alamat_peserta,
                kota: res.data[0].kota_kab_peserta,
                kodepos: res.data[0].kode_pos,
                nohp: res.data[0].no_hp,
                status: res.data[0].status_aktivasi,
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
        <title> {'Peserta'} {this.state.nama} { TITLE }</title>
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/peserta" }}>Daftar Peserta</Breadcrumb.Item>
                        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Detail Peserta</h5>
                            <dl className="row">
                            <dt className="col-sm-3">No. Registrasi</dt>
                            <dd className="col-sm-9">{this.state.id}</dd>

                            <dt className="col-sm-3">Tanggal Daftar</dt>
                            <dd className="col-sm-9">{this.state.tgl}</dd>

                            <dt className="col-sm-3">Nama Seminar</dt>
                            <dd className="col-sm-9">{this.state.nama_sem}</dd>

                            <dt className="col-sm-3">Jenis Kartu Identitas</dt>
                            <dd className="col-sm-9">{this.state.jenis_kartu}</dd>

                            <dt className="col-sm-3">No. Identitas</dt>
                            <dd className="col-sm-9">{this.state.no_kartu}</dd>

                            <dt className="col-sm-3">Nama Peserta</dt>
                            <dd className="col-sm-9">{this.state.nama}</dd>

                            <dt className="col-sm-3">Pendidikan</dt>
                            <dd className="col-sm-9">{this.state.pendidikan}</dd>

                            <dt className="col-sm-3">Range Usia (Tahun)</dt>
                            <dd className="col-sm-9">{this.state.usia}</dd>

                            <dt className="col-sm-3">Email Peserta</dt>
                            <dd className="col-sm-9">{this.state.email}</dd>

                            <dt className="col-sm-3">Alamat</dt>
                            <dd className="col-sm-9">{this.state.alamat}</dd>

                            <dt className="col-sm-3">Kabupaten/Kota</dt>
                            <dd className="col-sm-9">{this.state.kota}</dd>

                            <dt className="col-sm-3">Kode Pos</dt>
                            <dd className="col-sm-9">{this.state.kodepos}</dd>

                            <dt className="col-sm-3">No. HP</dt>
                            <dd className="col-sm-9">{this.state.nohp}</dd>

                            <dt className="col-sm-3">Status Aktivasi</dt>
                            <dd className="col-sm-9">{this.state.status}</dd>

                            </dl>

                        </Card>
                       
                        </>
                }
                    
                   
                </Container>
            </>
        )
    }
}

export default PsDetail