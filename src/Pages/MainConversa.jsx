import React,{useState,useEffect} from "react";
import { Container } from "react-bootstrap";
import { useLocation,useNavigate } from "react-router-dom";
import ConversaArea from "../components/ConversaArea";
import MensagemModal from "../components/MensagemModal";
import NavBar from "../components/NavBar";
import ConversaService from "../services/ConversaService.service"
import GeminiService from "../services/GeminiService.service"

const MainConversa = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario } = location.state || {}; 
    const [conversas, setConversas] = useState([]);
    const [mensagens, setMensagens] = useState([]);
    const [currentConversa, setCurrentConversa] = useState(null);
    const [textoEnviado, setTextoEnviado] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mensagensUsuario, setMensagensUsuario] = useState([]);
    const [textosDigitados, setTextosDigitados] = useState({});

    useEffect(() => {
        const fetchConversas = async () => {
            try {
                const response = await ConversaService.listarMensagemPorUsuario(usuario?.idUsuario || 1);
                if (response && response.mensagens) {
                    setMensagensUsuario(response.mensagens);
                } else {
                    setMensagensUsuario([]);
                }
            } catch (error) {
                console.error('Erro ao carregar mensagens:', error);
            }
        };
        fetchConversas();
    }, [usuario]);

    useEffect(() => {
        return () => {
            if (currentConversa) {
                handleFinalizarConversa();
            }
        };
    }, [currentConversa]);

    const handleIniciarConversa = async () => {
        try {
            const novaConversa = await ConversaService.iniciarConversa(usuario.idUsuario);
            setConversas([...conversas, novaConversa]);
            setCurrentConversa(novaConversa);
            setMensagens([]);
        } catch (error) {
            console.error('Erro ao iniciar conversa:', error);
        }
    };

    const handleEnviarMensagem = async () => {
        if (currentConversa && textoEnviado.trim() !== '') {
            try {
                const textoRecebido = await GeminiService.gerarResposta(textoEnviado);
                const novaMensagem = await ConversaService.enviarMensagem(
                    currentConversa.idConversa, textoEnviado, textoRecebido
                );
                setMensagens([...mensagens, novaMensagem]);
                setTextoEnviado('');

                setTextosDigitados((prev) => ({
                    ...prev,
                    [novaMensagem.idMensagem]: textoRecebido[0] || '',
                }));
                mostrarTextoGradualmente(novaMensagem.idMensagem, textoRecebido);
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        }
    };

    const mostrarTextoGradualmente = (idMensagem, texto) => {
        let i = 0;
        const intervalo = setInterval(() => {
            setTextosDigitados((prev) => {
                const textoAtual = prev[idMensagem] || '';
                if (i < texto.length) {
                    return { ...prev, [idMensagem]: textoAtual + texto.charAt(i) };
                } else {
                    clearInterval(intervalo);
                    return prev;
                }
            });
            i++;
        }, 50);
    };

    const handleFinalizarConversa = async () => {
        if (currentConversa) {
            try {
                await ConversaService.finalizarConversa(currentConversa.idConversa);
                setCurrentConversa(null);
                setMensagens([]);
            } catch (error) {
                console.error('Erro ao finalizar conversa:', error);
            }
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleLogout = () => {
        handleFinalizarConversa();
        navigate('/');
        location.state = null;
    };

    return (
        <Container fluid className="emphasis-bg" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar handleShowModal={handleShowModal} handleLogout={handleLogout} usuario={usuario} />
            <ConversaArea
                currentConversa={currentConversa}
                mensagens={mensagens}
                textoEnviado={textoEnviado}
                setTextoEnviado={setTextoEnviado}
                handleEnviarMensagem={handleEnviarMensagem}
                textosDigitados={textosDigitados}
                handleIniciarConversa={handleIniciarConversa}
                handleFinalizarConversa={handleFinalizarConversa}
            />
            <MensagemModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                mensagensUsuario={mensagensUsuario}
                usuario={usuario}
            />
        </Container>
    );
};

export default MainConversa;