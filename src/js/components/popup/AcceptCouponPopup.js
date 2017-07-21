/**
 * Created by korman on 08.05.17.
 */

import React from 'react';
import { Redirect } from 'react-router';

export default class AcceptCouponPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        this.setState({redirect: true});
    }

    render() {
        return (
            <div className="modal fade" id="acceptCouponPopup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            Accept successful
                        </div>
                        <div className="modal-footer" >
                            <button type="button" className="default-btn btn btn-info" onClick={ this.redirect } data-dismiss="modal">Ok</button>
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
