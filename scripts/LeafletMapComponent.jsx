var React = require('react');

/*Map component */
module.exports = React.createClass({
    getInitialState: function() {
        return {
          locations : {},

      };
  },

   getCoordinate: function(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleCoordinate);
    }else{
        console.log("Sorry the location is not available");
    }


},


/*Callback function that will be trigger when a location is available */
 handleCoordinate : function(position) {
    var msg = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
    console.log(msg);


    var coordinate =  {
        lat : position.coords.latitude,
        long : position.coords.longitude
    };

    userLocation = coordinate;
},


  componentWillMount : function() {

//    if(this.props.data === undefined){
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

    return coordinate;

    this.state.locations['pos-'+ idPos] = coordinate;
    idPos++;
    this.setState({locations : this.state.locations});
    console.log(this.state);
},


render: function(){
    console.log(this.state);
    console.log(this.props.divClass);

    return (<div className={this.props.divClass}>{Object.keys(this.state.locations).map(this.renderMap)}</div>);
},


renderMap : function(){

    var id = idPos -1;
    console.log(id);
    console.log("render");
    var position;

    if(this.props.data === undefined){
        console.log("data is undefined");
        position = [this.state.locations['pos-'+id].lat, this.state.locations['pos-'+id].lon];
        console.log(position);
    } else{
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
        <span> <i> {this.props.data === undefined ? "" :  this.props.data.address}</i></span>
        </Popup>

        </Marker>
        </Map>

        );
    console.log(map);


    return (map);
}


});
