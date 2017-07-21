/**
 * Created by korman on 01.05.17.
 */

export default class Config
{
    constructor() {
        this._baseUrl = 'http://dev.kankan/app_dev.php/';
        this._baseImagesPath = 'http://dev.kankan/';
        this._baseFrontUrl = 'http://dev.kankan-mobile/';
        this._weChatConfig = {
            appid:'wx9d75b312364c1703',
            redirectUri: 'http://coupon.ppcgclub.com/auth.html',
            oa_appid: 'wx26a0d7b9dc4dd614',
            signature: '5e2e785a7e7d3618ad3629a5e1e95c082169f305'
        }
    }

    get baseUrl() {
        return this._baseUrl;
    }

    get baseImagePath() {
        return this._baseImagesPath;
    }

    get baseFrontUrl() {
        return this._baseFrontUrl;
    }

    get weChatConfig() {
        return this._weChatConfig;
    }

    buildAuthUrl() {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        let params = {
            appid:           this._weChatConfig.appid,
            redirect_uri:    this._weChatConfig.redirectUri,
            response_type:  'code',
            scope:          'snsapi_login',
            state:          10
        };

        let paramsStr = '';

        for (let param in params) {
            if (paramsStr == '') {
                paramsStr += param + '=' + params[param];
            } else {
                paramsStr += '&' + param + '=' + params[param];
            }
        }

        return url + '?' + paramsStr + '#wechat_redirect';
    }
}