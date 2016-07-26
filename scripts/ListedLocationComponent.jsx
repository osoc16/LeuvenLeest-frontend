var React = require('react');

/*
Location in list
<ListedLocation/>
*/
var ListedLocationComponent = React.createClass({

    propTypes : {
        place : React.PropTypes.object.isRequired,
        coordinates : React.PropTypes.object.isRequired,
        callBack: React.PropTypes.func.isRequired,
        latest: React.PropTypes.number
    },

    render : function(){
        var checkedIn;
        var style;
        if (this.props.place.id === this.props.latest) {
             checkedIn = 'checkin ci-active';
        } else {
             checkedIn = 'checkin';
        }
        if (this.props.place.photo) {
            var style = {
                backgroundImage: 'url("'+ this.props.place.photo +'")'
            }
        }

        return (
            <div className="listed-location" style={style}>
                <div className="location-overlay"><img src="../assets/img/bluegradient-overlay.svg"/></div>
                <div className="location-text">
                    <i>{this.props.place.category}</i>
                    <p>{this.props.place.name}</p>
                </div>
                <div className={checkedIn} onClick={this.checkin}>
                    <div className="button-content">
                    <i className="lines-icon icon-eyeglass"></i>
                    <p>Hier aan't lezen</p>
                    </div>
                </div>
            </div>
        )
    },

    checkin : function(event) {
        var self = this;
        var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/checkin/',
            'method': 'PUT',
            'headers' : {
                'Authorization' : 'Bearer ' + localStorage.getItem('oAuth_token')
            },
            'data' : {
                'id' : this.props.place.id,
                'longitude' : this.props.coordinates.long,
                'latitude': this.props.coordinates.lat
            }
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                this.props.callBack(true, this.props.place);
            }.bind(this))
            .fail(function(response, textStatus, xhr){
                console.log('fail');
            });
    },
})

export default ListedLocationComponent;
