var React = require('react');
var AdresBlockComponent = require('./AdresBlockComponent.jsx');
var OpeningsComponent = require('./OpeningsComponent.jsx');

/*
    Details of a specific location on said location's page
    <LocationDetails/>
*/
var LocationDetailsComponent = React.createClass({

    propTypes : {
        place : React.PropTypes.object.isRequired,
    },

    render : function(){
        return (
            <div className="detail-infos">
                <AdresBlockComponent place={this.props.place}/>
                <OpeningsComponent place={this.props.place}/>
            </div>
        )
    }
})

export default LocationDetailsComponent;
