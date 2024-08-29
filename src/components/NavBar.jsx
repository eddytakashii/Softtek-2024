import React from "react";
import { Button,Dropdown,Nav } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleShowModal, handleLogout, usuario }) => {
    const navigate = useNavigate();

    const handleRedirectUsuario = () => navigate('/usuario', { state: { usuario } });

    return (
        <Nav className="p-3 d-flex justify-content-between align-items-center">
            <Dropdown align="end">
                <Dropdown.Toggle variant="light-outline" className="primary-text">
                    ChatBot
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShowModal}>Mostrar Todas as Mensagens</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button variant="link" className="button-transparent" onClick={handleRedirectUsuario}>
                <FaUser size={24} />
            </Button>
        </Nav>
    )
}

export default NavBar