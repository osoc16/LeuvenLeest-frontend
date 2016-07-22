var React = require('react');
var ReactDOM = require('react-dom');

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

/*Map component */
var LeafletMap = React.createClass({
    getInitialState: function() {
        return {
          locations : {},

      };
  },


  componentWillMount : function() {

    if(navigator.geolocation){
        console.log("getting the location");
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

    userLocation = coordinate;

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
    const position = [this.state.locations['pos-'+id].lat, this.state.locations['pos-'+id].lon];
    console.log("render");
    console.log(position);

    const map = (

        <Map  center={position} zoom={12}>
        <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} >

        <Popup>
        <span> You are here !</span>
        </Popup>

        </Marker>
        </Map>

        );
    console.log(map);

    getPlaceNear();
    return (map);
}


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





/*********************************************************************/




/*
    Search bar
    <SearchBar/>
    */
    var SearchBar = React.createClass({
        render : function(){
            return (
                <form className="search-bar" onSubmit="">
                <input type="text" defaultValue="Zoek of sleep de pin naar de exacte locatie" required/>
                </form>
                )
        }
    });

    /* ------------- PAGES ELEMENTS ------------- */

/*
    Header
    <HeadBar/>
    */
    var HeadBar = React.createClass({
        redirect : function(){
            document.location.href="/"
        },
        render : function(){
            return(
                <div className="headbar">

            {/*<i className="lines-icon icon-plus"></i>*/}
            <p className="back-button">
            <i className="lines-icon icon-arrow-left"></i> Back
            </p>
            <p className="title-text">Aan't Lezen</p>
        {/*<i className="lines-icon icon-list head-list"></i>*/}
        <i className="lines-icon icon-map" onClick={this.redirect}></i>
    {/*<i className="lines-icon icon-picture"></i>*/}
    </div>
    )
        }
    })

/*
    Header when adding new place
    <HeadBar_PlaatsTV/>
    */
    var HeadBar_PlaatsTV = React.createClass({
        render : function(){
            return(
                <div className="headbar-ptv">

            {/*<i className="lines-icon icon-plus"></i>*/}
            <p className="back-button">
            <i className="lines-icon icon-arrow-left"></i> Back
            </p>
            <p className="title-text">Plaats toevoegen</p>
        {/*<i className="lines-icon icon-list head-list"></i>*/}
    {/*<i className="lines-icon icon-map"></i>*/}
{/*<i className="lines-icon icon-picture"></i>*/}
<p className="confirm">Aanmaken</p>
<SearchBar/>
</div>
)
        }
    })


/*
    Navigation bar
    <NavBar/>
    */
    var NavBar = React.createClass({

        redirectHome : function(event){
            document.location.href="/home";
        },
        redirectAantLezen :  function(event){
            document.location.href="/global";
        },
        redirectMap : function(event){
            document.location.href="/map";
        },
        redirectProfiel :  function(event){
            document.location.href="/profiel";
        },

        render : function(){
            return (
                <div className="navbar">
                <span className="discover-button nav-button" onClick={this.redirectHome}>
                <i className="lines-icon icon-compass" aria-hidden="true"></i>
                <p>Ontdek</p>
                </span>
                <span className="checkin-button nav-button highlight" onClick={this.redirectAantLezen}>
                <i className="lines-icon icon-eyeglass" aria-hidden="true"></i>
                <p>Aan't Lezen</p>
                </span>
                <span className="profile-button nav-button" onClick={this.redirectMap}>
                <i className="lines-icon icon-map kaart-button" aria-hidden="true" ></i>
                <p>Kaart</p>
                </span>
                <span className="profile-button nav-button" onClick={this.redirectProfiel}>
                <i className="lines-icon icon-user profiel-button" aria-hidden="true"></i>
                <p>Profiel</p>
                </span>
                </div>
                )
        }
    })

/*
    Locations half-screen
    <Locations/>
    */
    var Locations = React.createClass({
        render : function(){
            return (
                <div className="locations-list">
                <ListedLocation_CI/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                </div>
                )
        }
    })

/*
    Locations on the whole screen
    <FullLocations/>
    */
    var FullLocations = React.createClass({
        render : function(){
            return (
                <div className="locations-list list-full">
                <ListedLocation_CI/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                <ListedLocation/>
                </div>
                )
        }
    })

/*
    Map
    <LeuvenMap/>
    */
    var LeuvenMap = React.createClass({
        render : function(){
            return (
                <div className="map-container">
                <img src="../../css/img/map.svg" className="map"/>
                </div>
                )
        }
    })

/*
    Map Small (half-screen)
    <LeuvenMapSmall/>
    */
    var LeuvenMapSmall = React.createClass({
        render : function(){
            return (
                <div className="map-container-small">
                <LeafletMap divClass="map-container-small-leaftlet"/>
                </div>
                )
        }
    })

/*
    Location in list
    <ListedLocation/>
    */
    var ListedLocation = React.createClass({
        render : function(){
            return (
                <div className="listed-location">
                <div className="location-text">
                <i>Kade</i>
                <p>Vaartkom</p>
                </div>
                <div className="checkin">
                <div className="button-content">
                <i className="lines-icon icon-eyeglass"></i>
                <p>Hier aan't lezen</p>
                </div>
                </div>
                </div>
                )
        }
    })

/*
    Checked-in location in list
    <ListedLocation_CI/>
    */
    var ListedLocation_CI = React.createClass({
        render : function(){
            return (
                <div className="listed-location">
                <div className="location-text">
                <i>Kade</i>
                <p>Vaartkom</p>
                </div>
                <div className="checkin ci-active">
                <div className="button-content">
                <i className="lines-icon icon-eyeglass"></i>
                <p>Hier aan't lezen</p>
                </div>
                </div>
                </div>
                )
        }
    })

/*
    "Hey *name*" block on Ontdek Page
    <WelcomeBlock/>
    */
    var WelcomeBlock = React.createClass({

        getInitialState : function() {
            return {
                user : {}
            }
        },

        render : function(){
            var user = this.state.user;
            return (
                <div className="welcome-block">
                <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-small"/>
                <span className="profiel-button">
                <i className="lines-icon icon-user"></i>
                </span>
                <div className="welcome-text">
                <h2>Hey</h2>
                <h1 className="user-name">{user.name}!</h1>
                </div>
                </div>
                )
        },

        componentWillMount : function() {
            this.getUserDetails();
        },

        getUserDetails : function() {
            var self = this;
            var token = 'Bearer ' + localStorage.getItem('oAuth_token');
            var settings = {
                "crossDomain": true,
                "url": "http://95.85.15.210/user/current",
                "method": "GET",
                "processData": false,
                "contentType": false,
                'headers' : {
                    'Authorization' : token
                }
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                self.setState({user : response});
            })
            .fail(function(){
                console.log('fail');
            });
        }
    })

/*
    "Hey stranger, sign in" block on Ontdek Page when not logged in
    <NLI_WelcomeBlock/>
    */
    var NLI_WelcomeBlock = React.createClass({
        render : function(){
            return (
                <div className="welcome-block wb-NLI">
                <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-small"/>
                <div className="welcome-text wt-NLI">
                <h2>Hey</h2>
                <h1>Stranger!</h1>
                <h3>Nice to meet you</h3>
                </div>
                <div className="ontdek-login">
                <i className="know-eachother">Let's get to know eachother</i>
                <div className="login-button fb-blue">
                <i className="fa fa-facebook"></i>
                <p><a onClick={this.login} >Sign in with Facebook</a></p>
                </div>
                </div>
                </div>
                )
        },

        login : function() {
                document.location.href ='http://95.85.15.210/auth/login/fb';
            var settings = {
                "crossDomain": true,
                "Access-Control-Allow-Origin": "*",
                "url": "http://95.85.15.210/auth/login/fb",
                "processData": false,
                "contentType": false,
                "method": "GET",
                'header' : {

                }
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                console.log(response);
                // document.location.href= response;
            })
            .fail(function(){
                console.log('fail');
            });
        }
    })

    /*
    Profiel block (photo + name + logout)
    <ProfielBlock/>
    */
    var ProfielBlock = React.createClass({
        render : function(){
            console.log(this.props.user);
            var user = this.props.user;
            return (
                <div className="profiel-block">
                    <h1>Je profiel</h1>
                <div className="profile-pic">
                </div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <h3><a onClick={this.logout}>Uitloggen</a></h3>
                </div>
            )
        },

        logout : function(){
            var settings = {
                "crossDomain": true,
                "url": "http://95.85.15.210/auth/logout",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                'header' : {
                    'Authorization' : 'Bearer ' .localStorage.getItem('oAuth_token')
                }
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                localStorage.removeItem('oAuth_token');
                document.location.href='/profiel';
            })
            .fail(function(){
                console.log('fail');
            });
        }
    })

