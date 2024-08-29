import React from "react";
import { Button,Modal } from "react-bootstrap";

const MensagemModal=({showModal,handleCloseModal,mensagensUsuario})=>{
    return(
        <Modal show={showModal} onHide={handleCloseModal} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Todas as mensagens.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mensagensUsuario.length> 0 ? 
                    (<ul className="list-unstyled">
                        {mensagensUsuario.map((mensagem)=>(
                            <li key={mensagem.idMensagem} className="mb-2">
                                <strong className="font-weight-900">{new Date(mensagem.dataHora).toLocaleString()} - </strong>
                                <span className="font-weight-700">Mensagem enviada: </span>
                                <span> {mensagem.textoEnviado||'Sem mensagem enviada'} </span>
                                <br></br>
                                <span className="font-weight-700">Resposta Recebida: </span>
                                <span> {mensagem.textoRecebido||'Sem resposta recebida'} </span>
                                <br></br>
                            </li>
                        ))}
                    </ul>) : (
                        <p>Nenhuma mensagem encontrada.</p>
                    )
}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn-secondary" onClick={handleCloseModal}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MensagemModal