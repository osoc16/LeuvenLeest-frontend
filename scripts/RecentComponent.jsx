var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Recent activity
<Recent/>
*/
var RecentComponent = React.createClass({

    getInitialState : function() {
        return {
            recentPlaces : []
        }
    },

    componentWillMount : function() {
        var settings = {
                'crossDomain': true,
                'url': 'http://95.85.15.210/checkin/recent',
                'method': 'GET',
                'headers' : {
                    'Authorization' : sessionStorage.getItem('oAuth_token'),
                },
            }

             $.ajax(settings)
                .done(function (response, textStatus, xhr) {
                    if (response.oAuth_token) {
                        sessionStorage.setItem('oAuth_token', 'Bearer' + response.oAuth_token);
                    }
                     this.setState({recentPlaces : response.data});
            }.bind(this));
    },

    render : function(){
        return (
            <div className='recent-act home-row'>
                <h3>Recent bezocht</h3>
                <div className="location-row">
                    {this.state.recentPlaces.map(function(place){
                        return <LocationRowComponent key={place.id} data={place} />
                    })}
                </div>
            </div>
        )
    }
})

export default RecentComponent;
