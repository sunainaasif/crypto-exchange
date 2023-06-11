import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Header = ({setCurrentScreen}) => {
  return (
    <>
      <Box display="flex" alignItems="center" sx={{ background: '#1f3850',height:"70px" ,padding:"10px 20px", color:"#fff"}}>
        <Box flex="1">
          <Typography fontSize="48px">Crypt-O</Typography>{' '}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" flex="3">
          <Typography sx={{marginRight:"20px"}}>Home</Typography>
          <Typography>About Us</Typography>
        </Box>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={()=> setCurrentScreen('login')}>Signout</Button>
        </Box>
      </Box>
    </>
  )
}

export default Header
