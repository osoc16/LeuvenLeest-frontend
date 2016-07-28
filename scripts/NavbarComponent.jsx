var React = require('react');

/*
    Navigation bar
    <NavBar/>
    */
    var NavbarComponent = React.createClass({

        redirectHome : function(event){
            document.location.href="/";
        },
        redirectAantLezen :  function(event){
            document.location.href="/global";
        },
        redirectMap : function(event){
            document.location.href="/map";
        },
        redirectProfiel :  function(event){
            document.location.href="/profiel";
        },

        render : function(){
            var currentURL = document.location.href;
            var splitString = currentURL.split("/");
            var endURL = splitString[splitString.length-1];
            return (

             <div className="navbar">
                 <span className={endURL == "" ? "discover-button nav-button highlight" : "discover-button nav-button"} onClick={this.redirectHome}>
                    <i className="lines-icon icon-compass" aria-hidden="true"></i>
                    <p>Ontdek</p>
                 </span>
                 <span className={endURL =="global" ? "checkin-button nav-button highlight" : "checkin-button nav-button" } onClick={this.redirectAantLezen}>
                     <i className="lines-icon icon-eyeglass" aria-hidden="true"></i>
                     <p>Aan't Lezen</p>
                 </span>
                 <span className={endURL == "map" ? "profile-button nav-button highlight" : "profile-button nav-button" } onClick={this.redirectMap}>
                     <i className="lines-icon icon-map kaart-button" aria-hidden="true" ></i>
                     <p>Kaart</p>
                 </span>
                 <span className={endURL == "profiel" ? "profile-button nav-button highlight" : "profile-button nav-button" } onClick={this.redirectProfiel}>
                     <i className="lines-icon icon-user profiel-button" aria-hidden="true"></i>
                     <p>Profiel</p>
                 </span>
             </div>
            )
        },
        componentWillMount:function(){
           var currentURL = document.location.href;
           var splitString = currentURL.split("/");
           var endURL = splitString[splitString.length-1];
       },

   });

export default NavbarComponent;
