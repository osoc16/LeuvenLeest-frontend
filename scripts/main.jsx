var React = require('react');
var ReactDOM = require('react-dom');
var RegisterComponent = require('./RegisterComponent.jsx');
var ProfielComponent = require('./ProfielComponent.jsx');
var RecentComponent = require('./RecentComponent.jsx');
var ListViewComponent = require('./ListViewComponent.jsx');
var MapViewComponent = require('./MapViewComponent.jsx');
var Detail_MapViewComponent = require('./Detail_MapViewComponent.jsx');
var SplashPageComponent = require('./SplashPageComponent.jsx');
var OntdekPage_NLI_Component = require('./OntdekPage_NLI_Component.jsx');
var HalfNHalfComponent = require('./HalfNHalfComponent.jsx');
var Plaats_TV_Component = require('./Plaats_TV_Component.jsx');
var LoginPageComponent = require('./LoginPageComponent.jsx');
var AddPlaceComponent = require('./AddPlaceComponent.jsx');

/*Route related var*/
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
import { browserHistory } from 'react-router';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


var AuthorizationCheck = function(nextState, replace) {
    var self = this;
        var settings = {
        'crossDomain': true,
        'url': 'http://95.85.15.210/user/current',
        'method': 'GET',
        "headers": {
            "Authorization": sessionStorage.getItem('oAuth_token'),
        },
    }

    $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            if (response.oAuth_token) {
                sessionStorage.setItem('oAuth_token', 'Bearer' + response.oAuth_token);
            }
            return true;
        })
        .fail(function(response, textStatus, xhr){
            sessionStorage.removeItem('oAuth_token');
            return document.location.href= '/';
        });

}

var routes = (
   <Router history={browserHistory}>
   <Route path='/' component={OntdekPage_NLI_Component} />
   <Route path='/global' component={HalfNHalfComponent} onEnter={AuthorizationCheck} />
   <Route path='/map' component={MapViewComponent} />
   <Route path='/addLocation' component={Plaats_TV_Component} onEnter={AuthorizationCheck} />
   <Route path='/profiel' component={ProfielComponent} onEnter={AuthorizationCheck} />
   <Route path='/listViewLocation' component={ListViewComponent} onEnter={AuthorizationCheck} />
   <Route path='/Login' component={LoginPageComponent}/>
   <Route path='/details/:placeId' component={Detail_MapViewComponent} onEnter={AuthorizationCheck} />
   <Route path='/register' component={RegisterComponent} />
   <Route path='/addPlace' component={AddPlaceComponent} onEnter={AuthorizationCheck} />
   </Router>);

ReactDOM.render(routes, document.querySelector('#main'));
