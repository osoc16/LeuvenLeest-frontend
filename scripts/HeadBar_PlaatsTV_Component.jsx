var React = require('react');
var SearchBarComponent = require('./SearchBarComponent.jsx');

/*
Header when adding new place
<HeadBar_PlaatsTV/>
*/
module.exports = React.createClass({
    render : function(){
        return(
            <div className="headbar-ptv">
                {/*<i className="lines-icon icon-plus"></i>*/}
                <p className="back-button">
                    <i className="lines-icon icon-arrow-left"></i> Back
                </p>
                <p className="title-text">Plaats toevoegen</p>
                {/*<i className="lines-icon icon-list head-list"></i>*/}
                {/*<i className="lines-icon icon-map"></i>*/}
                {/*<i className="lines-icon icon-picture"></i>*/}
                <p className="confirm">Aanmaken</p>
                <SearchBarComponent />
            </div>
        )
    }
})
