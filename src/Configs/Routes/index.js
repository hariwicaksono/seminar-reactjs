import React from 'react';
import { Route, Switch } from "react-router-dom"
import { PublicRoute, PrivateRoute } from "react-private-public-route"
import { isLogin, isAdmin } from '../../Utils';
import { NotificationContainer } from 'react-notifications'
import ScrollToTop from 'react-router-scroll-top'
//import PrivateRoute from './Private'
//import PublicRoute from './Public'
import HomePage from "../../Components/Home"
import NotFound from '../../Components/NotFound'
import Detail from "../../Components/Detail"
import Kontak from "../../Components/Kontak"
import Profil from "../../Components/Profil"
import Kalender from "../../Components/Kalender"
import CaraDaftar from "../../Components/CaraDaftar"
import Register from "../../Components/Register"
import Login from "../../Components/Login"
import AktivasiAkun from "../../Components/AktivasiAkun"
import CetakSertifikat from "../../Components/CetakSertifikat"
import Member from "../../Components/Member"
import MKonfirmasi from "../../Components/Member/Konfirmasi"
import MCetakBukti from "../../Components/Member/CetakBukti"
import MCetakSertifikat from "../../Components/Member/CetakSertifikat"
import MProfil from "../../Components/Member/Profil"
import MPassword from "../../Components/Member/Password"
import Admin from "../../Components/Admin"
import AAkunPassword from "../../Components/Admin/Akun/Password"
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
import ASertifikat from "../../Components/Admin/Sertifikat/"
import ASertiTambah from "../../Components/Admin/Sertifikat/Tambah"
import ASertiEdit from "../../Components/Admin/Sertifikat/Edit"
import APengaturan from "../../Components/Admin/Pengaturan/"

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
            <PublicRoute path="/sertifikat/:id" component={CetakSertifikat} exact />
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

