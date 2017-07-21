/**
 * Created by korman on 08.05.17.
 */

import Config from '../Config';
import React from 'react';
import axios from 'axios';

export default class SentCouponToFriendPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toConsumerId: 0
        };

        this.imSure = this.imSure.bind(this);
    }

    imSure() {
        const config = new Config();
        const issuedCoupon   = JSON.parse(window.localStorage.getItem('issuedCoupon'));
        const fromConsumerId     = window.localStorage.getItem('user_id');
        const toConsumerId   = this.state.toConsumerId;
        const couponId       = issuedCoupon.coupon.id;
        const issuedCouponId = issuedCoupon.id;

        const data = {
            fromConsumerId: fromConsumerId,
            toConsumerId: toConsumerId,
            couponId: couponId,
            issuedCouponId: issuedCouponId
        };

        console.log(data);
        axios.post(config.baseUrl + 'coupon/issued/rest/0', {
            consumerId: toConsumerId,
            couponId: couponId,
            issuedCouponId: issuedCouponId,
            sourceType: 2,
            source: JSON.stringify({
                fromConsumerId: fromConsumerId,
                issuedCouponId: issuedCouponId
            })
        }).then(res => {
            $('#sentCouponToFriendPopup').modal('hide');
            window.localStorage.removeItem('issuedCoupon')

            //this.props.changeRedeemStatus(0);
        });
    }

    inputChangeHandler(e) {
        this.setState({
            toConsumerId: e.target.value
        });
    }

    render() {
        return (
            <div className="modal fade" id="sentCouponToFriendPopup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            This coupon will be sent to your friend
                            <input type="text" placeholder="Enter friend ID" className="form-control" onChange={e => this.inputChangeHandler(e)}/>
                        </div>
                        <div className="modal-footer" >
                            <button type="button" className="default-btn btn btn-info" data-dismiss="modal">Go Back</button>
                            <button type="button" className="main-btn btn btn-success" onClick={this.imSure}>I'm Sure</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}