/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CouponListShopperName from './parts/CouponListShopperName';
import Config from '../Config';

export default class CouponCouponsList extends React.Component {

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

        axios.get(apiUrl + 'coupon/consumer-coupon/rest/0', {
            params: {
                method:         'LIST',
                page:           this.state.page,
                items_on_page:  5,
                consumerId:     userId
            }
        }).then(response => {
            console.log(response.data.items);
            this.setState({countPages:response.data.count_pages});
            this.setState({items: response.data.items});
            this.setState({status: 'List empty'});

            console.log(this.state);
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
                                <Link to={`/coupon/${item.issued_coupon.id}`}>
                                    <CouponListShopperName item={item}/>

                                    <div className="zan-wrap-content">
                                        <strong>{item.issued_coupon.coupon.shopper.name}</strong>
                                        <p>{item.issued_coupon.coupon.title}</p>
                                        <div>
                                            {/*<i className="fa">*/}
                                                {/*<img className="footer-menu-icon" src="images/zan-icon/coupon.png" width="24" height="24" alt=""/>*/}
                                            {/*</i>*/}
                                            <span className="qty">{ item.startTimeFormat } - { item.expiredTimeFormat }</span>
                                            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
                                            {
                                                JSON.parse(item.issued_coupon.source).headimgurl && (
                                                    <div>
                                                        {/*<img className="quote-image"*/}
                                                             {/*src={ JSON.parse(item.issued_coupon.source).headimgurl } width={'30px'} alt=""/>*/}
                                                        <p><b>收到: </b> {JSON.parse(item.issued_coupon.source).nickname}</p>
                                                    </div>
                                                )
                                            }
                                            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
                                            <div className="container" style={{marginBottom: '0px', paddingLeft: '0px'}}>
                                                <div className="one-half" style={{width: '89px'}}>
                                                    {item.issued_coupon.isRedeemed && (<span className="label label-danger">赎回</span>)}
                                                    {!item.issued_coupon.isRedeemed && (<p>&nbsp;</p>)}
                                                </div>
                                                <div className="one-half last-column">
                                                    <p style={{marginLeft: '50px', width: '50px'}}>
                                                        详情
                                                        <span style={{paddingTop: '3px'}} className="fa fa-chevron-right" aria-hidden="true"></span>
                                                    </p>
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