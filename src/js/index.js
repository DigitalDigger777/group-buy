import React from 'react';
import ReactDOM from 'react-dom';
import BodyGroupBuy from './components/group_buy/BodyGroupBuy';
import BodyProduct from './components/product/BodyProduct';
import JoinedConsumerList from './components/group_buy/joined_consumer_list/JoinedConsumerList';
import ProductDetail from './components/group_buy/ProductDetail';


import { HashRouter,Route, hashHistory } from 'react-router-dom'

export default class Index extends React.Component{

    constructor(){
        super();
    }

    render(){

        return (
            <HashRouter history={hashHistory}>
                <div>
                    <Route exact path="/" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/active-list" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/successful-list" component={BodyGroupBuy} />
                    <Route exact path="/group-buy/refund-list" component={BodyGroupBuy} />

                    <Route exact path="/group-buy/joined-consumer-list/:groupBuyId" component={JoinedConsumerList} />

                    <Route exact path="/group-buy/product-list" component={BodyProduct} />
                    <Route exact path="/group-buy/product-detail/:productId" component={ProductDetail} />
                </div>
            </HashRouter>
        )
    }
}

ReactDOM.render(<Index/>,document.getElementById('page-transitions'));