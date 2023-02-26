import React, { useState, useEffect } from 'react'
import './../styles/App.css'

import Core from './Core'
import NavBar from './NavBar'

function App() {

  return (
    <div className="App">
      <NavBar></NavBar>
      <Core></Core>
    </div>
  )
}

export default App;
