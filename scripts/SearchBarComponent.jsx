var React = require('react');

/*
    Search bar
    <SearchBar/>
    */
var SearchBarComponent = React.createClass({
    render : function(){
        return (
            <form className="search-bar" onSubmit="">
                <input type="text" defaultValue="Zoek of sleep de pin naar de exacte locatie" required/>
            </form>
        )
    }
});

export default SearchBarComponent;
