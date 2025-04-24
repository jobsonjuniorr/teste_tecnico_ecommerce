import Sell from "../../models/modelSellRegister/app.js";

export const getRegisterSell = async (req, res) => {
    try {
        const registerSell = await Sell.registerSell(); 
        const register = registerSell.length

        res.status(200).json({message:"Valor total de vendas:",register})
    } catch (error) {
        res.status(500).json({ error: "Erro na exibição total de vendas" });
    }
};


export const getAllRegisterValeu  = async(req,res) =>{
    try{
        const valueAll =  await Sell.sellValueAll()

        const value = valueAll.reduce((soma,item)=> soma + parseFloat(item.preco),0)

        res.status(200).json({message:"Valor total de vendas:",value})
    }catch(error){
        res.status(500).json({ error: "Erro na exibição do valor total de vendas" });
    }
}
export const productSell = async (req, res) => {
    try {
      const { produto_id } = req.body;
  
      const rows = await Sell.productSell(produto_id);

      const valueAll = rows.reduce((soma,item)=> soma + parseFloat(item.preco),0)
      res.status(200).json({ message: "Valor total de vendas:", valueAll });
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro na exibição do valor total de vendas" });
    }
  };
  