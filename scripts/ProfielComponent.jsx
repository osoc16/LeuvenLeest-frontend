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
    },


    getAccountDetails : function(){
        var self = this;
        var settings = {
        'crossDomain': true,
        'url': '//api.leuvenleestapp.be/user/current',
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
            self.setState({user: response.data});
        })
        .fail(function(response, textStatus, xhr){
            console.log('fail');
        });
    }
})

export default ProfielComponent;
