import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import {ImagesUrl} from '../Configs/Axios'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

class Produk extends Component {
    constructor(props){
        super(props)
        this.state={
            url : ImagesUrl(),
            offset: 0,
            perPage: 8,
            currentPage: 0
        }
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }
    getHandler = () => {
       
                const slice = this.props.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const ListProduk = slice.map(produk => (
                    <div className="col-md-3" key={produk.id_produk}>
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src={this.state.url+produk.foto_produk} alt={produk.nama_produk} />
                        <Card.Body>
                            <Card.Text>Rp {produk.harga_produk}<br/>
                            {produk.nama_produk}</Card.Text>
                            <Link to={'/detail/'+produk.id_produk} className="btn btn-success" >DETAIL</Link>
                        </Card.Body>
                    </Card>
                    </div>
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
            <Row>
                {this.state.ListProduk}
            </Row>
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
                previousLabel={<BsChevronDoubleLeft/>}
                nextLabel={<BsChevronDoubleRight/>}
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

export default Produk