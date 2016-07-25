var React = require('react');
var ListedLocation_CI_Component = require('./ListedLocation_CI_Component.jsx');
var ListedLocationComponent = require('./ListedLocationComponent.jsx');

/*
Locations on the whole screen
<FullLocations/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="locations-list list-full">
                <ListedLocation_CI_Component/>
                <ListedLocationComponent/>
                <ListedLocationComponent/>
                <ListedLocationComponent/>
                <ListedLocationComponent/>
                <ListedLocationComponent/>
                <ListedLocationComponent/>
            </div>
        )
    }
})
