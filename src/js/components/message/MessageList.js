/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Config from '../Config';

export default class MessageList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            countPages: 1,
            items: [],
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>,
            page: props.page,
            lastPage: false
        }
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;
        const userId = window.localStorage.getItem('user_id');

        axios.get(apiUrl + 'consumer/message/items/' + userId, {
            params: {
                method: 'LIST',
                page: this.state.page,
                items_on_page: 5,
                consumerId: userId
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
    //
    // componentWillReceiveProps(props){
    //     const config = new Config();
    //     const apiUrl = config.baseUrl;
    //     const userId = window.localStorage.getItem('user_id');
    //
    //     axios.get(apiUrl + 'coupon/consumer-issued-friend/rest/0', {
    //         params: {
    //             method: 'LIST',
    //             page: props.page,
    //             items_on_page: 5,
    //             consumerId: userId
    //         }
    //     }).then(response => {
    //         if (response.data.items.length > 0 && !this.state.lastPage) {
    //             console.log(response.data.items);
    //             response.data.items.map(item => {
    //                 this.state.items.push(item);
    //             });
    //
    //             this.setState({countPages: response.data.count_pages});
    //             // this.setState({items: response.data.items});
    //             this.setState({status: 'List empty'});
    //             console.log(this.state);
    //         } else {
    //             this.setState({lastPage: true});
    //         }
    //     }).catch(function(error){
    //         console.log(error);
    //     });
    // }

    render(){

        if (this.state.items.length > 0) {
            const config = new Config();
            // const ownerUserId = window.localStorage.getItem('user_id');
            // console.log(ownerUserId);

            // let logo = <img src="images/pictures/1t.jpg" alt="img" />;
            //
            // if (this.state.item.logo) {
            //
            //     //logo = <img src={`${config.baseImagePath}logos/${this.state.item.logo}`} alt="img" />;
            // }

            return (
                <div>
                    {
                        this.state.items.map((item, index) =>
                            <div key={index}>
                                <Link className="zan-contact-title" to={`coupon/message/detail/${item[0].data.couponId}`}>

                                    { item[0].shopper.logo && (
                                        <img src={`${config.baseImagePath}logos/${item[0].shopper.logo}`} alt="img" />
                                    ) }

                                    <div className="zan-message-content">
                                        <strong>{item[0].title}</strong><br />
                                        <em>{item[0].message}</em>
                                    </div>
                                    <div className="zan-message-details">
                                        { item.months > 0 && (
                                            <span className="zan-time-ago">{item.months}mos ago</span>
                                        )}

                                        { item.months == 0 && item.days > 0 && (
                                            <span className="zan-time-ago">{item.days}d ago</span>
                                        )}

                                        { item.months == 0 && item.days == 0 && item.hours > 0 && (
                                            <span className="zan-time-ago">{item.hours}h ago</span>
                                        )}

                                        { item.months == 0 && item.days == 0 && item.hours == 0 && item.minutes > 0 && (
                                            <span className="zan-time-ago">{item.minutes}m ago</span>
                                        )}
                                    </div>
                                </Link>
                                <div className="decoration"></div>
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