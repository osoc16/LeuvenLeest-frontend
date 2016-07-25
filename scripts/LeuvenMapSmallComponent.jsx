var React = require('react');
var LeafletMapComponent = require('./LeafletMapComponent.jsx');

/*
Map Small (half-screen)
<LeuvenMapSmall/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="map-container-small">
                <LeafletMapComponent divClass="map-container-small-leaftlet" data={this.props.data}/>
            </div>
        )
    }
})
