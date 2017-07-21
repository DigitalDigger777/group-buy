/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import axios from 'axios';
import PageLoader from '../parts/PageLoader';
import Menu from '../parts/Menu';
import Config from '../Config';
import RedeemCouponPopup from '../popup/RedeemCouponPopup';


export default class CouponMessageDetail extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            couponId: props.match.params.id,
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>
        };
        this.redeem = this.redeem.bind(this);
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;


        axios.get(apiUrl + 'coupon/rest/' + this.state.couponId).then(response => {
            // console.log(response.data);
            this.setState({item:response.data[0]});
            this.setState({expiredTime: response.data.expiredTimeFormat});
            this.setState({startTime: response.data.startTimeFormat});
            this.setState({daysLeft: response.data.daysLeft});

            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
            this.setState({status: 'Coupon not found'});
            console.log(this.state);
        }).catch(function(error){
            console.log(error);
        });
    }

    redeem() {

        $('#redeemCouponPopup').modal('show');
    }

    render(){
        if (this.state.item) {
            const config = new Config();

            return (
                <div>
                    <PageLoader/>
                    {/*<Header/>*/}
                    <RedeemCouponPopup issuedCouponId={this.state.item.id} />

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">

                            <div className="content">
                                <div className="zan-container-content">
                                    <div className="zan-content-header">
                                        <h2>


                                            { this.state.item.shopper.logo && (
                                                <img className="preload-image" data-original={`${config.baseImagePath}logos/${this.state.item.shopper.logo}`} alt="" width="40"/>
                                            )}

                                            { !this.state.item.shopper.logo && (
                                                <img className="preload-image" data-original="images/zan-images/u150.png" alt="img" width="40"/>
                                            )}

                                            { this.state.item.shopper.name }
                                        </h2>
                                        <h1 className="zan-red">{ this.state.item.title }</h1>
                                        <div className="zan-container zan-container-detail">
                                            <em>{this.state.startTime}-{this.state.expiredTime}</em>
                                        </div>
                                    </div>
                                    <div className="zan-content">
                                        {/*<div className="zan-title-coupon">*/}
                                            {/*<img className="preload-image"*/}
                                                 {/*data-original="images/zan-images/friends-coupon.png" alt="img"*/}
                                                 {/*height="50" style={{margin: '0 auto'}}/>*/}
                                            {/*<span>{this.state.item.coupon.title}</span>*/}
                                        {/*</div>*/}

                                        <div className="zan-container zan-container-detail">
                                            <p>{ this.state.item.content }</p>
                                            {/*<b>Days left: {this.state.daysLeft}</b><br/>*/}

                                        </div>
                                        {/*<div className="center-text">*/}
                                            {/*<div className="zan-qr-code">*/}
                                                {/*<img className="preload-image"*/}
                                                     {/*data-original={config.baseUrl+`qrcode/${this.state.item.code}.png`} alt="img"*/}
                                                     {/*width="100"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="zan-coupon-number">#{this.state.item.code}</div>*/}
                                        {/*</div>*/}
                                        <div className="zan-content-footer">
                                            <div className="center-text">
                                                {/*Offer expires December 4, 2016. Offer not valid on Value Deals menu*/}
                                                {/*items. Cannot be combined with any other promotional offer. One coupon*/}
                                                {/*can be redeemed per guest per visit. No cash value.*/}
                                                {/*<br/>Welcomed at part cipaning A&W Restaurants in Canada.*/}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="footer footer-light">

                            </div>
                        </div>
                    </div>

                    <Menu/>

                    <div className="background"></div>
                </div>
            );
        } else {
            return (
                <div>{this.state.status}</div>
            );
        }
    }
}