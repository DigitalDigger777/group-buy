/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GroupBuyListProductName from './parts/GroupBuyListProductName';
import Config from './../../Config';

export default class GroupBuyActiveList extends React.Component {

    constructor(props){

        super(props);
        const config = new Config();

        this.state = {
            countPages: 1,
            items: [],
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>,
            page: 1,
            lastPage: false
        }

    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;
        const userId = window.localStorage.getItem('user_id');

        axios.get(apiUrl + 'group-buy/group-buy/rest/0?status=1', {
            params: {
                method:         'LIST',
                page:           this.state.page,
                items_on_page:  5,
                consumerId:     userId
            }
        }).then(response => {

            this.setState({countPages:response.data.count_pages});
            this.setState({items: response.data.items});
            this.setState({status: 'List empty'});

        }).catch(function(error){
            console.log(error);
        });
    }

    componentWillReceiveProps(props){
        const config = new Config();
        const apiUrl = config.baseUrl;
        const userId = window.localStorage.getItem('user_id');

        if (!this.state.lastPage) {
            axios.get(apiUrl + 'coupon/consumer-coupon/rest/0', {
                params: {
                    method: 'LIST',
                    page: props.page,
                    items_on_page: 5,
                    consumerId: userId
                }
            }).then(response => {
                if (response.data.items.length > 0 && !this.state.lastPage) {

                    response.data.items.map(item => {
                        this.state.items.push(item);
                    });

                    this.setState({countPages: response.data.count_pages});
                    this.setState({status: 'List empty'});

                } else {
                    this.setState({lastPage: true});
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    render(){
        if (this.state.items.length > 0) {

            return (
                <div>
                    {
                        this.state.items.map((item, index) =>

                            <div key={index} className="zan-card zan-card-1 zan-container-content">

                                <Link to={ item.groupBuy.consumers.length == 0 ? `/group-buy/product-detail/${item.groupBuy.groupBuyTemplate.product.id}` : `/group-buy/joined-consumer-list/${item.groupBuy.id}`}>
                                    <GroupBuyListProductName item={item}/>

                                    <div className="zan-wrap-content">
                                        <strong>{item.groupBuy.groupBuyTemplate.product.name}</strong>
                                        <p>Original Price: {item.groupBuy.groupBuyTemplate.product.price}$</p>
                                        <p>Group Buy Price: {item.groupBuy.groupBuyTemplate.price}$</p>
                                        <div>
                                            {/*<i className="fa">*/}
                                            {/*<img className="footer-menu-icon" src="images/zan-icon/coupon.png" width="24" height="24" alt=""/>*/}
                                            {/*</i>*/}
                                            <span className="qty">{ item.dateExpiredFormat}</span>
                                            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
                                            {/*{*/}
                                                {/*JSON.parse(item.issued_coupon.source).headimgurl && (*/}
                                                    {/*<div>*/}
                                                        {/*/!*<img className="quote-image"*!/*/}
                                                        {/*/!*src={ JSON.parse(item.issued_coupon.source).headimgurl } width={'30px'} alt=""/>*!/*/}
                                                        {/*<p><b>收到: </b> {JSON.parse(item.issued_coupon.source).nickname}</p>*/}
                                                    {/*</div>*/}
                                                {/*)*/}
                                            {/*}*/}
                                            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
                                            <div className="container" style={{marginBottom: '0px', paddingLeft: '0px'}}>
                                                <div className="one-half" style={{width: '89px'}}>
                                                    {/*{item.issued_coupon.isRedeemed && (<span className="label label-danger">赎回</span>)}*/}
                                                    {/*{!item.issued_coupon.isRedeemed && (<p>&nbsp;</p>)}*/}
                                                    <p>&nbsp;</p>
                                                </div>
                                                <div className="one-half last-column">
                                                    { item.groupBuy.consumers.length > 0 && (
                                                        <p style={{marginLeft: '10px', width: '90px'}}>
                                                            Joined
                                                            <span style={{paddingTop: '3px'}} className="fa fa-chevron-right" aria-hidden="true"></span>
                                                        </p>
                                                    ) }

                                                    { item.groupBuy.consumers.length == 0 && (
                                                        <p style={{marginLeft: '10px', width: '90px'}}>
                                                            Group Buy
                                                            <span style={{paddingTop: '3px'}} className="fa fa-chevron-right" aria-hidden="true"></span>
                                                        </p>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        )

                    }

                </div>
            );
        } else {
            return(
                <div>
                    {this.state.status}
                </div>
            );
        }
    }
}