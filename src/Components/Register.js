import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'
import {Container, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap'
import { Formik, Field } from 'formik'
import FormSelect from './RegisterSelect';
import * as yup from 'yup'

const TITLE = 'Register - Seminar App'

const Step1Schema = yup.object().shape({
    id_seminar: yup.string().required('Seminar harus dipilih'),
    jns_id: yup.string().required('Jenis Kartu Identitas harus dipilih'),
    no_id: yup.string().required('Nomor Identitas harus diisi'),
    nm_peserta: yup.string().required('Nama Lengkap harus diisi'),
    pendidikan: yup.string().required('Pendidikan terakhir harus dipilih'),
});
const Step2Schema = yup.object().shape({
    kelamin: yup.string().required('Jenis Kelamin harus dipilih'),
    usia: yup.string().required('Range usia harus dipilih'),
    alamat: yup.string().required('Alamat lengkap harus diisi'),
    kota_kab: yup.string().required('Kabupaten atau Kota harus dipilih'),
    kodepos: yup.number().required('Kode Pos harus diisi').typeError("Harus berupa angka"),
});
const Step3Schema = yup.object().shape({
    no_hp: yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
    email: yup.string().email('Harus berupa email yang valid').required('Alamat email harus diisi').test({
        message: () => 'Email sudah digunakan',
        test: async (value) => {
          try {
              const res = await API.CheckEmail(value)
              const result = await res.data.results;
              return !result
              } catch (error) {
              console.log(error.response); 
              return error.response;
              }
        },
      }),
    password: yup.string().required('Password harus diisi'),
});
const initialValues = { 
    id_seminar: '', 
    jns_id: '', 
    no_id: '', 
    nm_peserta: '', 
    kelamin: '', 
    pendidikan: '', 
    usia: '', 
    alamat: '', 
    kota_kab: '', 
    kodepos: '', 
    no_hp: '', 
    email: '',
    password: '' 
};

const schemaArray = [Step1Schema, Step2Schema, Step3Schema];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class Wizard extends Component {
    static Page = ({ children, parentState }) => {
        return children(parentState);
      };
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            values: props.initialValues,
            loading: true
        }

    }
    next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

    previous = () =>
        this.setState(state => ({
        page: Math.max(state.page - 1, 0),
    }));

    handleSubmit = (values, bag) => {
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage) {
          return onSubmit(values, bag);
        } else {
          bag.setTouched({});
          bag.setSubmitting(false);
          this.next(values);
        }
    };
    
    arrayProgress = [
        {
            id: "1",
            title: "Seminar",
        },
        {
            id: "2",
            title: "Biodata",
        },
        {
            id: "3",
            title: "Akun",
        }
    ];

    render() {
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const totalSteps = React.Children.count(children);
        const isLastPage = page === React.Children.count(children) - 1;

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
                        initialValues={values}
                        enableReinitialize={false}
                        validationSchema={schemaArray[page]}
                        onSubmit={this.handleSubmit}
                        >
                        {props => {
                        const { handleSubmit, isSubmitting } = props;
                        return (
                            <Form onSubmit={handleSubmit}>
                            <Container>
                            <div className="progressbar-wrapper mb-2">
                            <ul className="progressbar">
                                {this.arrayProgress.map((item, index) => {
                                    return (
                                    <li className={page >= index ? "active" : ""} key={index+1}>
                                        <span className="d-none d-xs-none d-sm-block d-md-block">{item.title}</span>
                                    </li>
                                    );
                                })}
                                </ul>
                            </div>
                        

                            <div>
                            <h6 className="text-primary mb-1">
                                <small>LANGKAH {page + 1} DARI {totalSteps}</small>
                            </h6>
                            </div>

                            {React.cloneElement(activePage, { parentState: { ...props } })}

                            <Row>
                                <Col>
                                    {page > 0 &&
                                    <Button
                                        variant="primary"
                                        onClick={this.previous}
                                        className="mr-2"
                                    >
                                    « Kembali
                                    </Button>}

                                    {!isLastPage && <Button variant="primary" className="float-right" type="submit">Selanjutnya »</Button>}
                                    {isLastPage &&
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                                    <>
                                    <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    /> Submitting...
                                    </>
                                    ) : ( <>Submit</> )}</Button>}
                                </Col>
                            </Row>
                            </Container>

                            </Form>
                            );
                            }}
                        </Formik>
                               
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

class Seminar extends Component {
    constructor(props){
      super(props)
      this.state = {
        AktifSeminar: [],
      }
    }
   
    componentDidMount(){
        API.GetAktifSeminar().then(res => {
            this.setState({
                AktifSeminar: res.data,
                loading: false
            })
        })
     }
  
    render() {
        const ListSeminar = this.state.AktifSeminar.map((s, i) => (
            <option value={s.id_seminar} key={i}>{s.nm_seminar}</option>      
        ))
      return <>
        <Field name="id_seminar" label="Pilih Seminar" component={FormSelect}>
        <option value="">Pilih Seminar</option>
        {ListSeminar}
        </Field>
      </>;
    }
}

class KartuIdentitas extends Component {
    constructor(props){
      super(props)
      this.state = {
        KartuIdentitas:[]
      }
    }
   
     componentDidMount(){
        API.GetAktifKartuId().then(res => {
            this.setState({
                KartuIdentitas: res.data,
                loading: false
            })
        }) 
     }
  
    render() {
        const ListKartu = this.state.KartuIdentitas.map((s, i) => (
            <option value={s.id_kartu} key={i}>{s.jns_kartuid}</option>      
        ))
      return <>    
        <Field name="jns_id" label="Pilih Identitas" component={FormSelect}>
        <option value="">Pilih Identitas</option>
        {ListKartu}
        </Field>
      </>;
    }
}

