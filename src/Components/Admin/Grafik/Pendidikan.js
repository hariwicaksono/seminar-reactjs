import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../../../Configs/Axios'
import {Helmet} from 'react-helmet'
import {Container, Breadcrumb} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes'
import { SetOne9 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer'

const seo = {
  title: 'Admin Seminar App',
  description: 'Seminar App Dengan ReactJS dan CodeIgniter 3',
  image: '',
  url: '',
}
class GrafikPendidikan extends Component {
    constructor(props) {
        super(props)
        this.state = {
           data: [],
        }

    }
    componentDidMount = () => {
        API.GrafikPendidikan().then(res => {
           this.setState({
                data: res.data,
            })
        })  

    } 
  render() {

    const data = {
        labels: this.state.data.map(d => d.label),
        datasets: [
          {
            label: 'Peserta - Pendidikan',
            data: this.state.data.map(d => d.value)
          }
        ]
      };
    return (
      <>
       <Helmet>
       <title>Grafik Pendidikan - { seo.title }</title>
            <meta name="description" content={seo.description} />
            </Helmet>
            <Container fluid>
                <Breadcrumb className="card px-3 mb-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>Beranda</Breadcrumb.Item>
                <Breadcrumb.Item active>Grafik Peserta-Pendidikan</Breadcrumb.Item>
                </Breadcrumb>

            <div className="shadow p-4 bg-white">
            <h3 className="mb-3">Grafik Peserta - Pendidikan</h3>
            <Pie
            data={data}
            width={500}
            heigth={400}
            options={{ maintainAspectRatio: true,plugins: {
              colorschemes: {
                  scheme: SetOne9
              }
          } }}
            />
            </div>
        </Container>
      </>
    );
  }
}
export default GrafikPendidikan