import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
import moment from 'moment'
import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const TITLE = ' - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const validationSchema = yup.object({
    nm_seminar: yup.string().required(),
    tgl_seminar: yup.string().required(),
    jam_seminar: yup.string().required(),
    biaya_seminar: yup.number().required().typeError("Harus berupa angka"),
    lokasi_seminar: yup.string().required(),
    headline_seminar: yup.string().required(),
    deskripsi_seminar: yup.string().required(),
  }); 
  function validateDTPicker(value) {
    let error;
    if (!value) {
      error = 'Required';
    } 
    return error;
  }
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
        <title> Tambah Seminar { TITLE }</title>
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/seminar" }}>Daftar Seminar</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Tambah Seminar</h5>
                            <Formik
                            initialValues={{ 
                                id_seminar: '', 
                                nm_seminar: '',
                                tgl_seminar: '',
                                jam_seminar: '',
                                biaya_seminar: '',
                                lokasi_seminar: '',
                                headline_seminar: '',
                                deskripsi_seminar: '',
                                id_sertifikat: '',
                                cr_username_seminar: this.state.cruser,
                               
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PostSeminar(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        this.props.history.push('/seminar')
                                       NotificationManager.success('Data berhasil disimpan');
                                    } 
                                    
                                }).catch(err => {
                                   // console.log(err.response)
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
                                setFieldValue,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                             
                            <Form.Group>
                                <Form.Label>Nama Seminar</Form.Label>
                                <Form.Control name="nm_seminar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nm_seminar} isInvalid={!!errors.nm_seminar && touched.nm_seminar} />
                                {errors.nm_seminar && touched.nm_seminar && <Form.Control.Feedback type="invalid">{errors.nm_seminar}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                           
                            <Form.Row>
                            <Col>
                                <Form.Label>Tanggal Seminar</Form.Label>
                                <DatePicker 
                                autoComplete="off"
                      selected={values.tgl_seminar}
                      value={values.tgl_seminar}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      name="tgl_seminar"
                      onChange={date => setFieldValue('tgl_seminar', date)}
                      validate={validateDTPicker}
                      onBlur={handleBlur}
                      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
                    />
                                
                                {errors.tgl_seminar && touched.tgl_seminar && <span className="error">{errors.tgl_seminar}</span>}
                            </Col>
                            <Col>
                            <Form.Label>Jam Seminar</Form.Label>
                            <DatePicker
                            autoComplete="off"
                                selected={values.jam_seminar}
                                name="jam_seminar"
                                className="form-control"
                                onChange={date => setFieldValue('jam_seminar', date)}
                                onBlur={handleBlur}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="hh:mm:ss"
                                />
                                {errors.jam_seminar && touched.jam_seminar && <span className="error">{errors.jam_seminar}</span>}
                            </Col>
                            <Col>
                            <Form.Label>Lokasi Seminar</Form.Label>
                                <Form.Control name="lokasi_seminar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.lokasi_seminar} isInvalid={!!errors.lokasi_seminar && touched.lokasi_seminar} />
                                {errors.lokasi_seminar && touched.lokasi_seminar && <Form.Control.Feedback type="invalid">{errors.lokasi_seminar}</Form.Control.Feedback>}
                            </Col>
                            <Col>
                            <Form.Label>Biaya Seminar Rp.</Form.Label>
                                <Form.Control name="biaya_seminar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.biaya_seminar} isInvalid={!!errors.biaya_seminar && touched.biaya_seminar} />
                                {errors.biaya_seminar && touched.biaya_seminar && <Form.Control.Feedback type="invalid">{errors.biaya_seminar}</Form.Control.Feedback>}
                            </Col>
                            </Form.Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Headline Seminar</Form.Label>
                                <Form.Control as="textarea" rows="3" name="headline_seminar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.headline_seminar} isInvalid={!!errors.headline_seminar && touched.headline_seminar} />
                                {errors.headline_seminar && touched.headline_seminar && <Form.Control.Feedback type="invalid">{errors.headline_seminar}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Deskripsi Seminar</Form.Label>
                                <Form.Control as="textarea" rows="3" name="deskripsi_seminar" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.deskripsi_seminar} isInvalid={!!errors.deskripsi_seminar && touched.deskripsi_seminar} />
                                {errors.deskripsi_seminar && touched.deskripsi_seminar && <Form.Control.Feedback type="invalid">{errors.deskripsi_seminar}</Form.Control.Feedback>}
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