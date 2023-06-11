import { AccountCircle, Face, Home, Password } from '@mui/icons-material'
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import React from 'react'
import BadgeIcon from '@mui/icons-material/Badge'
import { useForm } from 'react-hook-form'

const Signup = ({onSignup}) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('this is data'  ,data);
    const file = data.cnic[0]
    if (file.type != 'application/pdf') {
      setError('cnic', {
        type: 'filetype',
        message: 'Only PDFs are valid.',
      })
      return
    }
    onSignup(data)
  }
  // console.log(watch('name'))
  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 'calc(100vh - 160px)' }}
    >
      <Card sx={{ width: '450px' }}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            fontSize="42px"
            fontWeight="bold"
            textAlign="center"
            color="#1f3850"
          >
            Crypt-O
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                {...register('name', { required: true })}
                startAdornment={
                  <InputAdornment position="start">
                    <Face />
                  </InputAdornment>
                }
              ></OutlinedInput>
              {errors.name && <p className="errorMessage">This is required</p>}
            </FormControl>
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                {...register('email', {
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              ></OutlinedInput>
              {errors.email && (
                <p className="errorMessage">Email is required</p>
              )}
            </FormControl>
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                type="password"
                {...register('password', { required: true })}
                startAdornment={
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                }
              ></OutlinedInput>
              {errors.password && (
                <p className="errorMessage">This is required</p>
              )}
            </FormControl>
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel htmlFor="address">Address</InputLabel>
              <OutlinedInput
                id="address"
                label="Address"
                type="text"
                {...register('address', { required: true })}
                startAdornment={
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                }
              ></OutlinedInput>
              {errors.address && (
                <p className="errorMessage">This is required</p>
              )}
            </FormControl>
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel htmlFor="cnic">CNIC</InputLabel>
              <OutlinedInput
                id="cnic"
                label="CNIC"
                type="file"
                accept="application/pdf"
                {...register('cnic', { required: true })}
                startAdornment={
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                }
              ></OutlinedInput>
              {errors.cnic && <p className="errorMessage">{errors.cnic.message || "This is required"}</p>}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
                backgroundColor: '#1f3850',
              }}
            >
              Login
            </Button>
            <Box display="flex" justifyContent="center">
              Already have an account? Login
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signup
