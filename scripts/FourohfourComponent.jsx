var React = require('react');
/*
Success page (Checked In)
<Success_CIn/>
*/
var FourohfourComponent = React.createClass({

    propTypes : {
        place : React.PropTypes.object.isRequired,
    },

    render : function(){
        return (
            <div className="fourohfour">
            <div className="benches">
            <img className="benches" src="../assets/img/placeholder_home.jpeg"/>
            </div>
            <div className="fourohfour-overlay"></div>
            <i className="lines-icon icon-close" onClick={this.close}></i>
            <i className="lines-icon icon-exclamation"></i>
            <p>Oops, deze pagina bestaat niet.</p>
            <h2>404</h2>
            </div>
            )
    },

    close : function() {
        document.location.href = '/';
    }
})

export default FourohfourComponent;
