
import React from 'react';
import ReactDOM from 'react-dom';
import BodyGroupBuy from './components/group_buy/BodyGroupBuy';

import JoinedConsumerList from './components/group_buy/joined_consumer_list/JoinedConsumerList';

import GroupBuyActiveList from './components/group_buy/product_list/GroupBuyActiveList';
import GroupBuyRefundList from './components/group_buy/product_list/GroupBuyRefundList';
import GroupBuySuccessfulList from './components/group_buy/product_list/GroupBuySuccessfulList';

import ProductDetail from './components/group_buy/ProductDetail';
import Login from './components/user/Login';
import LoginWechat from './components/user/LoginWechat';

import { HashRouter,Route, hashHistory } from 'react-router-dom'

export default class Index extends React.Component{
    constructor(){
        super();
    }

    render(){

        return (
            <HashRouter history={hashHistory}>
                <div>
                    {/*<Route exact path="/" component={BodyCoupon} />*/}
                    {/*<Route exact path="/coupon/friend/list" component={BodyCoupon} />*/}
                    {/*<Route exact path="/coupon/:id" component={CouponDetail} />*/}
                    {/*<Route exact path="/coupon/scan/:source_type/:id" component={CouponScanDetail} />*/}
                    {/*<Route exact path="/coupon/message/detail/:id" component={CouponMessageDetail} />*/}

                    {/*<Route exact path="/friend/coupon/:id" component={CouponFriendDetail} />*/}
                    {/*<Route exact path="/friend/coupon/:id/:issuedCouponId/:ownerUserId" component={CouponFriendDetail} />*/}

                    {/*<Route exact path="/stores" component={BodyStore} />*/}
                    {/*<Route exact path="/store/:id" component={StoreDetail} />*/}
                    {/*<Route exact path="/store/all-coupons/:id" component={StoreDetail} />*/}
                    {/*<Route exact path="/store/your-coupons/:id" component={StoreDetail} />*/}
                    {/*<Route exact path="/store/coupon/:id" component={StoreCouponDetail} />*/}

                    {/*<Route exact path="/profile" component={Profile} />*/}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login-wechat" component={LoginWechat} />

                    {/*<Route exact path="/messages" component={BodyMessage} />*/}

                    <Route exact path="/" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/active-list" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/successful-list" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/refund-list" component={BodyGroupBuy} />

                    <Route exact path="/group-buy/joined-consumer-list/:groupBuyId" component={JoinedConsumerList} />

                    <Route exact path="/group-buy/product-detail/:productId" component={ProductDetail} />
                </div>
            </HashRouter>
        )
    }
}
ReactDOM.render(<Index/>,document.getElementById('page-transitions'));