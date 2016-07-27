var React = require('react');
var LeafletMapComponent = require('./LeafletMapComponent.jsx');

/*
Map Small (half-screen)
<LeuvenMapSmall/>
*/
var LeuvenMapSmallComponent = React.createClass({
    render : function(){
        return (
            <div className='map-container-small'>
                <LeafletMapComponent divClass='map-container-small-leaftlet' data={this.props.data}/>
            </div>
        )
    }
})

export default LeuvenMapSmallComponent;
