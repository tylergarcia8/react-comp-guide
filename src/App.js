import React, { Component } from 'react';
import Person from './Person/Person'
// import styled from 'styled-components'
import classes from './App.css';

// const StyledButton = styled.button `
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   font: inherit;
//   color: white;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `

class App extends Component {
  
  state = {
    persons: [
      { id: 0, name: "Max", age: 28},
      { id: 2, name: "Manu", age: 29},
      { id: 4, name: "Stephanie", age: 26}
    ],
    otherState: "Some other value",
    showPersons: false
  }
  
  // switchNameHandler = (newName) => {
  //   this.setState({
  //     persons: [
  //       {name: newName, age: 28},
  //       {name: "Manu", age: 29},
  //       {name: "Stephanie", age: 26}
  //     ]
  //   })
  // }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState( {persons: persons} )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();

    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  } 

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    // const style = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   color: 'white',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }
    let persons = null;
    let btnClass = [classes.Button]

    if(this.state.showPersons){
     persons = (
      <div>
        {this.state.persons.map( (person, index) => {
        return<Person
          name={person.name}
          age={person.age}
          click= {() => this.deletePersonHandler(index)}
          key={person.id}
          changed={(event) => this.nameChangeHandler(event, person.id)}/>
        })}
    </div>
     )

    //  style.backgroundColor = 'red'
    //  style[':hover'] = {
    //   backgroundColor: 'salmon',
    //   color: 'black'
    // }
        btnClass = classes.Red
    }

    let assignedClasses = []

    if( this.state.persons.length <= 2) {
      assignedClasses.push('red');
    }

    if(this.state.persons.length <= 1) {
      assignedClasses.push('bold');
    }

    return (
      <div className={classes.App}>
        <h1>Hello I am a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass}
        // alt={this.state.showPersons}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    )
  }
}

export default App;
