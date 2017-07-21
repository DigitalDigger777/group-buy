/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
//import CouponList from './CouponList';
import GroupBuyList from './product_list/GroupBuyList';

import PageLoader from '../parts/PageLoader';
import Menu from '../parts/Menu';
import {Link} from 'react-router-dom';
import Bootstrap from 'bootstrap';
import SentCouponToFriendPopup from '../popup/SentCouponToFriendPopup';
import Config from '../Config';
import axios from 'axios';

export default class BodyGroupBuy extends React.Component {

    constructor(props){
        super(props);

        let tab = 'active';

        if (props.location.pathname == '/group-buy/successful-list') {
            tab = 'successful';
        }

        if (props.location.pathname == '/group-buy/refund-list') {
            tab = 'refund';
        }

        this.state = {
            tab: tab,
            user: null,
            status: 'Component will mount'
        };

        console.log(this.state);
    }

    componentWillMount() {
        const config = new Config();

        const matchUser = /\?user=([\w\W]+)/.exec(window.location.search);
        const user      = matchUser ? JSON.parse(decodeURI(matchUser[1])) : null;
        this.state.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;

        if (user == null && this.state.user == null) {
            this.state.status = '';
            window.location = config.buildAuthUrl();
        }

        if (user != null) {

            this.state.user = user;
            this.state.status = 'Get user';

            //set here
            axios.post(config.baseUrl + 'coupon/consumer/rest/0', {
                socialId: user.unionid,
                socialDataProfile: user
            }).then(result => {

                window.localStorage.setItem('user_id', result.data.id);
                window.localStorage.setItem('user', JSON.stringify(user));

                this.state.status = 'Authorized user';
            }).catch(error => {
                console.log(error);
            });

        }
    }

    render(){

        if (this.state.user) {
            return (
                <div>
                    <PageLoader/>
                    <SentCouponToFriendPopup/>

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">
                            <div className="content">
                                <div className="home-tabs">
                                    <Link to={'/'}
                                          className={`activate-tab-2 ${this.state.tab == 'active' ? 'active-home-tab' : ''}`}>Active</Link>
                                    <Link to={'/group-buy/successful-list'}
                                          className={`activate-tab-3 ${this.state.tab == 'successful' ? 'active-home-tab' : ''}`}>Successful</Link>
                                    <Link to={'/group-buy/refund-list'}
                                          className={`activate-tab-4 ${this.state.tab == 'refund' ? 'active-home-tab' : ''}`}>Refund</Link>
                                    <div className="clear"></div>
                                </div>
                            </div>

                            <div className="content" id="tab-1">
                                <GroupBuyList tab={this.state.tab} />
                            </div>

                            <div className="footer footer-light"></div>

                        </div>
                    </div>

                    {/*<Menu/>*/}

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

