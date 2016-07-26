var React = require('react');
var LocationRowComponent = require('./LocationRowComponent.jsx');

/*
Recent activity
<Recent/>
*/
var RecentComponent = React.createClass({

    getInitialState : function(){
        return {
            places : []
        }
    },

    componentWillMount : function() {
        var settings = {
            'async': true,
            'crossDomain': true,
            'url': 'http://95.85.15.210/checkin/recent',
            'method': 'GET',
            'headers' : {
                'Authorization' : 'Bearer ' + localStorage.getItem('oAuth_token')
            }
        }

         $.ajax(settings).done(function (response) {
             this.setState({places : response});
        }.bind(this));
    },

    render : function(){
        return (
            <div className='recent-act home-row'>
                <div className="location-row">
                    <h3>Recent bezocht</h3>
                    {this.state.places.map(function(place){
                        return <LocationRowComponent key={place.id} data={place} />
                    })}
                </div>
            </div>
        )
    }
})

export default RecentComponent;