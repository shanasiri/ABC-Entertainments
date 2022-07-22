import axios from 'axios';
import React, { Component } from 'react'
import { setErrors } from '../validation/setErrors';

export default class CreateAlbum extends Component {
  constructor(props){
    super(props);

      this.state = {
        title : "",
        artist : "",
        genre : "",
        releaseDate : "",
        errors : {}
      }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name] : value,
    });
  }

  validate = (title, artist, genre, releaseDate) => {
    const errors = setErrors(title, artist, genre, releaseDate);
    this.setState({errors: errors});
    return Object.values(errors).every((err) => err === "");
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {title, artist, genre, releaseDate} = this.state;

    if(this.validate(title, artist, genre, releaseDate)){
      const data = {
        title:title,
        artist:artist,
        genre:genre,
        releaseDate:releaseDate,
      }
  
      console.log(data);
      axios.post("http://localhost:5000/albums/add", data).then((res) => {
        if(res.data.success) {
          alert("Added");
          this.setState({title: "", artist: "", genre: "", releaseDate: ""})
        }
      });
    }  
  }

  render() {
    return (
      <div>
        <h1 className="my-5">Add Album</h1>
        <form>
          <div className="mb-3">
            <label for="title" className="form-label">Titile</label>
            <input type="text" className="form-control" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange}/>
            {this.state.errors.title && (
              <div className='text-danger'>{this.state.errors.title}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label for="artist" className="form-label">Artist</label>
            <input type="text" className="form-control" name="artist" placeholder="Artist" value={this.state.artist} onChange={this.handleInputChange}/>
            {this.state.errors.artist && (
              <div className='text-danger'>{this.state.errors.artist}</div>
            )}
          </div>

          <div className="mb-3">
            <label for="genre" className="form-label">Genre</label>
            <input type="text" className="form-control" name="genre" placeholder="Genre" value={this.state.genre} onChange={this.handleInputChange}/>
            {this.state.errors.genre && (
              <div className='text-danger'>{this.state.errors.genre}</div>
            )}
          </div>

          <div className="mb-3">
            <label for="releaseDate" className="form-label">Release Date</label>
            <input type="date" className="form-control" name="releaseDate" placeholder="Release Date" value={this.state.releaseDate} onChange={this.handleInputChange}/>
            {this.state.errors.releaseDate && (
              <div className='text-danger'>{this.state.errors.releaseDate}</div>
            )}
          </div>


          
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}
