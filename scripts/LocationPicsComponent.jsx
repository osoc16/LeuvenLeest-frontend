/*
    Pictures of a specific location on said location's page
    <LocationPics/>
*/
var LocationPics = React.createClass({
    render : function(){
        return (
            <div className="detail-pics">
            <Carousel/>
            <div className="name-n-checkin">
            <div className="location-text">
            <i>Park</i>
            <p>Sint-Donatuspark</p>
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
