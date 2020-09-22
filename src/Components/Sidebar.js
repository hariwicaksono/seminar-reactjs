import React, {Component, useState} from 'react'
import {NavLink} from 'react-router-dom'
import API from '../Configs/Axios'
import { logout, isLogin, isAdmin } from '../Utils'
import {Button, Collapse} from 'react-bootstrap'
import { HouseDoor, Files, BoxArrowRight, People, FileEarmarkText, Gear } from 'react-bootstrap-icons'

function SubMenu() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    return (
        <>
      <li>
        <a href={"#"} onClick={() => setOpen1(!open1)} data-toggle="collapse" aria-controls="collapseKonten" aria-expanded={open1} className="dropdown-toggle">
            <Files/> <span>Konten</span>
        </a>
        <Collapse in={open1} id="collapseKonten">
        <ul className="list-unstyled">
            <li>
            <NavLink to={'/identitasweb'} title="Identitas Web" alt="Identitas Web">
            <span>Identitas Web</span>
            </NavLink>
            </li>
            <li>
                <a href="#">Profil Website</a>
            </li>
            <li>
                <a href="#">Cara Pendaftaran</a>
            </li>
        </ul>
        </Collapse>
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
      <a href={"#"} onClick={() => setOpen2(!open2)} data-toggle="collapse" aria-controls="collapseGrafik" aria-expanded={open2} className="dropdown-toggle">
          <Files/> <span>Grafik</span>
      </a>
      <Collapse in={open2}>
      <ul className="list-unstyled" id="collapseGrafik">
          <li>
            <NavLink to={'/peserta'} title="Peserta - Jenis Kelamin" alt="Peserta - Jenis Kelamin">
            <span>Peserta - Jenis Kelamin</span>
            </NavLink>
          </li>
          <li>
              <a href="#">Profil Website</a>
          </li>
          <li>
              <a href="#">Cara Pendaftaran</a>
          </li>
      </ul>
      </Collapse>
    </li>
    <li>
      <a href={"#"} onClick={() => setOpen3(!open3)} data-toggle="collapse" aria-controls="collapsePengaturan" aria-expanded={open3} className="dropdown-toggle">
          <Gear/> <span>Pengaturan</span>
      </a>
      <Collapse in={open3}>
      <ul className="list-unstyled" id="collapsePengaturan">
          <li>
            <NavLink to={'/peserta'} title="Seminar" alt="Seminar">
            <span>Seminar</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/peserta'} title="Kartu Identitas" alt="Kartu Identitas">
            <span>Kartu Identitas</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/peserta'} title="Pendidikan" alt="Pendidikan">
            <span>Pendidikan</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={'/peserta'} title="Bank" alt="Bank">
            <span>Bank</span>
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
    Logout = () => {
        logout();
        
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
                           

                {isAdmin() ?
                    <>
                    <li>
                            <NavLink onClick={this.Logout} to='' activeClassName="">
                           <BoxArrowRight/> <span>Logout</span>
                            </NavLink>
                        </li>
                    </>
                    :
                    <>
                        
                    </>
                } 
          
            </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar