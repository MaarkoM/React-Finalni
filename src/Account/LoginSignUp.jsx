import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import "./LoginSignUp.css"

library.add(fab, faCheckSquare, faEnvelope, faUser, faLock)



const LoginSignUp = () => {

  const [action, setAction] = useState("Sign Up");

  return (
    <>
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
          <FontAwesomeIcon icon={["fas", "user"]} className='FontAwesomeIcon' />
          <input type="text" name='username' id='username' placeholder='Username' />
        </div>}
        <div className='input'>
          <FontAwesomeIcon icon={["fas", "envelope"]} className='FontAwesomeIcon'/>
          <input type="email" name='email' id='email' placeholder='Email'/>
        </div>
        <div className='input'>
          <FontAwesomeIcon icon={["fas", "lock"]} className='FontAwesomeIcon'/>
          <input type="password" name='pass' id='pass' placeholder='Password' />
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgotPass">Lost Password? <span>Click Here</span></div>}
      <div className="submitContainer">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
    
    
    
    </>
  )
}

export default LoginSignUp;