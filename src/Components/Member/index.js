import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Breadcrumb, Button, Row, Col, Alert, Table, Card } from 'react-bootstrap'
import Loader from 'react-loader'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import { Printer } from 'react-bootstrap-icons'

const TITLE = 'Member - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bayar: [],
            nama_sem: '',
            biaya:'',
            nama_bank:'',
            no_rek:'',
            pemilik_rek:'',
            loading: true
        }
    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isLogin'))
        const id = datas[0].id_peserta
        API.GetPembayaranById(id).then(res=>{
            setTimeout(() => {
                if (res.data.length > 0) {
                    this.setState({
                      bayar: res.data,
                      loading: false
                    })
                    //NotificationManager.info('Selamat datang di Dashbor Member Seminar');
                  } else {
                    this.setState({
                      bayar: res.data,
                      loading: false
                    })
                    NotificationManager.warning('Perhatian, anda belum melakukan Pendaftaran');
                  }
            }, 100);
            
        })
        API.GetSeminarById(id).then(res=>{
            setTimeout(() => this.setState({
                nama_sem : res.data[0].nm_seminar,
                biaya: res.data[0].biaya_seminar,
                loading: false
            }), 100);
        })
        API.GetBank().then(res=>{
            setTimeout(() => this.setState({
                nama_bank : res.data[0].nm_bank,
                no_rek: res.data[0].no_rek,
                pemilik_rek: res.data[0].pemilik_rek,
                loading: false
            }), 100);
        })
    }
 
    render() {
        const ListTable = this.state.bayar.map((s, i) => (
            <tr key={s.id_peserta}>
               
                    <td>{i + 1}</td>
                    <td>{s.id_peserta}</td>
                    <td>{moment(s.tgl_daftar).format('DD-MM-YYYY')}</td>
                    <td>{s.nama_peserta}</td>
                    <td>{s.nm_seminar}</td>
                    <td>
                    {s.status_bayar === "Baru" ? <Button variant="primary" size="sm" disabled>Sedang proses</Button> : ""}
                    {s.status_bayar === "Menunggu" ? <Button variant="primary" size="sm" disabled>Sedang proses</Button> : ""}
                    {s.status_bayar === "Batal" ? <Button variant="primary" size="sm" disabled>Dibatalkan</Button> : ""}
                    {s.status_bayar === "Lunas" ? <><Link to={'/cetak/bukti/'+s.id_peserta} className="btn btn-primary mb-1"><Printer/> Cetak Bukti Pendaftaran</Link><Link to={'/cetak/sertifikat/'+s.id_peserta} className="btn btn-warning"><Printer/> Cetak Sertifikat</Link></> : ""}
                    </td>
             </tr> 
        ))
        return (
            <>
           <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
         
                <Container>

                <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Member</Breadcrumb.Item>
                        </Breadcrumb>

                <Row className="justify-content-center">
                <Col md={12}>
                <Card className="shadow mb-2 " body>

                    {this.state.bayar.length > 0 ? (

                    (this.state.loading
                    ?
                    <Loader options={options} className="spinner" />
                    :

                    <>
                    <h2 className="mb-3">Data Peserta</h2>
                    <Table striped responsive hover size="lg">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>No. Registrasi</th>
                        <th>Tgl Pendaftaran</th>
                        <th>Nama Peserta</th>
                        <th>Seminar</th>
                        <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                       {ListTable}
                    </tbody>
                    </Table>
                    </>
                    )

                    ): (

                    (this.state.loading ?
                    <Loader options={options} className="spinner" />
                    :
                    <>
                
                    <div className="my-2 text-center">
                        <img src="./images/bg-informasi.png" className="mb-3 img-fluid" width="200" alt="Not Data Found" />
                        <h4 className="mb-3">Anda Belum Melakukan Pembayaran</h4>
                        <hr/>
                        <Button as={Link} to="/konfirmasi" variant="primary" size="lg">Konfirmasi Pembayaran</Button>
                    </div>
                    
                    <Alert variant="warning" className="shadow">
                    <Alert.Heading>Informasi Seminar</Alert.Heading>
                    <p>
                    Seminar: {this.state.nama_sem}<br/>
                    Biaya: Rp.{this.state.biaya}
                    </p>
                    <p>Pembayaran Seminar dapat di Transfer ke:<br/>
                    Bank: {this.state.nama_bank}<br/>
                    Nomor: {this.state.no_rek}<br/>
                    Nama: {this.state.pemilik_rek}
                    </p>
                    </Alert>
                    </>
                    )

                    )}
                    </Card>


                </Col>
                </Row>

                    

                </Container>
            </>
        )
    }
}


export default index