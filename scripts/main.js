var React = require('react');
var ReactDOM = require('react-dom');
var RegisterComponent = require('./RegisterComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');
var Profiel = require('./ProfielComponent.jsx');
var ProfielBlock = require('./ProfielBlockComponent.jsx');
var SearchBarComponent = require('./SearchBarComponent.jsx')
var RecentComponent = require('./RecentComponent.jsx');
var LocationRowComponent = require('./LocationRowComponent.jsx');
var ListViewComponent = require('./ListViewComponent.jsx');
var MapViewComponent = require('./MapViewComponent.jsx');
var Detail_MapViewComponent = require('./Detail_MapViewComponent.jsx');
var LeuvenMapSmallComponent = require('./LeuvenMapSmallComponent.jsx');
var SplashPageComponent = require('./SplashPageComponent.jsx');
var OntdekPage_NLI_Component = require('./OntdekPage_NLI_Component.jsx');
var HalfNHalfComponent = require('./HalfNHalfComponent.jsx');
var Plaats_TV_Component = require('./Plaats_TV_Component.jsx');
var LoginPageComponent = require('./LoginPageComponent.jsx');

/*Route related var*/
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
import { browserHistory } from 'react-router'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


var placeNear;
var userLocation;
var locationNearUser;
var infoOfPlace;

var id = 0;
var idPos = 0;
var idLoc = 0;




/* Function for testing other functions*/

$(document).ready(function() {
  //getAccessToken();
  //getPlaceNear();
  //getCoordinate();
  //getPlaceNear();

});

function login() {
     var settings = {
          'crossDomain': true,
          'url': 'http://95.85.15.210/auth/login',
          'method': 'POST',
          'data': {
               'email': 'thibautvincent@icloud.com',
               'password': 'thibaut'
          },
     }


     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        return response;
    })
    .fail(function(){
        console.log('fail');
    });
}


/*Call the api to get the place near the user*/
function getPlaceNear() {
     var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://95.85.15.210/places/50.873737/4.702240",//+userLocation.lat+"/"+userLocation.lon,
          "method": "GET",
          "headers": {
              "Authorization": "Bearer "+ localStorage.getItem('oAuth_token'),
              "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",

       },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data"
    }

    $.ajax(settings).done(function (response) {
    console.log('get places');
    var data = JSON.parse(response);
    return data;

 });
};





function getCoordinate(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleCoordinate);
    }else{
        console.log("Sorry the location is not available");
    }


};


/*Callback function that will be trigger when a location is available */
function handleCoordinate(position) {
    var msg = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
    console.log(msg);


    var coordinate =  {
        lat : position.coords.latitude,
        long : position.coords.longitude
    };

    userLocation = coordinate;
};


var AuthorizationCheck = function(nextState, replace) {
    if (!localStorage.getItem('oAuth_token')) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
      })

    }
}

    var routes = (
        <Router history={browserHistory}>
        <Route path='/' component={SplashPageComponent} />
        <Route path='/home' component={OntdekPage_NLI_Component}/>
        <Route path='/global' component={HalfNHalfComponent} onEnter={AuthorizationCheck} />
        <Route path='/map' component={MapViewComponent} onEnter={AuthorizationCheck}/>
        <Route path='/addLocation' component={Plaats_TV_Component}/>
        <Route path='/profiel' component={Profiel} onEnter={AuthorizationCheck} />
        <Route path='/listViewLocation' component={ListViewComponent} onEnter={AuthorizationCheck} />
        <Route path='/Login' component={LoginPageComponent}/>
        <Route path='/details/:id' component={Detail_MapViewComponent} onEnter={AuthorizationCheck} />
        <Route path='/register' component={RegisterComponent} />
    </Router>);

ReactDOM.render(routes, document.querySelector('#main'));


