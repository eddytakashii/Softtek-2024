import React,{useState} from "react";
import {useNavigate} from "react-router-dom"
import UsuarioService from "../services/UsuarioServices.service"
import { Container,Alert,Button,Card,Form } from "react-bootstrap";

const Login=()=>{
    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            const usuario={email,senha}
            const response=await UsuarioService.login(usuario)
            navigate('/conversa',{state:{usuario:response}})
        } catch (error) {
            setError('Erro ao fazer login. Verifique seus dados.')
        }
    }
    const handleCreateAccount =()=>{
        navigate('/registro')
    }
    return(
        <Container fluid className="d-flex justify-content-center align-items-center bg-gray" style={{height:'100vh',padding:'20px'}}>
            <Card className="p-4 secondary-bg" style={{width:"22rem",boxShadow:"0 4px 8px rgba(0,0,0,0.2)"}}>
                <Card.Body>
                    <h2 className="text-center mb-4 primary-text display-6">ChatBot</h2>
                    {error&& <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group id='email'>
                            <Form.Label className='secondary-text' style={{color:'#ffffff'}}>Email</Form.Label>
                            <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)}
                                className='form-control emphasis-text'
                                style={{backgroundColor:'#2e3a48',color:'#ffffff', border:'1px solid #3b4a5a'}}
                                required/>
                        </Form.Group>
                        <Form.Group id='senha'className='mt-3'>
                            <Form.Label className='secondary-text' style={{color:'#ffffff'}}>Senha</Form.Label>
                            <Form.Control type='password' value={senha} onChange={(e)=>setSenha(e.target.value)}
                                className='form-control emphasis-text'
                                style={{backgroundColor:'#2e3a48',color:'#ffffff', border:'1px solid #3b4a5a'}}
                                required/>
                        </Form.Group>
                        <Button className='w-100 mt-4 btn-primary-new' type='submit'>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <div className="text-center mt-3">
                    <Button variant='link' className='primary-text'onClick={handleCreateAccount} style={{color:'#6487aa'}}>Criar Conta</Button>
                </div>
            </Card>
        </Container>

    )
}
export default Login;