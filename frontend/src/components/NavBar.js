import React, { useState } from 'react'
import './../styles/NavBar.css'

function NavBar() {
  const [version, setVersion] = useState("")

  // update version
  fetch('http://localhost:8000/api/health', {
    method: 'get'
  }).then(res => res.json())
    .then(heartbeat => setVersion(heartbeat["cira-version"]))
    .catch(function (error) {
      console.error(error)
    });

  return (
    <nav className="navbar">
      <div className="header">
        <h1 className="brand">CiRA Demonstrator</h1>
      </div>
      <p className="version-string">CiRA core version {version}</p>
    </nav>
  )
}

export default NavBar;
