import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form, Nav} from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Akun Password - Seminar App'
const validationSchema = yup.object({
    nama_peserta: yup.string().required(),
    no_kartuid: yup.string().required(),
    jns_kelamin: yup.string().required(),
    alamat_peserta: yup.string().required(),
    email_peserta: yup.string().required(),
    no_hp: yup.string().required(),
  }); 
class Password extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nama: '',
            no_kartu: '',
            kelamin: '',
            alamat: '',
            email: '',
            hp: '',
            loading: true
        }

    }

    componentDidMount = () => {
    const datas = JSON.parse(localStorage.getItem('isLogin'))
    const id = datas[0].id_peserta
    API.GetIdPeserta(id).then(res=>{
        //console.log(res)
        setTimeout(() => this.setState({
            id: id,
            nama: res.data[0].nama_peserta,
            no_kartu: res.data[0].no_kartuid,
            kelamin: res.data[0].jns_kelamin,
            alamat: res.data[0].alamat_peserta,
            hp: res.data[0].no_hp,
            email: res.data[0].email_peserta,
            loading: false
          }), 100);
    })
    }            

    render() {
        return (
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/member" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Profil Saya</Breadcrumb.Item>
                </Breadcrumb>

                <Card className="shadow my-2 py-3" body>
                    <Row>
                    <Col md="3" className="border-right">
                    <Nav id="nav" className="flex-column">
                    <NavLink className="nav-link" to={'/profil/'} activeClassName="active">Profil Saya</NavLink>
                    <NavLink className="nav-link" to={'/password/'} activeClassName="active">Ganti Password</NavLink>
                    
                    </Nav>
                    </Col>  
                  
                    <Col md="9">
                      
                        <h3 className="mb-3">Profil</h3> 
                        {this.state.loading ?
                        <>
                        <Skeleton count={5} height={40} className="mb-1" />
                        <Skeleton width={100} height={40} />
                        </>
                        :
                            <Formik
                            initialValues={{ 
                                id: this.state.id,
                                nama_peserta: this.state.nama, 
                                no_kartuid: this.state.no_kartu,
                                jns_kelamin: this.state.kelamin,
                                alamat_peserta: this.state.alamat,
                                email_peserta: this.state.email,
                                no_hp: this.state.hp
                            }}
                            onSubmit={(values, actions) => {
                                //alert(JSON.stringify(values));
                                if (values.konfirmasi_password === values.password) {
                                API.PutPeserta(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        NotificationManager.success('Data berhasil disimpan');
                                        setTimeout(() => {
                                            window.location.reload(); 
                                        }, 1000);
                                    } 
                                    
                                }).catch(err => {
                                    console.log(err.response)
                                    NotificationManager.warning('Tidak ada data yang diubah');

                                })
                            } else {
                                NotificationManager.error('Konfirmasi Password tidak sesuai');
                            }
                                
                                setTimeout(() => {
                                actions.setSubmitting(true);
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
                                <Form.Label>Nama Lengkap</Form.Label>
                                <Form.Control type="text" name="nama_peserta" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nama_peserta} isInvalid={!!errors.nama_peserta && touched.nama_peserta} />
                                {errors.nama_peserta && touched.nama_peserta && <Form.Control.Feedback type="invalid">{errors.nama_peserta}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>No Kartu Identitas</Form.Label>
                                <Form.Control type="text" name="no_kartuid" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_kartuid} isInvalid={!!errors.no_kartuid && touched.no_kartuid} />
                                {errors.no_kartuid && touched.no_kartuid && <Form.Control.Feedback type="invalid">{errors.no_kartuid}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group className="mb-0">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="jns_kelamin" id="radio-1" value="L" label="Laki-laki" onChange={handleChange} feedback={errors.jns_kelamin} isInvalid={!!errors.jns_kelamin && touched.jns_kelamin} checked={values.jns_kelamin === "L" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="jns_kelamin" id="radio-2" value="P" label="Perempuan" onChange={handleChange} feedback={errors.jns_kelamin} isInvalid={!!errors.jns_kelamin && touched.jns_kelamin} checked={values.jns_kelamin === "P" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.jns_kelamin && touched.jns_kelamin && <Form.Control.Feedback type="invalid">{errors.jns_kelamin}</Form.Control.Feedback>}
                            </Row>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as="textarea" rows="3" name="alamat_peserta" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.alamat_peserta} isInvalid={!!errors.alamat_peserta && touched.alamat_peserta} />
                            {errors.alamat_peserta && touched.alamat_peserta && <Form.Control.Feedback type="invalid">{errors.alamat_peserta}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>No HP (Format 62)</Form.Label>
                            <Form.Control type="text" name="no_hp" placeholder="No HP" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_hp} isInvalid={!!errors.no_hp && touched.no_hp} />
                            {errors.no_hp && touched.no_hp && <Form.Control.Feedback type="invalid">{errors.no_hp}</Form.Control.Feedback>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email_peserta" placeholder="Email" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email_peserta} isInvalid={!!errors.email_peserta && touched.email_peserta} />
                            {errors.email_peserta && touched.email_peserta && <Form.Control.Feedback type="invalid">{errors.email_peserta}</Form.Control.Feedback>}
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
                       
                    </Col>
                    </Row> 
                </Card>
                </Container>
            </>
        )
    }
}

export default Password