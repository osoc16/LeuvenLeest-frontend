var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Recent activity
<Recent/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="recent-act home-row">
                <h3>Recent bezocht</h3>
                <LocationRowComponent />
            </div>
        )
    }
})
