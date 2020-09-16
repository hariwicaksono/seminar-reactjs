import Axios from "axios";

const RootPath = "http://localhost/seminar-server/api/";

const GET = (path) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path,id) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+id).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const POST = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.post(RootPath+path,data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const PUT = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.put(RootPath+path,data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const DELETE = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.delete(RootPath+path+data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const SEARCH = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+data).then(res => {
            resolve(res.data)
        }).catch(er => {
            reject(er)
        })
    })
    return promise
}

const GetAktifSeminar = () => GET('GetAktifSeminar');
const GetArsipSeminar = () => GET('GetArsipSeminar');
const GetIdSeminar = (data) => GET_ID('Seminar?id=',data)
const GetIdentitasWeb = () => GET('IdentitasWeb');
const PostLogin = (data) => POST('Login',data)
const GetKartuIdentitas = () => GET('KartuIdentitas');
const GetPendidikan = () => GET('Pendidikan');
const GetKabupaten = () => GET('Kabupaten');
const CariSeminar = (data) => SEARCH('Search?id=',data)
const GetProfilWeb = () => GET('ProfilWeb');
const GetCaraDaftar = () => GET('CaraDaftar');
const PostPeserta = (data) => POST('Peserta',data);
const CheckPeserta = (data) => Axios(RootPath+`CheckPeserta?id=${data}`);
const PutAktivasiAkun = (data) => PUT('AktivasiAkun',data);
const GetKaryawan = () => GET('UserController');
const GetGaji = () => GET('GajiController');
const GetIzin = () => GET('IzinController');
const GetIdAbsen = (data) => GET_ID('AbsenController?id=',data)
const GetIdKaryawan = (data) => GET_ID('UserController?id=',data)
const PostKaryawan = (data) => POST('UserController',data)
const PutKaryawan = (data) => PUT('UserController',data)
const DeleteKaryawan = (data) => DELETE('UserController?id=',data)

const API = {
    GetAktifSeminar,
    GetArsipSeminar,
    GetIdSeminar,
    GetIdentitasWeb,
    PostLogin,
    GetKartuIdentitas,
    GetPendidikan,
    GetKabupaten,
    CariSeminar,
    GetProfilWeb,
    GetCaraDaftar,
    PostPeserta,
    CheckPeserta,
    PutAktivasiAkun,
    GetKaryawan,
    GetGaji,
    GetIzin,
    GetIdAbsen,
    PostKaryawan,
    PutKaryawan,
    GetIdKaryawan,
    DeleteKaryawan,
}

export default API
