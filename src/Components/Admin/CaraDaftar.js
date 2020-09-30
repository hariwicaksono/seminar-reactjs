import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Configs/Axios'
import {UploadUrl} from '../../Configs/Url'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Cara Daftar - Seminar App'
const validationSchema = yup.object({
    foto: yup.mixed().required()
    //username: yup.string().required(),
    //password: yup.string().required()
    //.min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    //,
  }); 
class CaraDaftar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isi_caradaftar: '',
            img_caradaftar: '',
            aktif_caradaftar: '',
            usernm: '',
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
    const id = datas[0].usernm
    API.GetCaraDaftar().then(res=>{
        //console.log(res)
        setTimeout(() => this.setState({
            isi_caradaftar: res.data[0].isi_caradaftar,
            img_caradaftar: res.data[0].img_caradaftar,
            aktif_caradaftar: res.data[0].aktif_caradaftar,
            usernm: id,
            loading: false
          }), 100);
    })
    }            

    render() {
        return (
            <>
            <Helmet>
            <title>{ "Admin"+
                    " - "+
                    TITLE }</title>
            </Helmet>
                <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Cara Daftar</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Cara Pendaftaran</h3> 
                        {this.state.loading ?
                        <>
                        <Skeleton count={5} height={40} className="mb-1" />
                        <Skeleton width={100} height={40} />
                        </>
                        :
                        <Formik
                            initialValues={{ 
                                isi_caradaftar: this.state.isi_caradaftar, 
                                aktif_caradaftar: this.state.aktif_caradaftar,
                                foto: null,
                                usernm: this.state.usernm
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutCaraDaftar(
                                    { 
                                    isi_caradaftar: values.isi_caradaftar,
                                    aktif_caradaftar: values.aktif_caradaftar,                                  
                                    usernm: this.state.usernm,
                                    foto: values.foto.name
                                }).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        NotificationManager.success('Data berhasil disimpan');
                                    } 
                                     
                                }).catch(err => {
                                    console.log(err.response)
                                    NotificationManager.warning('Tidak ada data yang diubah');

                                })

                                API.PostFoto(values.foto, values.foto.name).then(res => {
                                    console.log('img_ok')
                                })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
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
                                <Form.Label>Isi Cara Daftar</Form.Label>
                                <Form.Control as="textarea" rows="3" name="isi_caradaftar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.isi_caradaftar} isInvalid={!!errors.isi_caradaftar && touched.isi_caradaftar} />
                                {errors.isi_caradaftar && touched.isi_caradaftar && <Form.Control.Feedback type="invalid">{errors.isi_caradaftar}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                             <Form.Label>Gambar Cara Daftar</Form.Label><br/>
                            <img src={this.state.url+this.state.img_caradaftar} className="img-fluid" width="200" alt=""/>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label htmlFor="foto">Upload Gambar</Form.Label>
                            
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
                                <Form.Label>Aktifkan Cara Daftar</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="aktif_caradaftar" id="radio-1" value="Y" label="Ya" onChange={handleChange} feedback={errors.aktif_caradaftar} isInvalid={!!errors.aktif_caradaftar && touched.aktif_caradaftar} checked={values.aktif_caradaftar === "Y" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="aktif_caradaftar" id="radio-2" value="N" label="Tidak" onChange={handleChange} feedback={errors.aktif_caradaftar} isInvalid={!!errors.aktif_caradaftar && touched.aktif_caradaftar} checked={values.aktif_caradaftar === "N" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.aktif_caradaftar && touched.aktif_caradaftar && <Form.Control.Feedback type="invalid">{errors.aktif_caradaftar}</Form.Control.Feedback>}
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
                    }
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CaraDaftar