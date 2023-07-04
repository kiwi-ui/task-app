import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {
	const [loading, isLoading] = useState(false)
	const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
		isLoading(!loading)
  
		try {
      const response = await axios.post('https://todo-api-18-140-52-65.rakamin.com/auth/login', { email, password });
			console.log(response)
			const authToken = response.data.auth_token
			localStorage.setItem('token', authToken);
      isLoading(!loading)
			navigate('/v1');
		} catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

	return (
    <>
      <main className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
				<h3 className="">Masuk</h3>

        <div className="m-0 p-4 w-md-50 w-75  bg-white rounded-4 container">
          <form onSubmit={ handleLogin }>
            <div className="mb-4">
              <label htmlFor="email" className="form-label d-block fsemibold">Email</label>
              <input className="form-control d-block w-100" type="email" id="email" value={ email } autoComplete="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="name" className="form-label d-block fsemibold">Password</label>
							<input  className="form-control d-block w-100" type="password" id="password" value={ password } onChange={(e) => setPassword(e.target.value)} required />
              <div className="password-peek cursor-pointer position-absolute"></div>
            </div>

            <button type="submit" className="btn w-100 btn-primary fsemibold">
              { loading ? <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div> : 'masuk' }
            </button>
          </form>
					{error && <p>{error}</p>}
        </div>
      </main>
    </>
  );
};

export default LoginPage;
