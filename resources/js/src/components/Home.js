import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import Type from './Type'
import AppContainer from './AppContainer';

const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
let padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3): number )


		const Home = () => {

            const [songs, setSongs] = useState(null);

            const fetchSongs = () => {
                api.getAllSong().then(res => {
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
                    <tr key={song.band_name}>
                    <td>{song.band_name}</td>
                    <td>
                        <Link
                            type="button"
                            className="btn btn-primary"
                            to={`/view/${song.band_name}`}
                        >
                            View
                        </Link>
                    </td>
                    <td><img src={`${POKE_API}${padToThree(song.id)}.png`} alt= {song.band_name}/></td>
      
                    </tr> 
                ));
            }

 		   return (
      			 <AppContainer title="Cell 5">
                    <Link to="/add" className="btn btn-primary">Post Song</Link>
                    <Link to="/find" className="btn btn-primary ml-3">FInd Songs</Link>
 
                    <div className="table-responsive">
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                <Type/>

                                    <th>Band Name</th>
                                    <th>View</th>
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
export default Home