/*
    "Add LLH to your home"
    <AddToHome/>
    */
    var AddToHome = React.createClass({
        render : function(){
            return (
                <div className="add-home">
                <img src="../assets/img/LeuvenLeest_Icon.svg" className="app-icon"/>
                <p>Tap hier om <b>LeuvenLeest</b> toe te voegen aan je homescreen</p>
                <span className="bottom-bg"></span>
                </div>
                )
        }
    })

/*
    Row of locations from Homescreen
    <LocationRow/>
    */
    var LocationRow = React.createClass({
        redirect: function(){
            //alert(this.props.data.id);
            document.location.href="/details/"+this.props.data.id;

        },

        componentWillMount:function(){

        },
        render : function(){
            console.log("locationRow");
            return (
                <div className="location-small" onClick={this.redirect}>
                    <div className="location-text">
                        <i> {this.props.data === undefined ? "" : this.props.data.category}</i>
                        <p> {this.props.data === undefined ? "" : this.props.data.name}</p>
                    </div>
                </div>
                )
        }
    })

/*
    Recent activity
    <Recent/>
    */
    var Recent = React.createClass({
        render : function(){
            return (
                <div className="recent-act home-row">
                <h3>Recente bezocht</h3>
                <LocationRow/>
                </div>
                )
        }
    })

