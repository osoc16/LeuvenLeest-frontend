var React = require('react');

/*
'Hey *name*' block on Ontdek Page
<WelcomeBlockComponent />
*/
var WelcomeBlockComponent = React.createClass({

    getInitialState : function() {
        return {
            user : {},
        }
    },

    componentWillMount: function() {
        var self = this;
        var settings = {
            'crossDomain': true,
            'url': '//leuvenleestapp.be/user/current',
            'method': 'GET',
            'headers' : {
                'Authorization' : sessionStorage.getItem('oAuth_token')
            }
        }

        $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            if (response.oAuth_token) {
                sessionStorage.setItem('oAuth_token', 'Bearer' + response.oAuth_token);
            }
            this.setState({user : response.data});
        }.bind(this))
    },

    render : function(){
        return (
            <div className='welcome-block'>
                <div className='benches'>
                    <img className='benches' src='../assets/img/placeholder_home.jpeg'/>
                </div>
                <div className='login-overlay'>
                    {/*<img src='../assets/img/overlay_black.svg'/>*/}
                </div>
                <img src='../assets/img/LeuvenLeestLogo.svg' className='logo-small'/>
                <div className='welcome-text'>
                    <h2>Hey</h2>
                    <h1 className='user-name'>{this.state.user.name}!</h1>
                </div>
            </div>
        );
    },
})

export default WelcomeBlockComponent;
