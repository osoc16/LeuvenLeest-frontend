var React = require('react');

/*
Location in list
<ListedLocation/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="listed-location">
                <div className="location-text">
                    <i>Kade</i>
                    <p>Vaartkom</p>
                </div>
                <div className="checkin">
                    <div className="button-content">
                    <i className="lines-icon icon-eyeglass"></i>
                    <p>Hier aan't lezen</p>
                    </div>
                </div>
            </div>
        )
    }
})
