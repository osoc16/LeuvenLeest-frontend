var React = require('react');

/*
'Adres' block on location's page
<AdresBlock/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="adres-block">
            <div className="adres-text">
            <h3>{this.props.data === undefined ? "" : this.props.data.name}</h3>
            <p>
            {this.props.data === undefined ? "" : this.props.data.address}<br/>            
            </p>
            </div>
            <div className="route-button">
            <div className="route-content">
            <i className="lines-icon icon-cursor"></i>
            <p>Route beschrijving</p>
            </div>
            </div>
            </div>
        )
    }
})
