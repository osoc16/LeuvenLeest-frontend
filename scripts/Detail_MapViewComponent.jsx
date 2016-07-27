var React = require('react');
var HeadBarComponent  = require('./HeadBarComponent.jsx');
var LocationMapComponent = require('./LocationMapComponent.jsx');
var LocationDetailsComponent = require('./LocationDetailsComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');
var Success_CIn_Component = require('./Success_CIn_Component.jsx');

import { browserHistory } from 'react-router';
/*
Detail view (Map)
<Detail_MapView/>
*/
var Detail_MapViewComponent = React.createClass({

   getInitialState: function() {
        return {
            place : {},
            coordinates : {},
            succesfullCheckin : false,
            placeCheckedIn : {}
        };
    },

    /*Callback function that will be trigger when a location is available */
    handleCoordinate : function(position) {

        var coordinate =  {
            lat : position.coords.latitude,
            long : position.coords.longitude
        };
        this.setState({coordinates : coordinate});
        return coordinate;
    },

    getCoordinate : function(){
        if(navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(this.handleCoordinate);
        }else{
            console.log("Sorry the location is not available");
        }
    },

    componentWillMount:function(){
        var currentURL = document.location.href;
        var splitString = currentURL.split("/");
        var idPlace = splitString[splitString.length-1];
        var geolocation = this.getCoordinate();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://95.85.15.210/places/"+idPlace,
            "method": "GET",
            "headers": {
                "Authorization": sessionStorage.getItem('oAuth_token'),
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data"
        };


         $.ajax(settings).done(function (response) {
            if (response.oAuth_token) {
                sessionStorage.setItem('oAuth_token', response.oAuth_token);
            }
            var place = JSON.parse(JSON.parse(response).data);
            this.setState({place : place});
        }.bind(this));
    },

    handleCheckin : function(status, place) {
        this.setState({placeCheckedIn : place});
        this.setState({succesfullCheckin : status});
    },

    render : function() {

        if (this.state.succesfullCheckin) {
            return <Success_CIn_Component place={this.state.placeCheckedIn} />;
        }

        return (
            <div className="detail-page">
                <HeadBarComponent />
                <div className="page-content">
                    <LocationMapComponent place={this.state.place} coordinates={this.state.coordinates} callBack={this.handleCheckin} />
                    <LocationDetailsComponent data={this.state.place}/>
                </div>
                <NavbarComponent />
            </div>
        );
    }
})

export default Detail_MapViewComponent;
