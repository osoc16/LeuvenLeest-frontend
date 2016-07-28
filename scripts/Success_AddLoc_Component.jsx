var React = require('react');
var LeafletMapComponent = require('./LeafletMapComponent.jsx');
var Success_CIn_Component = require('./Success_CIn_Component.jsx');

var categoryId={
    'Park' : 1,
    'Coffee shop' : 2,
    'College library' : 3,
    'Library' : 4,
};

var Success_AddLoc_Component = React.createClass({
    propTypes :
    {
        place : React.PropTypes.object.isRequired,
        lat : React.PropTypes.string.isRequired,
        lon : React.PropTypes.string.isRequired,
    },

    getInitialState : function(){
        return {
         succesfullCheckin : false,
     }
 },
 checkin : function(event) {
   var settings = {
       'crossDomain': true,
       'url': '//95.85.15.210/checkin/',
       'method': 'PUT',
       'headers' : {
           'Authorization' : sessionStorage.getItem('oAuth_token')
       },
       'data' : {
           'id' : this.props.place.id,
           'longitude' : this.props.lon,
           'latitude': this.props.lat
       }
   }

   $.ajax(settings)
   .done(function (response, textStatus, xhr) {
       this.setState({succesfullCheckin : true });

   }.bind(this))
   .fail(function(response, textStatus, xhr){
       console.log('fail');
   });
},
render : function(){

    if(this.state.succesfullCheckin)
        return <Success_CIn_Component place={this.props.place} />

    return (
        <div className="success-page" onClick={this.checkin}>
        <div className="benches">
        <img className="benches" src="../assets/img/placeholder_home.jpeg"/>
        </div>
        <div className="success-overlay"></div>
        <i className="lines-icon icon-close"></i>
        <i className="lines-icon icon-check"></i>
        <p>Nieuwe Locatie aangemaakt</p>
        <h2>{this.props.place.name}</h2>
        </div>
        )
},


close : function() {
    document.location.href = '/global';
},


});


export default Success_AddLoc_Component;