/*
    Dichtbij
    <Dichtbij/>
    */
    var Dichtbij = React.createClass({
        componentWillMount : function(){
            var self = this;
            var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "http://95.85.15.210/places/50/40", //+userLocation.lat+"/"+userLocation.lon,
                  "method": "GET",
                   "headers": {
                        "Authorization": 'Bearer "'+ localStorage.getItem('oAuth_token'),
                },
                "processData": false,
                 "contentType": false,
                 "mimeType": "multipart/form-data"
               }

             $.ajax(settings).done(function (response) {
             console.log('get places');
             var data = JSON.parse(response);
             self.setState({places : data});
             console.log(self.state.places);
            // return data;
         });
            // this.setState({places : getPlaceNear()});
            // console.log("dichtbij");
            // //this.setstate({counters: this.state.counters});
            // console.log(this.state.places);
    },

    getInitialState : function(){
        console.log('initial');
        return {
            places : []
        }
    },


    render : function(){

        console.log("render");
        console.log(this.state.places[0]);
        return (
            <div className="dichtbij home-row">
            <h3>Dichtbij</h3>
                <div className="location-row">
                    {this.state.places.map(function(object, i) {
                        return <LocationRow data={object} key={i} />;
                    })}
                </div>
            </div>
            );
        }
    })

/*
    Dichtbij & Recent activity
    <DichtbijCo/>
    */
    var DichtbijCo = React.createClass({
        render : function(){
            return (
                <div className="home-locations">
                <Recent/>
                <Dichtbij/>
                </div>
                )
        }
    })

/*
    'Adres' block on location's page
    <AdresBlock/>
    */
    var AdresBlock = React.createClass({
        render : function(){
            console.log(this.props.data);
            return (
                <div className="adres-block">
                <div className="adres-text">
                <h3>{this.props.data === undefined ? "" : this.props.data.name}</h3>
                <p>
                {this.props.data === undefined ? "" : this.props.data.address}<br/>
                3000
                </p>
                </div>
                <div className="route-button">
                <div className="route-content">
                <i className="lines-icon icon-cursor"></i>
                <p>Route beschrijving</p>
                </div>
                </div>
                </div>
                )
        }
    })

