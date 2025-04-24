import Product from "../../models/modelsProduct/app.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.getProducts(); 
        res.json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar os produtos" });
    }
};

export const deleteProduct = async(req,res) =>{
    try{
        const {id} = req.params

        if(!id){
            return res.status(404).json({message:"Produto não encontrado"})
        }
        const deleteProduct = await Product.deleteProduct(id) 
        
        res.status(200).json({message:"Item deletado com sucesso"})
    }catch(error){
        res.status(500).json({error:"Erro ao deletar produto"})
    }
}

export const criarProduto = (req, res) => {
   try{
    const { nome, descricao, preco, estoque, categoria } = req.body;
    const imagem = req.file ? req.file.buffer : null; 

    if(!nome || !descricao || !preco ||!estoque || !categoria || !imagem){
       return res.status(400).json({message:"Todos os campos precisão ser preenchidos"})
    }

      const result = Product.inserirProduto(nome, descricao, preco, estoque, categoria, imagem)
      res.status(201).json({ message: 'Produto inserido com sucesso'});

   }catch(error){
    res.status(500).json({ error: "Erro ao cadastrar o produto" });
   }
  };

  export const updateProductAdm = async (req, res) => {
    try {
        const { nome, descricao, preco, estoque, categoria } = req.body;
        const id = req.params.id;

       
        const imagem = req.file ? req.file.buffer : undefined;

        const result = await Product.updateProduct(id, nome, descricao, preco, estoque, categoria, imagem);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Produto atualizado com sucesso" });
        } else {
            return res.status(404).json({ message: "Produto não encontrado ou nenhum campo atualizado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar o produto" });
    }
};
