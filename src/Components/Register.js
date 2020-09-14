import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

const TITLE = ' Masuk - Seminar'
const validationSchema = yup.object({
    seminar: yup.string().required(),
    jns_id: yup.string().required(),
    no_id: yup.string().required(),
    nm_peserta: yup.string().required(),
    kelamin: yup.string().required(),
    pendidikan: yup.string().required(),
    usia: yup.string().required(),
    alamat: yup.string().required(),
    kabupaten: yup.string().required(),
  }); 
  class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AktifSeminar: [],
            KartuIdentitas:[],
            Pendidikan:[],
            Kabupaten:[],
            isLogin:false,
            idLogin:"",
            gagalLogin : ""
        }

    }

    componentDidMount = () => {
        API.GetAktifSeminar().then(res => {
            this.setState({
                AktifSeminar: res.data,
                loading: false
            })
        })
        API.GetKartuIdentitas().then(res => {
            this.setState({
                KartuIdentitas: res.data,
                loading: false
            })
        })
        API.GetPendidikan().then(res => {
            this.setState({
                Pendidikan: res.data,
                loading: false
            })
        })
        API.GetKabupaten().then(res => {
            this.setState({
                Kabupaten: res.data,
                loading: false
            })
        })
    }

    render() {

        if(this.state.isLogin){
            if (this.state.idLogin === "1") {
                return( <Redirect to="/user" /> )
            } 
        }

        const ListSeminar = this.state.AktifSeminar.map(s => (
            <option value={s.id_seminar}>{s.nm_seminar}</option>      
        ))

        const ListKartu = this.state.KartuIdentitas.map(s => (
            <option value={s.id_kartu}>{s.jns_kartuid}</option>      
        ))

        const ListPendidikan = this.state.Pendidikan.map(s => (
            <option value={s.id_pendidikan}>{s.pendidikan}</option>      
        ))

        const ListKabupaten = this.state.Kabupaten.map(s => (
            <option value={s.id}>{s.name}</option>      
        ))

        return (
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    <Row>
                  
                    <Col>
                    <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Register</Breadcrumb.Item>
                        </Breadcrumb>
                        <Card>
                            <Card.Body>
                               
                            <Formik
                            initialValues={{ seminar: '', jns_id: '', no_id: '', nm_peserta: '', kelamin: '', pendidikan: '', usia: '', alamat: '' }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
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
                            <h3 className="text-center" style={{fontWeight: '300'}}>Register</h3>
                        <Form.Group>
                            <Form.Label>Pilih Seminar</Form.Label>
                            <Form.Control as="select" name="seminar" onChange={handleChange} onBlur={handleBlur} value={values.seminar} isInvalid={!!errors.seminar && touched.seminar}>
                            <option value="">Pilih Seminar</option>
                            {ListSeminar}
                            </Form.Control>
                            {errors.seminar && touched.seminar && <Form.Control.Feedback type="invalid">{errors.seminar}</Form.Control.Feedback>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pilih Identitas</Form.Label>
                            <Form.Control as="select" name="jns_id" onChange={handleChange} onBlur={handleBlur} value={values.jns_id} isInvalid={!!errors.jns_id && touched.jns_id}>
                            <option value="">Pilih Identitas</option>
                            {ListKartu}
                            </Form.Control>
                            {errors.jns_id && touched.jns_id && <Form.Control.Feedback type="invalid">{errors.jns_id}</Form.Control.Feedback>}
                        </Form.Group>

                            <Form.Group>
                                <Form.Label>Nomor Identitas</Form.Label>
                                <Form.Control type="text" name="no_id" placeholder="Nomor Identitas" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_id} isInvalid={!!errors.no_id && touched.no_id} />
                                {errors.no_id && touched.no_id && <Form.Control.Feedback type="invalid">{errors.no_id}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Nama Lengkap</Form.Label>
                                <Form.Control type="text" name="nm_peserta" placeholder="Nama" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nm_peserta && touched.nm_peserta} />
                                {errors.nm_peserta && touched.nm_peserta && <Form.Control.Feedback type="invalid">{errors.nm_peserta}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group className="mb-0">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="kelamin" id="radio-1" value="L" label="Laki-laki" onChange={handleChange} feedback={errors.kelamin} isInvalid={!!errors.kelamin && touched.kelamin} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="kelamin" id="radio-2" value="P" label="Perempuan" onChange={handleChange} feedback={errors.kelamin} isInvalid={!!errors.kelamin && touched.kelamin} required /> 
                            
                            </Col>
                            {errors.kelamin && touched.kelamin && <Form.Control.Feedback type="invalid">{errors.kelamin}</Form.Control.Feedback>}
                            </Row>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Pendidikan Terakhir</Form.Label>
                            <Form.Control as="select" name="pendidikan" onChange={handleChange} onBlur={handleBlur} value={values.pendidikan} isInvalid={!!errors.pendidikan && touched.pendidikan}>
                            <option value="">Pilih Pendidikan</option>
                            {ListPendidikan}
                            </Form.Control>
                            {errors.pendidikan && touched.pendidikan && <Form.Control.Feedback type="invalid">{errors.pendidikan}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Range Usia</Form.Label>
                            <Form.Control as="select" name="usia" onChange={handleChange} onBlur={handleBlur} value={values.usia} isInvalid={!!errors.usia && touched.usia}>
                            <option value="">Pilih Range Usia</option>
                            <option value='<17'>&#60;17 Tahun</option>
                            <option value='17-25'>17-25 Tahun</option>
                            <option value='26-35'>26-35 Tahun</option>
                            <option value='36-45'>36-45 Tahun</option>
                            <option value='>45'>&#62;45 Tahun</option> 
                            </Form.Control>
                            {errors.usia && touched.usia && <Form.Control.Feedback type="invalid">{errors.usia}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control as="textarea" rows="3" name="alamat" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.alamat && touched.alamat} />
                                {errors.alamat && touched.alamat && <Form.Control.Feedback type="invalid">{errors.alamat}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Kabupaten</Form.Label>
                            <Form.Control as="select" name="kota_kab" onChange={handleChange} onBlur={handleBlur} value={values.kota_kab} isInvalid={!!errors.kota_kab && touched.kota_kab}>
                            <option value="">Pilih Kabupaten</option>
                            {ListKabupaten}
                            </Form.Control>
                            {errors.kota_kab && touched.kota_kab && <Form.Control.Feedback type="invalid">{errors.kota_kab}</Form.Control.Feedback>}
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
                            ) : ( <>Submit</> )}</Button>
       
                     </Form>
                     )}
                    </Formik>
                                {
                                    this.state.gagalLogin
                                }
                               
                               
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Login