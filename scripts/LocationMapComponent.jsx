var React = require('react');
var LeuvenMapSmallComponent = require('./LeuvenMapSmallComponent.jsx');

/*
    Map of a specific location on said location's page
    <LocationMapComponent />
*/
var LocationMapComponent = React.createClass({
    render : function(){
        console.log("data in locatopn map compo");
        console.log(this.props.data);
        return (
            <div className="detail-map">
                <LeuvenMapSmallComponent data={this.props.data}/>
                <div className="name-n-checkin">
                    <div className="location-text">
                        <i>{this.props.data.category === undefined ? "" : this.props.data.category}</i>
                        <p>{this.props.data.name === undefined ? "" : this.props.data.name}</p>
                    </div>
                    <div className="checkin">
                        <div className="button-content">
                            <i className="lines-icon icon-eyeglass"></i>
                            <p>Hier aan't lezen</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default LocationMapComponent;
