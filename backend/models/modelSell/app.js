import pool from "../../db/db.js";

const addSale = async (usuario_id, produto_id, quantidade, preco) => {
    const connection = await pool.getConnection()

    try {
        const precoNumerico = parseFloat(preco)

        const [result] = await connection.execute("INSERT INTO carrinho (usuario_id,produto_id,quantidade,preco) VALUES (?,?,?,?)", [usuario_id, produto_id, quantidade, precoNumerico])
       
        return {
            id: result.insertId,
            usuario_id,
            produto_id,
            quantidade,
            preco: precoNumerico,
        };
    } catch (error) {
        throw error
    } finally {
        connection.release()
    }
}

const deleteSale = async (id) => {
    const connection = await pool.getConnection()
    try {
        const [result] = await connection.execute("DELETE FROM carrinho WHERE id = ? ", [id])
        return result
    } catch (error) {
        throw error
    } finally {
        connection.release()
    }
}

const attSale = async(id,quantidade,preco) =>{
    const connection = await pool.getConnection()
    try{
        const [result] = await connection.execute("UPDATE carrinho SET quantidade = ?, preco = ? WHERE id = ?", [quantidade,preco, id])
        return result

    }catch(error){
        throw error
    }finally{
        connection.release()
    }
}

export default { addSale,deleteSale,attSale}