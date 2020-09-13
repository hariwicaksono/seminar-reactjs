import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import {ImagesUrl} from '../Configs/Url'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

class ArsipSeminar extends Component {
    constructor(props){
        super(props)
        this.state={
            url : ImagesUrl()
        }

    }

    render() {
        const List = this.props.data.map(s => (
            <div key={s.id_seminar}>
            
                    <h5>{s.nm_seminar} ({s.tgl_seminar})</h5>
                    <p>{s.headline_seminar}</p>
                    <Link to={'/detail/'+s.id_seminar} className="btn btn-primary" >DETAIL</Link>
            </div>
        ))
        return (
            <>
            <Card className="shadow" body>
                {List}
            </Card>

            </>
        )
    }
}

export default ArsipSeminar