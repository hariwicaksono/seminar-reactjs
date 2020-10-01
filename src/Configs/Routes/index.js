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
            <Route path="/detail/:id" component={Detail} />
            <Route path="/kontak" component={Kontak} />
            <Route path="/tentang" component={Profil} />
            <Route path="/kalender" component={Kalender} />
            <Route path="/caradaftar" component={CaraDaftar} />
            <PublicRoute path="/login" component={Login} restricted/>
            <PublicRoute path="/register" component={Register} restricted/>
            <Route path="/aktivasi_akun/:id" component={AktivasiAkun} />
            <Route path="/sertifikat/:id" component={CetakSertifikat} />
            <PrivateRoute path="/member" component={Member} />
            <PrivateRoute path="/konfirmasi" component={MKonfirmasi} />
            <PrivateRoute path="/cetak/bukti/:id" component={MCetakBukti} />
            <PrivateRoute path="/cetak/sertifikat/:id" component={MCetakSertifikat} />
            <PrivateRoute path="/profil" component={MProfil} />
            <PrivateRoute path="/password" component={MPassword} />
            <PrivateRoute path="/admin" component={Admin} exact />
            <PrivateRoute path="/akun/password" component={AAkunPassword} />
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
            <PrivateRoute path="/sertifikat" component={ASertifikat} exact />
            <PrivateRoute path="/sertifikat/tambah" component={ASertiTambah} />
            <PrivateRoute path="/sertifikat/edit/:id" component={ASertiEdit} />
            <PrivateRoute path="/pengaturan" component={APengaturan} />
            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

