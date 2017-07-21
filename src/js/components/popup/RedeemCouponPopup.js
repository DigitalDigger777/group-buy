/**
 * Created by korman on 08.05.17.
 */

import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Config from '../Config';

export default class RedeemCouponPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            issuedCouponId: props.issuedCouponId
        }

        this.redirect = this.redirect.bind(this);
        this.imSure = this.imSure.bind(this);
    }

    redirect() {
        this.setState({redirect: true});
    }

    imSure() {
        const config = new Config();
        // const issuedCouponId = $(e.currentTarget).attr('data-redeem-issued-id');
        axios.put(config.baseUrl + 'coupon/issued-coupon-redeem/rest/' + this.state.issuedCouponId)
            .then(response => {
                //console.log(response);
                $('#redeemCouponPopup').modal('hide');
                $('#redeemButton').css('background-color', '#d3d3d3');
                $('#redeemButton').attr('disabled', 'disabled');
            }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="modal fade" id="redeemCouponPopup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            This coupon will be marked as redeemed. You can't use it any more!
                        </div>
                        <div className="modal-footer" >
                            <button type="button" className="default-btn btn btn-info" data-dismiss="modal">Go Back</button>
                            <button type="button" className="main-btn btn btn-success" onClick={this.imSure}>I'm Sure</button>
                        </div>
                    </div>
                </div>
                {this.state.redirect && (
                    <Redirect to="/"/>
                )}
            </div>
        );
    }
}
