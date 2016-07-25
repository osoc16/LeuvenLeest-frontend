var React = require('react');

/*
Success page (Added location)
<Success_AddLoc/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="success-page">
            <i className="lines-icon icon-close"></i>
            <i className="lines-icon icon-check"></i>
            <p>Nieuwe Locatie aangemaakt</p>
            <h2>Sint-Donatuspark</h2>
            </div>
        )
    }
})
