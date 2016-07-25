var React = require('react');

/*
    Carousel for locations's pages
    <CarouselComponent/>
*/
module.exports = React.createClass({
    render : function(){
        return (
            <div className="carrousel">
            <input type="radio" name="slides" id="radio-1" defaultChecked/>
            <input type="radio" name="slides" id="radio-2"/>
            <input type="radio" name="slides" id="radio-3"/>
            <input type="radio" name="slides" id="radio-4"/>
            <ul className="slides">
            <li className="slide">
            <p>
            <img src="../assets/css/img/park1.jpg"/>
            </p>
            </li>
            <li className="slide">
            <p>
            <img src="../assets/css/img/park2.jpg"/>
            </p>
            </li>
            <li className="slide">
            <p>
            <img src="../assets/css/img/park3.jpeg"/>
            </p>
            </li>
            <li className="slide">
            <p>
            <img src="../assets/css/img/park4.jpg"/>
            </p>
            </li>
            </ul>
            <div className="slidesNavigation">
            <label htmlFor="radio-1" id="dotForRadio-1"></label>
            <label htmlFor="radio-2" id="dotForRadio-2"></label>
            <label htmlFor="radio-3" id="dotForRadio-3"></label>
            <label htmlFor="radio-4" id="dotForRadio-4"></label>
            </div>
            </div>
            )
    }
})
