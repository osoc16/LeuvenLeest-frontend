var React = require('react');
var ReactDOM = require('react-dom');
var RegisterComponent = require('./RegisterComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');
var ProfielComponent = require('./ProfielComponent.jsx');
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
var AddPlaceComponent = require('./AddPlaceComponent.jsx');

/*Route related var*/
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
import { browserHistory } from 'react-router'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


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
    <Route path='/profiel' component={ProfielComponent} onEnter={AuthorizationCheck} />
    <Route path='/listViewLocation' component={ListViewComponent} onEnter={AuthorizationCheck} />
    <Route path='/Login' component={LoginPageComponent}/>
    <Route path='/details/:id' component={Detail_MapViewComponent} onEnter={AuthorizationCheck} />
    <Route path='/register' component={RegisterComponent} />
    <Router path='/addPlace' component={AddPlaceComponent} onEnter={AuthorizationCheck} />
    </Router>);

ReactDOM.render(routes, document.querySelector('#main'));


