import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../../Configs/Axios'
import {UploadUrl} from '../../../Configs/Url'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
//import moment from 'moment'
//import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'

const TITLE = ' - Seminar App'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
const validationSchema = yup.object({
    //username: yup.string().required(),
    //password: yup.string().required()
    //.min(8, "Password is too short - should be 8 chars minimum.")
    //.matches(/(?=.*[0-9])/, "Password must contain a number.")
    //,
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
        API.GetIdKartuIdentitas(id).then(res=>{
            setTimeout(() => this.setState({
                nama: res.data[0].jns_kartuid,
                mduser: usernm,
                aktif: res.data[0].aktif_kartuid,
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
        <title> {'Edit'} {this.state.nama} { TITLE }</title>
            </Helmet>
                <Container fluid>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                      
                        <Breadcrumb className="card px-3 mb-2">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/kartuidentitas" }}>Master Kartu Identitas</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="shadow mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Edit Kartu Identitas</h5>
                            <Formik
                            initialValues={{ 
                                id_kartu: this.state.id, 
                                jns_kartuid: this.state.nama,
                                aktif_kartuid: this.state.aktif,
                                md_username_kartuid: this.state.mduser,
                               
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                API.PutKartuIdentitas(values).then(res=>{
                                    //console.log(res)
                                    if (res.status === 1 ) {
                                        this.props.history.push('/kartuidentitas')
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
                                <Form.Label>Nama Kartu Identitas</Form.Label>
                                <Form.Control name="jns_kartuid" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.jns_kartuid} isInvalid={!!errors.jns_kartuid && touched.jns_kartuid} />
                                {errors.jns_kartuid && touched.jns_kartuid && <Form.Control.Feedback type="invalid">{errors.jns_kartuid}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Aktifkan Kartu Identitas</Form.Label>
                                <Row>
                            <Col>
                            <Form.Check type="radio" name="aktif_kartuid" id="radio-1" value="Y" label="Ya" onChange={handleChange} feedback={errors.aktif_kartuid} isInvalid={!!errors.aktif_kartuid && touched.aktif_kartuid} checked={values.aktif_kartuid === "Y" ? "checked" : ""} required />
                           
                            </Col>
                            <Col>
                            <Form.Check type="radio" name="aktif_kartuid" id="radio-2" value="N" label="Tidak" onChange={handleChange} feedback={errors.aktif_kartuid} isInvalid={!!errors.aktif_kartuid && touched.aktif_kartuid} checked={values.aktif_kartuid === "N" ? "checked" : ""} required /> 
                            
                            </Col>
                            {errors.aktif_kartuid && touched.aktif_kartuid && <Form.Control.Feedback type="invalid">{errors.aktif_kartuid}</Form.Control.Feedback>}
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