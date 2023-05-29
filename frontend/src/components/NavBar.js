import React, { useState, useEffect } from 'react'
import './../styles/NavBar.css'

function NavBar() {
  const [serverResponding, setServerResponding] = useState(false)
  const [version, setVersion] = useState("")

  // update version
  useEffect(() => {
    fetch('http://localhost:8000/api/health', {
      method: 'get'
    }).then(res => res.json())
      .then(heartbeat => {
        if(Object.hasOwn(heartbeat, "status")) {
          setVersion(heartbeat["cira-version"]);
          setServerResponding(true);
        }
      })
      .catch(function (error) {
        console.error(error)
      });
  }, [])


  return (
    <nav className="navbar">
      <div className="header">
        <h1 className="brand">CiRA Demonstrator</h1>
      </div>
      {
        serverResponding ? 
        <p className="version-string">CiRA core version {version}</p> :
        <p className="version-string">(CiRA core not available)</p>
      }
      
    </nav>
  )
}

export default NavBar;
