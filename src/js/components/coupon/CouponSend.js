/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';
import Menu from '../parts/Menu';

export default class CouponSend extends React.Component {
    render(){
        return(
            <div>
                <PageLoader/>
                {/*<Header/>*/}

                <div id="page-content" className="page-content">
                    <div id="page-content-scroll">


                        <div className="zan-coupon-send">
                            <div className="container">
                                <div className="zan-email-input">
                                    <input type="text" value="Your friend's Email" onfocus="if (this.value=='Your friend\'s Email') this.value = ''" onblur="if (this.value=='') this.value = 'Your friend\'s Email'" />
                                </div>
                                <a href="#" className="login-button button button-blue button-fullscreen">Send</a>
                            </div>
                        </div>



                        <div className="footer footer-light">

                        </div>
                    </div>
                </div>

                <Menu/>

                <div className="background"></div>
            </div>
        );
    }
}