import pool from "../../db/db.js";


const registerSell = async()=>{
    const connection = await pool.getConnection()
    try{
        const [result] = await connection.execute("SELECT * FROM carrinho")
        return result
    }catch(error){
        throw error;
    }finally{
        connection.release()
    }
}
const sellValueAll = async()=>{
    const connection = await pool.getConnection()
    try{
        const [result] = await connection.execute("SELECT preco FROM carrinho")
    
        return result
    }catch(error){
        throw error
    }finally{
        connection.release()
    }
}
const  productSell = async(produto_id)=>{
    const connection = await pool.getConnection()
    try{
        const [result] = await connection.execute("SELECT preco FROM carrinho WHERE produto_id = ? ",[produto_id])
    
        return result
    }catch(error){
        throw error
    }finally{
        connection.release()
    }
}


export default{registerSell,sellValueAll,productSell}