var React = require('react');
var NavbarComponent = require('./NavbarComponent.jsx');
import { browserHistory } from 'react-router';

/*
    Login page
    <LoginPage/>
*/
var LoginPageComponent = React.createClass({
    getInitialState : function() {
        return {
            email : '',
            password : '',
            errors : false
        };
    },

    triggerError : function() {
        if (this.state.errors) {
            var style = {
                'BackgroundColor' : 'red'
            };
            return (
                <div style={style} className='error' >
                    <p>Uw e-mail of wachtwoord klopt niet.</p>
                </div>
            );
        }
    },

    render : function() {
        return (
            <div className="login-page">
                <div className="page-content">
                    <div className="benches">
                        <img className="benches" src="../assets/img/placeholder_home.jpeg"/>
                    </div>
                    <div className="login-overlay">
                        {/*<img src="../assets/img/overlay_black.svg"/>*/}
                    </div>
                    <p className="back-button" onClick={this.redirectBack}>
                        <i className="lines-icon icon-arrow-left"></i> Back
                    </p>
                    <span className="register-link" onClick={this.redirectRegister} >Registeren</span>
                    <h1>Welcome terug!</h1>
                    <h2>Fijn dat je er weer bent.</h2>
                    {this.triggerError()}
                    <form>
                        <div className="login-form">
                            <div className="form-field">
                                <label htmlFor="email">E-mail</label>
                                <input type='text' name='email' onChange={this.handleChange} placeholder="Typ e-mailadres"/>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Wachtwoord</label>
                                <input type='password' name='password' onChange={this.handleChange} placeholder="*****"/>
                            </div>
                        </div>
                        <button onClick={this.login}>Aanmelden</button>
                    </form>
                </div>
                <NavbarComponent/>
            </div>
            )
    },
    redirectRegister : function() {
        document.location.href = '/register';
    },

    redirectBack : function() {
        browserHistory.go(-1);
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
            'url': '//95.85.15.210/auth/login',
            "method": "POST",
            'data' : {
                'email' : this.state.email,
                'password' : this.state.password,
            }
        }

        $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            sessionStorage.setItem('oAuth_token', response.oAuth_token);
            document.location.href = '/';
        }.bind(this))
        .fail(function(response, textStatus, xhr){
            if (response.status === 404) {
                this.setState({errors : true});
            }
        }.bind(this));
    }
})

export default LoginPageComponent;
