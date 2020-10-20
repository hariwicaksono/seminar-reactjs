import React from 'react';
import { Route, Switch } from "react-router-dom"
import { PublicRoute, PrivateRoute } from "react-private-public-route"
import { isLogin, isAdmin } from '../../Utils';
import { NotificationContainer } from 'react-notifications'
import ScrollToTop from 'react-router-scroll-top'
//import PrivateRoute from './Private'
//import PublicRoute from './Public'
import HomePage from "../../Pages/Home"
import NotFound from '../../Pages/NotFound'
import Detail from "../../Pages/Detail"
import Kontak from "../../Pages/Kontak"
import Profil from "../../Pages/Profil"
import Kalender from "../../Pages/Kalender"
import CaraDaftar from "../../Pages/CaraDaftar"
import Register from "../../Pages/Register"
import Login from "../../Pages/Login"
import AktivasiAkun from "../../Pages/AktivasiAkun"
import CetakSertifikat from "../../Pages/CetakSertifikat"
import Member from "../../Pages/Member"
import MKonfirmasi from "../../Pages/Member/Konfirmasi"
import MCetakBukti from "../../Pages/Member/CetakBukti"
import MCetakSertifikat from "../../Pages/Member/CetakSertifikat"
import MProfil from "../../Pages/Member/Profil"
import MPassword from "../../Pages/Member/Password"
import Admin from "../../Pages/Admin"
import AAkunPassword from "../../Pages/Admin/Akun/Password"
import AIdentitasWeb from "../../Pages/Admin/IdentitasWeb"
import AProfilWeb from "../../Pages/Admin/ProfilWeb"
import ACaraDaftar from "../../Pages/Admin/CaraDaftar"
import APeserta from "../../Pages/Admin/Peserta/"
import APsDetail from "../../Pages/Admin/Peserta/Detail"
import APembayaran from "../../Pages/Admin/Pembayaran/"
import APbDetail from "../../Pages/Admin/Pembayaran/Detail"
import ASeminar from "../../Pages/Admin/Seminar/"
import ASmTambah from "../../Pages/Admin/Seminar/Tambah"
import ASmEdit from "../../Pages/Admin/Seminar/Edit"
import AKartuIdentitas from "../../Pages/Admin/KartuIdentitas/"
import AKtTambah from "../../Pages/Admin/KartuIdentitas/Tambah"
import AKtEdit from "../../Pages/Admin/KartuIdentitas/Edit"
import APendidikan from "../../Pages/Admin/Pendidikan/"
import APdTambah from "../../Pages/Admin/Pendidikan/Tambah"
import APdEdit from "../../Pages/Admin/Pendidikan/Edit"
import ABank from "../../Pages/Admin/Bank/"
import ABankTambah from "../../Pages/Admin/Bank/Tambah"
import ABankEdit from "../../Pages/Admin/Bank/Edit"
import AGfJenkel from "../../Pages/Admin/Grafik/Jenkel"
import AGfPendidikan from "../../Pages/Admin/Grafik/Pendidikan"
import AGfRangeusia from "../../Pages/Admin/Grafik/Rangeusia"
import ASertifikat from "../../Pages/Admin/Sertifikat/"
import ASertiTambah from "../../Pages/Admin/Sertifikat/Tambah"
import ASertiEdit from "../../Pages/Admin/Sertifikat/Edit"
import APengaturan from "../../Pages/Admin/Pengaturan/"

const MyRouter = () => {
    return(
        <Switch>
            <ScrollToTop>
            <Route path="/" component={HomePage} exact />
            <PublicRoute path="/404" component={NotFound} exact />
            <PublicRoute path="/detail/:id" component={Detail} exact />
            <PublicRoute path="/kontak" component={Kontak} exact />
            <PublicRoute path="/tentang" component={Profil} exact />
            <PublicRoute path="/kalender" component={Kalender} exact />
            <PublicRoute path="/caradaftar" component={CaraDaftar} exact />
            <PublicRoute path="/aktivasi_akun/:id" component={AktivasiAkun} exact />
            <PublicRoute path="/cetak_sertifikat/:id" component={CetakSertifikat} exact />
            <PublicRoute path="/login" component={Login} restricted={(isLogin() || isAdmin())} exact />
            <PublicRoute path="/register" component={Register} restricted={(isLogin() || isAdmin())} exact />
            <PrivateRoute path="/member" component={Member} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/konfirmasi" component={MKonfirmasi} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/cetak/bukti/:id" component={MCetakBukti} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/cetak/sertifikat/:id" component={MCetakSertifikat} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/profil" component={MProfil} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/password" component={MPassword} isAuthenticated={isLogin()} redirect="/login" exact />
            <PrivateRoute path="/admin" component={Admin} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/akun/password" component={AAkunPassword} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/konten/identitasweb" component={AIdentitasWeb} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/konten/profilweb" component={AProfilWeb} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/konten/caradaftar" component={ACaraDaftar} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/peserta" component={APeserta} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/peserta/detail/:id" component={APsDetail} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pembayaran" component={APembayaran} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pembayaran/detail/:id" component={APbDetail} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/seminar" component={ASeminar} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/seminar/tambah" component={ASmTambah} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/seminar/edit/:id" component={ASmEdit} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/kartuidentitas" component={AKartuIdentitas} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/kartuidentitas/tambah" component={AKtTambah} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/kartuidentitas/edit/:id" component={AKtEdit} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pendidikan" component={APendidikan} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pendidikan/tambah" component={APdTambah} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pendidikan/edit/:id" component={APdEdit} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/bank" component={ABank} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/bank/tambah" component={ABankTambah} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/bank/edit/:id" component={ABankEdit} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/grafik/jenkel" component={AGfJenkel} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/grafik/pendidikan" component={AGfPendidikan} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/grafik/rangeusia" component={AGfRangeusia} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/sertifikat" component={ASertifikat} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/sertifikat/tambah" component={ASertiTambah} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/sertifikat/edit/:id" component={ASertiEdit} isAuthenticated={isAdmin()} redirect="/login" exact />
            <PrivateRoute path="/pengaturan" component={APengaturan} isAuthenticated={isAdmin()} redirect="/login" exact />

            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

