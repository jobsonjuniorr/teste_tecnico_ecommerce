import usuariosModel from "../../models/modelUser/app.js";

export const editUser = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    try {
        const resultado = await usuariosModel.editUser(id, dados);

        if (resultado.error) {
            return res.status(400).json({ error: resultado.error });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro ao editar usuário:", error);
        res.status(500).json({ error: "Erro interno ao editar usuário" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await usuariosModel.deleteUser(id);

        if (resultado.error) {
            return res.status(404).json({ error: resultado.error });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro interno ao excluir usuário" });
    }
};
