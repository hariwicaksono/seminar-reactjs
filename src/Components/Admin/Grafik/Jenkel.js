import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../../../Configs/Axios'
import {Helmet} from 'react-helmet'
import {Container, Breadcrumb} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'

const TITLE = 'Grafik Peserta-Jenis Kelamin - Seminar App'


class GrafikJenkel extends Component {
    constructor(props) {
        super(props)
        this.state = {
           JkL: [],
           JkP: [],
        }

    }
    componentDidMount = () => {
        API.CountJenkelL().then(res => {
           this.setState({
                JkL: res.data[0].jumlah,
            })
        })  
        API.CountJenkelP().then(res => {
            this.setState({
                 JkP: res.data[0].jumlah,
             })
         })  
    } 
  render() {

    const data = {
        labels: ['Laki-laki', 'Perempuan'],
        datasets: [
          {
            label: 'Peserta - Jenis Kelamin',
            backgroundColor: [
                '#FF6384',
                '#36A2EB'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
                ],
            data: [`${this.state.JkL}`,`${this.state.JkP}`]
          }
        ]
      };
    return (
      <>
       <Helmet>
            <title>{ "Admin"+" - "+TITLE }</title>
            </Helmet>
            <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Grafik Peserta-Jenis Kelamin</Breadcrumb.Item>
                </Breadcrumb>

            <div className="shadow p-4 bg-white">
            <h3 className="mb-3">Grafik Peserta - Jenis Kelamin</h3>
            <Pie
            data={data}
            width={500}
            heigth={400}
            options={{ maintainAspectRatio: true }}
            />
            </div>
        </Container>
      </>
    );
  }
}
export default GrafikJenkel