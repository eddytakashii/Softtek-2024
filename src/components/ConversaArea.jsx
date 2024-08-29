import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaPaperPlane, FaStop } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ConversaArea = ({ currentConversa, mensagens, textoEnviado, setTextoEnviado, handleEnviarMensagem, textosDigitados, handleIniciarConversa, handleFinalizarConversa }) => {

    const handleStopClick = async () => {
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: "Você deseja finalizar esta conversa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            handleFinalizarConversa();
        }
    };

    return (
        <div className="flex-grow-1 d-flex flex-column p-4" style={{ height: '100%' }}>
            <div className="flex-grow-1 overflow-auto mb-3">
                {currentConversa ? (
                    mensagens.map((mensagem) => (
                        <div key={mensagem.idMensagem} className="mb-3">
                            {mensagem.textoEnviado && (
                                <div className="bg-gray-medium text-right p-2 rounded" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    {mensagem.textoEnviado}
                                </div>
                            )}
                            {mensagem.textoRecebido && (
                                <div className="secondary-bg p-2 rounded mt-2" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                                    {textosDigitados[mensagem.idMensagem] || ''}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-5">
                        <Button variant="primary" className="btn-primary-new" onClick={handleIniciarConversa}>
                            Iniciar Conversa
                        </Button>
                    </div>
                )}
            </div>

            {currentConversa && (
                <InputGroup className="rounded-input">
                    <Form.Control
                        placeholder="Digite sua mensagem..."
                        value={textoEnviado}
                        onChange={(e) => setTextoEnviado(e.target.value)}
                        className="form-control-chat"
                    />
                    <Button
                        variant="dark"
                        className="btn-primary-new"
                        onClick={handleEnviarMensagem}
                        style={{ borderRadius: '50%', padding: '0.5rem' }}
                        disabled={textoEnviado.trim() === ''}
                    >
                        <FaPaperPlane size={18} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleStopClick}
                        style={{ borderRadius: '50%', padding: '0.5rem' }}
                    >
                        <FaStop size={18} />
                    </Button>
                </InputGroup>
            )}
        </div>
    );
};

export default ConversaArea;