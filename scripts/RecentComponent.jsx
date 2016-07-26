var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Recent activity
<Recent/>
*/
var RecentComponent = React.createClass({

    getInitialState : function(){
        return {
            places : []
        }
    },

    componentWillMount : function() {

    },

    render : function(){
        return (
            <div className="recent-act home-row">
                <h3>Recent bezocht</h3>
                <LocationRowComponent />
            </div>
        )
    }
})

export default RecentComponent;
