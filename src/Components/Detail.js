import React, { Component } from 'react'
import API from '../Configs/Axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import {ImagesUrl} from '../Configs/Axios'
import Loader from 'react-loader'

const TITLE = ' - Nita Mart'
var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama : '',
            headline : '',
            loading: true
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        API.GetIdSeminar(id).then(res=>{
            setTimeout(() => this.setState({
                nama : res.data[0].nm_seminar,
                headline: res.data[0].headline_seminar,
                loading: false
            }), 100);
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <>
           <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
                <Container>
                    
                { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                        <Card className="mb-2">
                            <Card.Body>
                       
                                    <h2>{this.state.nama}</h2>
                                <h3>{this.state.headline}</h3>

                            </Card.Body>
                        </Card>
</>
    }
                    
                   
                </Container>
            </>
        )
    }
}

export default Detail