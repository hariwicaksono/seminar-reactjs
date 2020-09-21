import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

const TITLE = 'Register - Seminar App'
const validationSchema = yup.object({
    id_seminar: yup.string().required('Seminar harus dipilih'),
    jns_id: yup.string().required('Jenis Kartu Identitas harus dipilih'),
    no_id: yup.string().required('Nomor Identitas harus diisi'),
    nm_peserta: yup.string().required('Nama Lengkap harus diisi'),
    kelamin: yup.string().required('Jenis Kelamin harus dipilih'),
    pendidikan: yup.string().required('Pendidikan terakhir harus dipilih'),
    usia: yup.string().required('Range usia harus dipilih'),
    alamat: yup.string().required('Alamat lengkap harus diisi'),
    kota_kab: yup.string().required('Kabupaten atau Kota harus dipilih'),
    kodepos: yup.number().required('Kode Pos harus diisi').typeError("Harus berupa angka"),
    no_hp: yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
    email: yup.string().email('Harus berupa email yang valid').required('Alamat email harus diisi'),
  }); 
  class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AktifSeminar: [],
            KartuIdentitas:[],
            Pendidikan:[],
            Kabupaten:[],
            loading: true
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

        const ListSeminar = this.state.AktifSeminar.map((s, i) => (
            <option value={s.id_seminar} key={i}>{s.nm_seminar}</option>      
        ))

        const ListKartu = this.state.KartuIdentitas.map((s, i) => (
            <option value={s.id_kartu} key={i}>{s.jns_kartuid}</option>      
        ))

        const ListPendidikan = this.state.Pendidikan.map((s, i) => (
            <option value={s.id_pendidikan} key={i}>{s.pendidikan}</option>      
        ))

        const ListKabupaten = this.state.Kabupaten.map((s, i) => (
            <option value={s.id} key={i}>{s.name}</option>      
        ))

        return (
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    <Row>
                  
                    <Col>
                    <ul className="nav nav-tabs nav-fill bg-white" style={{fontSize: '1.125rem', fontWeight: '500'}}>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/login'>Masuk</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link active" to='/register'>Daftar</NavLink>
                    </li>

                    </ul>
                        <Card className="shadow" body>
                               
                            <Formik
                            initialValues={{ id_seminar: '', jns_id: '', no_id: '', nm_peserta: '', kelamin: '', pendidikan: '', usia: '', alamat: '', kota_kab: '', kodepos: '', no_hp: '', email: '' }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                API.CheckPeserta(values.no_id, values.nm_peserta).then(res=>{
                                    console.log(res)
                                    if (res.data.results.length > 0) {
                                        NotificationManager.error('Nama peserta atau no kartu identitas sudah terdaftar');
                                        
                        
                                    } else {
                                        API.PostPeserta(values).then(res=>{
                                            //console.log(res)
                                            if (res.status === 1 ) {
                                                this.props.history.push('/login')
                                                NotificationManager.success('Pendaftaran Berhasil, silahkan periksa email untuk mengaktifkan Akun');
                                            } 
                                        })
                                        
                                    }
                                     
                                })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 100);
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
                        <Form noValidate onSubmit={handleSubmit} className="px-3">
                            <h3 className="text-center" style={{fontWeight: '500'}}>Register</h3>
                        <Form.Group>
                            <Form.Label>Pilih Seminar</Form.Label>
                            <Form.Control as="select" name="id_seminar" onChange={handleChange} onBlur={handleBlur} value={values.id_seminar} isInvalid={!!errors.id_seminar && touched.id_seminar}>
                            <option value="">Pilih Seminar</option>
                            {ListSeminar}
                            </Form.Control>
                            {errors.id_seminar && touched.id_seminar && <Form.Control.Feedback type="invalid">{errors.id_seminar}</Form.Control.Feedback>}
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
                            <Form.Label>Kabupaten/Kota</Form.Label>
                            <Form.Control as="select" name="kota_kab" onChange={handleChange} onBlur={handleBlur} value={values.kota_kab} isInvalid={!!errors.kota_kab && touched.kota_kab}>
                            <option value="">Pilih Kabupaten/Kota</option>
                            {ListKabupaten}
                            </Form.Control>
                            {errors.kota_kab && touched.kota_kab && <Form.Control.Feedback type="invalid">{errors.kota_kab}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kode Pos</Form.Label>
                                <Form.Control type="text" name="kodepos" placeholder="Kode Pos" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.kodepos} isInvalid={!!errors.kodepos && touched.kodepos} />
                                {errors.kodepos && touched.kodepos && <Form.Control.Feedback type="invalid">{errors.kodepos}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>No HP (Format 62)</Form.Label>
                                <Form.Control type="text" name="no_hp" placeholder="No HP" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_hp} isInvalid={!!errors.no_hp && touched.no_hp} />
                                {errors.no_hp && touched.no_hp && <Form.Control.Feedback type="invalid">{errors.no_hp}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" placeholder="Email" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!errors.email && touched.email} />
                                {errors.email && touched.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
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
                               
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Register