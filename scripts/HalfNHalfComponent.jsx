var React = require('react');
var HeadBarComponent = require('./HeadBarComponent.jsx');
var LeuvenMapSmallComponent = require('./LeuvenMapSmallComponent.jsx');
var LocationsComponent = require('./LocationsComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Half Map, Half Locations
<@Half/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div id="app">
                <HeadBarComponent />
                <LeuvenMapSmallComponent />
                <div className="swiper">
                    <span className="swiper-center"></span>
                </div>
                <div className="page-content">
                    <LocationsComponent />
                </div>
                <NavbarComponent />
            </div>
        )
    }
})
