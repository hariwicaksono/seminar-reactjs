import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { seo } from '../../../Components/Layout'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
import { Formik } from 'formik'
import * as yup from 'yup'

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const validationSchema = yup.object({
    nm_bank: yup.string().required(),
    no_rek: yup.number().required().typeError("Harus berupa angka"),
    pemilik_rek: yup.string().required(),
    kantor_cabang: yup.string().required(),
  }); 
class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            nama: '',
            norek: '',
            pemilik: '',
            cabang: '',
            aktif: '',
            mduser: '',
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
        API.GetIdBank(id).then(res=>{
            setTimeout(() => this.setState({
                nama: res.data[0].nm_bank,
                norek: res.data[0].no_rek,
                pemilik: res.data[0].pemilik_rek,
                cabang: res.data[0].kantor_cabang,
                aktif: res.data[0].aktif_bank,
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
           <title data-react-helmet="true">Edit Bank - { seo.title }</title>
            <meta data-react-helmet="true" name="description" content={seo.description} />
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/bank" }}>Master Bank</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Edit Bank</h5>
                            <Formik
                            initialValues={{ 
                                id_bank: this.state.id, 
                                nm_bank: this.state.nama,
                                no_rek: this.state.norek,
                                pemilik_rek: this.state.pemilik,
                                kantor_cabang: this.state.cabang,
                                aktif_bank: this.state.aktif,
                                md_username_bank: this.state.mduser,
                               
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutBank(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        this.props.history.push('/bank')
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
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                             
                            <Form.Group>
                                <Form.Label>Nama Bank</Form.Label>
                                <Form.Control name="nm_bank" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nm_bank} isInvalid={!!errors.nm_bank && touched.nm_bank} />
                                {errors.nm_bank && touched.nm_bank && <Form.Control.Feedback type="invalid">{errors.nm_bank}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Nomor Rekening</Form.Label>
                                <Form.Control name="no_rek" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_rek} isInvalid={!!errors.no_rek && touched.no_rek} />
                                {errors.no_rek && touched.no_rek && <Form.Control.Feedback type="invalid">{errors.no_rek}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Nama Pemilik Rekening</Form.Label>
                                <Form.Control name="pemilik_rek" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.pemilik_rek} isInvalid={!!errors.pemilik_rek && touched.pemilik_rek} />
                                {errors.pemilik_rek && touched.pemilik_rek && <Form.Control.Feedback type="invalid">{errors.pemilik_rek}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kantor Cabang</Form.Label>
                                <Form.Control name="kantor_cabang" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.kantor_cabang} isInvalid={!!errors.kantor_cabang && touched.kantor_cabang} />
                                {errors.kantor_cabang && touched.kantor_cabang && <Form.Control.Feedback type="invalid">{errors.kantor_cabang}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Aktifkan Bank</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="aktif_bank" id="radio-1" value="Y" label="Ya" onChange={handleChange} feedback={errors.aktif_bank} isInvalid={!!errors.aktif_bank && touched.aktif_bank} checked={values.aktif_bank === "Y" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="aktif_bank" id="radio-2" value="N" label="Tidak" onChange={handleChange} feedback={errors.aktif_bank} isInvalid={!!errors.aktif_bank && touched.aktif_bank} checked={values.aktif_bank === "N" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.aktif_bank && touched.aktif_bank && <Form.Control.Feedback type="invalid">{errors.aktif_bank}</Form.Control.Feedback>}
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