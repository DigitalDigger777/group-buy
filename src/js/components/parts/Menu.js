/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
    constructor(props){
        super(props);

        console.log('menu', window.location.hash);
        this.state = {
            activeCoupon: '',
            activeStores: '',
            activeMessages: '',
            activeCouponColor: '#887650',
            activeStoresColor: '#887650',
            activeMessagesColor: '#887650',
        }
    }

    componentWillMount(){

        switch (window.location.hash) {
            case '#/':
                    this.state.activeCoupon = 'zan-active';
                    this.state.activeCouponColor = '#000000';
                break;
            case '#/group-buy/successful-list':
                    this.state.activeCoupon = 'zan-active';
                    this.state.activeCouponColor = '#000000 !important';
                break;
            case '#/group-buy/refund-list':
                    this.state.activeCoupon = 'zan-active';
                    this.state.activeCouponColor = '#000000 !important';
                break;
            case '#/group-buy/product-list':
                    this.state.activeMessages = 'zan-active';
                    this.state.activeMessagesColor = '#000000 !important';
                break;
        }

    }

    render(){

        return (
            <div className="footer-menu footer-menu-light">
                <Link to="/" style={{color:this.state.activeCouponColor}}><i className={`fa zan-coupon ${this.state.activeCoupon}`}></i>Group Buy</Link>
                {/*<Link to="/stores" style={{color:this.state.activeStoresColor}}><i className={`fa zan-coupon ${this.state.activeStores}`}></i>Stores</Link>*/}
                <Link to="/group-buy/product-list" style={{color:this.state.activeMessagesColor}}><i className={`fa zan-coupon ${this.state.activeMessages}`}></i>Products</Link>
                {/*<Link to="/profile"><i className="fa zan-coupon"></i>Profile</Link>*/}

                {/*<a href="main.html" className="zan-active" ><i className="fa zan-coupon"></i>Coupons</a>*/}
                {/*<a href="stores.html" ><i className="fa zan-store"></i>Stores</a>*/}
                {/*<a href="scan.html" ><i className="fa zan-scan"></i>Scan</a>*/}
                {/*<a href="messages.html" ><i className="fa zan-message"></i>Messages</a>*/}
                {/*<a href="profile.html" ><i className="fa zan-profile"></i>Profile</a>*/}
            </div>
        );
    }
}