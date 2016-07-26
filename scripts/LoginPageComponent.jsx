var React = require('react');

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
            <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-big"/>
            <p>Login</p>
            <form>
                <input type='text' name='email' onChange={this.handleChange} />
                <input type='text' name='password' onChange={this.handleChange} />
                <input type='submit' onClick={this.login} />
            </form>
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
            if (xhr === 'Unauthorized'){
                console.log('fail');
            }
        });
    }
})
