import User from "../../models/modelRegister/app.js"


export const registerUser = async(req,res) =>{
    try{
        const {nome,email,password,telefone} =  req.body;
       
       if(!nome || !email || !password || !telefone){
        return res.status(400).json({error:"Todas os campos são obrigatorios"})
     }

      const response = await User.postRegisterUser(nome,email,password,telefone)
     
      if(response.error){
        return res.status(409).json({error:response.error})
      }

        return res.status(201).json({error:"Usuario cadastrados com sucesso"})
    }catch(error){
        res.status(500).json({error:"Erro ao tentar cadastrar o usuario"})
    }
}

export const registerUserType = async(req,res) =>{
  try{
      const {nome,email,password,telefone,tipo} =  req.body;
      

     if(!nome || !email || !password || !telefone || !tipo){
      return res.status(400).json({error:"Todas os campos são obrigatorios"})
   }

    const response = await User.postRegisterType(nome,email,password,telefone,tipo)
   
    if(response.error){
      return res.status(409).json({error:response.error})
    }

      return res.status(201).json({error:"Usuario cadastrados com sucesso"})
  }catch(error){
      res.status(500).json({error:"Erro ao tentar cadastrar o usuario"})
  }
}