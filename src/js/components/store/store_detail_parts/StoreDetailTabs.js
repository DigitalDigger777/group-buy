/**
 * Created by korman on 03.06.17.
 */

import Config from '../../Config';
import React from 'react';
import axios from 'axios';
import StoreDetailAllCoupons from './StoreDetailAllCoupons';
import StoreDetailYourCoupons from './StoreDetailYourCoupons';

export default class StoreDetailTabs extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tab: props.tab,
            shopperId: props.shopperId
        };
        //console.log(props);
    }

    componentDidMount(props) {
        const config = new Config();

    }

    render(){

        if (this.state.tab == 'all-coupons') {
            return (
                <StoreDetailAllCoupons shopperId={this.state.shopperId} />
            );
        } else {
            return (
                <StoreDetailYourCoupons shopperId={this.state.shopperId}/>
            );
        }
    }
}