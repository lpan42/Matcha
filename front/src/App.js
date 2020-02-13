import React, { Component } from "react";
import "./App.css";

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const name = {
	firstName: 'Ashley',
	lastName: 'P'
};

function getGreeting(user) {
	if (user) {
	  return formatName(user);
	}
	return 'Stranger';
}

function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

class Test extends Component{
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}
	componentDidMount() {//runs after the component output has been rendered to the DOM. This is a good place to set up a timer:
		this.timerID = setInterval(
			() => this.tick(),
			1000
		  );
	}
  
	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
		  date: new Date()
		});
	  }
	
	render(){
		return(
			<div className="App">
				<h1> Hello, {getGreeting(name)} </h1>
				<Welcome name="Le" />
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

export default Test;