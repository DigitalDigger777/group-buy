/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GroupBuyListProductName from './parts/GroupBuyListProductName';
import Config from './../../Config';

export default class GroupBuySuccessfulList extends React.Component {

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

        axios.get(apiUrl + 'group-buy/group-buy/rest/0?status=2', {
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
                <div id="tuan" className="tuan">
                    <div id="inner" style={{marginBottom: '100px'}}>
                        {
                            this.state.items.map((item, index) =>

                                <div key={index} className="tuan_g">

                                    <div className="tuan_g_img">
                                        <Link to={`/group-buy/product-detail/${item.groupBuy.groupBuyTemplate.product.id}/${item.groupBuy.groupBuyTemplate.id}`}>
                                            <GroupBuyListProductName item={item}/>
                                        </Link>

                                    </div>
                                    <div className="tuan_g_info">
                                        <p className="tuan_g_name">{item.groupBuy.groupBuyTemplate.product.name}</p>
                                        <p className="tuan_g_cx"></p>
                                    </div>
                                    <div className="tuan_g_core">
                                        <div className="tuan_g_core_img" style={{zIndex: '10', top: '5px'}}>
                                            <img src="styles/haohaios/images/tuan_g_core-4935ae4c83.png" />
                                        </div>
                                        <div className="tuan_g_price">
                                            <span>{item.groupBuy.groupBuyTemplate.minBuyingPerson}人团</span>
                                            <b>{item.groupBuy.groupBuyTemplate.price}$</b>
                                        </div>
                                        <Link to={ `/group-buy/joined-consumer-list/${item.groupBuy.id}` }>
                                            <div className="tuan_g_btn">Joined</div>
                                        </Link>
                                    </div>
                                    {/*<div className="like goods_list_like">*/}
                                    {/*<a href="javascript:collect(222)" className="like_click_button"></a>*/}
                                    {/*</div>*/}

                                </div>
                            )

                        }
                    </div>
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