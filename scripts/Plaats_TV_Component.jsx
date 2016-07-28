var React = require('react');
var HeadBar_PlaatsTV_Component = require('./HeadBar_PlaatsTV_Component.jsx');
var LocationMapComponent = require('./LocationMapComponent.jsx');
var LocationDetailsComponent = require('./LocationDetailsComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Add location (Plaats toevoegen)
<Plaats_TV_Component />
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="add-place">
                <HeadBar_PlaatsTV_Component/>
                <div className="page-content">
                    <LocationMapComponent />
                    <LocationDetailsComponent />
                </div>
                <NavbarComponent />
            </div>
        )
    }
})
