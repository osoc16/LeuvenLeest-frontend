var React = require('react');

module.exports = React.createClass({

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
                <div>
                    <form>
                    <input name='name' type='text' onChange={this.handleChange} /><br/>
                    <input name='email' type='text' onChange={this.handleChange} /> <br/>
                    <input name='password' type='text' onChange={this.handleChange} /> <br/>
                    <input name='confirm_password' type='text' onChange={this.handleChange} />
                    <input type='submit' onClick={this.register} />
                    </form>
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
                "crossDomain": true,
                "url": "http://95.85.15.210/auth/register",
                "method": "PUT",
                'data': {
                    'name' : this.state.name,
                    'email': this.state.email,
                    'password': this.state.password,
                    'password_confirmation' : this.state.confirm_password
                },
            }
             $.ajax(settings)
                .done(function (response, textStatus, xhr) {
                    localStorage.setItem('oAuth_token', response.oAuth_token);
                    document.location.href = '/';

                })
                .fail(function(){
                    console.log('fail');
                });
        }
    })
