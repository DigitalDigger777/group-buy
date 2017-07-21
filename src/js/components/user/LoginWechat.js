/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';
import Config from '../Config';
import axios from 'axios';

export default class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: '',
            url: null
        };
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;
        const userId = window.localStorage.getItem('user_id');

        axios.get(apiUrl + 'coupon/consumer-mock/rest/0').then(response => {
            console.log(JSON.stringify(response.data.socialDataProfile));
            this.setState({user: JSON.stringify(response.data.socialDataProfile)});

        }).catch(function(error){
            console.log(error);
        });

        //get login url
        axios.get(apiUrl + 'wechat/build-get-code-url').then(response => {
            console.log(response.data.url);

            this.setState({url: response.data.url});
            window.location = response.data.url;

        }).catch(error => {
            console.log(error);
        });
    }

    render(){
        const config = new Config();

        if (this.state.url) {
            return (
                <div>
                    Please wait...
                    {/*<PageLoader/>*/}
                    {/*<Header/>*/}

                    {/*<div id="page-content" className="page-content fadeIn show-containers">*/}
                        {/*<div id="page-content-scroll">*/}

                            {/*<div className="content zan-login-content">*/}
                                {/*<div className="container">*/}
                                    {/*<div className="page-login full-bottom zan-page-login">*/}
                                        {/**/}
                                        {/*/!*<a href={`${this.state.url}`} className="login-button button button-blue button-fullscreen">Login</a>*!/*/}
                                        {/*/!*<a href={`${config.baseFrontUrl}?user=${this.state.user}`}*!/*/}
                                           {/*/!*className="login-button button button-blue button-fullscreen">Mock Login</a>*!/*/}
                                        {/*<div className="clear"></div>*/}

                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="zan-footer-text center-text">*/}
                                {/*/!*<p>Don't have an account? <a href="sign-up-step-1.html">Sign up</a></p>*!/*/}
                            {/*</div>*/}
                            {/*<div className="footer footer-light">*/}

                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="background"></div>*/}
                </div>
            );
        } else {
            return (
                <div>Load...</div>
            );
        }
    }
}