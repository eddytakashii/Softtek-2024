const API_URL=import.meta.env.VITE_API_URL

 const criarConta=async(usuario)=>{
    try {
        const response=await fetch (`${API_URL}/usuario/criar`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(usuario)
        })
        if(!response.ok){
            throw new Error('Erro ao criar conta')
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}
 const login=async(usuario)=>{
    try {
        const response = await fetch (`${API_URL}/usuario/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(usuario)
        }
        )
        if(!response.ok){
            throw new Error('Erro ao fazer login')
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const alterarSenha=async(alterarSenhaDTO)=>{
    try {
        const response = await fetch(`${API_URL}/usuario/alterarSenha`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(alterarSenhaDTO)
        })
        if(!response.ok){
            throw new Error('Erro ao alterar senha')
        }
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export default{
    criarConta,login,alterarSenha
}