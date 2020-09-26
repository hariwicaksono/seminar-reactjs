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

const PostLogin = (data) => POST('Login',data);
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
const GetIdBank = (data) => GET_ID('Bank?id=',data);
const GetAktifBank = () => GET('AktifBank');
const PostBank = (data) => POST('Bank',data);
const PutBank = (data) => PUT('Bank',data);
const PutStatusBank = (data) => PUT('StatusBank',data);
const DeleteBank = (id) => DELETE('Bank/index_delete?id=',id)
const GetKartuIdentitas = () => GET('KartuIdentitas');
const GetIdKartuIdentitas = (data) => GET_ID('KartuIdentitas?id=',data);
const GetAktifKartuId = () => GET('AktifKartuId');
const PostKartuIdentitas = (data) => POST('KartuIdentitas',data);
const PutKartuIdentitas = (data) => PUT('KartuIdentitas',data);
const PutStatusKartu = (data) => PUT('StatusKartu',data);
const DeleteKartuIdentitas = (id) => DELETE('KartuIdentitas/index_delete?id=',id)
const GetPendidikan = () => GET('Pendidikan');
const GetIdPendidikan = (data) => GET_ID('Pendidikan?id=',data);
const GetAktifPendidikan = () => GET('AktifPendidikan');
const PostPendidikan = (data) => POST('Pendidikan',data);
const PutPendidikan = (data) => PUT('Pendidikan',data);
const PutStatusPendidikan = (data) => PUT('StatusPendidikan',data);
const DeletePendidikan = (id) => DELETE('Pendidikan/index_delete?id=',id)
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
const GrafikJenkel = () => GET('GrafikJenkel');
const GrafikPendidikan = () => GET('GrafikPendidikan');
const GrafikRangeusia = () => GET('GrafikRangeusia');
 
const API = {
    PostLogin,
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
    GetIdBank,
    GetAktifBank,
    PostBank,
    PutBank,
    PutStatusBank,
    DeleteBank,
    GetKartuIdentitas,
    GetIdKartuIdentitas,
    GetAktifKartuId,
    PostKartuIdentitas,
    PutKartuIdentitas,
    PutStatusKartu,
    DeleteKartuIdentitas,
    GetPendidikan,
    GetIdPendidikan,
    GetAktifPendidikan,
    PostPendidikan,
    PutPendidikan,
    PutStatusPendidikan,
    DeletePendidikan,
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
    CountBayarcancel,
    GrafikJenkel,
    GrafikPendidikan,
    GrafikRangeusia
}

export default API
