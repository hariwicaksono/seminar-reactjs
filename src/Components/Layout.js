import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
//import Appbar from './/Appbar'
import Sidebar from './Sidebar'
import { Helmet } from 'react-helmet'
import MyRouter from '../Configs/Routes'
import { isAdmin } from '../Utils'

export const seo = {
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
                <title data-react-helmet="true">{ seo.title }</title>
                <meta data-react-helmet="true" name="description" content={seo.description} />
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