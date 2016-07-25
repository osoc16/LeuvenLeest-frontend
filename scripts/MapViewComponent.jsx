var React = require('react');
var HeadBarComponent = require('./HeadBarComponent.jsx');
var LeafletMapComponent = require('./LeafletMapComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Full map view
<MapView/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div id="app">
            <HeadBarComponent />
            <div className="map-container">
            <LeafletMapComponent divClass="full-map-container"/>
            </div>
            <NavbarComponent />
            </div>
            )
    }
})
