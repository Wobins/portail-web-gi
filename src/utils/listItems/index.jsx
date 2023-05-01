import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, Badge, School, LibraryBooks, People, Bookmarks } from '@mui/icons-material';

export const listItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Accueil" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText primary="Cours" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Enseignants" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Bookmarks />
      </ListItemIcon>
      <ListItemText primary="Lexique" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="Communiques" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Badge />
      </ListItemIcon>
      <ListItemText primary="Entreprises" />
    </ListItemButton>
  </React.Fragment>
);
