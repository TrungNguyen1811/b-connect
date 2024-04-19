import { useState } from 'react'
import { UserAuthForm } from 'src/components/auth/user-auth-form'
import RegisterForm from 'src/components/auth/user-register-form'
import LandingButton from 'src/components/landing/landing-button'

function LoginPage() {
  const [isRightPanelActive, setRightPanelActive] = useState(false)
  const [isLeftPanelActive, setLeftPanelActive] = useState(false)

  const handleSignInClick = () => {
    setRightPanelActive(true)
    setLeftPanelActive(false)
  }

  const handleSignUpClick = () => {
    setLeftPanelActive(true)
    setRightPanelActive(false)
  }

  return (
    <div className="min-h-[47rem] bg-orange-200">
      <LandingButton />
      <div>
        <div
          className={`container h-[26rem] ${isRightPanelActive ? 'left-panel-active' : ''} ${
            isLeftPanelActive ? 'right-panel-active' : ''
          }`}
        >
          <div className="form-container sign-in-container">
            <UserAuthForm />
          </div>
          <div className="form-container sign-up-container">
            <RegisterForm />
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button onClick={handleSignInClick} className="ghost">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>{"Don't"} have an account yet?</p>
                <button onClick={handleSignUpClick} className="ghost">
                  Sign Up Here!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
