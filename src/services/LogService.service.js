const API_URL=import.meta.env.VITE_API_URL;

const registrarAcao=async(idUsuario,idConversa,acao)=>{
    try {
        const response=await fetch(`${API_URL}/log/registrar`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({idUsuario,idConversa,acao})
        })
        if(!response.ok){
            throw new Error('Erro ao registrar ação no log')
        }return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const obterLogs=async()=>{
    try {
        const response= await fetch(`${API_URL}/log/obter`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok){
            throw new Error('Erro ao obter os logs')
        }return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

    export default {
        registrarAcao,obterLogs
    }