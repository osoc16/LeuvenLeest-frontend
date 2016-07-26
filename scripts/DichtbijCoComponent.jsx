var React = require('react');
var RecentComponent = require('./RecentComponent.jsx');
var DichtbijComponent = require('./DichtbijComponent.jsx');

/*
Dichtbij & Recent activity
<DichtbijCo/>
*/
var DichtbijCoComponent = React.createClass({

    propTypes : {
        nearbyPlaces : React.PropTypes.array.isRequired,
        recentPlaces : React.PropTypes.array.isRequired
    },

    render : function(){
        return (
            <div className="home-locations">
                <RecentComponent places={this.props.recentPlaces} />
                <DichtbijComponent places={this.props.nearbyPlaces}/>
            </div>
        )
    }
})

export default DichtbijCoComponent;
