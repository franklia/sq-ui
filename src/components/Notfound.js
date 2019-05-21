import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const Notfound = () => {
  return (
    <>
      <h4>Sorry... page not found </h4><Link component={RouterLink} to='/' className='link'>Return to homepage</Link>
    </>
  )
}

export default Notfound;
