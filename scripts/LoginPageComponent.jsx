var React = require('react');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
    Login page
    <LoginPage/>
*/
module.exports = React.createClass({
    getInitialState : function() {
        return {
            email : '',
            password : ''
        };
    },

    render : function(){
        return (
            <div className="login-page">
                <p className="back-button">
                    <i className="lines-icon icon-arrow-left" onClick={this.redirectBack}></i> Back
                </p>
                <span className="register-link">Registeren</span>
                <h1>Welcome terug!</h1>
                <h2>Fijn dat je er weer bent.</h2>
                <form>
                    <div className="login-form">
                        <div className="form-field">
                            <label for="email">E-mail</label>
                            <input type='text' name='email' onChange={this.handleChange} placeholder="jouw.email@example.be"/>
                        </div>
                        <div className="form-field">
                            <label for="password">Paswoord</label>
                            <input type='password' name='password' onChange={this.handleChange} placeholder="*****"/>
                        </div>
                    </div>
                    <button onClick={this.login}>Aanmelden</button>
                </form>
                <NavbarComponent/>
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
            document.location.href = '/';
        })
        .fail(function(response, textStatus, xhr){
            localStorage.setItem('oAuth_token', xhr.getResponseHeader('Authorization'));
        });
    }
})
