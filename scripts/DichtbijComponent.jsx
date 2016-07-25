var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Dichtbij
<Dichtbij/>
*/
module.exports = React.createClass({
    componentWillMount : function(){
        var self = this;
        var settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://95.85.15.210/places/50/40", //+userLocation.lat+"/"+userLocation.lon,
              "method": "GET",
               "headers": {
                    "Authorization": 'Bearer '+ localStorage.getItem('oAuth_token'),
            },
            "processData": false,
             "contentType": false,
             "mimeType": "multipart/form-data"
           }

         $.ajax(settings).done(function (response) {
         var data = JSON.parse(response);
         self.setState({places : data});
        // return data;
     });
        // this.setState({places : getPlaceNear()});
        // console.log("dichtbij");
        // //this.setstate({counters: this.state.counters});
        // console.log(this.state.places);
},

getInitialState : function(){
    return {
        places : []
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
})
