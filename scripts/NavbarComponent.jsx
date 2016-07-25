var React = require('react');

/*
    Navigation bar
    <NavBar/>
    */
module.exports = React.createClass({

        redirectHome : function(event){
            document.location.href="/home";
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

        isActivePage : function() {
            console.log(document.location.href);
            //if ()
        },

        render : function(){
            this.isActivePage();
            return (
                <div className="navbar">
                <span className="discover-button nav-button" onClick={this.redirectHome}>
                <i className="lines-icon icon-compass" aria-hidden="true"></i>
                <p>Ontdek</p>
                </span>
                <span className="checkin-button nav-button" onClick={this.redirectAantLezen}>
                <i className="lines-icon icon-eyeglass" aria-hidden="true"></i>
                <p>Aan't Lezen</p>
                </span>
                <span className="profile-button nav-button" onClick={this.redirectMap}>
                <i className="lines-icon icon-map kaart-button" aria-hidden="true" ></i>
                <p>Kaart</p>
                </span>
                <span className="profile-button nav-button" onClick={this.redirectProfiel}>
                <i className="lines-icon icon-user profiel-button" aria-hidden="true"></i>
                <p>Profiel</p>
                </span>
                </div>
                )
        }
    })