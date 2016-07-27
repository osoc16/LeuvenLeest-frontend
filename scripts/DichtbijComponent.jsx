var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Dichtbij
<Dichtbij/>
*/
var DichtbijComponent = React.createClass({

    getInitialState : function() {
        return {
            nearbyPlaces : [],
        }
    },

    componentWillMount : function() {
        navigator.geolocation.getCurrentPosition(function(position){
                var coordinate =  {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                };
                this.setState({userLocation : coordinate}, function() {
                var settings = {
                    'crossDomain': true,
                    'url': 'http://95.85.15.210/places/'+this.state.userLocation['lat']+'/'+this.state.userLocation['lon'],
                    'method': 'GET',
                }
                 $.ajax(settings).done(function (response, status, xhr) {
                     this.setState({nearbyPlaces : response});
                }.bind(this));
            });
        }.bind(this));
    },

    render : function(){
        return (
            <div className="dichtbij home-row">
            <h3>Dichtbij</h3>

            <div className="location-row">
                {this.state.nearbyPlaces.map(function(object, i) {
                    return <LocationRowComponent data={object} key={i} />;
                })}
            </div>
            </div>
            );
        }
});

export default DichtbijComponent;
