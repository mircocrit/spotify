import { useState, useEffect } from 'react'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([]);

    useEffect(() => {
        //FETCH token
        const fetchToken = async (clientId, clientSecret) => {
            const res = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            })
            const data = await res.json();
            setToken(data.access_token);
            console.log(data.access_token);
        }
        fetchToken('144a153dcf2b4d29bf48ec5b610942e2','c18582449e0b4e3ca732f8f45de5ba91');
    }, [])

    //FETCH artist
    const fetchArtist = async (artistId, token) => {
        const res = await fetch(`https://api.spotify.com/v1/search?type=track&q=artist:${artistId}&limit=50`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        })
        const data = await res.json()
        setSongs(data.tracks.items)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please add artist')
            return
        }
        return fetchArtist(text, token);
    }

  return (
      <div className="container-fluid bg-light">
      <nav className="navbar navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#">
              <img src="Spotify.png" width="30" height="30" alt=""/> Spotify Web API
          </a>
      </nav>

      <div className="container-fluid bg-light">
        <form className='add-form' onSubmit={onSubmit}>
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-auto'>
                  <div className='form-group'>
                    <label for='artist'>Artist: </label>
                    <input type='text' id='artist' placeholder='Artist' class="form-control form-control-sm" value={text}
                           onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                 <input type='submit' value='go' className='btn btn-block' class="btn btn-primary" />
                </div>
            </div>
        </form>
      </div>

      <div className="container-fluid bg-light">
          <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead>
                 <tr>
                     <th class="th-sm">Song</th>
                     <th class="th-sm">Popularity</th>
                     <th class="th-sm">Album</th>
                     <th class="th-sm">Year</th>
                 </tr>
              </thead>
              <tbody>
              {songs.map(
                  (song, index) => (
                    <tr>
                        <td>{song.name}</td>
                        <td>{song.popularity}</td>
                        <td>{song.album.name}</td>
                        <td>{song.album.release_date}</td>
                    </tr>
                  ))
              }
              </tbody>
          </table>
      </div>


      <footer class='row text-center fixed-bottom'>
        <p>Copyright mircocrit@2021</p>
        <a href='https://github.com/mircocrit?tab=repositories'> About</a>
      </footer>
      </div>

  )
}

export default App;