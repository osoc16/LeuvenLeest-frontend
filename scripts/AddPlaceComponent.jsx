var React = require('react');

var categoryId={
    "Parc" : 1,
    "Cafe" : 2,
    "Restaurant" : 3,
};

module.exports = React.createClass({
 getInitialState : function(){
    return {
        type : '',
        name : '',
        address : '',
        openingHour : '',
        lat:'',
        lon:'',
        categoryId :'',


    }
},
getCoordinate : function(){
    if(navigator.geolocation){
        return navigator.geolocation.getCurrentPosition(this.handleCoordinate);
    }else{
        console.log("Sorry the location is not available");
    }
},



/*Callback function that will be trigger when a location is available */
handleCoordinate : function(position) {
    var msg = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
    console.log(msg);

    var coordinate =  {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    };
    this.setState({lat : coordinate.lat, lon : coordinate.lon});

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

        <input id="type" name="suggest" list="suggestions" onChange={this.handleChange} />
        <datalist id="suggestions">
        <option value="Cafe" />
        <option value="Restaurant" />
        <option value="Parc" />
        <option value="Blue" />
        <option value="White" />
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
    };

},
getAddressByCoordinate : function(){
    var self= this;

    var settings = {
        "crossDomain": true,
        "url": "https://nominatim.openstreetmap.org/reverse.php?format=json&lat="+this.state.lat+"&lon="+this.state.lon,
        "method": "GET",
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
            address+= " "+response.address.house_number;        

        if(response.address.town !== undefined)
            address+= " "+response.address.town;
        else if(response.address.suburb !== undefined)
            address+= " "+response.address.suburb;

        if(response.address.postcode !== undefined)
            address+= " "+response.address.postcode;


        console.log(address);


        self.setState({address: address});

        


        return response;
    })
    .fail(function(){
        console.log('fail');
    });


},

getAddressByName : function(){

    var self= this;
    
    var res = this.state.address.replace(new RegExp(" ", 'g'), "+");
    console.log(res);
    //var res2 =res.replace(new RegExp(" ", 'g'), "+");
    //var res3 =res.replace(new RegExp(" ", 'g'), "");
    //console.log(res2);


    var settings = {
        "crossDomain": true,
        "url": " http://nominatim.openstreetmap.org/?format=json&addressdetails=1&q="+res,
        "method": "GET",
    }
     $.ajax(settings)
    .done(function (response, textStatus, xhr) {

        console.log("in getaddrssbyName");
        console.log(response);
        //self.setState({address: response.display_name});
        self.setState({lat : response[0].boundingbox[0], lon : response[0].boundingbox[2]});
        return response;
    })
    .fail(function(){
        console.log('fail the lookup');

    });






},




addPlace : function(event) {
    event.preventDefault();
    this.getAddressByName();


    console.log(this.state);
    var settings = {
        "crossDomain": true,
        "url": "http://95.85.15.210/places/add",
        "method": "PUT",
        "headers": {
               "Authorization": "Bearer "+ localStorage.getItem('oAuth_token'),       
        },
        'data': {
            'type' : this.state.type,
            'name' : this.state.name,
            'address': this.state.address,
            'openingHour': this.state.openingHour,
            'latitude': this.state.lat,
            'longitude': this.state.lon,

            
            'email':  'tets',
            'categoryId' : this.state.categoryId,
            

            'email': localStorage.getItem('email'),
            'categoryId' : 0




            
            },
    }
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
