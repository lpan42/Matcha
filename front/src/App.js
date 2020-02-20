import React, { Component } from "react";

// import Footer from "./components/Footer";
import Header from "./components/Header";
// import MainContent from "./components/MainContent";

class App extends Component {

    //lifecycle method
    render(){
		return (
			<div>
				<Header title='Matcha'/>
			</div>
		)
    }
}

export default App;