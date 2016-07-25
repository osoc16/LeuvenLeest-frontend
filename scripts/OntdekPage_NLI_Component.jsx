var React = require('react');
var OntdekPage_LI_Component = require('./OntdekPage_LI_Component.jsx');

/*
Home/Ontdek page not logged-in
<OntdekPage_NLI/>
*/
module.exports = React.createClass({
    render : function(){
        if (localStorage.getItem('oAuth_token')) {
            return (<OntdekPage_LI_Component />);
        }
        return (
            <div className="ontdek-page">
            <div className="page-content">
            <NLI_WelcomeBlock/>
            <div className="home-locations">
            <Dichtbij/>
            </div>
            </div>
            <NavbarComponent />
            </div>
            )
    }
})
