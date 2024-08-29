const API_URL=import.meta.env.VITE_API_URL

const iniciarConversa=async(idUsuario)=>{
    try {
        const response= await fetch(`${API_URL}/conversa/iniciar`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({idUsuario})
        })
        if(!response.ok){
            throw new error('Erro ao iniciar conversa')
        }return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

    const enviarMensagem=async(idConversa,textoEnviado, textoRecebido)=>{
        try {
            const response=await fetch(`${API_URL}/conversa/enviarMensagem`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({idConversa,textoEnviado,textoRecebido})
            })
            if (!response.ok){
                throw new Error('Erro ao enviar mensagem')
            }
            return await response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const finalizarConversa=async(idConversa)=>{
        try {
            const response = await fetch(`${API_URL}/conversa/finalizar`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({idConversa})
            })
            if(!response.ok){
                throw new Error("Erro ao finalizar conversa")
            }
            return await response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const listarMensagemPorUsuario=async(idUsuario)=>{
        try {
            const response =await fetch(`${API_URL}/conversa/mensagensPorUsuario/${idUsuario}`,{
                method:'GET',
                headers:{'Content-Type':'application/json'}
            })
            if(!response.ok){
                throw new error('Erro ao listar mensagens do usuario')
            }
            return await response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

export default{
    iniciarConversa,enviarMensagem,finalizarConversa, listarMensagemPorUsuario
}
