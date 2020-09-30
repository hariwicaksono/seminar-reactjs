import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../../../Configs/Axios'
import {Helmet} from 'react-helmet'
import {Container, Breadcrumb} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes'
import { SetOne9 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer'

const TITLE = 'Grafik Peserta-Jenis Kelamin - Seminar App' 
class GrafikJenkel extends Component {
    constructor(props) {
        super(props)
        this.state = {
           data: [],
        }

    }
    componentDidMount = () => {
        API.GrafikJenkel().then(res => {
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
            label: 'Peserta - Jenis Kelamin',
            data: this.state.data.map(d => d.value)
          }
        ]
      };
    return (
      <>
       <Helmet>
       <title>{ "Admin"+
                    " - "+
                    TITLE }</title>
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
export default GrafikJenkel