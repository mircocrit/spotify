import { useState, useEffect } from 'react'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const App = () => {
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([]);
  const [showTable, setshowTable] = useState(false)

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
            const data = await res.json()
            setToken(data.access_token)
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
        setshowTable(true)
        if (!text) {
            alert('Please add artist')
            return
        }
        return fetchArtist(text, token);
    }

  return (
      <div>
      <Container maxWidth="sm">
        <AppBar position="fixed" color="success">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <img src="Spotify.png" width="30" height="30" alt=""/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Spotify Web API </Typography>
            </Toolbar>
        </AppBar>

        <br/><br/><br/>

        <form className='add-form' onSubmit={onSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <FormGroup>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Artist: </Typography>
                        <TextField id="outlined-basic" label="Artist name" variant="outlined" 
                                    value={text} 
                                    onChange={(e) => setText(e.target.value)} />
                    </FormGroup>
                    <Box textAlign='center'>
                        <Button type="submit" color="primary" variant="contained" color="primary"> go </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>

    {showTable &&
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Song</TableCell>
                    <TableCell align="center">Popularity</TableCell>
                    <TableCell align="center">Album</TableCell>
                    <TableCell align="center">Year</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {songs.map((song, index) => (
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">{song.name}</TableCell>
                        <TableCell align="center">{song.popularity}</TableCell>
                        <TableCell align="center">{song.album.name}</TableCell>
                        <TableCell align="center">{song.album.release_date}</TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
        </Table>
     </TableContainer>
     }
     </Container>
     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <AppBar position="static" color="primary">
            <Toolbar>
            <Typography variant="body1" color="inherit"> © 2021 mircocrit</Typography>
            <Link href="https://github.com/mircocrit?tab=repositories">About</Link>   
            </Toolbar>
        </AppBar>
     </Paper>
      </div>
  )
}

export default App;