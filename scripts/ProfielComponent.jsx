var React = require('react');
var ProfielBlockComponent = require('./ProfielBlockComponent.jsx');
var RecentComponent = require('./RecentComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
    Profiel page
    <Profiel/>
*/
var ProfielComponent = React.createClass({
    render : function(){
        var user = this.state.user;
        return (
            <div id="profiel-page">
                <div id="page-content">
                    <ProfielBlockComponent  user={user}/>
                    <RecentComponent />
                </div>
                <NavbarComponent />
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
                'Authorization': localStorage.getItem('oAuth_token'),
            },
        }

        $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            localStorage.setItem('oAuth_token', xhr.getResponseHeader('Authorization'));
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
            "Authorization": localStorage.getItem('oAuth_token'),
        },
    }

    $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            self.setState({user: response});
            localStorage.setItem('oAuth_token', xhr.getResponseHeader('Authorization'));
        })
        .fail(function(response, textStatus, xhr){
            console.log('fail');
            localStorage.setItem('oAuth_token', response.oAuth_token);
        });
    }
})

export default ProfielComponent;
