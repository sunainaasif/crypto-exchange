import logo from './logo.svg'
import './App.css'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import Home from './components/Home'

function App() {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarData, setSnackbarData] = useState({
    severity: 'error',
    open: false,
    message: '',
  })
  const [users, setUsers] = useState([
    {
      name: 'sunaina',
      email: 'sunaina@example.com',
      password: '1234',
    },
  ])
  // const [isUser, setIsUser] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('login')
  const [loginCount, setLoginCount] = useState(0)

  const onLogin = (enteredUser) => {
    if (loginCount === 3) {
      setSnackbarData({
        severity: 'error',
        open: true,
        message: 'User has been blocked!',
      })
      return
    }
    console.log('this is ', enteredUser)
    let { email, password } = enteredUser
    const response = users.find((usersItem) => usersItem.email === email)
    console.log(response)
    if (!response) {
      setSnackbarData({
        severity: 'error',
        open: true,
        message: 'User Not Found!',
      })
    } else if (response.password !== password) {
      setLoginCount((item) => item + 1)
    } else {
      // setIsUser(true)
      setCurrentScreen('home')
    }
  }

  const onSignup = (enteredUserDetails) => {
    console.log('enteredUserDetails', enteredUserDetails)
    let { email, password } = enteredUserDetails
    const response = users.find((usersItem) => usersItem.email === email)
    if (response) {
      setSnackbarData({
        severity: 'error',
        open: true,
        message: 'User Already Exists',
      })
    } else {
      setUsers([...users, enteredUserDetails])
      setCurrentScreen('home')
    }
  }
  console.log(users)
  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* {!isUser ? <Login onLogin={onLogin} /> : <Home />} */}
        {currentScreen === 'home' ? (
          <>
            <Header setCurrentScreen={setCurrentScreen}/>
            <Home />{' '}
          </>
        ) : currentScreen === 'signup' ? (
          <Signup onSignup={onSignup} />
        ) : (
          <Login onLogin={onLogin} />
        )}
        {/* <Signup onSignup={onSignup} /> */}
      </div>
      <Footer />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarData.open}
        onClose={() =>
          setSnackbarData({
            open: false,
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setSnackbarData({
              open: false,
              message: '',
            })
          }
          severity={snackbarData.severity}
          sx={{ width: '100%' }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
