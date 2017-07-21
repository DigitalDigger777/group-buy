/**
 * Created by korman on 03.06.17.
 */

import React from 'react';

export default class PageLoader extends React.Component {

    render() {
        return (
            <div className="page-preloader page-preloader-light">
                <img className="page-preload" src="images/preload.gif" />
            </div>
        );
    }
}