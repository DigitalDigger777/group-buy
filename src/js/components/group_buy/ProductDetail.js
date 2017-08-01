/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import axios from 'axios';
import PageLoader from '../parts/PageLoader';
import Menu from '../parts/Menu';
import Config from '../Config';
// import RedeemCouponPopup from '../popup/RedeemCouponPopup';

export default class ProductDetail extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            productId: props.match.params.productId,
            groupBuyTemplateId: props.match.params.groupBuyTemplateId,
            status: <img src={`${config.baseFrontUrl}images/preload.gif`} style={{ margin: '0 auto'}} width={'50px'} alt=""/>
        };

        this.redeem = this.redeem.bind(this);
    }

    componentDidMount(props){
        const config = new Config();
        const apiUrl = config.baseUrl;

        axios.get(apiUrl + 'coupon/product/' + this.state.productId).then(response => {
            console.log(response.data);
            this.setState({item:response.data});
            // this.setState({expiredTime: response.data.expiredTimeFormat});
            // this.setState({startTime: response.data.startTimeFormat});
            // this.setState({daysLeft: response.data.daysLeft});

            $(".preload-image").lazyload({
                threshold : 100,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
            this.setState({status: 'Product not found'});

        }).catch(function(error){
            console.log(error);
        });
    }

    redeem(e, groupBuyTemplateId) {

        console.log(groupBuyTemplateId);
        const config = new Config();
        const userId = window.localStorage.getItem('user_id');

        window.location = config.baseFrontUrl + 'stripe.html?groupBuyTemplateId=' + groupBuyTemplateId + '&userId=' + userId;

        $('#redeemCouponPopup').modal('show');

    }

    render(){
        if (this.state.item) {
            const config = new Config();

            return (
                <div>
                    <PageLoader/>
                    {/*<RedeemCouponPopup issuedCouponId={this.state.item.id} />*/}

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">

                            <section className="main-view">
                                <div className="flexslider" style={{marginBottom:'10px'}}>
                                    <ul className="slides">
                                        <li>
                                            { this.state.item.images.length > 0 && (
                                                <img src={`${config.baseImagePath}images/${this.state.item.images[0]}`} />
                                            )}

                                            { this.state.item.images.length == 0 && (
                                                <img src={`images/zan-images/no_photo_large.png`} />
                                            )}
                                        </li>
                                    </ul>
                                </div>

                                <div className="tm">
                                    <form action="javascript:addToCart(221)" method="post" name="HHS_FORMBUY" id="HHS_FORMBUY">
                                        <div className="td2">
                                            <div className="td2_original_price">
                                                <span>{this.state.item.price}$</span>
                                                {/*<div className="mar_price"><del></del><del id="market_price">{this.state.item.price}$</del></div>*/}
                                                {/*<div className="td2_sold_quantity"><span>累计销量：<i id="sold_quantity">0</i></span></div>*/}
                                            </div>
                                            <div className="td2_name">{this.state.name}</div>
                                            <div className="td2_cx">
                                                { this.state.item.description }
                                                <br/>
                                                <br/>
                                                <br/>
                                                <button id="redeemButton" className="btn btn-info" onClick={ (e, groupBuyTemplateId) => this.redeem(e, this.state.groupBuyTemplateId) } style={{ width: '100%', backgroundColor: '#887650', borderColor: '#887650'}}>Buy</button>
                                            </div>
                                            <div className="td2_info">

                                            </div>
                                            <div className="td2_num">

                                            </div>


                                            {/*<div id="speDiv" className="speDiv" style={{bottom:'50px', display:'none'}}>*/}
                                                {/*<a href="javascript:showhide();">*/}
                                                    {/*<img id="sku-quit" src="themes/haohaios/images/quit_button.png" />*/}
                                                {/*</a>*/}
                                                {/*<div id="sku-head">*/}
                                                    {/*<img id="sku-image" className="image" src="images/201702/thumb_img/221_thumb_G_1486196356103.jpg" />*/}
                                                    {/*<div id="sku-detail">*/}
                                                        {/*<div className="sku-name">*/}
                                                            {/*<span className="goodsName" id="goodsName">dede168产品测试02</span>*/}
                                                            {/*<div className="sku-price-depends" id="HHS_GOODS_AMOUNT">￥500.00</div>*/}
                                                        {/*</div>*/}
                                                        {/*<div><span id="sku-msg">请选择商品数量</span></div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="sku-amount">*/}
                                                    {/*<div className="sku-text">*/}
                                                        {/*<a>购买数量</a>*/}
                                                        {/*<div className="sku-buy-amount-increase" onclick="goods_add();changePrice()"><span>+</span></div>*/}
                                                        {/*<input name="number" type="text" id="number" className="sku-input-text" value="1" size="4" onblur="changePrice();"/>*/}
                                                            {/*<div className="sku-buy-amount-reduce" onclick="goods_cut();changePrice()"><span>−</span></div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}


                                            {/*<div className="ftbuy">*/}
                                                {/*<a href="index.php" className="ftbuy_index">*/}
                                                    {/*<div className="ftbuy_index_img">*/}
                                                        {/*<img src="themes/haohaios/images/index-38d3d45c2c.png" />*/}
                                                    {/*</div>*/}
                                                    {/*<div className="ftbuy_index_text">首页</div>*/}
                                                {/*</a>*/}
                                                {/*<a href="javascript:collect(221)" className="ftbuy_like">*/}
                                                    {/*<div className="ftbuy_index_img">*/}
                                                        {/*<div className="ftbuy_index_img_bg "></div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="ftbuy_index_text">收藏</div>*/}
                                                {/*</a>*/}
                                                {/*<a className="ftbuy_message" target="_blank" href="">*/}
                                                    {/*<div className="ftbuy_message_img">*/}
                                                    {/*</div>*/}
                                                    {/*<div className="ftbuy_message_text">客服</div>*/}
                                                {/*</a>*/}



                                                {/*<a href="javascript:showhide();" id="btn-pre-buy" className="ftbuy_item out">*/}
                                                    {/*<div className="ftbuy_price"><span id="tuan_more_price">¥&nbsp;360.00</span></div>*/}
                                                    {/*<div className="ftbuy_btn"><b id="tuan_more_number">50人团</b></div>*/}
                                                {/*</a>*/}

                                                {/*<a href="javascript:addToCart(221,0,0,5)" id="btn-buy" className="ftbuy_item out" style={{display:'none'}}>*/}
                                                    {/*<div className="ftbuy_btn" id="tuan_one_number" style={{height:'50px', top: '0', lineHeight:'50px', fontSize:'16px'}}>确定</div>*/}
                                                {/*</a>*/}



                                                {/*<a href="javascript:showhide(1);" id="btn-pre-buy1" className="ftbuy_item ftbuy_item_buy">*/}
                                                    {/*<div className="ftbuy_price">*/}
                                                        {/*<div><b id="tuan_one_price">¥&nbsp;500.00</b>件</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="ftbuy_btn" id="tuan_one_number">单独购买</div>*/}
                                                {/*</a>*/}
                                                {/*<a href="javascript:addToCart(221);" id="btn-buy1" className="ftbuy_item ftbuy_item_buy" style={{display:'none'}}>*/}
                                                    {/*<div className="ftbuy_btn" id="tuan_one_number" style={{height:'50px',top: '0',lineHeight:'50px', fontSize:'16px'}}>确定</div>*/}
                                                {/*</a>*/}
                                            {/*</div>*/}

                                        </div>
                                    </form>









                                    {/*<div className="pro-detial">*/}
                                        {/*<div className="pro_con">*/}
                                            {/*TB2EqnMc30kpuFjSspdXXX4YXXa_!!503666369.jpg*/}
                                        {/*</div>*/}
                                    {/*</div>*/}











                                    {/*<div className="recommend_grid_wrap">*/}
                                        {/*<div id="recommend" className="grid">*/}
                                            {/*<div className="recommend_head">你可能还喜欢</div>*/}
                                            {/*<div className="bd">*/}
                                                {/*<ul>*/}
                                                    {/*<li>*/}
                                                        {/*<div className="recommend_img">*/}
                                                            {/*<a href="goods.php?id=220&amp;uid=0">*/}
                                                                {/*<img src="images/201702/goods_img/220_G_1486193387344.jpg" />*/}
                                                            {/*</a>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="recommend_title"><a href="goods.php?id=220&amp;uid=0">dede168产品测试</a></div>*/}
                                                        {/*<div className="recommend_price">￥<span>360.00</span></div>*/}
                                                        {/*<div className="like_click">*/}
                                                            {/*<a href="javascript:collect(220)" className="recommend_like"></a>*/}
                                                        {/*</div>*/}
                                                    {/*</li>*/}
                                                    {/*<li>*/}
                                                        {/*<div className="recommend_img"><a href="goods.php?id=221&amp;uid=0"><img src="images/201702/goods_img/221_G_1486196356803.jpg"/></a></div>*/}
                                                        {/*<div className="recommend_title"><a href="goods.php?id=221&amp;uid=0">dede168产品测试02</a></div>*/}
                                                        {/*<div className="recommend_price">￥<span>500.00</span></div>*/}
                                                        {/*<div className="like_click">*/}
                                                            {/*<a href="javascript:collect(221)" className="recommend_like"></a>*/}
                                                        {/*</div>*/}
                                                    {/*</li>*/}
                                                    {/*<li>*/}
                                                        {/*<div className="recommend_img"><a href="goods.php?id=222&amp;uid=0"><img src="images/201702/goods_img/222_G_1486196860299.jpg" /></a></div>*/}
                                                        {/*<div className="recommend_title"><a href="goods.php?id=222&amp;uid=0">dede168产品测试</a></div>*/}
                                                        {/*<div className="recommend_price">￥<span>150.00</span></div>*/}
                                                        {/*<div className="like_click">*/}
                                                            {/*<a href="javascript:collect(222)" className="recommend_like"></a>*/}
                                                        {/*</div>*/}
                                                    {/*</li>*/}
                                                {/*</ul>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className="recommend_bottom">*/}
                                            {/*<div className="line"></div>*/}
                                            {/*<p>已经到底部了</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}













                                    {/*<div className="step">*/}
                                        {/*<div className="step_hd">*/}
                                            {/*拼团玩法<a className="step_more" href="tuan_rule.php">查看详情</a>*/}
                                        {/*</div>*/}
                                        {/*<div id="footItem" className="step_list">*/}
                                            {/*<div className="step_item step_item_on">*/}
                                                {/*<div className="step_num">1</div>*/}
                                                {/*<div className="step_detail">*/}
                                                    {/*<p className="step_tit">选择*/}
                                                        {/*<br/>心仪商品</p>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className="step_item ">*/}
                                                {/*<div className="step_num">2</div>*/}
                                                {/*<div className="step_detail">*/}
                                                    {/*<p className="step_tit">支付开团*/}
                                                        {/*<br/>或参团</p>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className="step_item ">*/}
                                                {/*<div className="step_num">3</div>*/}
                                                {/*<div className="step_detail">*/}
                                                    {/*<p className="step_tit">等待好友*/}
                                                        {/*<br/>参团支付</p>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className="step_item">*/}
                                                {/*<div className="step_num">4</div>*/}
                                                {/*<div className="step_detail">*/}
                                                    {/*<p className="step_tit">达到人数*/}
                                                        {/*<br/>团购成功</p>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                            </section>
                            
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