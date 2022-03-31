import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../details/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Card(props) {
  console.log(props.action);
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        {props.amount}
      </Typography>
      {props.date != undefined &&
        (
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.date}
          </Typography>
        )
      }
      {
        props.action != undefined &&
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
      }
    </React.Fragment>
  );
}