var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Recent activity
<Recent/>
*/
var RecentComponent = React.createClass({
    propTypes : {
        places : React.PropTypes.array.isRequired
    },

    render : function(){
        return (
            <div className='recent-act home-row'>
                <h3>Recent bezocht</h3>
                <div className="location-row">
                    {this.props.places.map(function(place){
                    return <LocationRowComponent key={place.id} data={place} />
                    })}
                </div>
            </div>
        )
    }
})

export default RecentComponent;
