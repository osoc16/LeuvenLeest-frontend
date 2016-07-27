var React = require('react');
var RecentComponent = require('./RecentComponent.jsx');
var DichtbijComponent = require('./DichtbijComponent.jsx');

/*
Dichtbij & Recent activity
<DichtbijCo/>
*/
var DichtbijCoComponent = React.createClass({

    render : function(){
        return (
            <div className="home-locations">
                <RecentComponent />
                <DichtbijComponent />
            </div>
        )
    }
})

export default DichtbijCoComponent;
