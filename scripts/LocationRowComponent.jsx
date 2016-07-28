var React = require('react');

/*
Row of locations from Homescreen
<LocationRow/>
*/
var LocationRowComponent = React.createClass({
    redirect: function(){
        document.location.href="/details/"+this.props.data.id;
    },

    componentWillMount:function(){
        if (this.props.data){
            this.setState(this.props.data);
        }
    },

    render : function(){
        if (!this.state.photo) {
            var locationPic = '../assets/img/placeholder_locations.jpg';
        }
        else {
            var locationPic = this.state.photo;
        }
        var style = {
            backgroundImage: 'url("'+ locationPic +'")'
        }
        return (
            <div className="location-small" onClick={this.redirect} style={style} >
                <div className="location-overlay"><img src="../assets/img/bluegradient-overlay.svg"/></div>
                <div className="location-text">
                    <i> {this.props.data === undefined ? "" : this.props.data.category}</i>
                    <p> {this.props.data === undefined ? "" : this.props.data.name}</p>
                </div>
            </div>
        )
    }
})

export default LocationRowComponent;
