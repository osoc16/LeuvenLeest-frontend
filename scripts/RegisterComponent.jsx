var React = require('react');
var NavbarComponent = require('./NavbarComponent.jsx');
var HeadBarComponent  = require('./HeadBarComponent.jsx');
var ErrorComponent = require('./ErrorComponent.jsx');

var RegisterComponent = React.createClass({

        getInitialState : function(){
            return {
                name : '',
                email : '',
                password : '',
                confirm_password : '',
                errors : false,
                ErrorMessage : {}
            }
        },

        render : function() {
            return (
                <div className='register-page' id='app'>
                    <HeadBarComponent/>
                    <div className='page-content'>
                        <form>
                        {this.renderError()}
                            <div className='register-form'>
                                <div className='form-field'>
                                    <label htmlFor='name'>Naam</label>
                                    <input name='name' type='text' onChange={this.handleChange} placeholder='John'/>
                                </div>
                                <div className='form-field'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input name='email' type='text' onChange={this.handleChange} placeholder='Typ e-mailadres'/>
                                </div>
                                <div className='form-field'>
                                    <label htmlFor='password'>Wachtwoord</label>
                                    <input name='password' type='password' onChange={this.handleChange} placeholder='******'/>
                                </div>
                                <div className='form-field'>
                                    <label htmlFor='confirm_password'></label>
                                    <input name='confirm_password' type='password' onChange={this.handleChange} placeholder='******'/>
                                </div>
                            </div>
                            <button onClick={this.register}>Registreer</button>
                        </form>
                    </div>
                    <NavbarComponent/>
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

        renderError : function() {
            if (this.state.errors) {
                return <ErrorComponent errorMessage = {this.state.errorMessage} />
            }
        },

        register : function(event) {
            this.setState({errors : false});
            event.preventDefault();
            var settings = {
            'crossDomain': true,
            'url': '//95.85.15.210/auth/register',
            'method': 'PUT',
            'data': {
                'name' : this.state.name,
                'email': this.state.email,
                'password': this.state.password,
                'password_confirmation' : this.state.confirm_password
                },
            }
            $.ajax(settings)
                .done(function (response, textStatus, xhr) {
                    sessionStorage.setItem('oAuth_token', 'Bearer' + response.oAuth_token);
                    document.location.href = '/';

                })
                .fail(function(response, textStatus, xhr){
                    this.buildErrorMessage(response.responseJSON);
                    this.setState({errors : true});
                }.bind(this));
            },

            buildErrorMessage : function(response) {
                console.log(response);
                if (response.password[1]) {
                    this.setState({errorMessage : response.password[0]});
                }
                if (response.password[0]) {
                    this.setState({errorMessage : response.password[0]});
                }
                if (response.email) {
                    this.setState({errorMessage : response.email[0]});
                }
                if (response.name) {
                    this.setState({errorMessage : response.name[0]});
                }
            }
    })

export default RegisterComponent;
