import React from 'react';
import { Route, Switch } from "react-router-dom"
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from 'react-router-scroll-top';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import HomePage from "../../Components/Home"
import Detail from "../../Components/Detail"
import Kontak from "../../Components/Kontak"
import Tentang from "../../Components/Tentang"
import Kalender from "../../Components/Kalender"
import CaraDaftar from "../../Components/CaraDaftar"
import Register from "../../Components/Register"
import Login from "../../Components/Login"
import AktivasiAkun from "../../Components/AktivasiAkun"
import Member from "../../Components/Member"
import Konfirmasi from "../../Components/Member/Konfirmasi"
import Cetak from "../../Components/Member/Cetak"
import Admin from "../../Components/Admin"
import IdentitasWeb from "../../Components/Admin/IdentitasWeb"

const MyRouter = () => {
    return(
        <Switch>
            <ScrollToTop>
            <Route path="/" component={HomePage} exact />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/kontak" component={Kontak} />
            <Route path="/tentang" component={Tentang} />
            <Route path="/kalender" component={Kalender} />
            <Route path="/caradaftar" component={CaraDaftar} />
            <PublicRoute path="/login" component={Login} restricted/>
            <PublicRoute path="/register" component={Register} restricted/>
            <Route path="/aktivasi_akun/:id" component={AktivasiAkun} />
            <PrivateRoute path="/member" component={Member} />
            <PrivateRoute path="/konfirmasi" component={Konfirmasi} />
            <PrivateRoute path="/cetak/:id" component={Cetak} />
            <PrivateRoute path="/admin" component={Admin} />
            <PrivateRoute path="/identitasweb" component={IdentitasWeb} />
            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

