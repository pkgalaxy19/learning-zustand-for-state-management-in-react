import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Button, Typography} from "@mui/material"
import useHabitStore from './store/store'
import { Container , Box } from '@mui/material'
import AddHabitForm from './components/add-habit-form'
import HabitList from './components/habit-list'
import HabitStats from './components/habit-stats'

function App() {

  // const store = useHabitStore();
  // console.log(store);  
  return <Container>
    <Box>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm/>
      <HabitList/>
      <HabitStats/>
    </Box>
  </Container>
}

export default App
