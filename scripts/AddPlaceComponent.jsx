var React = require('react');


module.exports = React.createClass({
   getInitialState : function(){
    return {
        type : '',
        name : '',
        address : '',
        openingHour : '',
    }
},

render : function() {

    return (
        <div>
        <form>
        <label>
        Type
        </label>
        <input name='type' type='text' onChange={this.handleChange} /><br/>
        <label>
        Name
        </label>
        <input name='name' type='text' onChange={this.handleChange} /> <br/>
        <label>
        Adress
        </label>
        <input name='address' type='text' onChange={this.handleChange} /> <br/>
        <label>
        Opening hour
        </label>
        <input name='openingHour' type='text' onChange={this.handleChange} />

        <input type='submit' onClick={this.addPlace} />
        </form>
        </div>
        );

},

handleChange : function(event) {
    var name = event.target.name;
    var value = event.target.value;

    switch(name) {
        case 'type':
        this.setState({type : value});
        break;
        case 'name':
        this.setState({name : value});
        break;
        case 'address':
        this.setState({address : value});
        break;
        case 'openingHour':
        this.setState({openingHour : value});
        break;
    };


},

register : function(event) {
    event.preventDefault();
    var settings = {
        "crossDomain": true,
        "url": "http://95.85.15.210/places/add",
        "method": "PUT",
        'data': {
            'type' : this.state.type,
            'name' : this.state.name,
            'address': this.state.address,
            'openingHour': this.state.openingHour,

            },
    }
     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        localStorage.setItem('oAuth_token', response.oAuth_token);
        document.location.href = '/home';
    })
    .fail(function(){
        console.log('fail');
    });
}



});
