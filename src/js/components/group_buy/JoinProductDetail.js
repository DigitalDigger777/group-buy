/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import axios from 'axios';
import PageLoader from '../parts/PageLoader';
import Menu from '../parts/Menu';
import Config from '../Config';
// import RedeemCouponPopup from '../popup/RedeemCouponPopup';

export default class JoinProductDetail extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            productId: props.match.params.productId,
            groupBuyId: props.match.params.groupBuyId,
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

    redeem(e, groupBuyId) {

        console.log(groupBuyId);
        const config = new Config();
        const userId = window.localStorage.getItem('user_id');

        window.location = config.baseFrontUrl + 'stripe.html?groupBuyId=' + groupBuyId + '&userId=' + userId;

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

                            <section className="main-view">
                                <div className="flexslider" style={{marginBottom:'10px'}}>
                                    <ul className="slides">
                                        <li>
                                            { this.state.item.images.length > 0 && (
                                                <img src={`${config.baseImagePath}images/${this.state.item.images[0]}`} />
                                            )}

                                            { this.state.item.images.length == 0 && (
                                                <img src={`images/zan-images/no_photo_large.png`} />
                                            )}
                                        </li>
                                    </ul>
                                </div>

                                <div className="tm">
                                    <form action="javascript:addToCart(221)" method="post" name="HHS_FORMBUY" id="HHS_FORMBUY">
                                        <div className="td2">
                                            <div className="td2_original_price">
                                                <span>{this.state.item.price}$</span>
                                                {/*<div className="mar_price"><del></del><del id="market_price">{this.state.item.price}$</del></div>*/}
                                                {/*<div className="td2_sold_quantity"><span>累计销量：<i id="sold_quantity">0</i></span></div>*/}
                                            </div>
                                            <div className="td2_name">{this.state.name}</div>
                                            <div className="td2_cx">
                                                { this.state.item.description }
                                                <br/>
                                                <br/>
                                                <br/>
                                                <button id="redeemButton" className="btn btn-info" onClick={ (e, groupBuyId) => this.redeem(e, this.state.groupBuyId) } style={{ width: '100%', backgroundColor: '#887650', borderColor: '#887650'}}>Buy</button>
                                            </div>
                                            <div className="td2_info">

                                            </div>
                                            <div className="td2_num">

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </section>

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