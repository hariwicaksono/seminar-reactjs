import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import {ImagesUrl} from '../Configs/Url'
import { BsCalendar, BsGeoAlt , BsChevronDoubleRight } from "react-icons/bs";

class AktifSeminar extends Component {
    constructor(props){
        super(props)
        this.state={
            url : ImagesUrl()
        }

    }

    render() {
        const List = this.props.data.map(s => (
            <div key={s.id_seminar}>
            
                    <h1>{s.nm_seminar}</h1>
                    <p><BsCalendar/> {s.tgl_seminar} Pukul {s.jam_seminar} &mdash; <BsGeoAlt/> {s.lokasi_seminar}</p>
                    <p className="lead">{s.headline_seminar}</p>
                    <p>{s.deskripsi_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary" >DETAIL</Link>&nbsp;
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-success" >DAFTAR</Link>
            </div>
        ))
        return (
            <>
            <Jumbotron className="shadow text-center">
                {List}
            </Jumbotron>

            </>
        )
    }
}

export default AktifSeminar