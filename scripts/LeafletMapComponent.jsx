var React = require('react');
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

/*Map component */
var idPos = 0;
module.exports = React.createClass({
    getInitialState: function() {
        return {
          locations : {},
          places : [],
      };
  },

  componentWillMount : function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.handleCoordinate);
    }else{
        console.log("Sorry the location is not available");
    }
},


handleCoordinate: function (position) {
    var msg = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
    console.log(msg);
    var coordinate =  {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    };
    
    this.setState({locations : coordinate});
    return coordinate;
},

render: function(){
    console.log("render in leaftlet");
    console.log(this.state);
    console.log(this.props.divClass);

    return (<div className={this.props.divClass}>{Object.keys(this.state.locations).map(this.renderMap)}</div>);
},


renderMap : function(){
    var position;

    if(this.props.data === undefined){
        console.log("data is undefined");
        position = [this.state.locations.lat, this.state.locations.lon];
        console.log(position);

        if(this.state.places[0] == undefined){


            var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "http://95.85.15.210/places/"+this.state.locations.lat+"/"+this.state.locations.lon,
                "method": "GET",
                "processData": false,
                  "contentType": false,
                  "mimeType": "multipart/form-data",
                'headers' : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('oAuth_token')
                },
            };

            var self = this;
             $.ajax(settings).done(function (response) {
             var data = JSON.parse(response);
             console.log(data);
             self.setState({places : data});
         });
        }
    }else{
        console.log("data is not undefined");
        position = [this.props.data.latitude, this.props.data.longitude];
        console.log(position);
    }



    const map = (
        <Map  center={position} zoom={15}>
        <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
        <Popup>
        <span> <i> {this.props.data === undefined ? "You're here" : this.props.data.address}</i></span>
        </Popup>
        </Marker>

        {this.state.places.map(function(object, i) {
            var pos = [object.latitude, object.longitude];
            return <Marker position={pos} opacity={0.6}>
            <Popup>
            <span><h4>{object.name}</h4> <i> {object.address}</i>
            <br/>
            <a href={"/details/"+object.id}>Click for the detail</a>
            </span>


            </Popup>
            </Marker>;
        })}

        </Map>

        );
    return (map);
}


});
