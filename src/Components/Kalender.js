import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Container, Breadcrumb, Row, Col, Card } from 'react-bootstrap'
//import {ImagesUrl} from '../Configs/Url'
import { Helmet } from 'react-helmet'
import API from '../Configs/Axios'
import Skeleton from 'react-loading-skeleton'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'; 
import "@fullcalendar/common/main.css"  
import "@fullcalendar/daygrid/main.css"  
import "@fullcalendar/timegrid/main.css"
import "@fullcalendar/list/main.css"

const TITLE = 'Kalender - Seminar App'
class Kalender extends Component {
    constructor(props){
        super(props)
        this.state={
            Kalender : [],
            loading: true
        }

    }

    componentDidMount = () => {
        API.GetKalender().then(res=>{
            setTimeout(() => this.setState({
                Kalender : res.data,
                loading: false
            }), 100);
        })
    }

    render() {
//console.log(this.state.Kalender)
        return (
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
            <Container>
            <Breadcrumb className="card px-3 mb-2">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Kalender</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="shadow" body>
            <h3 className="mb-3">Kalender Event</h3>
            {this.state.loading ?
            <>
            <p className="mb-3"><Skeleton height={40} /></p>
            <p><Skeleton height={400} /></p>
            </>
            :     
            <FullCalendar  
                initialView="timeGridWeek"  
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }} 
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin ]}  
                events={this.state.Kalender}  
            />  
            }
            </Card>
            </Container>
            </>
        )
    }
}

export default Kalender