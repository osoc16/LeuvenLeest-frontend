var React = require('react');

/*
Header
<HeadBar/>
*/
module.exports = React.createClass({
    redirect : function(){
        document.location.href="/map"
    },

    redirectBack : function(){
        //document.location.href="/"
        history.go(-1);

    },
    
    render : function(){
        return(
            <div className="headbar">
                {/*<i className="lines-icon icon-plus"></i>*/}
                <p className="back-button">
                <i className="lines-icon icon-arrow-left" onClick={this.redirectBack}></i> Back
                </p>
                <p className="title-text">Aan't Lezen</p>
                {/*<i className="lines-icon icon-list head-list"></i>*/}
                <i className="lines-icon icon-map view-icon" onClick={this.redirect}></i>
                {/*<i className="lines-icon icon-picture"></i>*/}
            </div>
        )
    }
})
