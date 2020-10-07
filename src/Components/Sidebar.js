import React, {Component, useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { logout, isLogin } from '../Utils'
import { Collapse} from 'react-bootstrap'
import { HouseDoor, Files, BoxArrowRight, People, FileEarmarkText, Gear, Lightning, Box } from 'react-bootstrap-icons'

function SubMenu() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return (
        <>
      <li>
        <Link to={'#'} onClick={() => setOpen1(!open1)} data-toggle="collapse" aria-controls="collapseKonten" aria-expanded={open1} className="dropdown-toggle">
            <Files/> <span>Konten</span>
        </Link>
        <Collapse in={open1} id="collapseKonten">
        <ul className="list-unstyled">
            <li>
            <NavLink to={'/konten/identitasweb'} title="Identitas Web" alt="Identitas Web">
            <span>Identitas Web</span>
            </NavLink>
            </li>
            <li>
            <NavLink to={'/konten/profilweb'} title="Profil Web" alt="Profil Web">
            <span>Profil Web</span>
            </NavLink>
            </li>
            <li>
            <NavLink to={'/konten/caradaftar'} title="Profil Web" alt="Profil Web">
            <span>Cara Daftar</span>
            </NavLink>
            </li>
        </ul>
        </Collapse>
      </li>
      <li>
            <NavLink to={'/seminar'} title="Seminar" alt="Seminar">
            <Lightning/> <span>Seminar</span>
            </NavLink>
        </li>
      <li>
            <NavLink to={'/peserta'} title="Peserta Seminar" alt="Peserta Seminar">
            <People/> <span>Peserta Seminar</span>
            </NavLink>
        </li>
        <li>
            <NavLink to={'/pembayaran'} title="Pembayaran" alt="Pembayaran">
            <FileEarmarkText/> <span>Pembayaran</span>
            </NavLink>
        </li>
      <li>
      <Link to={'#'} onClick={() => setOpen2(!open2)} data-toggle="collapse" aria-controls="collapseGrafik" aria-expanded={open2} className="dropdown-toggle">
          <Files/> <span>Grafik</span>
      </Link>
      <Collapse in={open2}>
      <ul className="list-unstyled" id="collapseGrafik">
          <li>
            <NavLink to={'/grafik/jenkel'} title="Peserta - Jenis Kelamin" alt="Peserta - Jenis Kelamin">
            <span>Peserta - Jenis Kelamin</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/grafik/pendidikan'} title="Peserta - Pendidikan" alt="Peserta - Pendidikan">
            <span>Peserta - Pendidikan</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/grafik/rangeusia'} title="Peserta - Range Usia" alt="Peserta - Range Usia">
            <span>Peserta - Range Usia</span>
            </NavLink>
          </li>
      </ul>
      </Collapse>
    </li>
    <li>
      <Link to={'#'} onClick={() => setOpen3(!open3)} data-toggle="collapse" aria-controls="collapseMaster" aria-expanded={open3} className="dropdown-toggle">
          <Box/> <span>Master</span>
      </Link>
      <Collapse in={open3}>
      <ul className="list-unstyled" id="collapseMaster">
          <li>
          <NavLink to={'/sertifikat'} title="Sertifikat" alt="Sertifikat">
            <span>Sertifikat</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/kartuidentitas'} title="Kartu Identitas" alt="Kartu Identitas">
            <span>Kartu Identitas</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/pendidikan'} title="Pendidikan" alt="Pendidikan">
            <span>Pendidikan</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/bank'} title="Bank" alt="Bank">
            <span>Bank</span>
            </NavLink>
          </li>
      </ul>
      </Collapse>
    </li>
    <li>
      <Link to={'#'} onClick={() => setOpen4(!open4)} data-toggle="collapse" aria-controls="collapsePengaturan" aria-expanded={open4} className="dropdown-toggle">
          <Gear/> <span>Pengaturan</span>
      </Link>
      <Collapse in={open4}>
      <ul className="list-unstyled" id="collapsePengaturan">
          <li>
          <NavLink to={'/pengaturan'} title="Pengaturan" alt="Pengaturan">
            <span>Pengaturan</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/akun/password'} title="Ganti Password" alt="Ganti Password">
            <span>Ganti Password</span>
            </NavLink>
          </li>
          <li>
              <NavLink onClick={() => {logout()}} to='' activeClassName="" alt="Logout">
              <BoxArrowRight/> <span>Logout</span>
              </NavLink>
          </li>
      </ul>
      </Collapse>
    </li>
    </>
    );
  }
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false 
        }
    }
    componentDidMount = () => {
        if (isLogin()) {
           console.log('LOGIN')
           const data = JSON.parse(sessionStorage.getItem('isLogin'))
                const id = data[0].username
                API.GetUserId(id).then(res=>{
                    this.setState({
                        id : res.username,
                        nama: res.nama, 
                        foto: res.foto,
                    })
                })
                
        } else {
            this.setState({
                login:true
            })
        }
    }

    render() {
      
    return(
        <>
        <nav id="sidebar" className={this.props.showMenu ? 'shadow' : 'shadow active' }>
        <ul className="list-unstyled components">
                <li>
                    <NavLink to={'/admin'} title="Petunjuk" alt="Petunjuk">
                    <HouseDoor/> <span>Home</span>
                    </NavLink>
                </li>
                
                <SubMenu/>
                           
                {/*isAdmin() ?
                    <>
                    
                    </>
                    :
                    <>
                        
                    </>
                */} 
          
            </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar