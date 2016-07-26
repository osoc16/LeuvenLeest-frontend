var React = require('react');

/*
"Hey *name*" block on Ontdek Page
<WelcomeBlockComponent />
*/
var WelcomeBlockComponent = React.createClass({

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

export default WelcomeBlockComponent;
