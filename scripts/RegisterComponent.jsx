var React = require('react');
var NavbarComponent = require('./NavbarComponent.jsx');
var HeadBarComponent  = require('./HeadBarComponent.jsx');
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
                <div className='register-page' id='app'>
                    <HeadBarComponent/>
                    <div className='page-content'>
                        <form>
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
                                    <label htmlFor='password'>Paswoord</label>
                                    <input name='password' type='password' onChange={this.handleChange} placeholder='******'/>
                                </div>
                                <div className='form-field'>
                                    <label htmlFor='confirm_password'></label>
                                    <input name='confirm_password' type='password' onChange={this.handleChange} placeholder='******'/>
                                </div>
                            </div>
                            <button onClick={this.register}>Aanmelden</button>
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

        register : function(event) {
            event.preventDefault();
            var settings = {
                'crossDomain': true,
                'url': 'http://95.85.15.210/auth/register',
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
                .fail(function(){
                    console.log('fail');
                });
        }
    })

export default RegisterComponent;
