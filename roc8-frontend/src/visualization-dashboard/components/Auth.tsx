import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { login, signup } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContextProvider';



const Auth  = () => {
    const authContext = useContext(AuthContext);
const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
const result =isLogin ? await login(email,password):await signup(email,password,name)

if(result?.token){
    authContext?.userLogin(result?.token)
    navigate('/dashboard');
}
};

  return (
    <Layout>
           <Container>
      <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
      </Form>
      <ToggleButton type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </ToggleButton>
    </Container>
    </Layout>
 
  );
};

export default Auth;

const Layout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
  width: 20rem;
  margin: auto;
  padding: 2rem;
  border: 0.07rem solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 0.07rem solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.7rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  margin-top: 1rem;
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


