var React = require('react');
var HeadBarComponent = require('./HeadBarComponent.jsx');
var FullLocationsComponent = require('./FullLocationsComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
List of locations
<ListView/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div id="app">
                <HeadBarComponent />
                <div className="page-content">
                    <FullLocationsComponent />
                </div>
                <NavbarComponent />
            </div>
        )
    }
})
