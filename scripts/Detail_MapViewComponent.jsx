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
            succesfullCheckin : false,
            placeCheckedIn : {},
            coordinates : {}
        };
    },

    /*Callback function that will be trigger when a location is available */
    handleCoordinate : function(position) {
        var coordinate =  {
            lat : position.coords.latitude,
            long : position.coords.longitude
        };
        console.log('Coordinates fetched');
        this.setState({coordinates : coordinate});
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

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.handleCoordinate);
        }else{
            console.log("Sorry the location is not available");
        }

        var settings = {
            "crossDomain": true,
            "url": "//api.leuvenleestapp.be/places/" + idPlace,
            "method": "GET",
            "headers": {
                "Authorization": sessionStorage.getItem('oAuth_token'),
            },
        };

        $.ajax(settings).done(function (response) {
            if (response.oAuth_token) {
                sessionStorage.setItem('oAuth_token', 'Bearer' + response.oAuth_token);
            }
            this.setState({place : JSON.parse(response.data)});
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
                    <LocationDetailsComponent place={this.state.place}/>
                </div>
                <NavbarComponent />
            </div>
        );
    }
})

export default Detail_MapViewComponent;
