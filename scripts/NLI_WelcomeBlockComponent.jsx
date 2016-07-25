var React = require('react');

/*
"Hey stranger, sign in" block on Ontdek Page when not logged in
<NLI_WelcomeBlockComponent />
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="welcome-block wb-NLI">
            <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-small"/>
            <div className="welcome-text wt-NLI">
            <h2>Hey</h2>
            <h1>Stranger!</h1>
            <h3>Nice to meet you</h3>
            </div>
            <div className="ontdek-login">
            <i className="know-eachother">Let's get to know eachother</i>
            <div className="login-button fb-blue">
            <p><a onClick={this.redirect}>Sign in</a></p>
            </div>
            </div>
            </div>
            )
    },

    redirect : function(){
        document.location.href= '/login';
    },
})
