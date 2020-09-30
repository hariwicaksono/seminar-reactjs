import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { CalendarEvent } from "react-bootstrap-icons"
import ReactPaginate from 'react-paginate'

class ArsipSeminar extends Component {
    constructor(props){
        super(props)
        this.state={
            offset: 0,
            perPage: 2,
            currentPage: 0
        }
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }
    getHandler = () => {
       
        const slice = this.props.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const ListSeminar = slice.map((s,i) => (
            <div key={i + 1} className="border-bottom my-2">
            <h5>{s.nm_seminar}</h5>
            <p><CalendarEvent/> {s.tgl_seminar} &mdash; {s.headline_seminar}</p>
            <Link to={'/detail/'+s.id_seminar} className="btn btn-primary btn-sm mb-2" >DETAIL</Link>
            </div> 
        ))

        this.setState({
            pageCount: Math.ceil(this.props.data.length / this.state.perPage),
            
            ListSeminar
        })

    
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getHandler()
        });

    };
    componentDidMount = () => {
        this.getHandler()
  }
    render() {
        return (
            <>
         
            {this.state.ListSeminar}

            <div className="mb-2">
                <ReactPaginate
                containerClassName="pagination"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active"
                previousLabel="<<"
                nextLabel=">>"
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                />
            </div>
            </>
        )
    }
}

export default ArsipSeminar