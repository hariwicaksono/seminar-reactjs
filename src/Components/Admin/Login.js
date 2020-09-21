import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';

const TITLE = 'Masuk - Seminar App'
const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
    //.min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    ,
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

                        <Card className="shadow" body>
                            
                            <Formik
                            initialValues={{ username: '', password: '', level:'ADMIN' }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                API.PostLogin(values).then(res=>{
                                    console.log(res)
                                    if (res.id === "2" ) {
                                        sessionStorage.setItem('isAdmin',JSON.stringify(res.data))
                                        this.setState({
                                            isLogin:true,
                                            idLogin:"2"
                                        })
                                        window.location.href = '/admin';
                                        NotificationManager.success('Berhasil masuk sistem');
                                        
                                    } else {
                                        NotificationManager.warning('Login gagal, periksa username dan password anda');
                                    }
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
                        <Form noValidate onSubmit={handleSubmit} className="px-5 py-3">
                                 <h3 className="text-center mb-3" style={{fontWeight: '500'}}>Login Administrator</h3>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Username" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.username} isInvalid={!!errors.username && touched.username} />
                                {errors.username && touched.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && touched.password} />
                                {errors.password && touched.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                            </Form.Group>
    
                            <Button block size="lg" variant="outline-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                            <>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> Memuat...
                            </>
                            ) : ( <>Masuk</> )}</Button>
       
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