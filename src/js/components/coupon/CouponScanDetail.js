/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import axios from 'axios';
import PageLoader from '../parts/PageLoader';
import Menu from '../parts/Menu';
import Config from '../Config';
import AcceptCouponPopup from '../popup/AcceptCouponPopup';
import wx from 'weixin-jsapi';

export default class CouponScanDetail extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            couponId: props.match.params.id,
            sourceType: props.match.params.source_type,

            issuedCouponId: props.match.params.issuedCouponId,
            ownerUserId: props.match.params.ownerUserId,
            userId: window.localStorage.getItem('user_id'),
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>,
            wxReady: false
        }
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;

        axios.get(apiUrl + 'coupon/rest/' + this.state.couponId).then(response => {
            console.log(response.data);
            this.setState({item:response.data[0]});
            this.setState({expiredTime: response.data.expiredTimeFormat});
            this.setState({startTime: response.data.startTimeFormat});
            this.setState({daysLeft: response.data.daysLeft});

            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
            // this.setState({status: 'Coupon not found'});
            window.localStorage.setItem('scanCouponId', this.state.couponId);

            if (this.state.userId != null) {
                axios.post(config.baseUrl + 'coupon/issued/rest/0', {
                    consumerId: this.state.userId,
                    couponId: this.state.couponId,
                    sourceType: this.state.sourceType,
                    source: JSON.stringify({
                        fromConsumerId: this.state.userId,

                        //headimgurl: user.headimgurl,
                        //nickname: user.nickname
                    })
                }).then(res => {
                    //$('#acceptCouponPopup').modal('show');
                    window.localStorage.removeItem('scanCouponId');
                });
            }

            console.log(this.state);
        }).catch(function(error){
            console.log(error);
        });
    }

    render(){
        if (this.state.item) {
            return (
                <div>
                    <PageLoader/>
                    {/*<Header/>*/}
                    <AcceptCouponPopup/>

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">

                            <div className="content">
                                <div className="zan-container-content">
                                    <div className="zan-content-header">
                                        <h2>
                                            <img className="preload-image" data-original="images/zan-images/u150.png"
                                                 alt="img" width="40"/>
                                            { this.state.item.shopper.name }
                                        </h2>
                                        <h1 className="zan-red">{ this.state.item.title }</h1>
                                        <div className="zan-container zan-container-detail">
                                            <b>Days left: {this.state.daysLeft < 0 ? 'expired' : this.state.daysLeft}</b><br/>
                                            <em>{this.state.startTime} - {this.state.expiredTime}</em>
                                        </div>
                                    </div>
                                    <div className="zan-content">
                                        <div className="zan-title-coupon">
                                            <img className="preload-image"
                                                 data-original="images/zan-images/friends-coupon.png" alt="img"
                                                 height="50" style={{margin: '0 auto'}}/>
                                            <span>Friend's coupon</span>
                                        </div>

                                        <div className="zan-container zan-container-detail">
                                            <p>{ this.state.item.content }</p>

                                        </div>
                                        <div className="center-text">
                                            {/*<div className="zan-qr-code">*/}
                                                {/*<img className="preload-image"*/}
                                                     {/*data-original="images/zan-images/qr-code.png" alt="img"*/}
                                                     {/*width="100"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="zan-coupon-number">172891</div>*/}
                                        </div>

                                        {/*<div className="zan-content-footer">*/}
                                            {/*<div className="center-text">*/}
                                                {/*Offer expires December 4, 2016. Offer not valid on Value Deals menu*/}
                                                {/*items. Cannot be combined with any other promotional offer. One coupon*/}
                                                {/*can be redeemed per guest per visit. No cash value.*/}
                                                {/*<br/>Welcomed at part cipaning A&W Restaurants in Canada.*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    </div>


                                    <div className="zan-container">
                                        <h2>如何得到这个优惠券</h2>

                                        <p>1. 关注公众号"大温折扣通".</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-1.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>2. 进入公众号后点击“PPCG优惠券"</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-2.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>3. 点击优惠券</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-3.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>4. 点击朋友的券，找到这张优惠券</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-4.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>5. 点击右上方的。。。</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-5.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>6. 点击发送给朋友和分享到朋友圈，可以发送优惠券给微信朋友和朋友圈</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-6.png" alt="" style={{ width: '100%' }}/>
                                        </div>
                                        <p>7. 当朋友使用了这张优惠券，你也得到这张优惠券。你分享的越多，得到的优惠券机会越多。你可以到下方优惠券列表查看。</p>
                                        <div>
                                            <img src="/images/coupon-friend-scan/help-7.png" alt="" style={{ width: '100%' }}/>
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