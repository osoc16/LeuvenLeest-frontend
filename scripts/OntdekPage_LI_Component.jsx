var React = require('react');
var WelcomeBlockComponent = require('./WelcomeBlockComponent.jsx');
var DichtbijCoComponent = require('./DichtbijCoComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Home/Ontdek page when logged-in
<OntdekPage_LI/>
*/
var OntdekPage_LI_Component = React.createClass({

    getInitialState : function(){
        return {
            user : {},
            nearbyPlaces : [],
            recentPlaces: [],
            userLocation: {},
        }
    },

    render : function(){
        return (
            <div className='ontdek-page'>
                <div className='page-content'>
                    <WelcomeBlockComponent />
                    <DichtbijCoComponent />
                </div>
                <NavbarComponent />
            </div>
        )
    },



})

export default OntdekPage_LI_Component;
