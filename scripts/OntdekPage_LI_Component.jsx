var React = require('react');
var WelcomeBlockComponent = require('./WelcomeBlockComponent.jsx');
var DichtbijCoComponent = require('./DichtbijCoComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Home/Ontdek page when logged-in
<OntdekPage_LI/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="ontdek-page">
                <div className="page-content">
                    <WelcomeBlockComponent />
                    <DichtbijCoComponent />
                </div>
                <NavbarComponent />
            </div>
        )
    }
})
