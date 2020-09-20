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
const GetIdSeminar = (data) => GET_ID('Seminar?id=',data)
const GetIdentitasWeb = () => GET('IdentitasWeb');
const GetBank = () => GET('Bank');
const PostLogin = (data) => POST('Login',data)
const GetKartuIdentitas = () => GET('KartuIdentitas');
const GetPendidikan = () => GET('Pendidikan');
const GetKabupaten = () => GET('Kabupaten');
const CariSeminar = (data) => SEARCH('Search?id=',data)
const GetProfilWeb = () => GET('ProfilWeb');
const GetCaraDaftar = () => GET('CaraDaftar');
const PostPeserta = (data) => POST('Peserta',data);
const CheckPeserta = (no_id, nm_peserta) => Axios(RootPath+`CheckPeserta?no_id=${no_id}&nm_peserta=${nm_peserta}`);
const CheckNokartu = (data) => Axios(RootPath+`CheckNokartu?no_id=${data}`);
const CheckPembayaran = (id_peserta, id_seminar) => Axios(RootPath+`CheckPembayaran?id_peserta=${id_peserta}&id_seminar=${id_seminar}`);
const CheckSeminar = (data) => Axios(RootPath+`CheckSeminar?id=${data}`);
const PutAktivasiAkun = (data) => PUT('AktivasiAkun',data);
const GetIdPeserta = (data) => GET_ID('Peserta?id=',data)
const GetPembayaranById = (data) => GET_BY_ID('GetPembayaran?id=',data)
const GetSeminarById = (data) => GET_BY_ID('GetSeminar?id=',data)
const PostFoto = (data,name) => POST_FOTO('ImageUpload',data,name)
const PostPembayaran = (data) => POST('Pembayaran',data);

const API = {
    GetAktifSeminar,
    GetArsipSeminar,
    GetIdSeminar,
    GetIdentitasWeb,
    GetBank,
    PostLogin,
    GetKartuIdentitas,
    GetPendidikan,
    GetKabupaten,
    CariSeminar,
    GetProfilWeb,
    GetCaraDaftar,
    PostPeserta,
    CheckPeserta,
    CheckNokartu,
    CheckPembayaran,
    CheckSeminar,
    PutAktivasiAkun,
    GetIdPeserta,
    GetPembayaranById,
    GetSeminarById,
    PostFoto,
    PostPembayaran

}

export default API
