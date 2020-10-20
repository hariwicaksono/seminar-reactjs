import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { seo } from '../../../Components/Layout'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
import moment from 'moment'
import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const validationSchema = yup.object({
    //foto: yup.mixed().required(),
    ketua_sertifikat: yup.string().required(),
    tanggal_sertifikat: yup.string().required(),
    pejabat1_sertifikat: yup.string().required(),
  }); 
class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            img: '',
            tgl: '',
            pejabat1: '',
            pejabat2: '',
            mduser: '',
            foto: '',
            file: {
                foto: ''
            },
            fotoPreviewUrl: '',
            url: UploadUrl(),
            loading: true
        }
    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const usernm = datas[0].usernm
        const id = this.props.match.params.id
        this.setState({
            id : id
        })
        API.GetIdSertifikat(id).then(res=>{
            setTimeout(() => this.setState({
                img: res.data[0].img_sertifikat,
                ketua: res.data[0].ketua_sertifikat,
                tgl: res.data[0].tanggal_sertifikat,
                pejabat1: res.data[0].pejabat1_sertifikat,
                pejabat2: res.data[0].pejabat2_sertifikat,
                mduser: usernm,
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
           <title data-react-helmet="true">Edit Background Sertifikat - { seo.title }</title>
            <meta data-react-helmet="true" name="description" content={seo.description} />
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/sertifikat" }}>Master Sertifikat</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Edit Sertifikat</h5>
                            <Formik
                            initialValues={{ 
                                id_sertifikat: this.state.id, 
                                ketua_sertifikat: this.state.ketua,
                                tanggal_sertifikat: this.state.tgl,
                                pejabat1_sertifikat: this.state.pejabat1,
                                pejabat2_sertifikat: this.state.pejabat2,
                                md_username_sertifikat: this.state.mduser
                               
                            }}
                            onSubmit={(values, actions) => {
                                API.PutSertifikat(
                                    { 
                                        id_sertifikat: this.state.id, 
                                        ketua_sertifikat: values.ketua_sertifikat,          
                                        tanggal_sertifikat: values.tanggal_sertifikat,
                                        pejabat1_sertifikat: values.pejabat1_sertifikat,
                                        pejabat2_sertifikat: values.pejabat2_sertifikat,                        
                                        md_username_sertifikat: this.state.mduser
                                    }
                                ).then(res=>{
                                    if (res.status === 1 ) {
                                        this.props.history.push('/sertifikat')
                                        NotificationManager.success('Data berhasil disimpan');
                                    } 
                                    
                                }).catch(err => {
                                    console.log(err.response)
                                    NotificationManager.warning('Tidak ada data yang diubah');
                                
                                })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            validationSchema={validationSchema}
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                             
                             <Form.Group>
                             <Form.Label>Gambar Sertifikat</Form.Label><br/>
                            <img src={this.state.url+this.state.img} className="img-fluid" width="200" />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label htmlFor="foto">Upload Gambar Sertifikat</Form.Label>
                            
                            <Form.File className="form-control" name="foto" id="foto" onChange={(event) => 
                                {
                                setFieldValue("foto", event.currentTarget.files[0]); 
                                this.setState({
                                    fotoPreviewUrl: URL.createObjectURL(event.currentTarget.files[0])
                                })
                                }
                                } onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} />
                            {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                            {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
                            </Form.Group>

                            <Form.Group>
                                <Row>
                                    <Col>
                                <Form.Label>Ketua Panitia Seminar</Form.Label>
                                <Form.Control name="ketua_sertifikat" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.ketua_sertifikat} isInvalid={!!errors.ketua_sertifikat && touched.ketua_sertifikat} />
                                {errors.ketua_sertifikat && touched.ketua_sertifikat && <Form.Control.Feedback type="invalid">{errors.ketua_sertifikat}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>Tanggal Sertifikat</Form.Label>
                                <Form.Control type="date" name="tanggal_sertifikat" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.tanggal_sertifikat} isInvalid={!!errors.tanggal_sertifikat && touched.tanggal_sertifikat} />
                                {errors.tanggal_sertifikat && touched.tanggal_sertifikat && <Form.Control.Feedback type="invalid">{errors.tanggal_sertifikat}</Form.Control.Feedback>}
                            </Col>
                            </Row>
                            </Form.Group>

                            <Form.Group>
                            <Row>
                            <Col>
                            <Form.Label>Pejabat 1 Seminar</Form.Label>
                                <Form.Control name="pejabat1_sertifikat" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.pejabat1_sertifikat} isInvalid={!!errors.pejabat1_sertifikat && touched.pejabat1_sertifikat} />
                                {errors.pejabat1_sertifikat && touched.pejabat1_sertifikat && <Form.Control.Feedback type="invalid">{errors.pejabat1_sertifikat}</Form.Control.Feedback>}
                            </Col>
                            <Col>
                            <Form.Label>Pejabat 2 Seminar</Form.Label>
                                <Form.Control name="pejabat2_sertifikat" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.pejabat2_sertifikat} isInvalid={!!errors.pejabat2_sertifikat && touched.pejabat2_sertifikat} />
                                {errors.pejabat2_sertifikat && touched.pejabat2_sertifikat && <Form.Control.Feedback type="invalid">{errors.pejabat2_sertifikat}</Form.Control.Feedback>}
                            </Col>
                            </Row>
                            </Form.Group>  

                            <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                            <>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> Memuat...
                            </>
                            ) : ( <>Simpan</> )}</Button>
       
                     </Form>
                     )}
                    </Formik>

                        </Card>
                       
                        </>
                }
                    
                   
                </Container>
            </>
        )
    }
}

export default Edit