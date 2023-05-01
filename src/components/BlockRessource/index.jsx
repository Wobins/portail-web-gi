import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title/';

function preventDefault(event) {
  event.preventDefault();
}

const BlockRessource = (props) => {
  const { title, qty, description } = props;
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {qty}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {description}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Acceder
        </Link>
      </div>
    </React.Fragment>
  );
}

export default BlockRessource; 