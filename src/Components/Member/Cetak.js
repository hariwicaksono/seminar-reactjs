import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Button, Table, Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { ImagesUrl } from '../../Configs/Url'
import Loader from 'react-loader'
import moment from 'moment'
import 'moment/locale/id'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode.react'

const TITLE = 'Cetak PDF - Seminar & Webinar'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama_sem : '',
            nama:'',
            lokasi:'',
            tanggal:'',
            jam:'',
            no_reg:'',
            token:'',
            loading: true
        }
    }

    printDocument() {  
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("download.pdf");  
          });  
      }  

    componentDidMount = () => {
        const id = this.props.match.params.id
        API.GetPembayaranById(id).then(res=>{
            setTimeout(() => this.setState({
                nama_sem : res.data[0].nm_seminar,
                nama : res.data[0].nama_peserta,
                lokasi: res.data[0].lokasi_seminar,
                tanggal: res.data[0].tgl_seminar,
                jam: res.data[0].jam_seminar,
                no_reg: res.data[0].id_peserta,
                token: res.data[0].token_peserta,
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
                <Row className="justify-content-center">
                  
                  <Col lg="12">
                    { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cetak Bukti Pendaftaran</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <div id="pdfdiv" className="mb-2 bg-white px-5 py-4">
                            <h2 className="text-center">Bukti Pendaftaran Seminar</h2>
                            <hr/>
                            <Row>
                            <Col sm={10}>
                            <Table hover responsive>
                            <tbody>
                                <tr>
                                <td>No Pendaftaran</td>
                                <td>:</td>
                                <td>{this.state.no_reg}</td>
                                </tr>
                                <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{this.state.nama}</td>
                                </tr>
                                <tr>
                                <td>Seminar</td>
                                <td>:</td>
                                <td>{this.state.nama_sem}</td>
                                </tr>
                                <tr>
                                <td>Lokasi</td>
                                <td>:</td>
                                <td>{this.state.lokasi}</td>
                                </tr>
                                <tr>
                                <td>Tanggal</td>
                                <td>:</td>
                                <td>{moment(this.state.tanggal).format('DD MMMM YYYY')}</td>
                                </tr>
                                <tr>
                                <td>Pukul</td>
                                <td>:</td>
                                <td>{moment(this.state.jam, "HH:mm:ss").format('HH:mm')}</td>
                                </tr>
                                
                                <tr>
                                <td>Security Key</td>
                                <td>:</td>
                                <td>{this.state.token}</td>
                                </tr>
                            </tbody>
                            </Table>
                            </Col>
                            <Col sm={2}>
                            <div className="text-center">
                                <QRCode value={this.state.no_reg} /><br/>
                                <samp>{this.state.no_reg}</samp>
                            </div>
                            </Col>

                            </Row>
                            
                        </div>

                        <Button onClick={this.printDocument} variant="primary" size="lg" block>  
                        Generate PDF
                        </Button>  
                     
                        </>
                    }
                    </Col>
                    </Row>
                   
                </Container>
            </>
        )
    }
}

export default Detail