import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Card } from 'react-bootstrap'
import API from '../Configs/Axios'
import AktifSeminar from './AktifSeminar'
import Loader from 'react-loader'
import { isLogin } from '../Utils'

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Seminar: [],
            loading: true
         
        }
    }

    componentDidMount = () => {
        API.GetAktifSeminar().then(res => {
            setTimeout(() => this.setState({
                Seminar: res,
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
                   
                    <div className="row">
                        <div className="col-md-12">
                        

                        { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                       <Jumbotron>
                            <AktifSeminar data={this.state.Seminar} />
                            </Jumbotron>
                        </>
                        }
                        </div>
                    </div>
                </Container>

            </>
        )
    }
}

export default Home