class Pendidikan extends Component {
    constructor(props){
      super(props)
      this.state = {
        Pendidikan:[]
      }
    }
   
     componentDidMount(){
        API.GetAktifPendidikan().then(res => {
            this.setState({
                Pendidikan: res.data,
                loading: false
            })
        })
        
     }
  
    render() {
        const ListPendidikan = this.state.Pendidikan.map((s, i) => (
            <option value={s.id_pendidikan} key={i}>{s.pendidikan}</option>      
        ))
      return <>
        <Field name="pendidikan" label="Pendidikan Terakhir" component={FormSelect}>
        <option value="">Pilih Pendidikan</option>
        {ListPendidikan}
        </Field>
      </>;
    }
  }

class Kabupaten extends Component {
    constructor(props){
      super(props)
      this.state = {
        Kabupaten:[],
      }
    }
   
     componentDidMount(){
        API.GetKabupaten().then(res => {
            this.setState({
                Kabupaten: res.data,
                loading: false
            })
        })
     }
  
    render() {
        const ListKabupaten = this.state.Kabupaten.map((s, i) => (
            <option value={s.id} key={i}>{s.name}</option>      
        ))
       
      return <>
        <Field name="kota_kab" label="Kabupaten/Kota" component={FormSelect}>
        <option value="">Pilih Kabupaten/Kota</option>
        {ListKabupaten}
        </Field>
      </>;
    }
}

export const App = () => {
    return (
      <>
      
        <Wizard
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            sleep(100).then(() => {
              window.alert(JSON.stringify(values, null, 2));
              API.CheckPeserta(values.no_id, values.nm_peserta).then(res=>{
                //console.log(res)
                if (res.data.results.length > 0) {
                    NotificationManager.error('Nama peserta atau no kartu identitas sudah terdaftar');
                } else {
                    API.PostPeserta(values).then(res=>{
                        //console.log(res)
                        if (res.status === 1 ) {
                            window.location.href = '/login';
                            NotificationManager.success('Pendaftaran Berhasil, silahkan periksa email untuk mengaktifkan Akun');
                        } 
                    })  
                }
                 
            })
              actions.setSubmitting(true);
            });
          }}
        >
  
    <Wizard.Page>
    {props => {
        const {
            handleChange,
            handleBlur,
            values,
            touched,
            errors
        } = props;

        return (
        <Fragment>
        <h3 className="mb-0">Data Seminar</h3>
        <h5 className="d-none d-xs-none d-sm-none d-md-block">Informasi Data Seminar</h5>
        <div className="mt-2">
        
            <Seminar/>

            <KartuIdentitas/>

            <Form.Group>
                <Form.Label>Nomor Identitas</Form.Label>
                <Form.Control type="text" name="no_id" placeholder="Nomor Identitas" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.no_id} isInvalid={!!errors.no_id && touched.no_id} />
                {errors.no_id && touched.no_id && <Form.Control.Feedback type="invalid">{errors.no_id}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control type="text" name="nm_peserta" placeholder="Nama Lengkap" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.nm_peserta} isInvalid={!!errors.nm_peserta && touched.nm_peserta} />
                {errors.nm_peserta && touched.nm_peserta && <Form.Control.Feedback type="invalid">{errors.nm_peserta}</Form.Control.Feedback>}
            </Form.Group>

            <Pendidikan/>

            </div>
        </Fragment>
    
        );
    }}
    </Wizard.Page>
  
    <Wizard.Page>
    {props => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = props;
        return (
        <Fragment>
        <h3 className="mb-0">Data Diri &amp; Alamat</h3>
        <h5 className="d-none d-xs-none d-sm-none d-md-block">Informasi Data Diri &amp; Alamat</h5>
        <div className="mt-2">
        <Form.Group className="mb-0">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Row>
        <Col>
        <Form.Check type="radio" name="kelamin" id="radio-1" value="L" checked={values.kelamin === "L"} label="Laki-laki" onChange={handleChange} isInvalid={!!errors.kelamin && touched.kelamin}  />

        </Col>
        <Col>
        <Form.Check type="radio" name="kelamin" id="radio-2" value="P" checked={values.kelamin === "P"} label="Perempuan" onChange={handleChange} isInvalid={!!errors.kelamin && touched.kelamin}  /> 

        </Col>
        {errors.kelamin && touched.kelamin && <Form.Control.Feedback type="invalid">{errors.kelamin}</Form.Control.Feedback>}
        </Row>
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
        <Form.Control as="textarea" rows="3" name="alamat" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.alamat} isInvalid={!!errors.alamat && touched.alamat} />
        {errors.alamat && touched.alamat && <Form.Control.Feedback type="invalid">{errors.alamat}</Form.Control.Feedback>}
        </Form.Group>

        <Kabupaten/>

        <Form.Group>
            <Form.Label>Kode Pos</Form.Label>
            <Form.Control type="text" name="kodepos" placeholder="Kode Pos" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.kodepos} isInvalid={!!errors.kodepos && touched.kodepos} />
            {errors.kodepos && touched.kodepos && <Form.Control.Feedback type="invalid">{errors.kodepos}</Form.Control.Feedback>}
        </Form.Group>
        </div>
        </Fragment>
        );
        }}
        </Wizard.Page>

    <Wizard.Page>
    {props => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
    } = props;
        return (
        <Fragment>
        <h3 className="mb-0">Data Akun</h3>
        <h5 className="d-none d-xs-none d-sm-none d-md-block">Buat Username dan Password Anda</h5>
        <div className="mt-2">
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

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.password} isInvalid={!!errors.password && touched.password} />
                {errors.password && touched.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
            </Form.Group>
            </div>
        </Fragment>
        );
    }}
    </Wizard.Page>
    
  
        </Wizard>
      </>
    );
  };
  
  export default App