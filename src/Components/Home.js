import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card } from 'react-bootstrap'
import API from '../Configs/Axios'
import AktifSeminar from './AktifSeminar'
import ArsipSeminar from './ArsipSeminar'
import Loader from 'react-loader'
import { isLogin } from '../Utils'

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AktifSeminar: [],
            ArsipSeminar: [],
            loading: true
         
        }
    }

    componentDidMount = () => {
        API.GetAktifSeminar().then(res => {
            setTimeout(() => this.setState({
                AktifSeminar: res.data,
                loading: false
            }), 100);
        })
        API.GetArsipSeminar().then(res => {
            setTimeout(() => this.setState({
                ArsipSeminar: res.data,
                loading: false
            }), 100);
        })

    }
    render() {
        if (isLogin()) {
            return( <Redirect to="/user" /> )
        }
        return (
            <>
                <Container>
                   
                    <Row>
                        <Col>
                        

                        { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                       
                        <AktifSeminar data={this.state.AktifSeminar} />

                        
                        <ArsipSeminar data={this.state.ArsipSeminar} />
                        </>
                        }
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}

export default Home