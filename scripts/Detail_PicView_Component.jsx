var React = require('react');

/*
Detail view (Pictures)
<Detail_PicView/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="detail-page">
            <HeadBar/>
            <div className="page-content">
            <LocationPics/>
            <LocationDetails/>
            </div>
            <NavBar/>
            </div>
            )
    }
})
