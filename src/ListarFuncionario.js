import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/listar')
            .then((resposta) => {
                setFuncionarios(resposta.data);
            })
            .catch((erro) => {
                alert('Erro ao buscar Funcionarios: ' + erro.message);
            });
    }, []);
    return (
        <div>
            <h2>Lista de Funcionarios</h2>
            <ul>
                {funcionarios.map((funcionario) => (
                    <li key={funcionario.id}>
                        {funcionario.nome} - {funcionario.email} - {funcionario.telefone} - {funcionario.data_nascimento} - {funcionario.cep} - {funcionario.rg} - {funcionario.sexo} - {funcionario.salario} - {funcionario.aliquota} - {funcionario.inss_patronal} - {funcionario.OutrosEncargos}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ListarFuncionarios;
