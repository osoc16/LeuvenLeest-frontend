var React = require('react');

/*
Header
<HeadBar/>
*/
var HeadBarComponent = React.createClass({
    redirectToList : function(){
        document.location.href="/global"
    },

    redirectAdd: function(){
        document.location.href="/addPlace"
        //history.go(-1);

    },
    redirectToMap: function(){
        document.location.href="/map"
    },
    redirectBack : function(){
        history.go(-1);
    },
    
    render : function(){
        var currentURL = document.location.href;
        var currentURL = document.location.href;
        var splitString = currentURL.split("/");
        console.log(splitString);
        var endURL = splitString[splitString.length-1];
        console.log(endURL);
        


        return(
            <div className="headbar">
            

            {endURL == "map" ?
            <div id="banner">
            <i className="lines-icon icon-plus" onClick={this.redirectAdd}></i>  
            <p className="title-text">Kaart</p> 
            <i className="lines-icon icon-list head-list view-icon" onClick={this.redirectToList}></i> </div> 
            :<div></div>
        }
        {endURL == "global" ? <div><p className="back-button"><i className="lines-icon icon-arrow-left" onClick={this.redirectBack}></i> Back</p>  <p className="title-text"> Aan't Lezen</p> <i className="lines-icon icon-map view-icon" onClick={this.redirectToMap}></i> </div>: <div></div> }





        </div>
        )
    }
})


export default HeadBarComponent;
