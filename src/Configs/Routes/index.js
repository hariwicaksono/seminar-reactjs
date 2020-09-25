import React from 'react';
import { Route, Switch } from "react-router-dom"
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from 'react-router-scroll-top';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import HomePage from "../../Components/Home"
import Detail from "../../Components/Detail"
import Kontak from "../../Components/Kontak"
import Profil from "../../Components/Profil"
import Kalender from "../../Components/Kalender"
import CaraDaftar from "../../Components/CaraDaftar"
import Register from "../../Components/Register"
import Login from "../../Components/Login"
import AktivasiAkun from "../../Components/AktivasiAkun"
import Member from "../../Components/Member"
import Konfirmasi from "../../Components/Member/Konfirmasi"
import Cetak from "../../Components/Member/Cetak"
import Admin from "../../Components/Admin"
import AIdentitasWeb from "../../Components/Admin/IdentitasWeb"
import AProfilWeb from "../../Components/Admin/ProfilWeb"
import ACaraDaftar from "../../Components/Admin/CaraDaftar"
import APeserta from "../../Components/Admin/Peserta"
import APsDetail from "../../Components/Admin/PsDetail"
import APembayaran from "../../Components/Admin/Pembayaran"
import APbDetail from "../../Components/Admin/PbDetail"
import ASeminar from "../../Components/Admin/Seminar"
import ASmTambah from "../../Components/Admin/SmTambah"
import ASmEdit from "../../Components/Admin/SmEdit"
import AKartuIdentitas from "../../Components/Admin/KartuIdentitas"
import APendidikan from "../../Components/Admin/Pendidikan"
import ABank from "../../Components/Admin/Bank"

const MyRouter = () => {
    return(
        <Switch>
            <ScrollToTop>
            <Route path="/" component={HomePage} exact />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/kontak" component={Kontak} />
            <Route path="/profil" component={Profil} />
            <Route path="/kalender" component={Kalender} />
            <Route path="/caradaftar" component={CaraDaftar} />
            <PublicRoute path="/login" component={Login} restricted/>
            <PublicRoute path="/register" component={Register} restricted/>
            <Route path="/aktivasi_akun/:id" component={AktivasiAkun} />
            <PrivateRoute path="/member" component={Member} />
            <PrivateRoute path="/konfirmasi" component={Konfirmasi} />
            <PrivateRoute path="/cetak/:id" component={Cetak} />
            <PrivateRoute path="/admin" component={Admin} exact />
            <PrivateRoute path="/konten/identitasweb" component={AIdentitasWeb} />
            <PrivateRoute path="/konten/profilweb" component={AProfilWeb} />
            <PrivateRoute path="/konten/caradaftar" component={ACaraDaftar} />
            <PrivateRoute path="/peserta" component={APeserta} exact />
            <PrivateRoute path="/peserta/detail/:id" component={APsDetail} />
            <PrivateRoute path="/pembayaran" component={APembayaran} exact />
            <PrivateRoute path="/pembayaran/detail/:id" component={APbDetail} />
            <PrivateRoute path="/seminar" component={ASeminar} exact />
            <PrivateRoute path="/seminar/tambah" component={ASmTambah} />
            <PrivateRoute path="/seminar/edit/:id" component={ASmEdit} />
            <PrivateRoute path="/kartuidentitas" component={AKartuIdentitas} exact />
            <PrivateRoute path="/pendidikan" component={APendidikan} exact />
            <PrivateRoute path="/bank" component={ABank} exact />
            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