/*
    'Openingsuren' block on location's page
    <Openings/>
    */
    var Openings = React.createClass({
        render : function(){
            return (
                <div className="openingsuren">
                <div className="op-text">
                <h3>Openingsuren</h3>
                <p>
                0:00 - 0:00<br/>

                </p>
                </div>
                </div>
                )
        }
    })

/*
    Map of a specific location on said location's page
    <LocationMap/>
    */
    var LocationMap = React.createClass({


        render : function(){
            return (
                <div className="detail-map">
                <LeuvenMapSmall/>
                <div className="name-n-checkin">
                <div className="location-text">
                <i>{this.props.data.category === undefined ? "" : this.props.data.category}</i>
                <p>{this.props.data.name === undefined ? "" : this.props.data.name}</p>
                </div>
                <div className="checkin">
                <div className="button-content">
                <i className="lines-icon icon-eyeglass"></i>
                <p>Hier aan't lezen</p>
                </div>
                </div>
                </div>
                </div>
                )
        }
    })

/*
    Carousel for locations's pages
    <Carousel/>
    */
    var Carousel = React.createClass({
        render : function(){
            return (
                <div className="carrousel">
                <input type="radio" name="slides" id="radio-1" defaultChecked/>
                <input type="radio" name="slides" id="radio-2"/>
                <input type="radio" name="slides" id="radio-3"/>
                <input type="radio" name="slides" id="radio-4"/>
                <ul className="slides">
                <li className="slide">
                <p>
                <img src="../assets/css/img/park1.jpg"/>
                </p>
                </li>
                <li className="slide">
                <p>
                <img src="../assets/css/img/park2.jpg"/>
                </p>
                </li>
                <li className="slide">
                <p>
                <img src="../assets/css/img/park3.jpeg"/>
                </p>
                </li>
                <li className="slide">
                <p>
                <img src="../assets/css/img/park4.jpg"/>
                </p>
                </li>
                </ul>
                <div className="slidesNavigation">
                <label htmlFor="radio-1" id="dotForRadio-1"></label>
                <label htmlFor="radio-2" id="dotForRadio-2"></label>
                <label htmlFor="radio-3" id="dotForRadio-3"></label>
                <label htmlFor="radio-4" id="dotForRadio-4"></label>
                </div>
                </div>
                )
        }
    })

/*
    Pictures of a specific location on said location's page
    <LocationPics/>
    */
    var LocationPics = React.createClass({
        render : function(){
            return (
                <div className="detail-pics">
                <Carousel/>
                <div className="name-n-checkin">
                <div className="location-text">
                <i>Park</i>
                <p>Sint-Donatuspark</p>
                </div>
                <div className="checkin">
                <div className="button-content">
                <i className="lines-icon icon-eyeglass"></i>
                <p>Hier aan't lezen</p>
                </div>
                </div>
                </div>
                </div>
                )
        }
    })

/*
    Details of a specific location on said location's page
    <LocationDetails/>
    */
    var LocationDetails = React.createClass({
        render : function(){
            //The state will always contain 1 row
            console.log(this.props.data);
            return (
                <div className="detail-infos">
                <AdresBlock data={this.props.data}/>
                <Openings/>
                </div>
                )
        }
    })

    /* ------------- FULL PAGES ------------- */

/*
    SplashPage
    <SplashPage/>
    */
    var SplashPage = React.createClass({
        redirect : function(){
            document.location.href="/home";
        },

        render : function(){
            return (
                <div className="splash-page">
                <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-big"/>
                <div className="start-button">
                <div className="button-content" id="start-button" onClick={this.redirect}>
                <p>Start</p>
                <i className="lines-icon icon-arrow-right"></i>
                </div>
                </div>
                <AddToHome/>
                </div>
                )
        }
    })

