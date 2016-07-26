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
            <span className="ontdek-login">Log in</span>
            <div className="welcome-text wt-NLI">
            <h2>Hey</h2>
            <h1>Lezer!</h1>
            <h3>Fijn je te ontmoeten</h3>
            </div>
            <div className="ontdek-aanmelden">
            <i className="know-eachother">Zullen we elkaar wat beter leren kennen?</i>
            <div className="aanmelden-button">
            <i className="lines-icon icon-user-follow"></i>
            <p><a onClick={this.redirect}>Aanmelden</a></p>
            </div>
            </div>
            </div>
            )
    },

    redirect : function(){
        document.location.href= '/login';
    },
})
