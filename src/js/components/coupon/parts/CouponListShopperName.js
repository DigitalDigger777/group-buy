/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import Config from '../../Config';

export default class CouponListShopperName extends React.Component {

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

        if (this.state.item.issued_coupon.coupon.shopper.logo != "") {
            return (

                    <div style={{width:'100px', float: 'left', marginTop: '8%'}}>
                        <img  style={{width:'100px'}} className="preload-image" data-original={`${config.baseImagePath}logos/${this.state.item.issued_coupon.coupon.shopper.logo}`} alt="img"/>
                    </div>

            );
        } else {
            return (
                <div style={{width:'100px', float: 'left', marginTop: '20px'}}>
                    <img className="preload-image" data-original={`images/zan-images/u150.png`} alt="img" />
                </div>
            );
        }
    }
}