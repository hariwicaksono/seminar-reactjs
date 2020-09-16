import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../Configs/Axios'
import { NotificationManager } from 'react-notifications'
import {Container, Row, Col, Card} from 'react-bootstrap'

class AktivasiAkun extends Component {
    constructor(props){
        super(props)
        this.state={
            id : this.props.match.params.id,
            aktif : 'Y'
        }
        this.handlerData = this.handlerData.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerData = (e) => {
        this.setState({
            [ e.target.name] : e.target.value
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault()
        API.PutAktivasiAkun(this.state).then(res=>{
            //console.log(res)
            if (res.status === 1 ) {
                window.location.href = '/login';
            } 
        })
        NotificationManager.success('Aktivasi Akun berhasil!, Silahkan Login');
    }

    render() {
        
        return (
            <>
            <Container>
            <Row className="justify-content-center">
            <Col lg="8">
            <Card>
            <Card.Img variant="top" src="https://s3-eu-west-1.amazonaws.com/eazy3img/activations/activation.jpg" />
            <Card.Body>
                <h3>Tinggal satu langkah lagi...</h3>
                <br/>
                <p>Klik tombol di bawah untuk mengaktifkan akun Anda</p>
            <form onSubmit={this.handlerSubmit}>
            <input type="hidden" name="aktif" value={this.state.aktif} />
            <input value="Click to Activate Account" className="btn btn-outline-primary btn-block btn-lg" type="submit" ></input>
            </form>
            </Card.Body>
            </Card>
            </Col>
            </Row>
            </Container>

            </>
        )
    }
}

export default AktivasiAkun