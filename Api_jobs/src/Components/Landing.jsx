import { Button } from '@mui/joy'
import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
    const { loginWithRedirect } = useAuth0()
    const { logout } = useAuth0();
  return (
    <div>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </div>
  )
}

export default Landing
