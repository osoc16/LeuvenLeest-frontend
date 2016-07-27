var React = require('react');

var categoryId={
    'Park' : 1,
    'Coffee shop' : 2,
    'College library' : 3,
    'Library' : 4,
};


module.exports = React.createClass({
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
    }
},

getEmail : function(){
    var self = this;
    var settings = {
        'crossDomain': true,
        'url': 'http://95.85.15.210/user/current',
        'method': 'GET',
        'headers': {
               'Authorization': sessionStorage.getItem('oAuth_token'),       
        },
    }

     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        console.log('getEmail');
        console.log(response);
        self.setState({email : response.email});
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
    var msg = 'Latitude: ' + position.coords.latitude +
    ' Longitude: ' + position.coords.longitude;
    console.log(msg);

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
    return (
        <div>
        <form>
        <label>
        Type :
        </label>



        <input id='type' name='suggest' list='suggestions' onChange={this.handleChange} />
        <datalist id='suggestions'>
        <option value='College library' />
        <option value='Coffee shop' />
        <option value='Park' />
        <option value='Library' />
        </datalist>

        <br/>
        <label>
        Name :
        </label>
        <input name='name' type='text' onChange={this.handleChange} /> <br/>
        <label>
        Adress :
        </label>
        <input name='address' type='text' value={this.state.address} onChange={this.handleChange} /> <br/>
        <label>
        Opening hour :
        </label>
        <br/>
        <label>
        Tot:
        </label>
        <input type='number' name='tot' min='00' max='23' step='1' onChange={this.handleChange}/>
        <label>
        van:
        </label>
        <input type='number' name ='van' min='00' max='23' step='1' onChange={this.handleChange}/>




        <input type='submit' onClick={this.addPlace} />
        </form>
        </div>
        );

},

handleChange : function(event) {
    var name = event.target.name;
    var value = event.target.value;

    switch(name) {
        case 'suggest':
        var id =  categoryId[value];
        console.log(id);
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
    var self= this;

    var settings = {
        'crossDomain': true,
        'url': 'https://nominatim.openstreetmap.org/reverse.php?format=json&lat='+this.state.latU+'&lon='+this.state.lonU,
        'method': 'GET',
    }
     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        console.log(response);
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


        console.log(address);


        self.setState({address: address});

        self.getAddressByName();



        return response;
    })
    .fail(function(){
        console.log('fail');
    });


},

getAddressByName : function(){

    var self= this;

    var res = this.state.address.replace(new RegExp(' ', 'g'), '+');
    console.log('Adress name in getAddressByName');
    console.log(res);
    //var res2 =res.replace(new RegExp(' ', 'g'), '+');
    //var res3 =res.replace(new RegExp(' ', 'g'), '');
    //console.log(res2);


    var settings = {
        'crossDomain': true,
        'url': 'http://nominatim.openstreetmap.org/?format=json&addressdetails=1&q='+res,
        'method': 'GET',
    }

     $.ajax(settings).done(function (response, textStatus, xhr) {
        console.log('in getaddrssbyName');
        console.log(response);
        self.setState({lat : response[0].boundingbox[0], lon : response[0].boundingbox[2]});
        return response;
    })
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
    console.log('Addplace openin2');
    console.log(openingH);



    console.log(this.state);
    var settings = {
        'crossDomain': true,
        'url': 'http://95.85.15.210/places/add',
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

    console.log('The state before sending');
    console.log(this.state);
    console.log('CatId');
    console.log(this.state.categoryId);
    console.log('email');
    console.log(this.state.email);

     $.ajax(settings)
    .done(function (response, textStatus, xhr) {
        console.log(response);

        document.location.href = '/';
    })
    .fail(function(){
        console.log('fail');
    });
}



});
