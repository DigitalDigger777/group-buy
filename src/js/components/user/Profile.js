/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';
import Menu from '../parts/Menu';
import axios from 'axios';
import Config from '../Config';

export default class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            profile: null,
            status: 'Load...'
        }
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;
        const id = window.localStorage.getItem('user_id');

        axios.get(apiUrl + 'coupon/consumer/rest/0', {
            params: {
                id: id
            }
        }).then(response => {
            console.log(response.data);
            // this.setState({countPages:response.data.count_pages});
            this.setState({profile: response.data});
            this.setState({status: 'List empty...'});

            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
            console.log(this.state);
        }).catch(function(error){
            console.log(error);
        });
    }

    render(){

        if (this.state.profile) {
            return (
                <div>
                    <PageLoader/>
                    {/*<Header/>*/}

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">
                            <div className="content-fullscreen zan-content-fullscreen">
                                <div className="page-profile">
                                    <div className="page-profile-header">
                                        <div className="float-left">
                                            <a href="images/pictures/5.jpg" className="show-gallery" title="Profile Image!">
                                                <img data-original={this.state.profile.socialDataProfile.headimgurl} className="preload-image" alt="img"/>
                                            </a>
                                            {/*<div className="zan-change-button">*/}
                                                {/*<a href="#">Change</a>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="float-left">
                                            <h4>{this.state.profile.socialDataProfile.nickname}</h4>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="zan-profile-coupons">
                                        <a href="#">
                                            <span>Valid <br/> Coupons</span><br/>
                                            <span>0</span>
                                        </a>
                                        <a href="#">
                                            <span>Linked<br/>Shoppers</span><br/>
                                            <span>0</span>
                                        </a>
                                        <a href="#">
                                            <span>Friends<br/>Coupon</span><br/>
                                            <span>0</span>
                                        </a>
                                        <a href="#">
                                            <span>Coupon<br/>Sent</span><br/>
                                            <span>0</span>
                                        </a>
                                        <div className="clear"></div>
                                    </div>

                                    <form action="#" id="zan-personal-data">
                                        <div>
                                            <label for="zan-name">First and Last Name:</label>
                                            <input type="text" id="zan-name" defaultValue={this.state.profile.socialDataProfile.nickname} />
                                        </div>
                                        {/*<div>*/}
                                            {/*<label for="zan-nick-name">Nick Name:</label>*/}
                                            {/*<input type="text" id="zan-nick-name" defaultValue={this.state.profile.socialDataProfile.nickname} />*/}
                                        {/*</div>*/}
                                        <div>
                                            <label for="zan-gender">Gender:</label>
                                            <select name="gender" id="zan-gender" defaultValue={this.state.profile.socialDataProfile.sex} >
                                                <option value="-1">Not Specified</option>
                                                <option value="0">Male</option>
                                                <option value="1">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="zan-phone">Tel:</label>
                                            <input type="text" id="zan-phone" defaultValue={this.state.profile.tel} />
                                        </div>
                                        <div>
                                            <label for="zan-phone">UnionId:</label>
                                            <input type="text" id="unionid" style={{width:'100%', maxWidth: '100%'}} defaultValue={this.state.profile.socialDataProfile.unionid} />
                                        </div>
                                        <div>
                                            <label for="zan-phone">ID:</label>
                                            <input type="text" id="id" style={{width:'100%', maxWidth: '100%'}} defaultValue={this.state.profile.id} />
                                        </div>
                                        {/*<div>*/}
                                            {/*<label for="zan-post-code">*/}
                                                {/*Post Code:*/}
                                            {/*</label>*/}
                                            {/*<input type="text" id="zan-post-code"/>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                            {/*<p>*/}
                                                {/*<a href="profile-change-password.html">Change Password<i*/}
                                                    {/*className="fa fa-chevron-right"></i>*/}
                                                {/*</a>*/}
                                            {/*</p>*/}
                                        {/*</div>*/}
                                    </form>
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
        } else {
            return (
                <div>{this.state.status}</div>
            );
        }
    }
}