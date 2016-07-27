var React = require('react');
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

/*Map component */
var idPos = 0;
var LeafletMapComponent = React.createClass({
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
            console.log('Sorry the location is not available');
        }
    },


    handleCoordinate: function (position) {
        var coordinate =  {
            lat : position.coords.latitude,
            lon : position.coords.longitude
        };

        this.setState({locations : coordinate});
    },

    render: function(){
        return (<div className={this.props.divClass}>{Object.keys(this.state.locations).map(this.renderMap)}</div>);
    },


    renderMap : function(location, i){
        var position;

        if(this.props.data === undefined){

            position = [this.state.locations.lat, this.state.locations.lon];

            if(this.state.places[0] == undefined){


                var settings = {
                    'async': true,
                    'crossDomain': true,
                    'url': 'http://95.85.15.210/places/'+this.state.locations.lat+'/'+this.state.locations.lon,
                    'method': 'GET',
                    'processData': false,
                    'contentType': false,
                    'mimeType': 'multipart/form-data',
                    'headers' : {
                        'Authorization' : 'Bearer ' + sessionStorage.getItem('oAuth_token')
                    },
                };

                var self = this;
                 $.ajax(settings).done(function (response) {
                 var data = JSON.parse(response);
                 self.setState({places : data});
             });
            }
        }else{
            position = [this.props.data.latitude, this.props.data.longitude];
        }



        const map = (
            <Map  center={position} zoom={15}>
            <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
            <Popup>
            <span> <i> {this.props.data === undefined ? 'You\'re here' : this.props.data.address}</i></span>
            </Popup>
            </Marker>

            {this.state.places.map(function(object, i) {
                var pos = [object.latitude, object.longitude];
                return <Marker key={object.id} position={pos} opacity={0.6}>
                <Popup>
                <span><h4>{object.name}</h4> <i> {object.address}</i>
                <br/>
                <a href={'/details/'+object.id}>Click for the detail</a>
                </span>


                </Popup>
                </Marker>;
            })}

            </Map>

            );
        return (map);
}


});

export default LeafletMapComponent;
