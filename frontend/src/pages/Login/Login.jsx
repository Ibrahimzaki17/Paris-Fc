import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormdata] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                formData
            );

            const { token, user } = response.data;

            //save login details
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            //redicrect according to role
            if(user.role === "admin") {
                navigate("/admin-dashboard")
            }
            else if(user.role === "coach") {
                navigate("/coach-dashboard")
            }
            else if(user.role === "player") {
                navigate("/player-dashboard")
            }

        } catch (error) {
            setError(
                error.response?.data?.message || 
                "Login failed"
            );
        } finally {
            setLoading(false)
        }
    }

    return(
      <div className='login-section'>
         <div className='login-card'>
            <div className='form-group'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                 <input
                      type="email" 
                      name="email"
                      placeholder='Enter your email' 
                      required 
                      className='input'
                      value={formData.email}
                      onChange={handleChange}
                      />
                 <input 
                      type="password" 
                      name="password"
                      placeholder='Enter your password' 
                      required 
                      className='input'
                      value={formData.password}
                      onChange={handleChange}
                      />
                      <div>
                        {error && (
                            <p className='form-error'>{error}</p>
                        )}
                      </div>
                 <button type='submit'>
                    {loading ? "Logging in..." : "Login"}
                 </button>
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