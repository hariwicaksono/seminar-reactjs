import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

const TITLE = 'Konfirmasi Pembayaran - Seminar App'
const validationSchema = yup.object({
    id_peserta: yup.string().required('Id Pendaftaran harus dipilih'),
    id_seminar: yup.string().required('Id Seminar harus dipilih'),
    bank_tujuan: yup.string().required('Bank Tujuan harus dipilih'),
    jml_trf: yup.number().required('Jumlah Transfer harus diisi').typeError("Harus berupa angka"),
    pemilik_rek: yup.string().required('Nama Pemilik Rekening harus diisi')
  }); 
  class Konfirmasi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Bank: [],
            id_seminar: '',
            id_peserta: '',
        }

    }

    componentDidMount = () => {
        const datas = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = datas[0].email_peserta
        API.GetPembayaranById(id).then(res=>{
            setTimeout(() => this.setState({
                id_peserta: res.data[0].id_peserta,
                id_seminar: res.data[0].id_seminar,
                loading: false
            }), 100);
        }).catch(err => {
            console.log(err)
        })
        API.GetBank().then(res => {
            this.setState({
                Bank: res.data,
                loading: false
            })
        })

    }

    render() {

        const ListBank = this.state.Bank.map((s, i) => (
            <option value={s.id_bank} key={i}>{s.nm_bank}</option>      
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
                        <Breadcrumb.Item active>Konfirmasi Pembayaran</Breadcrumb.Item>
                        </Breadcrumb>

                        <Card>
                            <Card.Body>
                               
                            <Formik
                            initialValues={{ id_peserta: '', id_seminar: '', bank_tujuan: '', jml_trf: '', pemilik_rek: '', info_tambahan: '' }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                //API.PostPeserta(values).then(res=>{
                                    //console.log(res)
                                    //if (res.status === 1 ) {
                                        //this.props.history.push('/login')
                                        //NotificationManager.success('Pendaftaran Berhasil, silahkan periksa email untuk mengaktifkan Akun');
                                    //} else {
                                        //NotificationManager.error('Gagal, periksa kembali');
                                    //}
                                //})
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 100);
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
                        <Form noValidate onSubmit={handleSubmit} className="px-3">
                            <h3 className="text-center">Konfirmasi Pembayaran</h3>
                            <Form.Group>
                                <Form.Label>Data Pendaftaran</Form.Label>
                            <Form.Check type="radio" name="id_peserta" id="id_peserta" value={this.state.id_peserta} label={this.state.id_peserta} onChange={handleChange} feedback={errors.id_peserta} isInvalid={!!errors.id_peserta && touched.id_peserta} required />
                            {errors.id_peserta && touched.id_peserta && <Form.Control.Feedback type="invalid">{errors.id_peserta}</Form.Control.Feedback>}

                            <Form.Check type="radio" name="id_seminar" id="id_seminar" value={this.state.id_seminar} label={this.state.id_seminar} onChange={handleChange} feedback={errors.id_seminar} isInvalid={!!errors.id_seminar && touched.id_seminar} required />
                            {errors.id_seminar && touched.id_seminar && <Form.Control.Feedback type="invalid">{errors.id_seminar}</Form.Control.Feedback>}
                            </Form.Group>
                        <Form.Group>
                            <Form.Label>Pilih Bank</Form.Label>
                            <Form.Control as="select" name="bank_tujuan" onChange={handleChange} onBlur={handleBlur} value={values.bank_tujuan} isInvalid={!!errors.bank_tujuan && touched.bank_tujuan}>
                            <option value="">Pilih Bank</option>
                            {ListBank}
                            </Form.Control>
                            {errors.bank_tujuan && touched.bank_tujuan && <Form.Control.Feedback type="invalid">{errors.bank_tujuan}</Form.Control.Feedback>}
                        </Form.Group>


                            <Form.Group>
                                <Form.Label>Jumlah Transfer</Form.Label>
                                <Form.Control type="text" name="jml_trf" placeholder="Jumlah Transfer" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.jml_trf} isInvalid={!!errors.jml_trf && touched.jml_trf} />
                                {errors.jml_trf && touched.jml_trf && <Form.Control.Feedback type="invalid">{errors.jml_trf}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Nama Pemilik Rekening</Form.Label>
                                <Form.Control type="text" name="pemilik_rek" placeholder="Nama Pemilik Rekening" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.pemilik_rek && touched.pemilik_rek} />
                                {errors.pemilik_rek && touched.pemilik_rek && <Form.Control.Feedback type="invalid">{errors.pemilik_rek}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Informasi Tambahan</Form.Label>
                                <Form.Control as="textarea" rows="3" name="info_tambahan" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.info_tambahan && touched.info_tambahan} />
                                {errors.info_tambahan && touched.info_tambahan && <Form.Control.Feedback type="invalid">{errors.info_tambahan}</Form.Control.Feedback>}
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

export default Konfirmasi