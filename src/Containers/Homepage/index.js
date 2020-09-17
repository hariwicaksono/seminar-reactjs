import React, { Component } from 'react'
import Navbar from '../../Components/Navbar'
//import Footer from '../../Components/Footer'
//import Appbar from '../../Components/Appbar'
//import Sidebar from '../../Components/Sidebar'
import { Helmet } from 'react-helmet'
import MyRouter from '../../Configs/Routes'

const TITLE = 'Seminar App'

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
                <title>{ TITLE }</title>
                <style type="text/css">{`
                body {
                    background-color: #fff;
                }
                `}
                </style>
            </Helmet>

            <Navbar toggleMenu={this.toggleMenu} />
                
                <div className="wrapper">

                <div id="content">

                <MyRouter/>
 
                </div>
                
                </div>
            
            </>
        )
    }
}

export default Home