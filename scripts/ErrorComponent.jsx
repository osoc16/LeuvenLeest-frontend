var React = require('react');

var ErrorComponent = React.createClass({

    propTypes : {
        errorMessage : React.PropTypes.string.isRequired,
    },

    getInitialState : function() {
        var errorMessage = this.props.errorMessage ? this.props.errorMessage : 'Er deed zich een onbekende error voor. Probeer het later opnieuw.';
        return {
            errorMessage : errorMessage,
        }
    },

    render : function() {
        var style = {
            'BackgroundColor' : 'red',
            'textAlign' : 'center',
        };
        return (
            <div style={style} className='error' >
                <p>{this.state.errorMessage}</p>
            </div>
        );
    },

});

export default ErrorComponent;
