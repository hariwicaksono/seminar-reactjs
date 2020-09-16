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
import CaraDaftar from "../../Components/CaraDaftar"
import Register from "../../Components/Register"
import Login from "../../Components/Login"
import AktivasiAkun from "../../Components/AktivasiAkun"

const MyRouter = () => {
    return(
        <Switch>
            <ScrollToTop>
            <Route path="/" component={HomePage} exact />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/kontak" component={Kontak} />
            <Route path="/tentang" component={Tentang} />
            <Route path="/caradaftar" component={CaraDaftar} />
            <PublicRoute path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/aktivasi_akun/:id" component={AktivasiAkun} />
            <NotificationContainer />
        </ScrollToTop>
        </Switch>
            
    )
}

export default MyRouter

