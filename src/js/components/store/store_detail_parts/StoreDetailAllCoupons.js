/**
 * Created by korman on 03.06.17.
 */

import Config from '../../Config';
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class StoreDetailAllCoupons extends React.Component {
    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            shopperId: props.shopperId,
            items: [],
            count_pages: 1,
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>
        };
    }

    componentDidMount(props) {
        const config = new Config();

        console.log('all coupons');
        axios.get(config.baseUrl + 'coupon/shopper-all-coupon/rest/' + this.state.shopperId, {
            params: {
                method: 'LIST',
                page: 1,
                items_on_page: 100
            }
        }).then(response => {
            this.setState({
                items: response.data.items,
                count_pages: response.data.count_pages
            });
            this.setState({status: 'List empty'});
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }

    render(){
        if (this.state.items.length > 0) {
            return (
                <div className="zan-thumb-layout">
                    {
                        this.state.items.map((item, index) =>
                            <div key={index} className="zan-card zan-container-content">
                                <Link to={`/store/coupon/${item.coupon.id}`}>
                                    <div className="zan-container zan-red">
                                        <h4>{item.coupon.title}</h4>
                                        <b>Days left: {item.daysLeft < 0 ? 'expired' : item.daysLeft}</b>
                                        <em>{item.startTimeFormat} - {item.expiredTimeFormat}</em>
                                    </div>
                                </Link>
                                <div className="zan-action-button">
                                    {/*<a href="#" className="show-dialog-add-coupon">*/}
                                        {/*<img src="images/zan-icon/coupon-add.png" alt="" width="28" height="28"/>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div>{this.state.status}</div>
            );
        }
    }
}