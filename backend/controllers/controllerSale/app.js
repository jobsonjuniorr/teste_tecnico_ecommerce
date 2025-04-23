import Cart from "../../models/modelSale/app.js";
import Product from "../../models/modelsProduct/app.js";

export const addSale = async (req, res) => {
    try {
       
        const { usuario_id, produto_id, quantidade} = req.body; 
    

        if (!usuario_id || !produto_id || !quantidade) {
            return res.status(400).json({ error: "Valores vazios" });
        }

        const produto = await Product.getProductById(produto_id);

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        
        const preco = produto.preco * quantidade

        const addCartResult = await Cart.addSale(usuario_id, produto_id, quantidade,preco);

        res.status(201).json({ message: "Produto adicionado ao carrinho", itemCart: addCartResult });

    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        res.status(500).json({ error: "Erro interno do servidor", details: error.message });
    }
};

export const deleteSale = async(req,res) =>{
    try{
        const {id} = req.body


        if(!id){
          return res.status(401).json({ error: "Item não encontrado" });
        }

        const deleteItem = await Cart.deleteSale(id)

        res.status(200).json({
            message: "Item deletado!",
        });

        
    }catch(error){
        console.error("Erro ao deletar o item do carrinho:", error);
        res.status(500).json({ 
            error: "Erro interno do servidor", 
            details: error.message 
        });

    }
}

export const attSale = async (req, res) => {
    const { id, quantidade,preco } = req.body;
    try {
        if (!id || quantidade < 1 || !preco) {
            return res.status(400).json({ error: "ID do item e nova quantidade são obrigatórios." });
        }
    
        try {
            await Cart.attSale(id,quantidade,preco)
            res.json({ success: "Quantidade atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            res.status(500).json({ error: "Erro interno ao atualizar quantidade." });
        }

    } catch (error) {
        res.status(500).json({ 
            error: "Erro interno do servidor", 
            details: error.message 
        });
    }
};
