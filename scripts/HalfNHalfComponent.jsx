    var React = require('react');
var HeadBarComponent = require('./HeadBarComponent.jsx');
var LeuvenMapSmallComponent = require('./LeuvenMapSmallComponent.jsx');
var LocationsComponent = require('./LocationsComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');
var Success_CIn_Component = require('./Success_CIn_Component.jsx');


/*
Half Map, Half Locations
<@Half/>
*/
var HalfNHalfComponent = React.createClass({

    getInitialState : function(){
        return {
            succesfullCheckin : false
        }
    },

    render : function(){

        if (this.state.succesfullCheckin) {
            return <Success_CIn_Component place={this.state.placeCheckedIn} />;
        }

        return (
            <div id="app">
                <HeadBarComponent />
                <LeuvenMapSmallComponent />
                <div className="separation">
                </div>
                <div className="page-content">
                    <LocationsComponent callBack={this.handleCheckin}/>
                </div>
                <NavbarComponent />
            </div>
        )
    },

    handleCheckin : function(status, place) {
        this.setState({placeCheckedIn : place});
        this.setState({succesfullCheckin : status});
    }
})

export default HalfNHalfComponent;
