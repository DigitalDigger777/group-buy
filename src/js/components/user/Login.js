/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';

export default class LoginWechat extends React.Component {
    render(){
        return(
            <div>
                <PageLoader/>
                {/*<Header/>*/}

                <div id="page-content" className="page-content">
                    <div id="page-content-scroll">

                        <div className="content zan-login-content">
                            <div className="container">
                                <div className="page-login full-bottom zan-page-login">


                                    <div className="login-input">
                                        <i className="fa fa-user"></i>
                                        <input type="text" value="" placeholder="Username"/>
                                    </div>
                                    <div className="login-password">
                                        <i className="fa fa-lock"></i>
                                        <input type="password" value="" placeholder="Password" />
                                    </div>
                                    <a href="#" className="login-button button button-blue button-fullscreen">Login</a>
                                    <div className="clear"></div>
                                    <p className="zan-question">Forget your login details? <a href="login-help-sign-in.html">Get help signing in</a></p>

                                </div>
                            </div>
                        </div>
                        <div className="footer footer-light">

                        </div>
                    </div>
                </div>

                <div className="background"></div>
            </div>
        );
    }
}