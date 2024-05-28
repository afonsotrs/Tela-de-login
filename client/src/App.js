import React, { useState } from 'react';
import './App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {
  
  const [isLogin, setIsLogin] = useState(true);

  const cadastrarnodb = (values) => {
    Axios.post("http://localhost:3001/cadastro", {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const logarnodb = (values) =>{
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationcadastro = yup.object().shape({
    nome: yup.
    string().required("Este campo é obrigatório"),
    sobrenome: yup.
    string().required("Este campo é obrigatório"),
    email: yup.
    string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.
    string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este campo é obrigatório"),
    confirmpassword: yup.
    string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  })

  const validationlogin = yup.object().shape({
    email: yup.
    string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.
    string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este campo é obrigatório"),
  });

  return (
    
    <div className='container'>
      {isLogin ? (
      <div className="login-form" id="login-form">
        <h2>Login</h2>
        <Formik 
        initialValues={{}}
        onSubmit={logarnodb} 
        validationSchema={validationlogin}>
          <Form className='login-form-inner' id="login-form-inner"> 

            <div className="form-group">
              <label for="login-username">E-mail:</label>
              <Field type="email" id="login-username" name="email" required/>
              <ErrorMessage component="span" name='email'
              className='form-error'
              />
            </div>  

            <div className="form-group">
              <label for="login-password">Senha:</label>
              <Field type="password" id="login-password" name="password" required/>
              <ErrorMessage component="span"name='password'
              className='form-error'/>
            </div>

            <button type="submit" >Entrar</button>

            <div class="login-link">
              <a href='#' onClick={() => setIsLogin(false)}>Não tem uma conta? Cadastre-se aqui</a>
            </div>
          
          </Form>
        </Formik>
        </div>
      ):(
        <div className="signup-form" id="signup-form">
            <Formik 
            initialValues={{}}
            onSubmit={cadastrarnodb}
            validationSchema={validationcadastro}>

              <Form className='signup-form-inner' id="signup-form-inner">
              <h2>Cadastre-se</h2>
                <div class="form-group">
                  <label for="signup-first-name">Nome:</label>
                  <Field type="text" id="signup-first-name" name="nome" required/>
                  <ErrorMessage component="span"name='nome'
                  className='form-error'/>
                </div>

                <div className="form-group">
                  <label for="signup-last-name">Sobrenome:</label>
                  <Field type="text" id="signup-last-name" name="sobrenome" required/>
                  <ErrorMessage component="span"name='sobrenome'
                  className='form-error'/>
                </div>

                <div className="form-group">
                  <label for="signup-email">E-mail:</label>
                  <Field type="email" id="signup-email" name="email" required/>
                  <ErrorMessage component="span"name='email'
                  className='form-error'/>
                </div>

                <div className="form-group">
                  <label for="signup-password">Senha:</label>
                  <Field type="password" id="signup-password" name="password" required/>
                  <ErrorMessage component="span"name='password'
                  className='form-error'/>
                </div>
              

                <div className="form-group">
                  <label for="signup-confirm-password">Confirmar Senha:</label>
                  <Field type="password" id="signup-confirm-password" name="confirmpassword" required/>
                  <ErrorMessage component="span"name='confirmpassword'
                  className='form-error'/>
                </div>

                <button type="submit">Cadastrar</button>

                <div class="login-link">
                  <a href='#' onClick={() => setIsLogin(true)}>Já tem uma conta? Faça login aqui.</a>
                </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default App;
