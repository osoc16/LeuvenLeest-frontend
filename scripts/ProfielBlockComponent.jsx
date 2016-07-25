var React = require('react');
    /*
    Profiel block (photo + name + logout)
    <ProfielBlock/>
    */
module.exports = React.createClass({
        render : function(){
            console.log(this.props.user);
            var user = this.props.user;
            return (
                <div className="profiel-block">
                    <h1>Je profiel</h1>
                <div className="profile-pic">
                </div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <h3><a onClick={this.logout}>Uitloggen</a></h3>
                </div>
            )
        },

        removeToken : function() {
            localStorage.removeItem('oAuth_token');
        },

        logout : function(){
            var self = this;
            var settings = {
                "crossDomain": true,
                "url": "http://95.85.15.210/auth/logout",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                'header' : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('oAuth_token')
                }
            }

            $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                self.removeToken();
                document.location.href='/';
            })
            .fail(function(){
                console.log('fail');
            });
        }
    })
