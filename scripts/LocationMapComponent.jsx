var React = require('react');
var LeuvenMapSmallComponent = require('./LeuvenMapSmallComponent.jsx');

/*
    Map of a specific location on said location's page
    <LocationMapComponent />
*/
var LocationMapComponent = React.createClass({

    propTypes : {
        callBack : React.PropTypes.func.isRequired,
        coordinates : React.PropTypes.object.isRequired,
        place : React.PropTypes.object.isRequired,
    },

    getInitialState : function() {
        return {
            latest : {},
        }
    },

    componentWillMount : function() {
        var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/checkin/latest',
            'method': 'GET',
            'headers' : {
                'Authorization' : sessionStorage.getItem('oAuth_token')
            }
        }

        $.ajax(settings)
            .done(function (response, textStatus, xhr) {
                if (response.oAuth_token) {
                    sessionStorage.setItem('oAuth_token', response.oAuth_token);
                }
                this.setState({latest : JSON.parse(response.data)})
            }.bind(this))
            .fail(function(response, textStatus, xhr){
                console.log('fail');
            });
    },

    checkin : function(event) {
        var settings = {
            'crossDomain': true,
            'url': 'http://95.85.15.210/checkin/',
            'method': 'PUT',
            'headers' : {
                'Authorization' : sessionStorage.getItem('oAuth_token')
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

    render : function(){
        var checkedIn;
        if (this.props.place.id === this.state.latest.placeId) {
             checkedIn = 'checkin ci-active';
        } else {
             checkedIn = 'checkin';
        }
        return (
            <div className="detail-map">
                <LeuvenMapSmallComponent data={this.props.place}/>
                <div className="name-n-checkin">
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
            </div>
        )
    }
})

export default LocationMapComponent;
