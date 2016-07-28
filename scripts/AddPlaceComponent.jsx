var React = require('react');
var LeafletMapComponent = require('./LeafletMapComponent.jsx');
var Success_AddLoc_Component = require('./Success_AddLoc_Component.jsx');
var NavbarComponent = require('./NavbarComponent.jsx');
var HeadBarComponent = require('./HeadBarComponent.jsx');

var categoryId={
    'Park' : 1,
    'Coffee shop' : 2,
    'College library' : 3,
    'Library' : 4,
};

var AddPlaceComponent = React.createClass({

   getInitialState : function(){
    this.getEmail();
    return {
        type : '',
        name : '',
        address : '',
        openingHour : '',
        latU:'',
        lonU:'',
        categoryId :'',
        email : '',
        lat : '',
        lon : '',
        tot: '',
        van : '',
        openingHour : '',
        succesfullCreation : false,
        createdAPlace : {},
    }
},

getEmail : function(){
    var self = this;
    var settings = {
        'crossDomain': true,
        'url': '//leuvenleestapp.be/user/current',
        'method': 'GET',
        'headers': {
               'Authorization': sessionStorage.getItem('oAuth_token'),       
        },
    }

     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        self.setState({email : response.data.email});
        console.log(response.data.email);
        console.log(response);
        return response;
    })
    .fail(function(){
        console.log('fail get email');

    });


},
getCoordinate : function(){
    if(navigator.geolocation){
        return navigator.geolocation.getCurrentPosition(this.handleCoordinate);
    }else{
        console.log('Sorry the location is not available');
    }
},



/*Callback function that will be trigger when a location is available */
handleCoordinate : function(position) {

    var coordinate =  {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    };
    this.setState({latU : coordinate.lat, lonU : coordinate.lon});
    this.getAddressByCoordinate();
    return coordinate;
},

render : function() {
    var pos = this.getCoordinate();

    if(this.state.succesfullCreation)
        return <Success_AddLoc_Component place={this.state.createdAPlace} lat={this.state.lat} lon={this.state.lon}/>

    return (
        <div className="addPlace-page">
        <HeadBarComponent callback={this.addPlace}/>
        <div className="page-content">
        <form>
        <div className="detail-map">
        <div className="map-container-small">
        <LeafletMapComponent addPlaceData = {true} divClass='map-container-small-leaftlet'/>
        </div>

        <div className="name-n-checkin">
        <div className="location-text">
        {/*<label>
        Type :
        </label>*/}
        <input id='type' name='suggest' list='suggestions' onChange={this.handleChange} placeholder="Type"/>
        <datalist id='suggestions'>
        <option value='College library' />
        <option value='Coffee shop' />
        <option value='Park' />
        <option value='Library' />
        </datalist>

        <br/>
        {/*<label>
        Name :
        </label>*/}
        <input id="locname" name='name' type='text' onChange={this.handleChange} placeholder="Name"/> <br/>
        </div>
        </div>
        </div>

        <div className="adres-block">
        <label>
        <h3>Adres</h3>
        </label>
        <input id="adres-field" name='address' type='text' value={this.state.address} onChange={this.handleChange} /> <br/>
        </div>
        <div className="openingsuren">
        <label>
        <h3>Openingsuren</h3>
        </label>
        {/*<label>
        Tot:
        </label>*/}
        <div className="op-text">
        <input type='number' name='tot' min='00' max='23' step='1' onChange={this.handleChange} placeholder="00"/>
        {/*<label>
        van:
        </label>*/}
         -
        <input type='number' name ='van' min='00' max='23' step='1' onChange={this.handleChange} placeholder="24"/>
        </div>
        </div>
        </form>
        </div>
        <NavbarComponent/>
        </div>
        );

},

handleChange : function(event) {
    var name = event.target.name;
    var value = event.target.value;

    switch(name) {
        case 'suggest':
        var id =  categoryId[value];
        this.setState({categoryId : id});
        break;

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

        case 'tot':

        this.setState({tot : value});
        break;

        case 'van':

        this.setState({van : value});
        break;
    };

},
getAddressByCoordinate : function(){

    var settings = {
        'crossDomain': true,
        'url': 'https://nominatim.openstreetmap.org/reverse.php?format=json&lat='+this.state.latU+'&lon='+this.state.lonU,
        'method': 'GET',
    }
     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        var address;

        if(response.address.pedestrian !== undefined)
            address = response.address.pedestrian;

        else if(response.address.road !== undefined){
            var subAd = response.address.road .substring(0, response.address.road .indexOf('-'));

            address = response.address.road;
        }

        if(response.address.house_number !== undefined)
            address+= ' '+response.address.house_number;

        if(response.address.town !== undefined)
            address+= ' '+response.address.town;
        else if(response.address.suburb !== undefined)
            address+= ' '+response.address.suburb;

        if(response.address.postcode !== undefined)
            address+= ' '+response.address.postcode;

        this.setState({address: address});
        this.getAddressByName();



        return response;
    }.bind(this))
    .fail(function(){
        console.log('fail');
    });


},

getAddressByName : function(){

    var res = this.state.address.replace(new RegExp(' ', 'g'), '+');

    var settings = {
        'crossDomain': true,
        'url': '//nominatim.openstreetmap.org/?format=json&addressdetails=1&q='+res,
        'method': 'GET',
    }

     $.ajax(settings).done(function (response, textStatus, xhr) {
        this.setState({lat : response[0].boundingbox[0], lon : response[0].boundingbox[2]});
        return response;
    }.bind(this))
    .fail(function(){
        console.log('fail the lookup');

    });
},




addPlace : function(event) {
    event.preventDefault();
    var tot = this.state.tot;
    if(tot < 10)
        tot = '0'+tot;

    var openingH = tot +'-'+this.state.van;

    var settings = {
        'crossDomain': true,
        'url': '//leuvenleestapp.be/places/add',
        'method': 'PUT',
        'headers': {
               'Authorization':  sessionStorage.getItem('oAuth_token'),       
        },

        'data': {
            'type' : this.state.type,
            'name' : this.state.name,
            'address': this.state.address,
            'openingHour': this.state.openingHour,
            'latitude': this.state.lat,
            'longitude': this.state.lon,
            'email':  this.state.email,
            'categoryId' : this.state.categoryId,
            'openingHour' : this.state.openingH,
            },
    }

     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        console.log(response);
        console.log(textStatus);

        if(response.data){
           // document.location.href = '/';
           this.setState({createdAPlace : JSON.parse(response.data)})
           this.setState({succesfullCreation : true});
       }


   }.bind(this))
    .fail(function(){
        console.log('fail');
    });
}
});


export default AddPlaceComponent;
