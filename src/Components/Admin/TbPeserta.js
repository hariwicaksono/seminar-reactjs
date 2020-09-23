import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Container, Table, Row, Col, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
//import {ImagesUrl} from '../Configs/Axios'
//import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

class TbPeserta extends Component {
    constructor(props){
        super(props)
        this.state={
           // url : ImagesUrl(),
            offset: 0,
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }
    getHandler = () => {
       
                const slice = this.props.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const ListProduk = slice.map((p,i) => (
                    <tr key={i+1}>
                        <td>{i+1}</td>
                    <td>{p.id_peserta}</td>
                            <td>{p.nama_peserta}</td>
                            
                   
                    </tr>
                ))

                this.setState({
                    pageCount: Math.ceil(this.props.data.length / this.state.perPage),
                   
                    ListProduk
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
            <Table striped hover size="sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
    </tr>
  </thead>
  <tbody>
  {this.state.ListProduk}
  </tbody>
</Table>


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
                previousLabel="prev"
                nextLabel="next"
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

export default TbPeserta