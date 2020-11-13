import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppContainer from './AppContainer';
import api from '../api'
		const Edit = () => {
            const {id} = useParams();
            const history = useHistory();
            const [loading, setLoading] = useState(false); 
            const [song, setSong] = useState(''); 
            const [description, setDescription] = useState(''); 
            const [band_name, setBandname] = useState(''); 

            
            const onEditSubmit = async () => {
                setLoading(true);
                try{
                    await api.updateSong({
                        song, description, band_name
                    }, id);
                    history.push('/');
                }catch{
                    alert('Failed to Edit Song');
                }finally{
                    setLoading(false);
                }
            }

            useEffect(() => {
                api.getOneSong(id).then(res => {
                    const result = res.data;
                    const track = result.data;
                    console.log(track);
                    setSong(track.song);
                    setDescription(track.description);
                    setBandname(track.band_name);

                });
            }, []);

 		   return (
      			<AppContainer title="Update Song" >
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
                                onClick={onEditSubmit}
                                disabled={loading}
                                >
                                    {loading ? 'Loading...': 'Edit'}
                                </button>
                            </div>
                        
                        </form>
      			     </div>
                </AppContainer>
   			 )
			}
export default Edit