/*
    Login page
    <LoginPage/>
    */
    var LoginPage = React.createClass({

        getInitialState : function() {
            return {
                email : '',
                password : ''
            };
        },

        render : function(){
            return (
                <div className="login-page">
                <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-big"/>
                <p>Login</p>
                <form>
                    <input type='text' name='email' onChange={this.handleChange} />
                    <input type='text' name='password' onChange={this.handleChange} />
                    <input type='submit' onClick={this.login} />
                </form>
                </div>
                )
        },

        handleChange : function(event) {
            if (event.target.name === 'email') {
                this.setState({email : event.target.value});
            }
            if (event.target.name === 'password') {
                this.setState({password : event.target.value});
            }
        },

        login : function(event) {
            event.preventDefault();
            var self = this;
             var settings = {
                'crossDomain': true,
                'url': 'http://95.85.15.210/auth/login',
                "method": "POST",
                'data' : {
                    'email' : this.state.email,
                    'password' : this.state.password
                }
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                localStorage.setItem('oAuth_token', response.oAuth_token);
                document.location.href = '/home';
               console.log(response);
            })
            .fail(function(response, textStatus, xhr){
                console.log(response);
                if (xhr === 'Unauthorized'){
                    console.log('fail');
                }
            });
        }
    })

/*
    Home/Ontdek page when logged-in
    <OntdekPage_LI/>
    */
    var OntdekPage_LI = React.createClass({
        render : function(){
            return (
                <div className="ontdek-page">
                <div className="page-content">
                <WelcomeBlock/>
                <DichtbijCo/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Home/Ontdek page not logged-in
    <OntdekPage_NLI/>
    */
    var OntdekPage_NLI = React.createClass({
        render : function(){
            if (localStorage.getItem('oAuth_token')) {
                return (<OntdekPage_LI />);
            }
            return (
                <div className="ontdek-page">
                <div className="page-content">
                <NLI_WelcomeBlock/>
                <div className="home-locations">
                <Dichtbij/>
                </div>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Full map view
    <MapView/>
    */
    var MapView = React.createClass({
        render : function(){
            return (
                <div id="app">
                <HeadBar/>
                <div className="map-container">
                <LeafletMap divClass="full-map-container"/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Half Map, Half Locations
    <@Half/>
    */
    var HalfNHalf = React.createClass({
        render : function(){
            return (
                <div id="app">
                <HeadBar/>
                <LeuvenMapSmall/>
                <div className="swiper">
                <span className="swiper-center"></span>
                </div>
                <div className="page-content">
                <Locations/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    List of locations
    <ListView/>
    */
    var ListView = React.createClass({
        render : function(){
            return (
                <div id="app">
                <HeadBar/>
                <div className="page-content">
                <FullLocations/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Profiel page
    <Profiel/>
    */
    var Profiel = React.createClass({
        render : function(){
            var user = this.state.user;
            return (
                <div id="profiel-page">
                <div id="page-content">
                <ProfielBlock  user={user}/>
                <Recent/>
                </div>
                <NavBar/>
                </div>
                )
        },

        getInitialState : function(){
            return {
                user :{},
                places : {}
            }
        },

        componentWillMount : function(){
            this.getAccountDetails();
            this.getRecentPlaces();
        },

        getRecentPlaces : function(){
            var self = this;
             var settings = {
                "crossDomain": true,
                "url": "http://95.85.15.210/checkin/recent",
                "method": "GET",
                "headers": {
                    "Authorization": 'Bearer ' +  localStorage.getItem('oAuth_token'),
                },
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                self.setState({places : response});
            })
            .fail(function(response, textStatus, xhr){
                if (xhr === 'Unauthorized'){
                    document.location.href="/";
                }
            });
        },

        getAccountDetails : function(){
            var self = this;
            var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/user/current',
            'method': 'GET',
            "headers": {
                "Authorization": 'Bearer ' +  localStorage.getItem('oAuth_token'),
            },
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                self.setState({user: response});
            })
            .fail(function(response, textStatus, xhr){

                console.log(xhr);
                console.log('fail');
            });
        }
    })

/*
    Detail view (Map)
    <Detail_MapView/>
    */
    var Detail_MapView = React.createClass({

       getInitialState: function() {
        return {
            place : {},

        };
    },


    componentWillMount:function(){
        var self = this;

        var currentURL = document.location.href;
        console.log(currentURL);
        var splitString = currentURL.split("/");
        var idPlace = splitString[splitString.length-1];


        var settings = {
              "async": true,
              "crossDomain": true,
                  "url": "http://95.85.15.210/places/"+idPlace, //+userLocation.lat+"/"+userLocation.lon,
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
                console.log('get places By id');

                var data = JSON.parse(response);
                console.log(data);
                self.setState({place : data});
                infoOfPlace = data;
                console.log(self.state.place);

             });
        },

        render : function(){
            return (
                <div className="detail-page">
                <HeadBar/>
                <div className="page-content">
                <LocationMap data={this.state.place}/>
                <LocationDetails data={this.state.place}/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Add location (Plaats toevoegen)
    <Plaats_TV/>
    */
    var Plaats_TV = React.createClass({
        render : function(){
            return (
                <div className="add-place">
                <HeadBar_PlaatsTV/>
                <div className="page-content">
                <LocationMap/>
                <LocationDetails/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Detail view (Pictures)
    <Detail_PicView/>
    */
    var Detail_PicView = React.createClass({
        render : function(){
            return (
                <div className="detail-page">
                <HeadBar/>
                <div className="page-content">
                <LocationPics/>
                <LocationDetails/>
                </div>
                <NavBar/>
                </div>
                )
        }
    })

/*
    Success page (Added location)
    <Success_AddLoc/>
    */
    var Success_AddLoc = React.createClass({
        render : function(){
            return (
                <div className="success-page">
                <i className="lines-icon icon-close"></i>
                <i className="lines-icon icon-check"></i>
                <p>Nieuwe Locatie aangemaakt</p>
                <h2>Sint-Donatuspark</h2>
                </div>
                )
        }
    })

/*
    Success page (Checked In)
    <Success_CIn/>
    */
    var Success_CIn = React.createClass({
        render : function(){
            return (
                <div className="success-page">
                <i className="lines-icon icon-close"></i>
                <i className="lines-icon icon-check"></i>
                <p>Aan't lezen bij</p>
                <h2>Sint-Donatuspark</h2>
                </div>
                )
        }
    })

    var RegisterComponent = React.createClass({

        getInitialState : function(){
            return {
                name : '',
                email : '',
                password : '',
                confirm_password : ''
            }
        },

        render : function() {
            return (
                <div>
                    <form>
                    <input name='name' type='text' onChange={this.handleChange} /><br/>
                    <input name='email' type='text' onChange={this.handleChange} /> <br/>
                    <input name='password' type='text' onChange={this.handleChange} /> <br/>
                    <input name='confirm_password' type='text' onChange={this.handleChange} />
                    <input type='submit' onClick={this.register} />
                    </form>
                </div>
            );

        },

        handleChange : function(event) {
            var name = event.target.name;
            var value = event.target.value;
            if (name === 'name') {
                this.setState({name : value});
            }
            if (name === 'email') {
                this.setState({email : value});
            }
            if (name === 'password') {
                this.setState({password : value});
            }
            if (name === 'confirm_password') {
                this.setState({confirm_password : value});
            }

        },

        register : function(event) {
            event.preventDefault();
            console.log('register');
            var settings = {
                "crossDomain": true,
                "url": "http://95.85.15.210/auth/register",
                "method": "PUT",
                'data': {
                    'name' : this.state.name,
                    'email': this.state.email,
                    'password': this.state.password,
                    'password_confirmation' : this.state.confirm_password
                },
            }
             $.ajax(settings)
                .done(function (response, textStatus, xhr) {
                    localStorage.setItem('oAuth_token', response.oAuth_token);
                    document.location.href = '/home';

                })
                .fail(function(){
                    console.log('fail');
                });
        }
    })


    var routes = (
        <Router history={browserHistory}>
        <Route path='/' component={SplashPage}/>
        <Route path='/home' component={OntdekPage_NLI}/>
        <Route path='/global' component={HalfNHalf}/>
        <Route path='/map' component={MapView}/>
        <Route path='/addLocation' component={Plaats_TV}/>
        <Route path='/profiel' component={Profiel}/>
        <Route path='/listViewLocation' component={ListView}/>
        <Route path='/Login' component={LoginPage}/>
        <Route path='/details/:id' component={Detail_MapView}/>
        <Route path='/register' component={RegisterComponent} />
    </Router>);

    ReactDOM.render(routes, document.querySelector('#main'));


