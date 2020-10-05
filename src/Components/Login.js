import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

const TITLE = 'Masuk - Seminar App'
const validationSchema = yup.object({
    username: yup.string().required('Username harus diisi'),
    password: yup.string().required('Password harus diisi')
}); 
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin:false,
            idLogin:""
        }
    }

    render() {
        return (
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    <Row className="justify-content-center">
                    <Col lg="6">
                    <ul className="nav nav-tabs nav-fill bg-white" style={{fontSize: '1.125rem', fontWeight: '500'}}>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to='/login'>Masuk</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to='/register'>Daftar</NavLink>
                    </li>

                    </ul>
                    <Card className="shadow" body>
                        
                        <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={(values, actions) => {
                            //alert(JSON.stringify(values));
                            API.PostLogin(values).then(res=>{
                                if (res.id === "1" ) {
                                    localStorage.setItem('isLogin',JSON.stringify(res.data))
                                    this.props.history.push('/member');
                                    NotificationManager.success('Login Berhasil');
                                    window.location.reload();
                                } else if (res.id === "2" ) {
                                    localStorage.setItem('isAdmin',JSON.stringify(res.data))
                                    this.props.history.push('/admin');
                                    NotificationManager.success('Login Berhasil');
                                    window.location.reload();
                                } else {
                                    NotificationManager.error('Login Gagal, periksa kembali username dan password anda');
                                }
                            })
                            setTimeout(() => {
                            actions.setSubmitting(false);
                            }, 1000);
                        }}
                        validationSchema={validationSchema}
                        >
                        {({handleSubmit,handleChange,handleBlur,values,touched,errors,isSubmitting}) => (
                    <Form noValidate onSubmit={handleSubmit} className="px-5 py-3">
                                <h3 className="text-center" style={{fontWeight: '500'}}>Masuk ke Akun Seminar kamu!</h3>
                        <Form.Group>
                            <Form.Label>Email/Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Email/Username" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.username} isInvalid={!!errors.username && touched.username} />
                            {errors.username && touched.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && touched.password} />
                            {errors.password && touched.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                        </Form.Group>

                        <Button block size="lg" variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                        <>
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Memuat...
                        </>
                        ) : (
                        <>Masuk</>
                        )}
                        </Button>
    
                    </Form>
                    )}
                    </Formik>
                    </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Login