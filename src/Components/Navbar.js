import React,{Component} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Container, Form,Button, Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import { BoxArrowInRight } from 'react-bootstrap-icons'
import API from '../Configs/Axios'
import {ImagesUrl} from '../Configs/Url'
import { logout, isLogin } from '../Utils'
import SearchForm from './SearchForm'

class MyNavbar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            login:false,
            id: '',
            nama: '',
            foto:'',
            url: ImagesUrl()
        }
      }
        Logout = () => {
            logout();
        }
        componentDidMount = () => {
        if (isLogin()) {
           //console.log('LOGIN')
           const data = JSON.parse(sessionStorage.getItem('isLogin'))
                const id = data[0].id_peserta
                API.GetIdPeserta(id).then(res=>{
                    this.setState({
                        id : res.id_peserta,
                        nama: res.nama_peserta
                    })
                })
                
        } else {
            this.setState({
                login:true
            })
        }
        }
    render(){
        return(
     
        <Navbar className="shadow-sm border-bottom mb-3" expand="lg" sticky="top" style={{backgroundColor: '#fff'}}>
      <Container>
        <Navbar.Brand as={Link} to='/'> 
            Seminar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav>  
            {this.state.login ?
               <>
               </>
               :
               <>
            <NavDropdown title="Untuk Member" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/konfirmasi'>Konfirmasi Bayar</NavDropdown.Item>
            </NavDropdown>
               </>
            } 
            <NavDropdown title="Tentang" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/caradaftar'>Cara Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/tentang'>Tentang</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/kontak'>Kontak</NavDropdown.Item>
            </NavDropdown>

            </Nav>    

            <SearchForm/>

            <Nav>
            
            {this.state.login ?
            <>
            <Form inline className="my-2 my-lg-0 pl-1">
            <Button as={NavLink} variant="info" to='/login' activeClassName="active">Masuk/Daftar</Button>
            </Form>
            </>
           :
           <>
           <NavItem>
           <NavDropdown title=
           {this.state.foto ? (
            <>
            <img
                alt="Foto"
                width="30"
                className="rounded-circle"
                src={this.state.url+this.state.foto} />
            </>
                ) : (
            <>
            <img
                alt="Foto"
                width="30"
                className="rounded-circle"
                src={this.state.url+'no-avatar.png'} />
            </>
            )} id="basic-nav-dropdown" alignRight>
            <NavDropdown.Item onClick={this.Logout} href=''><BoxArrowInRight/> Keluar</NavDropdown.Item>
            </NavDropdown>
            </NavItem>
            </>
            }
            </Nav>

        </Navbar.Collapse>
        </Container>
        </Navbar>
       
        )
    }
}

export default MyNavbar