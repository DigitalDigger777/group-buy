/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import StoreList from './StoreList';
import PageLoader from '../parts/PageLoader';
// import Header from '../parts/Header';
import Menu from '../parts/Menu';
import axios from 'axios';
import $ from 'jquery';


export default class BodyStore extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            page: 1
        };
    }

    componentDidMount(props) {

        $('#page-content-scroll').on('scroll', e => {
            const scrollHeight = $('#page-content-scroll')[0].scrollHeight;
            const scrollTop    = $('#page-content-scroll')[0].scrollTop;
            const height       = $('#page-content-scroll').height();

            let page = this.state.page;

            if ((scrollHeight - scrollTop) == height) {
                //console.log(e.currentTarget.scrollTop, contentHeight, contentOffset, cardHeight, visibleH, countVisibleCard, i);
                page++;
                this.setState({page: page});

            }
        });
    }

    render(){
        return(
            <div>
                <PageLoader/>
                {/*<Header/>*/}

                <div id="page-content" className="page-content fadeIn page-content show-containers">
                    <div id="page-content-scroll">

                        <div className="content">
                            <StoreList page={this.state.page} />
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