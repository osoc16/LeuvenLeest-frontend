var React = require('react');
var AddToHomeComponent = require('./AddToHomeComponent.jsx');

/*
SplashPage
<SplashPage/>
*/
module.exports = React.createClass({
    redirect : function(){
        document.location.href="/home";
    },

    render : function(){
        return (
            <div className="splash-page">
            <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-big"/>
            <div className="start-button">
            <div className="button-content" id="start-button" onClick={this.redirect}>
            <p>Start</p>
            <i className="lines-icon icon-arrow-right"></i>
            </div>
            </div>
            <AddToHomeComponent />
            </div>
            )
    }
})
