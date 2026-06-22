import './Login.css';

function Login() {

    return(
      <div className='login-section'>
         <div className='login-card'>
            <div className='form-group'>
                <form >
                    <h1>Login</h1>
                 <input type="email" placeholder='Enter your email' required className='input'/>
                 <input type="password" placeholder='Enter your password' required className='input'/>
                 <button type='submit'>Login</button>
                </form>
            </div>
            <div className='img'>
                <img src="images/parisfc.png"/>
            </div>
            
         </div>
      </div>
    );
}

export default Login