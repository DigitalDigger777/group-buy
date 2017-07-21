/**
 * Created by korman on 22.06.17.
 */

import Config from './Config';
import axios from 'axios';

export default class Auth
{
    constructor(state){
        this._user = null;

        const config = new Config();

        const matchUser      = /\?user=([\w\W]+)/.exec(window.location.search);
        const authorizeUser  = matchUser ? JSON.parse(decodeURI(matchUser[1])) : null;
        const authorizedUser = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;

        //check request for authorization user and check authorized user
        if (authorizeUser == null && authorizedUser == null) {
            state.status    = '';
            window.location = config.buildAuthUrl();
        }

        //if request for new authorization user
        if (authorizeUser != null) {

            this._user   = authorizeUser;
            state.status = 'Get user';

            //set here
            axios.post(config.baseUrl + 'coupon/consumer/rest/0', {
                socialId: authorizeUser.unionid,
                socialDataProfile: authorizeUser
            }).then(result => {

                window.localStorage.setItem('user_id', result.data.id);
                window.localStorage.setItem('user', JSON.stringify(authorizeUser));

                state.status = 'Authorized user';
            }).catch(error => {
                console.log(error);
            });
        }

        if (authorizedUser != null) {
            this._user = authorizedUser;
        }
    }

    get user() {
        return this._user;
    }
}