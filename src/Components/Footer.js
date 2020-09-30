import React,{Component} from 'react'
//import {Link,Redirect } from 'react-router-dom'
import { Container, Row, Col} from 'react-bootstrap'
 
class Footer extends Component{
    render(){
     
        return(  
               
            <div className="text-white border-0 py-3" style={{backgroundColor:'#212529'}}>
              <Container>
            <Row>

                <Col md={12}>
                <h3>Seminar</h3>
            
                </Col>

            </Row>
           
            <div className="text-white mt-3">© {(new Date().getFullYear())}. Seminar App Dengan ReactJS dan CodeIgniter</div>
            </Container>
            </div>


        )
    }
}

export default Footer