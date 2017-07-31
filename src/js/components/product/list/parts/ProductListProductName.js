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
                <div style={{width:'100px', float: 'left', marginTop: '8%'}}>
                    <img  style={{width:'100px'}} className="preload-image" data-original={`${config.baseImagePath}logos/${this.state.item.groupBuyTemplate.product.images[0]}`} alt="img"/>
                </div>
            );
        } else {
            return (
                <div style={{width:'100px', float: 'left', marginTop: '20px', marginLeft: '20px'}}>
                    <img className="preload-image" data-original={`images/zan-images/u150.png`} alt="img" />
                </div>
            );
        }
    }
}