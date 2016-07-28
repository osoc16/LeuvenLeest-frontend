var React = require('react');

/*
"Hey stranger, sign in" block on Ontdek Page when not logged in
<NLI_WelcomeBlockComponent />
*/
var NLI_WelcomeBlockComponent = React.createClass({
    render : function(){
        return (
            <div className="welcome-block wb-NLI">
            <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-small"/>
            <span className="ontdek-login" onClick={this.toLogin}>Log in</span>
            <div className="welcome-text wt-NLI">
            <h2>Hey</h2>
            <h1>Lezer!</h1>
            <h3>Deel en bekijk jouw favoriete leesplekken</h3>
            </div>
            <div className="ontdek-aanmelden">
            <div className="aanmelden-button">
            <i className="lines-icon icon-user-follow"></i>
            <p><a onClick={this.toRegister}>Registreer</a></p>
            </div>
            </div>
            </div>
            )
    },

    toRegister  : function(){
        document.location.href = '/register';
    },

    toLogin : function(){
        document.location.href = '/login';
    }
})

export default NLI_WelcomeBlockComponent;
