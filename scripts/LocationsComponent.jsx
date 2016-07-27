var React = require('react');
var ListedLocation_CI_Component = require('./ListedLocation_CI_Component.jsx');
var ListedLocationComponent = require('./ListedLocationComponent.jsx');

/*
Locations half-screen
<LocationsComponent />
*/
var LocationsComponent = React.createClass({
    getInitialState : function() {
        return {
            places : [],
            coordinates : {},
            latest : {}
        }
    },

    componentWillMount : function() {
        this.getLocation();
    },

    getLocation : function() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(this.getLocations);
        } else {
            console.log('Location not available');
        }
    },

    getLocations : function(response) {
        var coordinates = {
            lat: response.coords.latitude,
            long: response.coords.longitude};
        this.setState({coordinates : coordinates });
        var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/places/' + response.coords.latitude + '/' + response.coords.longitude,
            'method': 'GET',
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                this.setState({places: response});
                this.getLatestCheckin(function(response, textStatus, xhr) {
                    this.setState({latest : response});
                });
            }.bind(this))
            .fail(function(response, textStatus, xhr){
                console.log('fail');
            });
    },

    getLatestCheckin : function() {
        var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/checkin/latest',
            'method': 'GET',
            'headers' : {
                'Authorization' : sessionStorage.getItem('oAuth_token')
            }
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                this.setState({latest : JSON.parse(response)})
            }.bind(this))
            .fail(function(response, textStatus, xhr){
                console.log('fail');
            });
    },

    render : function(){
        return (
            <div className="locations-list">
                {this.state.places.map(function(place) {
                    return <ListedLocationComponent key={place.id} place={place} coordinates={this.state.coordinates} latest={this.state.latest.placeId} callBack={this.props.callBack}/>
                }.bind(this))}
            </div>
        )
    }
})

export default LocationsComponent;
