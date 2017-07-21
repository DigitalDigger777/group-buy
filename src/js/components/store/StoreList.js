/**
 * Created by korman on 03.06.17.
 */

import Config from '../Config';
import React from 'react';
import axios from 'axios';
import StoreListItem from './StoreListItem';
import $ from 'jquery';

export default class StoreList extends React.Component {
    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            countPages: 1,
            items: [],
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>,
            page: props.page
        }

    }

    componentDidMount(props){
        const config = new Config();

        axios.get(config.baseUrl + 'coupon/shopper/rest/0', {
            params: {
                method:'LIST',
                page:this.state.page,
                items_on_page:7
            }
        }).then(response => {
            //console.log(response.data.items);
            this.setState({countPages:response.data.count_pages});
            this.setState({items: response.data.items});
            this.setState({status: 'List empty'});
            //console.log(this.state);
        }).catch(function(error){
            console.log(error);
        });

    }

    componentWillReceiveProps(props){
        const config = new Config();

        axios.get(config.baseUrl + 'coupon/shopper/rest/0', {
            params: {
                method:'LIST',
                page:props.page,
                items_on_page:7
            }
        }).then(response => {
            //console.log(response.data.items);
            if (response.data.items.length > 0) {

                response.data.items.map(item => {
                    this.state.items.push(item);
                });

                this.setState({countPages: response.data.count_pages});
                //this.setState({items: items});
                this.setState({status: 'List empty'});
                console.log(this.state);
            }
            //console.log(this.state);
        }).catch(function(error){
            console.log(error);
        });
    }

    render(){
        if (this.state.items.length > 0) {
            console.log(this.state.items);
            // this.state.changePage = false;
            return (
                <div>
                    {
                        this.state.items.map((item, index) =>
                            <StoreListItem key={index} item={item} />
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