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

const GET_BY_ID = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.get(RootPath+path+data).then(res=>{
             resolve(res.data)
         },err=>{
            console.log(err.response); 
            return err.response;
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

const POST_FOTO = (path,data,name) => {
    const promise = new Promise((resolve,reject)=>{
        const formdata = new FormData()
        formdata.append('foto',data,name)
        Axios.post(RootPath+path,formdata).then(res=>{
           resolve(res.data.status)
       },(err)=>{
           reject(err)
       })
    })
    return promise
}

const GetAktifSeminar = () => GET('GetAktifSeminar');
const GetArsipSeminar = () => GET('GetArsipSeminar');
const GetSeminar = () => GET('Seminar');
const GetIdSeminar = (data) => GET_ID('Seminar?id=',data);
const PostSeminar = (data) => POST('Seminar',data);
const PutSeminar = (data) => PUT('Seminar',data);
const PutStatusSeminar = (data) => PUT('StatusSeminar',data);
const DeleteSeminar = (id) => DELETE('Seminar/index_delete?id=',id)
const GetSeminarById = (data) => GET_BY_ID('GetSeminar?id=',data);
const CariSeminar = (data) => SEARCH('Search?id=',data);
const CheckSeminar = (data) => Axios(RootPath+`CheckSeminar?id=${data}`);
const CountSeminar = () => GET('CountSeminar');
const GetIdentitasWeb = () => GET('IdentitasWeb');
const PutIdentitasWeb = (data) => PUT('IdentitasWeb',data);
const GetBank = () => GET('Bank');
const PostLogin = (data) => POST('Login',data);
const GetKartuIdentitas = () => GET('KartuIdentitas');
const PutStatusKartu = (data) => PUT('StatusKartu',data);
const GetPendidikan = () => GET('Pendidikan');
const GetKabupaten = () => GET('Kabupaten');
const GetProfilWeb = () => GET('ProfilWeb');
const PutProfilWeb = (data) => PUT('ProfilWeb',data);
const GetCaraDaftar = () => GET('CaraDaftar');
const PutCaraDaftar = (data) => PUT('CaraDaftar',data);
const GetPeserta = () => GET('Peserta');
const GetIdPeserta = (data) => GET_ID('Peserta?id=',data);
const PostPeserta = (data) => POST('Peserta',data);
const DeletePeserta = (id) => DELETE('Peserta/index_delete?id=',id)
const CheckPeserta = (no_id, nm_peserta) => Axios(RootPath+`CheckPeserta?no_id=${no_id}&nm_peserta=${nm_peserta}`);
const CheckNokartu = (data) => Axios(RootPath+`CheckNokartu?no_id=${data}`);
const GetPembayaran = () => GET('Pembayaran');
const GetIdPembayaran = (data) => GET_ID('Pembayaran?id=',data);
const PostPembayaran = (data) => POST('Pembayaran',data);
const PutPembayaran = (data) => PUT('Pembayaran',data);
const DeletePembayaran = (id) => DELETE('Pembayaran/index_delete?id=',id)
const GetPembayaranById = (data) => GET_BY_ID('GetPembayaran?id=',data);
const CheckPembayaran = (id_peserta, id_seminar) => Axios(RootPath+`CheckPembayaran?id_peserta=${id_peserta}&id_seminar=${id_seminar}`);
const PutAktivasiAkun = (data) => PUT('AktivasiAkun',data);
const PostFoto = (data,name) => POST_FOTO('ImageUpload',data,name);
const GetKalender = () => GET('Kalender');
const GetIdAdmin = (data) => GET_ID('Pengguna?id=',data);
const CountPeserta = () => GET('CountPeserta');
const CountBayarnew = () => GET('CountBayarnew');
const CountBayarcancel = () => GET('CountBayarcancel');
 
const API = {
    GetAktifSeminar,
    GetArsipSeminar,
    GetSeminar,
    GetIdSeminar,
    PostSeminar,
    PutSeminar,
    PutStatusSeminar,
    DeleteSeminar,
    GetSeminarById,
    CariSeminar,
    CheckSeminar,
    CountSeminar,
    GetIdentitasWeb,
    PutIdentitasWeb,
    GetBank,
    PostLogin,
    GetKartuIdentitas,
    PutStatusKartu,
    GetPendidikan,
    GetKabupaten,
    GetProfilWeb,
    PutProfilWeb,
    GetCaraDaftar,
    PutCaraDaftar,
    GetPeserta,
    GetIdPeserta,
    PostPeserta,
    DeletePeserta,
    CheckPeserta,
    CheckNokartu,
    GetPembayaran,
    GetIdPembayaran,
    PostPembayaran,
    PutPembayaran,
    DeletePembayaran,
    GetPembayaranById,
    CheckPembayaran,
    PutAktivasiAkun,
    PostFoto,
    GetKalender,
    GetIdAdmin,
    CountPeserta,
    CountBayarnew,
    CountBayarcancel
}

export default API
