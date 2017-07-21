/**
 * Created by korman on 03.06.17.
 */

import Config from '../Config';
import React from 'react';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';
import Menu from '../parts/Menu';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StoreDetailTabs from './store_detail_parts/StoreDetailTabs';

export default class StoreList extends React.Component {
    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            shopperId: props.match.params.id,
            item: null,
            yourCountCoupons: 0,
            tab: /\/store\/([\w\W]+)\/[0-9]+/.exec(props.match.url)[1],
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>
        };



    }

    componentDidMount(props) {
        const config = new Config();

        axios.get(config.baseUrl + 'coupon/shopper/rest/' + this.state.shopperId, {
            params: {
                consumer_id: window.localStorage.getItem('user_id')
            }
        }).then(response => {
            this.setState({
                item: response.data[0],
                yourCountCoupons: response.data.yourCountCoupons
            });
            this.setState({status: 'Store not found'});
            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
        }).catch(function(error){
            console.log(error);
        });


    }

    render(){
        const config = new Config();

        if (this.state.item) {
            return (
                <div>
                    <PageLoader/>
                    {/*<Header/>*/}

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">

                            <div className="content">
                                <div className="zan-card zan-card-1 zan-container-content">
                                    {this.state.item.logo && (
                                        <img className="preload-image"
                                             data-original={`${config.baseImagePath}logos/${this.state.item.logo}`}
                                             alt="img" style={{display: 'block'}}/>
                                    )}


                                    <div className="zan-wrap-content center-text">
                                        <strong>{this.state.item.name}</strong>
                                        <p className="address">{this.state.item.address}</p>
                                        <div className="center-text">
                                            <a href={`tel:${this.state.item.tel}`}>
                                                <img src="images/zan-icon/call.png" alt="" width="32" height="32"/>
                                            </a>
                                            <a href={this.state.item.site} target="_blank">
                                                <img src="images/zan-icon/link.png" alt="" width="32" height="32"/>
                                            </a>
                                        </div>
                                        <div>
                                            <div className="float-left">Total Coupon <span>{this.state.item.countCoupons}</span></div>
                                            <div className="float-left">Your Coupon <span>{this.state.yourCountCoupons}</span></div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                </div>

                                <div className="home-tabs zan-filter-tabs">
                                    <Link to={`/store/all-coupons/${this.state.shopperId}`} className={`activate-tab-1 ${this.state.tab == 'all-coupons' ? 'active-home-tab' : ''}`}>
                                        All
                                    </Link>
                                    <Link to={`/store/your-coupons/${this.state.shopperId}`} className={`activate-tab-2 ${this.state.tab == 'your-coupons' ? 'active-home-tab' : ''}`}>
                                        Yous
                                    </Link>
                                    <div className="clear"></div>
                                </div>
                                <div id="tab-1">
                                    <StoreDetailTabs shopperId={this.state.shopperId} tab={this.state.tab}/>
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