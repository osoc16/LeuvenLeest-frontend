var React = require('react');
/*
Success page (Checked In)
<Success_CIn/>
*/
var Success_CIn_Component = React.createClass({

    propTypes : {
        place : React.PropTypes.object.isRequired,
    },

    render : function(){
        return (
            <div className="success-page">
            <i className="lines-icon icon-close" onClick={this.close}></i>
            <i className="lines-icon icon-check"></i>
            <p>Aan't lezen bij</p>
            <h2>{this.props.place.name}</h2>
            </div>
            )
    },

    close : function() {
        document.location.href = '/global';
    }
})

export default Success_CIn_Component;
