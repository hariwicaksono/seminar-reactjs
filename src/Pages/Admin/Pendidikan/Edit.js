import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import { seo } from '../../../Components/Layout'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
//import moment from 'moment'
//import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'


var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const validationSchema = yup.object({
    pendidikan: yup.string().required(),
    aktif_pendidikan: yup.string().required(),
  }); 
class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            nama: '',
            mduser: '',
            aktif: '',
            url: UploadUrl(),
            loading: true
        }
    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const usernm = datas[0].usernm
        const id = this.props.match.params.id
        this.setState({
            id : id
        }) 
        API.GetIdPendidikan(id).then(res=>{
            setTimeout(() => this.setState({
                nama: res.data[0].pendidikan,
                mduser: usernm,
                aktif: res.data[0].aktif_pendidikan,
                loading: false
            }), 100);
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
           <Helmet>
           <title data-react-helmet="true">Edit Pendidikan - { seo.title }</title>
            <meta data-react-helmet="true" name="description" content={seo.description} />
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/pendidikan" }}>Master Pendidikan</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Edit Pendidikan</h5>
                            <Formik
                            initialValues={{ 
                                id_pendidikan: this.state.id, 
                                pendidikan: this.state.nama,
                                aktif_pendidikan: this.state.aktif,
                                md_username_pendidikan: this.state.mduser,
                               
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutPendidikan(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        this.props.history.push('/pendidikan')
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
                                <Form.Label>Nama Pendidikan</Form.Label>
                                <Form.Control name="pendidikan" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.pendidikan} isInvalid={!!errors.pendidikan && touched.pendidikan} />
                                {errors.pendidikan && touched.pendidikan && <Form.Control.Feedback type="invalid">{errors.pendidikan}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Aktifkan Pendidikan</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="aktif_pendidikan" id="radio-1" value="Y" label="Ya" onChange={handleChange} feedback={errors.aktif_pendidikan} isInvalid={!!errors.aktif_pendidikan && touched.aktif_pendidikan} checked={values.aktif_pendidikan === "Y" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="aktif_pendidikan" id="radio-2" value="N" label="Tidak" onChange={handleChange} feedback={errors.aktif_pendidikan} isInvalid={!!errors.aktif_pendidikan && touched.aktif_pendidikan} checked={values.aktif_pendidikan === "N" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.aktif_pendidikan && touched.aktif_pendidikan && <Form.Control.Feedback type="invalid">{errors.aktif_pendidikan}</Form.Control.Feedback>}
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
                       
                        </>
                }
                    
                   
                </Container>
            </>
        )
    }
}

export default Edit