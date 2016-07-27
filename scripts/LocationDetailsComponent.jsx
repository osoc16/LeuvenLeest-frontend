var React = require('react');
var AdresBlockComponent = require('./AdresBlockComponent.jsx');
var OpeningsComponent = require('./OpeningsComponent.jsx');

/*
    Details of a specific location on said location's page
    <LocationDetails/>
*/
var LocationDetailsComponent = React.createClass({
    render : function(){
        //The state will always contain 1 row
        return (
            <div className="detail-infos">
                <AdresBlockComponent data={this.props.data}/>
                <OpeningsComponent data={this.props.data}/>
            </div>
        )
    }
})

export default LocationDetailsComponent;
