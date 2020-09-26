import React, { Component } from 'react'
import { render } from 'react-dom'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Skeleton from 'react-loading-skeleton'

const TITLE = 'Konfirmasi Pembayaran - Seminar App'
const validationSchema = yup.object({
    id_peserta: yup.string().required('Id Pendaftaran harus dipilih'),
    id_seminar: yup.string().required('Id Seminar harus dipilih'),
    bank_tujuan: yup.string().required('Bank Tujuan harus dipilih'),
    jml_trf: yup.number().required('Jumlah Transfer harus diisi').typeError("Harus berupa angka"),
    pemilik_rek: yup.string().required('Nama Pemilik Rekening harus diisi'),
    foto: yup.mixed().required()
}); 

class Konfirmasi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Bank: [],
            Seminar: [],
            checked: null,
            id_seminar: '',
            id_peserta: '',
            foto: '',
            file: {
                foto: ''
            },
            fotoPreviewUrl: '',
            loading: true
        }
    }

    handlerImage = (e)=>{
        this.setState({
            foto: e.target.files[0].name,
            file: {
                foto: e.target.files[0]
            },
            fotoPreviewUrl: URL.createObjectURL(e.target.files[0])
        })
    }
 
    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isLogin'))
        const id = datas[0].email_peserta
        API.GetSeminarById(id).then(res=>{
            setTimeout(() => this.setState({
                id_peserta: res.data[0].id_peserta,
                id_seminar: res.data[0].id_seminar,
                loading: false
            }), 100);
        })
        API.GetSeminarById(id).then(res=>{
            setTimeout(() => this.setState({
                Seminar : res.data,
                loading: false
            }), 100);
        })
        API.GetAktifBank().then(res => {
            this.setState({
                Bank: res.data,
                loading: false
            })
        })
        
        

    }

    render() {

        const ListBank = this.state.Bank.map((b, i) => (
            <option value={b.id_bank} key={i}>{b.nm_bank}</option>      
        ))

        const ListSeminar = this.state.Seminar.map((s, i) => (
            <option value={s.id_seminar} key={i}>{s.nm_seminar}</option>      
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
                            initialValues={{ 
                                id_peserta: this.state.id_peserta, 
                                id_seminar: this.state.id_seminar, 
                                bank_tujuan: '', 
                                jml_trf: '', 
                                pemilik_rek: '', 
                                info_tambahan: '', 
                                foto: null }}
                            onSubmit={(values, actions) => {
                                alert(
                                    JSON.stringify(
                                      { 
                                          id_peserta: values.id_peserta,
                                          id_seminar: values.id_seminar,
                                          bank_tujuan: values.bank_tujuan,
                                          jml_trf: values.jml_trf,
                                          pemilik_rek: values.pemilik_rek,
                                          info_tambahan: values.info_tambahan,
                                          foto: values.foto.name
                                      }
                                    )
                                );

                                API.CheckPembayaran(values.id_peserta, values.id_seminar).then(res=>{
                                    console.log(res)
                                    if (res.data.results.length > 0) {
                                        NotificationManager.error('Nomor registrasi dengan judul seminar tersebut sudah melakukan pembayaran');
                                    } else {
                                        API.PostPembayaran(
                                            { 
                                                id_peserta: values.id_peserta,
                                                id_seminar: values.id_seminar,
                                                bank_tujuan: values.bank_tujuan,
                                                jml_trf: values.jml_trf,
                                                pemilik_rek: values.pemilik_rek,
                                                info_tambahan: values.info_tambahan,
                                                foto: values.foto.name
                                            }
                                          ).then(res=>{
                                            //console.log(res)
                                            if (res.status === 1 ) {
                                                this.props.history.push('/member')
                                                NotificationManager.success('Konfirmasi Pembayaran Berhasil');
                                            } else {
                                                NotificationManager.error('Gagal, periksa kembali');
                                            }
                                        })
                                        API.PostFoto(values.foto, values.foto.name).then(res => {
                                            console.log('img_ok')
                                        })
                                        
                                    }
                                     
                                })

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
                                setFieldValue,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form noValidate onSubmit={handleSubmit} className="px-3">
                            <h3 className="text-center">Konfirmasi Pembayaran</h3>

                            <Form.Group>
                                <Form.Label>No. Registrasi</Form.Label>
                                <Form.Control type="text" name="id_peserta" placeholder="Jumlah Transfer" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.id_peserta} readOnly />
                                
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>ID Seminar</Form.Label>
                                <Form.Control type="text" name="id_seminar" placeholder="Jumlah Transfer" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.id_seminar} readOnly />
                                
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

                            <Form.Group>
                            <Form.Label htmlFor="foto">Bukti Bayar</Form.Label>
                            
                            <Form.File className="form-control" name="foto" id="foto" onChange={(event) => {setFieldValue("foto", event.currentTarget.files[0]);}} onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} />
                            {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                            {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
                            </Form.Group>

                            <br/>
    
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