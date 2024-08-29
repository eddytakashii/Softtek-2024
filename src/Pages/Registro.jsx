import React,{useState} from "react";
import { Button,Card,Container,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UsuarioService from "../services/UsuarioServices.service";

const Registro=()=>{
    const [nome,setNome]=useState('')
    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const navigate=useNavigate()

    const handleRegistro=async(e)=>{
        e.preventDefault()
        try {
            const usuario={nome,email,senha}
            await UsuarioService.criarConta(usuario)

            Swal.fire({
                title:'Sucesso!',
                text:'Conta criada com sucesso! Sendo direcionado para o login...',
                icon:'success',
                confirmButtonText:'Ok',
                background:'#1f2937',
                color:'#ffffff',
                confirmButtonColor:'#6487aa'
            }).then(()=>{
                navigate('/login')
            })
        } catch (error) {
            Swal.fire({
                title:'Erro!',
                text:'Erro ao criar conta. Tente novamente.',
                icon:'error',
                confirmButtonText:'Ok',
                background:'#1f2937',
                color:'#ffffff',
                confirmButtonColor:'#d33'
            })
        }
    }

    return(
        <Container fluid className="d-flex justify-content-center align-items-center bg-gray" style={{height:'100vh',padding:'20px'}}>
            <Card className="p-4" style={{width:'22rem',backgroundColor:'#1f2937',boxShadow:'0 4px 8px rgba(0,0,0,0.2)'}}>
                <Card.Body>
                    <h2 className="text-center mb-4 primary-text display-6" style={{color:'#ffffff'}}>Registre-se</h2>
                    <Form onSubmit={handleRegistro}>
                        <Form.Group id='nome'>
                            <Form.Label style={{color:'#ffffff'}}>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={nome}
                                onChange={(e)=>setNome(e.target.value)}
                                className="form-control"
                                style={{backgroundColor:'#2e3a48',color:'#ffffff',border:'1px solid #3b4a5a'}}
                                required
                            />
                        </Form.Group>
                        <Form.Group id='email' className="mt-3">
                            <Form.Label style={{color:'#ffffff'}}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="form-control"
                                style={{backgroundColor:'#2e3a48',color:'#ffffff',border:'1px solid #3b4a5a'}}
                                required
                            />
                        </Form.Group>
                        <Form.Group id='senha' className="mt-3">
                            <Form.Label style={{color:'#ffffff'}}>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={senha}
                                onChange={(e)=>setSenha(e.target.value)}
                                className="form-control"
                                style={{backgroundColor:'#2e3a48',color:'#ffffff',border:'1px solid #3b4a5a'}}
                                required
                            />
                        </Form.Group>
                        <Button className="w-100 mt-4 btn-primary-new font-weight-700" type="submit">Registrar</Button>
                    </Form>
                </Card.Body>
                <div className="text-center mt-3">
                    <Button variant="link" className="primary-text" onClick={()=>navigate('/login')}>Faça Login</Button>
                </div>
            </Card>
        </Container>
    )
}

export default Registro