/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import axios from 'axios';
import PageLoader from '../parts/PageLoader';
// import Menu from '../parts/Menu';
import Config from '../Config';
// import RedeemCouponPopup from '../popup/RedeemCouponPopup';

export default class ProductDetail extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            productId: props.match.params.productId,
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>
        };

        this.redeem = this.redeem.bind(this);
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;

        axios.get(apiUrl + 'coupon/product/' + this.state.productId).then(response => {
            console.log(response.data);
            this.setState({item:response.data});
            // this.setState({expiredTime: response.data.expiredTimeFormat});
            // this.setState({startTime: response.data.startTimeFormat});
            // this.setState({daysLeft: response.data.daysLeft});

            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
            this.setState({status: 'Product not found'});

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
                    {/*<RedeemCouponPopup issuedCouponId={this.state.item.id} />*/}

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">

                            <div className="content">
                                <div className="zan-container-content">
                                    <div className="zan-content-header">
                                        <h2>
                                            { this.state.item.name }
                                        </h2>
                                        {/*<h1 className="zan-red">{ this.state.item.name }</h1>*/}
                                    </div>

                                    <div className="zan-content">
                                        <div className="zan-container zan-container-detail" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                                            { this.state.item.images.length > 0 && (
                                                <img src={`${config.baseImagePath}images/${this.state.item.images[0]}`} alt="" style={{width: '100%', paddingTop: '20px'}}/>
                                            )}

                                        </div>
                                        <div className="zan-container zan-container-detail">
                                            <b>Original Price: {this.state.item.price}$</b><br/>
                                            {/*<em>{this.state.startTime}-{this.state.expiredTime}</em>*/}
                                        </div>
                                        <div className="zan-container zan-container-detail" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                                            <h2>Description:</h2>
                                            <p>{ this.state.item.description }</p>
                                        </div>
                                        <div className="zan-content-footer">
                                            <div className="center-text">

                                            </div>
                                        </div>
                                    </div>
                                    {/*{!this.state.item.isRedeemed && this.state.daysLeft > 0 && (*/}
                                        {/*<div style={{textAlign:'center', padding: '20px'}}>*/}
                                            {/*<button id="redeemButton" className="btn btn-info" onClick={ this.redeem } style={{ width: '90%', backgroundColor: '#887650', borderColor: '#887650'}}>使用</button>*/}
                                            {/*<p style={{marginBottom: '0px'}}>点击“使用”按钮，将会作废此优惠券。仅供商家使用！</p>*/}
                                        {/*</div>*/}
                                    {/*)}*/}

                                    {/*{this.state.item.isRedeemed && (*/}
                                        {/*<div style={{textAlign:'center', padding: '5px'}}>*/}
                                            {/*<p style={{marginBottom: '0px'}}>This coupon is redeemed</p>*/}
                                        {/*</div>*/}
                                    {/*)}*/}

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