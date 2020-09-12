import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import {ImagesUrl} from '../Configs/Url'
import {Carousel} from 'react-bootstrap'
import TinySlider from 'tiny-slider-react'
import 'tiny-slider/dist/tiny-slider.css';

const settings = {
    lazyload: false,
    nav: true,
    navPosition: 'bottom',
    mouseDrag: true,
    controls: false,
    edgePadding: 100,
    speed: 400,
    gutter: 20,
    items: 1,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    arrowKeys: true
  };
const url = ImagesUrl();
class Slideshow extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        const ListSlideshow = this.props.data.map((s, index) => (
            <div key={index} style={{ position: "relative" }} >
                <img
                className="rounded d-block w-100"
                src={url+s.gambar_slide}
                alt={s.tulisan_slide}
                />
            </div>

        ))
        return (
            <TinySlider settings={settings}>
                {ListSlideshow}
            </TinySlider>
        )
    }
}

export default Slideshow