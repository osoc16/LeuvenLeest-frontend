var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Dichtbij
<Dichtbij/>
*/
var DichtbijComponent = React.createClass({

    render : function(){
        return (
            <div className="dichtbij home-row">
            <h3>Dichtbij</h3>

            <div className="location-row">
                {this.props.places.map(function(object, i) {
                    return <LocationRowComponent data={object} key={i} />;
                })}
            </div>
            </div>
            );
        }
});

export default DichtbijComponent;
