import React,{Component} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Container, Form,Button, Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import API from '../Configs/Axios'
import {ImagesUrl} from '../Configs/Url'
import { logout, isLogin } from '../Utils'

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
        //sessionStorage.setItem('isLogin','');
        //sessionStorage.clear();
        //this.setState({
            //login:true
        //})
        
        //NotificationManager.success('Berhasil keluar sistem');
        
        }
        componentDidMount = () => {
        if (isLogin()) {
           console.log('LOGIN')
           const data = JSON.parse(sessionStorage.getItem('isLogin'))
                const id = data[0].id_user
                API.GetUserId(id).then(res=>{
                    this.setState({
                        id : res.id_user,
                        nama: res.nama_user, 
                        foto: res.photo_user,
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
               </>
            }    

            <NavDropdown title="Kategori" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to='/page/31'>Alur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
             
             <NavDropdown.Item as={Link} to='/page/30'>Beasiswa - Beasiswa</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
            </NavDropdown>

           </Nav>    


            <ul className="navbar-nav">
            
            {this.state.login ?
            <>
            <Form inline className="my-2 my-lg-0 pl-1">
            <Button as={NavLink} variant="success" to='/login' activeClassName="active">Masuk/Daftar</Button>
            </Form>
            </>
           :
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
            <NavDropdown.Item as={Link} to={'/akunU'}>Akun</NavDropdown.Item>
            <NavDropdown.Item onClick={this.Logout} href=''>Keluar</NavDropdown.Item>
            </NavDropdown>
            </NavItem>
            }
            </ul>

        </Navbar.Collapse>
        </Container>
        </Navbar>
       
        )
    }
}

export default MyNavbar