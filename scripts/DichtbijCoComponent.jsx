var React = require('react');
var RecentComponent = require('./RecentComponent.jsx');
var DichtbijComponent = require('./DichtbijComponent.jsx');

/*
Dichtbij & Recent activity
<DichtbijCo/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="home-locations">
                <RecentComponent />
                <DichtbijComponent />
            </div>
        )
    }
})
