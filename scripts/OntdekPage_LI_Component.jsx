var React = require('react');
var WelcomeBlockComponent = require('./WelcomeBlockComponent.jsx');
var DichtbijCoComponent = require('./DichtbijCoComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Home/Ontdek page when logged-in
<OntdekPage_LI/>
*/
var OntdekPage_LI_Component = React.createClass({

    getInitialState : function(){
        return {
            user : {},
            nearbyPlaces : [],
            recentPlaces: [],
            userLocation: {},
        }
    },

    render : function(){
        return (
            <div className="ontdek-page">
                <div className="page-content">
                    <WelcomeBlockComponent user={this.state.user} />
                    <DichtbijCoComponent nearbyPlaces={this.state.nearbyPlaces} recentPlaces={this.state.recentPlaces} />
                </div>
                <NavbarComponent />
            </div>
        )
    },


    componentWillMount : function() {
        this.getUserDetails();
    },

    getUserDetails : function() {
        var self = this;
        var settings = {
            "crossDomain": true,
            "url": "http://95.85.15.210/user/current",
            "method": "GET",
            'headers' : {
                'Authorization' : localStorage.getItem('oAuth_token')
            }
        }

        $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            localStorage.setItem('oAuth_token', xhr.getResponseHeader('Authorization'));
            this.setState({user : response});
            var settings = {
                'async': true,
                'crossDomain': true,
                'url': 'http://95.85.15.210/checkin/recent',
                'method': 'GET',
                'headers' : {
                    'Authorization' : localStorage.getItem('oAuth_token'),
                },
            }

             $.ajax(settings)
                .done(function (response, textStatus, xhr) {
                     this.setState({recentPlaces : response});
                     localStorage.setItem('oAuth_token', xhr.getResponseHeader('Authorization'));
                     navigator.geolocation.getCurrentPosition(function(position){
                            var coordinate =  {
                                lat : position.coords.latitude,
                                lon : position.coords.longitude
                            };
                            this.setState({userLocation : coordinate}, function() {
                            var settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": "http://95.85.15.210/places/"+this.state.userLocation['lat']+"/"+this.state.userLocation['lon'],
                                "method": "GET",
                            }
                             $.ajax(settings).done(function (response, status, xhr) {
                                 self.setState({nearbyPlaces : response});
                            });
                        });
                    }.bind(this));

            }.bind(this));
        }.bind(this))
        .fail(function(){
            console.log('fail');
        });
    },


})

export default OntdekPage_LI_Component;
