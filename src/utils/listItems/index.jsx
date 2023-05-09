import * as React from 'react';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Badge, School, LibraryBooks, People, Bookmarks } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <NavLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItemButton component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}

export const listItems = (
  <>
    <ListItemLink to="/" primary="Accueil" icon={<Home />} />
    <ListItemLink to="/cours" primary="Cours" icon={<School />} />
    <ListItemLink to="/enseignants" primary="Enseignants" icon={<People />} />
    <ListItemLink to="/lexique" primary="Lexique" icon={<Bookmarks />} />
    <ListItemLink to="/communiques" primary="Communiques" icon={<LibraryBooks />} />
    <ListItemLink to="/entreprises" primary="Entreprises" icon={<Badge />} />
  </>
);
