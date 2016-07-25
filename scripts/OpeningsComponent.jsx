var React = require('react');

/*
'Openingsuren' block on location's page
<Openings/>
*/
module.exports = React.createClass({

    render : function(){

        var openingHourOfTheDay;            
        if(this.props.data == undefined){
            console.log("the opening data is undefined")
        }else{
            var date = new Date();
            var dayNumber = date.getDay(); 
            var openingArray = this.props.data.openingHours;

            if(this.props.data.openingHours !== undefined){
                openingHourOfTheDay = openingArray[dayNumber];
                if(openingHourOfTheDay == "")
                    openingHourOfTheDay= "The opening hour is undefined";



            };
        };

        return (
            <div className="openingsuren">
            <div className="op-text">
            <h3>Openingsuren</h3>
            <p>
            <i>
            {openingHourOfTheDay}
            </i>

            <br/>

            </p>
            </div>
            </div>
            )

    }
});

