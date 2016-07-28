var React = require('react');
var ListedLocation_CI_Component = require('./ListedLocation_CI_Component.jsx');
var ListedLocationComponent = require('./ListedLocationComponent.jsx');

/*
Locations on the whole screen
<FullLocations/>
*/
var FullLocationsComponent = React.createClass({

    getInitialState : function() {
        return {
            places : []
        }
    },

    componentWillMount : function() {
        this.getLocations();
    },

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
    },

    getLocations : function() {
        var self = this;
        var settings = {
            'crossDomain': true,
            'url': '//95.85.15.210/places',
            'method': 'GET',
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                self.setState({places: response});
            })
            .fail(function(response, textStatus, xhr){
                console.log('fail');
            });
        }

})

export default FullLocationsComponent;
