import './App.css';
import React, { Component } from 'react';
// import axios from 'axios';

class InputForm extends Component {
  state = {
    name: '',
    temperature: '',
    age: '',
    gender: '',
    caffeine: '',
    time: '',
    pregnant: '',
    health: '',
    per_day: '',
    today: '',
    prediction: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12', {
      method: 'POST',
      headers: {
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        "data": {
          "type": "scenario",
          "attributes": {
            "input": {
              "INPUTVAR1": this.state.temperature,
              "INPUTVAR2": this.state.gender,
              "INPUTVAR3": this.state.age,
              "INPUTVAR4": this.state.caffeine,
              "INPUTVAR5": this.state.time,
              "INPUTVAR6": this.state.pregnant,
              "INPUTVAR7": this.state.health,
              "INPUTVAR8": this.state.per_day,
              "INPUTVAR9": this.state.today
            }
          }
        }
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ prediction: data.data.attributes.decision });
        // create a new instance of the Prediction model from the Mongoose schema
        const predictionData = {
          name: this.state.name,
          temperature: this.state.temperature,
          age: this.state.age,
          gender: this.state.gender,
          caffeine: this.state.caffeine,
          time: this.state.time,
          pregnant: this.state.pregnant,
          health: this.state.health,
          per_day: this.state.per_day,
          today: this.state.today,
          prediction: data.data.attributes.decision,
        };
    
        // save the prediction instance to the database
        fetch('https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(predictionData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log('Prediction saved to database');
          })
          .catch(error => {
            console.log('There was a problem with the fetch operation:', error);
          });
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error);
      });
    
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Age?:
          <input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Gender?:
          <select name="gender" value={this.state.gender} onChange={this.handleChange}>
          <option value="">--Please choose an option--</option>
              <option value="Female">Female</option>
              <option value="Female">Male</option>
          </select>
        </label>
        <br />
        <label>
          Sensitive to Caffeine?:
          <select name="caffeine" value={this.state.caffeine} onChange={this.handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
        </label>
        <br />
        <label>
          Time of the day?:
          <select name="time" value={this.state.time} onChange={this.handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Afternoon">Afternoon</option>
          </select>        
        </label>
        <br />
        <label>
          Pregnant:
          <select name="pregnant" value={this.state.pregnant} onChange={this.handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> 
        </label>
        <br />
        <label>
          Health conscious?:
          <select name="health" value={this.state.health} onChange={this.handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> 
        </label>
        <br />
        <label>
          Temperature?:
          <input type="number" name="temperature" value={this.state.temperature} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Number of drinks consumed per day?:
          <input type="number" name="per_day" value={this.state.per_day} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Number of drinks consumed today?:
          <input type="number" name="today" value={this.state.today} onChange={this.handleChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
        {this.state.prediction && <p>Prediction: {this.state.prediction}</p>}
      </form>
    );
  }
}

export default InputForm;

// export default App;
