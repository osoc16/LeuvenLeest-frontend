var React = require('react');

/*
Row of locations from Homescreen
<LocationRow/>
*/
module.exports = React.createClass({
    redirect: function(){
        document.location.href="/details/"+this.props.data.id;
    },

    componentWillMount:function(){
        this.setState(this.props.data);
    },

    render : function(){
        var style = {
            backgroundImage: 'url("'+ this.state.photo +'")'
        }
        return (
            <div className="location-small" onClick={this.redirect} style={style} >
                <div className="location-text">
                    <i> {this.props.data === undefined ? "" : this.props.data.category}</i>
                    <p> {this.props.data === undefined ? "" : this.props.data.name}</p>
                </div>
            </div>
            )
    }
})


