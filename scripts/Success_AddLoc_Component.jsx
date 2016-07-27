var React = require('react');

/*
Success page (Added location)
<Success_AddLoc/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="success-page">
            <div className="benches">
                <img className="benches" src="../assets/img/placeholder_home.jpeg"/>
            </div>
            <div className="success-overlay"></div>
            <i className="lines-icon icon-close"></i>
            <i className="lines-icon icon-check"></i>
            <p>Nieuwe Locatie aangemaakt</p>
            <h2>Sint-Donatuspark</h2>
            </div>
        )
    }
})
