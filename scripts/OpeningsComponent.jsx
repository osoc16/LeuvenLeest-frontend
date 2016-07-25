var React = require('react');

/*
'Openingsuren' block on location's page
<Openings/>
*/
module.exports = React.createClass({
    render : function(){

        //  if(this.props.data === undefined){
        //     console.log("the opening data is undefined")
        //  }else{

        //     var date = new Date();
        //     var dayNumber = date.getDay();
        //     var openingArray = this.props.data.openingHours;
        //     console.log("opening");
        //     console.log(this.props.data);
        //     console.log(dayNumber);
        //     console.log("Opening array");
        //     console.log(openingArray);
        //     console.log(openingArray[1]);

        //     //console.log(openingData[0]);
        // }

        return (
            <div className="openingsuren">
            <div className="op-text">
            <h3>Openingsuren</h3>
            <p>
            0:00 - 0:00<br/>

            </p>
            </div>
            </div>
        )
    }
})
