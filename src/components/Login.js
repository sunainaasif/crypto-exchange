import { AccountCircle, Password, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    onLogin(data)
  }

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

          {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
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
                <p className="errorMessage">Email address is required</p>
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
          </form>
          <Box display="flex" justifyContent="center">
            Don't have an account? SIGN UP
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
