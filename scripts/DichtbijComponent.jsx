var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Dichtbij
<Dichtbij/>
*/
module.exports = React.createClass({


    getInitialState : function(){
        console.log('initial');
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

            render : function(){
                var self = this;
                if(navigator.geolocation && self.state.userLocation['lat'] == undefined){
                    navigator.geolocation.getCurrentPosition(function(position){
                        var msg = "Latitude: " + position.coords.latitude +
                        " Longitude: " + position.coords.longitude;
                        console.log(msg);

                        var coordinate =  {
                            lat : position.coords.latitude,
                            lon : position.coords.longitude
                        };
                        
                        
                        self.setState({userLocation : coordinate});
                    });
                }


                var settings = {
                      "async": true,
                      "crossDomain": true,
                  "url": "http://95.85.15.210/places/"+self.state.userLocation['lat']+"/"+self.state.userLocation['lon'], //+userLocation.lat+"/"+userLocation.lon",
                  "method": "GET",
                "processData": false,
                 "contentType": false,
                 "mimeType": "multipart/form-data"
               }

            if(this.state.places[0] == undefined){
                 $.ajax(settings).done(function (response) {
                 console.log('get places');
                 var data = JSON.parse(response);
                 self.setState({places : data});
                 console.log(self.state.places);

              });
            };



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



