import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Pengaturan - Seminar App'
const validationSchema = yup.object({
    email_from: yup.string().required('Alamat Email harus diisi'),
    smtp_host: yup.string().required('SMTP Host harus diisi'),
    smtp_port: yup.string().required('SMTP Port harus diisi'),
    smtp_user: yup.string().required('SMTP Username harus diisi'),
    smtp_pass: yup.string().required('SMTP Password harus diisi')
  }); 
class Pengaturan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: '',
            cc: '',
            host: '',
            port: '',
            user: '',
            pass: '',
            loading: true
        }

    }

    componentDidMount = () => {
    API.GetPengaturan().then(res=>{
        setTimeout(() => this.setState({
            from: res.data[0].email_from,
            cc: res.data[0].email_cc,
            host: res.data[0].smtp_host,
            port: res.data[0].smtp_port,
            user: res.data[0].smtp_user,
            pass: res.data[0].smtp_pass,
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
                <Breadcrumb.Item active>Pengaturan</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Pengaturan</h3> 
                        {this.state.loading ?
                        <>
                        <Skeleton count={4} height={40} className="mb-1" />
                        <Skeleton width={100} height={40} />
                        </>
                        :
                        <Formik
                            initialValues={{ 
                                email_from: this.state.from,
                                email_cc: this.state.cc,
                                smtp_host: this.state.host,
                                smtp_port: this.state.port,
                                smtp_user: this.state.user,
                                smtp_pass: this.state.pass
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutPengaturan(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
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
                            enableReinitialize={true}
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
                                <Form.Label>Email From *</Form.Label>
                                <Form.Control type="text" name="email_from" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email_from} isInvalid={!!errors.email_from && touched.email_from} />
                                {errors.email_from && touched.email_from && <Form.Control.Feedback type="invalid">{errors.email_from}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email CC</Form.Label>
                                <Form.Control type="text" name="email_cc" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email_cc} isInvalid={!!errors.email_cc && touched.email_cc} />
                                {errors.email_cc && touched.email_cc && <Form.Control.Feedback type="invalid">{errors.email_cc}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group >
                            <Form.Row>
                                <Col>
                                <Form.Label>SMTP Host *</Form.Label>
                                <Form.Control type="text" name="smtp_host" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.smtp_host} isInvalid={!!errors.smtp_host && touched.smtp_host} />
                                {errors.smtp_host && touched.smtp_host && <Form.Control.Feedback type="invalid">{errors.smtp_host}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>SMTP Port *</Form.Label>
                                <Form.Control type="text" name="smtp_port" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.smtp_port} isInvalid={!!errors.smtp_port && touched.smtp_port} />
                                {errors.smtp_port && touched.smtp_port && <Form.Control.Feedback type="invalid">{errors.smtp_port}</Form.Control.Feedback>}
                                </Col>
                               
                            </Form.Row>
                            </Form.Group>

                            <Form.Group >
                            <Form.Row>
                                <Col>
                                <Form.Label>SMTP User *</Form.Label>
                                <Form.Control type="text" name="smtp_user" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.smtp_user} isInvalid={!!errors.smtp_user && touched.smtp_user} />
                                {errors.smtp_user && touched.smtp_user && <Form.Control.Feedback type="invalid">{errors.smtp_user}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>SMTP Password *</Form.Label>
                                <Form.Control type="text" name="smtp_pass" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.smtp_pass} isInvalid={!!errors.smtp_pass && touched.smtp_pass} />
                                {errors.smtp_pass && touched.smtp_pass && <Form.Control.Feedback type="invalid">{errors.smtp_pass}</Form.Control.Feedback>}
                                </Col>
                                
                            </Form.Row>
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
 
export default Pengaturan