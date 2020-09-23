import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';

const TITLE = 'Profil Web - Seminar App'
const validationSchema = yup.object({
    //username: yup.string().required(),
    //password: yup.string().required()
    //.min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    //,
  }); 
class ProfilWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isi_profil: '',
            aktif_profil: '',
            usernm: ''
            
        }

    }

    componentDidMount = () => {
    const datas = JSON.parse(sessionStorage.getItem('isAdmin'))
    const id = datas[0].usernm
    API.GetProfilWeb().then(res=>{
        console.log(res)
        this.setState({
            isi_profil: res.data[0].isi_profil,
            aktif_profil: res.data[0].aktif_profil,
            usernm: id
          })
    })
    }            

    render() {
        return (
            <>
            <Helmet>
            <title>{ "Admin"+" - "+TITLE }</title>
            </Helmet>
                <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Identitas Web</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card className="shadow" body>
                        <h3 className="mb-3">Identitas Web</h3> 
                            <Formik
                            initialValues={{ 
                                isi_profil: this.state.isi_profil, 
                                aktif_profil: this.state.aktif_profil,
                                usernm: this.state.usernm
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutProfilWeb(values).then(res=>{
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
                                <Form.Label>Isi Profil</Form.Label>
                                <Form.Control as="textarea" rows="3" name="isi_profil" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.isi_profil} isInvalid={!!errors.isi_profil && touched.isi_profil} />
                                {errors.isi_profil && touched.isi_profil && <Form.Control.Feedback type="invalid">{errors.isi_profil}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-0">
                                <Form.Label>Aktifkan Profil</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="aktif_profil" id="radio-1" value="Y" label="Ya" onChange={handleChange} feedback={errors.aktif_profil} isInvalid={!!errors.aktif_profil && touched.aktif_profil} checked={values.aktif_profil === "Y" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="aktif_profil" id="radio-2" value="N" label="Tidak" onChange={handleChange} feedback={errors.aktif_profil} isInvalid={!!errors.aktif_profil && touched.aktif_profil} checked={values.aktif_profil === "N" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.aktif_profil && touched.aktif_profil && <Form.Control.Feedback type="invalid">{errors.aktif_profil}</Form.Control.Feedback>}
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
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default ProfilWeb