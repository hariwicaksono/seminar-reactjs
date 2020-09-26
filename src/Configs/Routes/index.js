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
import APeserta from "../../Components/Admin/Peserta/"
import APsDetail from "../../Components/Admin/Peserta/Detail"
import APembayaran from "../../Components/Admin/Pembayaran/"
import APbDetail from "../../Components/Admin/Pembayaran/Detail"
import ASeminar from "../../Components/Admin/Seminar/"
import ASmTambah from "../../Components/Admin/Seminar/Tambah"
import ASmEdit from "../../Components/Admin/Seminar/Edit"
import AKartuIdentitas from "../../Components/Admin/KartuIdentitas/"
import AKtTambah from "../../Components/Admin/KartuIdentitas/Tambah"
import AKtEdit from "../../Components/Admin/KartuIdentitas/Edit"
import APendidikan from "../../Components/Admin/Pendidikan/"
import APdTambah from "../../Components/Admin/Pendidikan/Tambah"
import APdEdit from "../../Components/Admin/Pendidikan/Edit"
import ABank from "../../Components/Admin/Bank/"
import ABankTambah from "../../Components/Admin/Bank/Tambah"
import ABankEdit from "../../Components/Admin/Bank/Edit"
import AGfJenkel from "../../Components/Admin/Grafik/Jenkel"
import AGfPendidikan from "../../Components/Admin/Grafik/Pendidikan"
import AGfRangeusia from "../../Components/Admin/Grafik/Rangeusia"

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
            <PrivateRoute path="/kartuidentitas/tambah" component={AKtTambah} />
            <PrivateRoute path="/kartuidentitas/edit/:id" component={AKtEdit} />
            <PrivateRoute path="/pendidikan" component={APendidikan} exact />
            <PrivateRoute path="/pendidikan/tambah" component={APdTambah} />
            <PrivateRoute path="/pendidikan/edit/:id" component={APdEdit} />
            <PrivateRoute path="/bank" component={ABank} exact />
            <PrivateRoute path="/bank/tambah" component={ABankTambah} />
            <PrivateRoute path="/bank/edit/:id" component={ABankEdit} />
            <PrivateRoute path="/grafik/jenkel" component={AGfJenkel} />
            <PrivateRoute path="/grafik/pendidikan" component={AGfPendidikan} />
            <PrivateRoute path="/grafik/rangeusia" component={AGfRangeusia} />
            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

