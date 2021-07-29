import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../services/api';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Tracker App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [message, setMessage] = useState();
  const [categories, setCategories] = useState([]);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [spacing, setSpacing] = React.useState(2);

  const list = () => {
    setMessage('');
    setCategories([]);
    api.get('/v1/category').then((response) => {
      setCategories(response.data);
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  const remove = id => {
    setMessage('');
    setCategories([]);
    api.delete(`/v1/category/${id}`).then((response) => {
      list(response.data);
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  const register = e => {
    e.preventDefault();
    setMessage('');
    api.post('/v1/category', {
        name: name,
        description: description
    }).then((response) => {
      list();
      setMessage('');
      setName('');
      setMessage('Cadastro realizado com sucesso');
      setTimeout(() => {
        setDescription('');
      }, 3000);
    }).catch((err) => {
      setMessage('Erro ao realizar cadastro');
    })
  }

  function generate() {
    return categories.map((value) =>
        <ListItem key={value.id}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={value.name}
            secondary={value.description}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => remove(value.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    );
  }

  useEffect(() => {
    list();
  },[]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="/logo.png" className="App-logo" alt="logo" style={{ marginBottom: 40 }} />
        <Typography component="h1" variant="h5" style={{ marginBottom: 40 }}>
          Cadastro de categorias
        </Typography>

        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
            <Grid container justifyContent="center" spacing={spacing}>
              
              <form className={classes.form} onSubmit={(e) => register(e)} style={{ padding: 30 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome da categoria"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Descrição"
                  type="text"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cadastrar
                </Button>

                <Typography component="h1" variant="h5">
                  {message}
                </Typography>
                
                
              </form>

            </Grid>
          </Grid>

          <Grid xs={6}>
            <Grid justifyContent="center" spacing={4}>
              <List dense={dense} style={{ padding: 30 }}>
                    {generate()}
                  </List>
            </Grid>
          </Grid>
        </Grid>

      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}