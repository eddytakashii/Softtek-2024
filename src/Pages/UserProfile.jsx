import React from "react";
import { useState } from "react";
import { Button, Card,Col,Container,Form,FormLabel,Row } from "react-bootstrap";
import { useLocation,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UsuarioService from "../services/UsuarioServices.service";

const UserProfile = () => {
    const location = useLocation();
    const { usuario } = location.state
    const navigate = useNavigate(); 
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleAlterarSenha = async () => {
        if (novaSenha !== confirmarSenha) {
            Swal.fire({
                title: 'Aviso!',
                text: 'As senhas não coincidem.',
                icon: 'warning',
                confirmButtonText: 'Ok',
                background: '#1F2937',
                color: '#ffffff',
                confirmButtonColor: '#FFA500',
            });
            return;
        }

        try {
            await UsuarioService.alterarSenha({id: usuario.idUsuario, novaSenha});
            Swal.fire({
                title: 'Sucesso!',
                text: 'Senha alterada com sucesso! Redirecionando para o login...',
                icon: 'success',
                confirmButtonText: 'Ok',
                background: '#1F2937',
                color: '#ffffff',
                confirmButtonColor: '#6487AA',
            }).then(() => {
                navigate('/login');
            });
            setNovaSenha('');
            setConfirmarSenha('');
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao trocar senha. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok',
                background: '#1F2937',
                color: '#ffffff',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleBack = () => navigate('/conversa', {state:{usuario: usuario}});

    return (
          <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Card className="shadow-lg p-4 w-100" style={{ maxWidth: '500px', borderRadius: '15px', backgroundColor: '#1F2937', color: '#E5E7EB' }}>
                <Card.Body>
                    <h3 className="text-center mb-4 display-6" >Perfil do Usuário</h3>

                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" className="font-weight-bold">
                                Nome:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly defaultValue={usuario.nome} className='bg-secondary text-light border-0' />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2" className="font-weight-bold">
                                Email:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly defaultValue={usuario.email} className='bg-secondary text-light border-0' />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="novaSenha" className="mb-3">
                            <Form.Label className="font-weight-bold">Nova Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Digite a nova senha" 
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)} 
                                className="bg-secondary text-light border-0"
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmarSenha" className="mb-3">
                            <Form.Label className="font-weight-bold">Confirmar Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirme a nova senha" 
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)} 
                                className="bg-secondary text-light border-0"
                            />
                        </Form.Group>

                        <Button variant="light" className=" w-100 mt-4" onClick={handleAlterarSenha}>
                            Alterar Senha
                        </Button>
                        <Button variant="dark" className="d-flex mx-auto justify-content-center w-50 mt-4" onClick={handleBack}>
                            Voltar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile