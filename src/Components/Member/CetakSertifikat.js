import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../Configs/Axios'
import { Container, Breadcrumb, Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { UploadUrl, QrcodeUrl } from '../../Configs/Url'
import Loader from 'react-loader'
//import moment from 'moment'
//import 'moment/locale/id'
//import jsPDF from 'jspdf'
//import html2canvas from 'html2canvas'
//import QRCode from 'qrcode.react'
import { PDFViewer, Document, Page, Image, View, StyleSheet } from "@react-pdf/renderer";
import styled from '@react-pdf/styled-components';

const seo = {
  title: 'Seminar App',
  description: 'Seminar App Dengan ReactJS dan CodeIgniter 3',
  image: '',
  url: '',
}
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const styles = StyleSheet.create({
    page: {
      flexDirection: "row"
    },
    section: {
      flexGrow: 1
    },
    image: {
        zIndex: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    },
    qr: {
        position: 'relative',
        bottom: '120px',
        right: '500px',
        zIndex: '10 !important'
    }
  });
    const Nama = styled.Text`
    font-size: 26px;
    font-weight: 500;
    text-align: center; 
    position: relative;
    top: 270px;
    `;
    const Seminar = styled.Text`
    font-size: 16px;
    text-align: center; 
    position: relative;
    top: 310px;
    `;
    const Ketua = styled.Text`
    font-size: 14px;
    position: absolute;
    bottom: 110px;
    right: 220px;
    `;
    const Pejabat1 = styled.Text`
    font-size: 14px;
    position: absolute;
    bottom: 110px;
    left: 200px;
    `;

class CetakSertifikat extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama_sem : '',
            nama:'',
            tanggal:'',
            ketua: '',
            pejabat1: '',
            no_reg:'',
            img: '',
            url: UploadUrl(),
            qrurl: QrcodeUrl(),
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        API.GetSeminarById(id).then(res=>{
            setTimeout(() => this.setState({
                nama_sem : res.data[0].nm_seminar,
                nama : res.data[0].nama_peserta,
                tanggal: res.data[0].tanggal_sertifikat,
                ketua: res.data[0].ketua_sertifikat,
                pejabat1: res.data[0].pejabat1_sertifikat,
                no_reg: res.data[0].id_peserta,
                img: res.data[0].img_sertifikat,
                qrcode: res.data[0].qrcode,
                loading: false
            }), 100);
        }).catch(err => {
            console.log(err)
        })
    } 

    render() {
        const MyDocument = (
            <Document>
              <Page size="A4" orientation="landscape" style={styles.page}>
              <Image 
              style={styles.image}
              src={ this.state.url+this.state.img }
              source={{
                header: {
                   'Access-Control-Allow-Origin': '*'
                }
              }}
              cache={false} allowDangerousPaths={true}
              />
              
               <View style={styles.section}>
               <Nama>{this.state.nama}</Nama>
               <Seminar>{this.state.nama_sem}</Seminar>
                <Ketua>{this.state.ketua}</Ketua>
                <Pejabat1>{this.state.pejabat1}</Pejabat1>
 
                <Image 
                  style={styles.qr}
                  src={ this.state.qrurl+this.state.qrcode }
                  source={{
                    header: {
                      'Access-Control-Allow-Origin': '*'
                    }
                  }}
                  cache={false} allowDangerousPaths={true}
                />
                </View>

             
                   
                
                 
                    
              </Page>
            </Document>
          );
        return (
            <>
           <Helmet>
           <title>Cetak Sertifikat - { seo.title }</title>
            <meta name="description" content={'Cetak Sertifikat'+seo.description} />
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
                        <Breadcrumb.Item active>Cetak Sertifikat</Breadcrumb.Item>
                        </Breadcrumb>

                        <PDFViewer className="w-100 vh-100 mb-3">{MyDocument}</PDFViewer>

                        </>
                    }
                    </Col>
                    </Row>
                   
                </Container>
            </>
        )
    }
}

export default CetakSertifikat