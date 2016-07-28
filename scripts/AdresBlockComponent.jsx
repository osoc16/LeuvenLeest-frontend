var React = require('react');

/*
'Adres' block on location's page
<AdresBlock/>
*/
var AdresBlockComponent = React.createClass({

    propTypes : {
        place : React.PropTypes.object.isRequired,
    },

    render : function(){
        return (
            <div className="adres-block">
                <div className="adres-text">
                    <h3>{this.props.place.name}</h3>
                    <p>{this.props.place.address}<br/></p>
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

export default AdresBlockComponent;
