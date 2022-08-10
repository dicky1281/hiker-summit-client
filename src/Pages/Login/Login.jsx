import React, {useEffect, useState} from 'react'
import { Container,Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.scss'
import { loginHandler } from '../../apiCalls/apiCalls'


const Login = () => {
  // Redux Tools
  const user = useSelector((state)=> state.user.user);
  const dispatch = useDispatch();

  // Router Doom Tools
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const navigate = useNavigate();

  // State to send
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const Auth = async(e) =>{

    e.preventDefault();
    try{
      setLoading(true)
      const response = await loginHandler(dispatch,{username, password})
      navigate(`/guide`)

    } catch (error) {
      alert(error)
    }

  }

  useEffect(()=>{
    user && navigate(from, { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="login-container">
    <Container>
      <div className="login-content" data-aos="fade-right" data-aos-duration="2000">
    <div className="row justify-content-start">
       <h2>Selamat Datang Kembali!</h2>
       <p><b>Tempat yang membantu petualanganmu</b></p>
          <div className="col-md-4">
              <form onSubmit={Auth}> 
                <p className="text-center"></p>
                  <div className="form-group">
                    <label><b>Username</b></label>
                    <input type="text" className="form-control" placeholder="Masukan username anda"
                     value={username}  onChange={(e)=>setUsername(e.target.value)}
                    required/>
                  </div>
                  <div className="form-group">
                      <label><b>Password</b></label>
                      <input type="password" className="form-control" placeholder="Password" 
                      value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
              
                    <button type="submit" className="btn btn-dark w-100">{loading ? (<Spinner animation="border" size='sm' variant="light" />) : <>Login</>}</button>   
                </form>
                <p className='text-center pt-3'>Baru di HikerSummit ?<b> <Link style={{ color:"orange", fontWeight:"500" }} to="/register">Sign Up</Link></b></p>
        </div>
        </div>
   </div>
    </Container>
    
  </div>
  )
}

export default Login;