/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import Config from './../../../Config';

export default class ProductListProductName extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            item: props.item
        }
    }

    componentDidMount(props){
        $(".preload-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            container: $("#page-content-scroll")
        });
    }

    render(){
        const config = new Config();

        if (this.state.item.groupBuyTemplate.product.images.length > 0) {
            return (
                <img  className="preload-image" style={{width:'100%', display: 'block' }} data-original={`${config.baseImagePath}images/${this.state.item.groupBuyTemplate.product.images[0]}`} alt="img"/>
            );
        } else {
            return (
                <img className="preload-image"  style={{ display: 'block' }} data-original={`images/zan-images/no_photo_large.png`} alt="img" />
            );
        }
    }
}