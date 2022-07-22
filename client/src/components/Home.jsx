import React, { Component } from 'react'
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      albums: []
    }
  }

  componentDidMount(){
    this.getAlbums();
  }

  getAlbums(){
    axios.get("http://localhost:5000/albums").then((res) => {
      if(res.data.success){
        this.setState({
          albums: res.data.albums, 
        });

        console.log("albums: ", this.state.albums);
      }
    });
  }

  filterContent(albums, searchTerm){
    const result = albums.filter((album) => album.title.includes(searchTerm) || album.artist.includes(searchTerm) || album.genre.includes(searchTerm));
    this.setState({albums: result});
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;

    axios.get("http://localhost:5000/albums").then((res) => {
      if(res.data.success){
        this.filterContent(res.data.albums, searchTerm);
      }
    })
  }


  onDelete = (id) => {
    axios.delete(`http://localhost:5000/albums/delete/${id}`).then((res) => {
      alert(" Delete Successfully");

      this.getAlbums();
    })
  }

  render() {
    return (
      <div className="container">

        <div className="row my-3">
          <div class="row g-3">
            <div class="col">
              <h1>All Albums</h1>
            </div>
            <div class="col">
              <input type="search" class="form-control" placeholder="Search" aria-label="Search" onChange={this.handleTextSearch}/>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Genre</th>
              <th scope="col">Release Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

          {this.state.albums.map((album, index) => (
            <tr>
              <th scope='row'>{index}</th>
              <td>{album.title}</td>
              <td>{album.artist}</td>
              <td>{album.genre}</td>
              <td>{album.releaseDate}</td>
              <td>
                <a className="btn btn-warning" href={`/edit/${album._id}`}><EditIcon/> Edit</a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => this.onDelete(album._id)}><DeleteIcon/> Delete</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:"none", color:"white"}}>Add New Album</a></button>
      </div>
    )
  }
}

