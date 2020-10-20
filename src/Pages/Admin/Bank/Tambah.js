import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { seo } from '../../../Components/Layout'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Spinner, Button, Form} from 'react-bootstrap'
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
class Tambah extends Component {
    constructor(props){
        super(props)
        this.state = {
            cruser: '',
            url: UploadUrl(),
            loading: true
        }
    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const usernm = datas[0].usernm
        this.setState({
            cruser: usernm,
            loading: false
        })
    }

    render() {
        return (
            <>
           <Helmet>
           <title data-react-helmet="true">Tambah Bank - { seo.title }</title>
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
                        <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Tambah Bank</h5>
                            <Formik
                            initialValues={{ 
                                nm_bank: '', 
                                no_rek: '',
                                pemilik_rek: '',
                                kantor_cabang: '',
                                cr_username_bank: this.state.cruser,
                               
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PostBank(values).then(res=>{
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

export default Tambah