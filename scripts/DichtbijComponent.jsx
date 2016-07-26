var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Dichtbij
<Dichtbij/>
*/
var DichtbijComponent = React.createClass({


    getInitialState : function(){
        return {
            places : [],
            userLocation: {},
        }
    },

        /*
            * All the logical stuff should be in a 'ComponentWillMount' but it cause too much problem
            * The setState trigger the render method
            * -> a infinite cercle of ajax call will begin
            * -> I check if the state are empty before doing the ajax call.
            */
    componentWillMount : function() {
        var self = this;
        if(navigator.geolocation && self.state.userLocation['lat'] == undefined){
            navigator.geolocation.getCurrentPosition(function(position){

                var coordinate =  {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                };

                self.setState({userLocation : coordinate}, function() {
                    var self = this;
                    var settings = {
                          "async": true,
                          "crossDomain": true,
                      "url": "http://95.85.15.210/places/"+this.state.userLocation['lat']+"/"+this.state.userLocation['lon'], //+userLocation.lat+"/"+userLocation.lon",
                      "method": "GET",
                    "processData": false,
                     "contentType": false,
                     "mimeType": "multipart/form-data"
                    }

                     $.ajax(settings).done(function (response) {
                         var data = JSON.parse(response);
                         self.setState({places : data});
                    });
                });
            });
        }
    },
    render : function(){
        return (
            <div className="dichtbij home-row">
            <h3>Dichtbij</h3>

            <div className="location-row">
                {this.state.places.map(function(object, i) {
                    return <LocationRowComponent data={object} key={i} />;
                })}
            </div>
            </div>
            );
        }
});

export default DichtbijComponent;
