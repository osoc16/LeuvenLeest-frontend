var React = require('react');
var OntdekPage_LI_Component = require('./OntdekPage_LI_Component.jsx');
var NLI_WelcomeBlockComponent = require('./NLI_WelcomeBlockComponent.jsx');
var DichtbijComponent = require('./DichtbijComponent.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');

/*
Home/Ontdek page not logged-in
<OntdekPage_NLI/>
*/
var OntdekPage_NLI_Component = React.createClass({
    render : function(){
        if (sessionStorage.getItem('oAuth_token')) {
            return (<OntdekPage_LI_Component />);
        }
        return (
            <div className="ontdek-page">
                <div className="page-content">
                    <NLI_WelcomeBlockComponent />
                    <div className="home-locations">
                        <DichtbijComponent />
                    </div>
                </div>
                <NavbarComponent />
            </div>
        )
    }
})

export default OntdekPage_NLI_Component;
