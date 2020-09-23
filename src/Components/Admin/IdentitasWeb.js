import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';

const TITLE = 'Identitas Web - Seminar App'
const validationSchema = yup.object({
    //username: yup.string().required(),
    //password: yup.string().required()
    //.min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    //,
  }); 
class IdentitasWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nm_website: '',
            nama_pt: '',
            alamat_pt: '',
            kode_pos: '',
            tlp_pt: '',
            rekening_pt: '',
            email_pt: '',
            url: '',
            facebook: '',
            twitter: '',
            instagram: '',
            meta_deskripsi: '',
            meta_keyword: ''
        }

    }

    componentDidMount = () => {
    API.GetIdentitasWeb().then(res=>{
        this.setState({
            nm_website: res.data[0].nm_website,
            nama_pt: res.data[0].nama_pt,
            alamat_pt: res.data[0].alamat_pt,
            kode_pos: res.data[0].kode_pos,
            tlp_pt: res.data[0].tlp_pt,
            rekening_pt: res.data[0].rekening_pt,
            email_pt: res.data[0].email_pt,
            url: res.data[0].url,
            facebook: res.data[0].facebook,
            twitter: res.data[0].twitter,
            instagram: res.data[0].instagram,
            meta_deskripsi: res.data[0].meta_deskripsi,
            meta_keyword: res.data[0].meta_keyword
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
                                nm_website: this.state.nm_website, 
                                nama_pt: this.state.nama_pt,
                                alamat_pt: this.state.alamat_pt,
                                kode_pos: this.state.kode_pos,
                                tlp_pt: this.state.tlp_pt,
                                rekening_pt: this.state.rekening_pt,
                                email_pt: this.state.email_pt,
                                url: this.state.url,
                                facebook: this.state.facebook,
                                twitter: this.state.twitter,
                                instagram: this.state.instagram,
                                meta_deskripsi: this.state.meta_deskripsi,
                                meta_keyword: this.state.meta_keyword
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutIdentitasWeb(values).then(res=>{
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
                                <Form.Label>Nama Website</Form.Label>
                                <Form.Control type="text" name="nm_website" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nm_website} isInvalid={!!errors.nm_website && touched.nm_website} />
                                {errors.nm_website && touched.nm_website && <Form.Control.Feedback type="invalid">{errors.nm_website}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nama Institusi/PT</Form.Label>
                                <Form.Control type="text" name="nama_pt" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nama_pt} isInvalid={!!errors.nama_pt && touched.nama_pt} />
                                {errors.nama_pt && touched.nama_pt && <Form.Control.Feedback type="invalid">{errors.nama_pt}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat_pt" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.alamat_pt} isInvalid={!!errors.alamat_pt && touched.alamat_pt} />
                                {errors.alamat_pt && touched.alamat_pt && <Form.Control.Feedback type="invalid">{errors.alamat_pt}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group >
                            <Form.Row>
                                <Col>
                                <Form.Label>Kode Pos</Form.Label>
                                <Form.Control type="text" name="kode_pos" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.kode_pos} isInvalid={!!errors.kode_pos && touched.kode_pos} />
                                {errors.kode_pos && touched.kode_pos && <Form.Control.Feedback type="invalid">{errors.kode_pos}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control type="text" name="tlp_pt" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.tlp_pt} isInvalid={!!errors.tlp_pt && touched.tlp_pt} />
                                {errors.tlp_pt && touched.tlp_pt && <Form.Control.Feedback type="invalid">{errors.tlp_pt}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>Rekening</Form.Label>
                                <Form.Control type="text" name="rekening_pt" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.rekening_pt} isInvalid={!!errors.rekening_pt && touched.rekening_pt} />
                                {errors.rekening_pt && touched.rekening_pt && <Form.Control.Feedback type="invalid">{errors.rekening_pt}</Form.Control.Feedback>}
                                </Col>
                            </Form.Row>
                            </Form.Group>

                            <Form.Group >
                            <Form.Row>
                                <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email_pt" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email_pt} isInvalid={!!errors.email_pt && touched.email_pt} />
                                {errors.email_pt && touched.email_pt && <Form.Control.Feedback type="invalid">{errors.email_pt}</Form.Control.Feedback>}
                                </Col>
                                <Col>
                                <Form.Label>URL</Form.Label>
                                <Form.Control type="text" name="url" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.url} isInvalid={!!errors.url && touched.url} />
                                {errors.url && touched.url && <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>}
                                </Col>
                                
                            </Form.Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control type="text" name="facebook" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.facebook} isInvalid={!!errors.facebook && touched.facebook} />
                                {errors.facebook && touched.facebook && <Form.Control.Feedback type="invalid">{errors.facebook}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Twitter</Form.Label>
                                <Form.Control type="text" name="twitter" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.twitter} isInvalid={!!errors.twitter && touched.twitter} />
                                {errors.twitter && touched.twitter && <Form.Control.Feedback type="invalid">{errors.twitter}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control type="text" name="instagram" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.instagram} isInvalid={!!errors.instagram && touched.instagram} />
                                {errors.instagram && touched.instagram && <Form.Control.Feedback type="invalid">{errors.instagram}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Meta Deskripsi</Form.Label>
                                <Form.Control type="text" name="meta_deskripsi" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.meta_deskripsi} isInvalid={!!errors.meta_deskripsi && touched.meta_deskripsi} />
                                {errors.meta_deskripsi && touched.meta_deskripsi && <Form.Control.Feedback type="invalid">{errors.meta_deskripsi}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Meta Keyword</Form.Label>
                                <Form.Control type="text" name="meta_keyword" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.meta_keyword} isInvalid={!!errors.meta_keyword && touched.meta_keyword} />
                                {errors.meta_keyword && touched.meta_keyword && <Form.Control.Feedback type="invalid">{errors.meta_keyword}</Form.Control.Feedback>}
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

export default IdentitasWeb