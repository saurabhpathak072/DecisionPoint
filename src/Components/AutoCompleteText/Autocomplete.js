import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from './Autocomplete.module.css';
import { Route } from "react-router";
import Main from '../../Container/Main/Main';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    this.props.search(e.currentTarget.innerText);
  };

  // Event fired when the user presses a key down
  onKeyDown = async e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if(e.target.value === '' ){
      if (e.keyCode === 13) {
        await this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: ''
        });
         this.props.search(this.state.userInput);
        
      }
    }
    // User pressed the enter key, update the input and close the
    // suggestions
    else if (e.keyCode === 13) {
      
      if(filteredSuggestions[activeSuggestion] === undefined){
        await this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: e.target.value
        });
      }else
      {await this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });}

       this.props.search(this.state.userInput);
      
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
  
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    const suggClasses = ['list-group',classes.suggestions];

    

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={suggClasses.join(' ')}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'list-group-item suggestion-active';
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            
          </div>
        );
      }
    }

    return (
      
        <div className={classes.auto}>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          
          placeholder="Search By Username..."
        />
        {suggestionsListComponent}
        </div>
     
    );
  }
}

export default Autocomplete;
