var React = require('react');
var NavbarComponent = require('./NavbarComponent.jsx');

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
                <div style={style} >
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
                    <p className="back-button">
                        <i className="lines-icon icon-arrow-left" onClick={this.redirectBack}></i> Back
                    </p>
                    <span className="register-link">Registeren</span>
                    <h1>Welcome terug!</h1>
                    <h2>Fijn dat je er weer bent.</h2>
                    {this.triggerError()}
                    <form>
                        <div className="login-form">
                            <div className="form-field">
                                <label htmlFor="email">E-mail</label>
                                <input type='text' name='email' onChange={this.handleChange} placeholder="jouw.email@example.be"/>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Paswoord</label>
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
                'password' : this.state.password,
            }
        }

        $.ajax(settings)
        .done(function (response, textStatus, xhr) {
            sessionStorage.setItem('oAuth_token', 'Bearer ' + response.oAuth_token);
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
