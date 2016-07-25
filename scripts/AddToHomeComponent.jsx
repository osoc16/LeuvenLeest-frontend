var React = require('react');

/*
"Add LLH to your home"
<AddToHome/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="add-home">
            <img src="../assets/img/LeuvenLeest_Icon.svg" className="app-icon"/>
            <p>Tap hier om <b>LeuvenLeest</b> toe te voegen aan je homescreen</p>
            <span className="bottom-bg"></span>
            </div>
            )
    }
})
