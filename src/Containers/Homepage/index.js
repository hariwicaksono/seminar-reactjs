import React, { Component } from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
//import Appbar from '../../Components/Appbar'
import Sidebar from '../../Components/Sidebar'
import { Helmet } from 'react-helmet'
import MyRouter from '../../Configs/Routes'
import { isAdmin } from '../../Utils'

const seo = {
    title: 'Seminar App',
    description: 'Seminar App Dengan ReactJS dan CodeIgniter 3',
    image: '',
    url: '',
  }
class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu = function() {
        this.setState({ showMenu: !this.state.showMenu });
      }


    render() {
        
        return (
            
            <>
            <Helmet>
                <title>{ seo.title }</title>
                <meta name="description" content={seo.description} />
                <style type="text/css">{`
                body {
                    background-color: #fff;
                }
                `}
                </style>
            </Helmet>

            <Navbar toggleMenu={this.toggleMenu} />
                
                <div className="wrapper">
                {isAdmin() ?
                <>
                <Sidebar showMenu={this.state.showMenu} />
                </>
                :
                <>
            
                </>
                } 

                
                <div id="content" className="mt-3">
 
                <MyRouter/>
 
                </div>
                
                </div>
            <Footer />
            </>
        )
    }
}

export default Home