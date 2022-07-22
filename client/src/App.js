import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import CreateAlbum from './components/CreateAlbum';
import EditAlbum from './components/EditAlbum';
import Navbar from './components/Navbar';

export default class App extends Component {
  
  render(){
    return(
      <Router>
        <div className='container'>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route  path="/add" element={<CreateAlbum/>}/>
            <Route  path="/edit/:id" element={<EditAlbum/>}/>
          </Routes>
        </div>
        
      </Router>
    )
  }
}

