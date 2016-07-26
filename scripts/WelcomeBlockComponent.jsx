var React = require('react');

/*
"Hey *name*" block on Ontdek Page
<WelcomeBlockComponent />
*/
var WelcomeBlockComponent = React.createClass({
    propTypes : {
        user: React.PropTypes.object.isRequired
    },

    render : function(){
        return (
            <div className="welcome-block">
            <img src="../assets/img/LeuvenLeestLogo.svg" className="logo-small"/>
            <div className="welcome-text">
            <h2>Hey</h2>
            <h1 className="user-name">{this.props.user.name}!</h1>
            </div>
            </div>
            )
    },
})

export default WelcomeBlockComponent;
