const axios = window.axios
const BASE_API_URL = 'http://127.0.0.1:8000/api'

export default{
    getAllSong: () => 
        axios.get(`${BASE_API_URL}/songs`),
    getViewSong: (band_name) => 
        axios.get(`${BASE_API_URL}/view/${band_name}`),
    getOneSong: (id) =>
        axios.get(`${BASE_API_URL}/songs/${id}/edit`),
    addSong: (post) =>
        axios.post(`${BASE_API_URL}/songs`, post),
    searchSong: (post) =>
        axios.post(`${BASE_API_URL}/search`, post),
    updateSong: (post, id) =>
        axios.put(`${BASE_API_URL}/songs/${id}`, post),
    deleteSong: (id) => 
        axios.delete(`${BASE_API_URL}/songs/${id}`),

}