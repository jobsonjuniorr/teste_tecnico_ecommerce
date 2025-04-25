import pool from "../../db/db.js";

const editUser = async (id, dados) => {
    const connection = await pool.getConnection();

    try {
        const campos = [];
        const valores = [];

        if (dados.password) {
            dados.password = await bcrypt.hash(dados.password, 10);
        }

        const camposPermitidos = ["nome", "email", "password","telefone", "tipo"];

        for (const campo of camposPermitidos) {
            if (dados[campo]) {
                campos.push(`${campo} = ?`);
                valores.push(dados[campo]);
            }
        }

        if (campos.length === 0) {
            return { error: "Nenhum dado para atualizar" };
        }

        valores.push(id);
        const query = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = ?`;

        const [result] = await connection.execute(query, valores);
        return { message: "Usuário atualizado com sucesso", result };
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteUser = async (id) => {
    const connection = await pool.getConnection();

    try {
        const [result] = await connection.execute(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return { error: "Usuário não encontrado" };
        }

        return { message: "Usuário excluído com sucesso" };
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

export default {editUser,deleteUser}