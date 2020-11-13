import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AppContainer from './AppContainer';
import api from '../api'
		const Add = () => {
            const history = useHistory();
            const [loading, setLoading] = useState(false); 
            const [song, setSong] = useState(''); 
            const [description, setDescription] = useState(''); 
            const [band_name, setBandname] = useState(''); 


            const onAddSubmit = async () => {
                setLoading(true);
                try{
                    await api.addSong({
                        song, description,band_name
                    });
                    history.push('/');
                }catch{
                    alert('Failed to add Song');
                }finally{
                    setLoading(false);
                }
            }

 		   return (
      			<AppContainer title="Add Song" >
                    <div className="Add_Container">
         			   <form>
                            <div className="form-group">
                                <label>Song Title</label>
                                <input 
                                    className="form-control" 
                                    type="text"
                                    value={song}
                                    onChange={e => setSong(e.target.value)}
                                />
                            </div>                        
                            <div className="form-group">
                                <label>Song Description</label>
                                <textarea 
                                    className="form-control"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Band Name</label>
                                <input 
                                    className="form-control" 
                                    type="text"
                                    value={band_name}
                                    onChange={e => setBandname(e.target.value)}
                                />
                            </div> 
                            <div className="form-group">
                               <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={onAddSubmit}
                                disabled={loading}
                                >
                                    {loading ? 'Loading...': 'Add'}
                                </button>
                            </div>
                        
                        </form>
      			     </div>
                </AppContainer>
   			 )
			}
export default Add