import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import AppContainer from './AppContainer';
		const View = () => {
            const [songs, setSongs] = useState(null);
            const {band_name} = useParams();

            const fetchSongs = () => {
                api.getViewSong(band_name).then(res => {
                    console.log(res);
                    const result = res.data;
                    setSongs(result.data)

                });
            }
            useEffect(() => {
                fetchSongs();
            }, []);

      

            const renderSongs = () => {
                if(!songs){
                    return (
                        <tr>
                            <td colSpan="4">
                                Loading songs...
                            </td>
                        </tr>
                    )
                }
                if(songs.length === 0){
                    return (
                        <tr>
                            <td colSpan="4">
                                There's no available songs.. 
                            </td>
                        </tr>
                    );
                }
                return songs.map((song) => (
                    <tr key={song.id}>
                    <td >{song.id}</td>
                    <td>{song.song}</td>
                    <td>{song.description}</td>
                    <td>{song.band_name}</td>
                    <td>
                        <Link 
                            className="btn btn-warning"
                            to={`/edit/${song.id}`}
                        >
                             Edit
                        </Link>
                        <button 
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                api.deleteSong(song.id)
                                .then(fetchSongs)
                                .catch(err => {
                                    alert('there is an error id:' +song.id);
                                });
                            }}
                        >
                            Delete
                        </button>
          
                    </td>
                    
      
                    </tr> 
                ));
            }

 		   return (
      			 <AppContainer title="Cell 5">
                    <Link to="/add" className="btn btn-primary">Post Song</Link>
                    
                    <div className="table-responsive">
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Band Title</th>
                                    <th>Band Description</th>
                                    <th>Band Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {renderSongs()}
                            </tbody>
                        </table>
                    </div>
                   </AppContainer>
   			 )
			}
export default View