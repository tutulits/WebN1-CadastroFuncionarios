import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AdicionarFuncionario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cep, setCep] = useState('');
    const [rg, setRg] = useState('');
    const [sexo, setSexo] = useState('');
    const [salario, setSalario] = useState('');
    const [aliquota, setAliquota] = useState('');
    const [inssPatronal, setInssPatronal] = useState('');
    const [outrosEncargos, setOutrosEncargos] = useState('');
    const [fgts, setFgts] = useState(0);
    const [terceiro, setTerceiro] = useState(0);
    const [viagem, setViagem] = useState(0);
    const [patronalVal, setPatronalVal] = useState(0);
    const [encargosVal, setEncargosVal] = useState(0);
    const [junto, setJunto] = useState(0);
    const [calculosRealizados, setCalculosRealizados] = useState(false);

    const handleSubmit = (evento) => {
        evento.preventDefault();
        const novoFuncionario = { nome, email, telefone, data_nascimento: dataNascimento, cep, rg, sexo, salario, aliquota, inss_patronal: inssPatronal, OutrosEncargos: outrosEncargos, fgts, terceiro, viagem, encargosVal, junto };

        axios.post('http://localhost:3001/adicionar', novoFuncionario)
            .then(() => {
                alert('Funcionário adicionado com sucesso!');

            })
            .catch((erro) => {
                alert('Erro ao adicionar funcionário: ' + erro.message);
            });
    };

    const calcularFGTS = () => {
        const salarioNum = parseFloat(salario);
        const aliquotaNum = parseFloat(aliquota) / 100;
        if (!isNaN(salarioNum) && !isNaN(aliquotaNum)) {
            setFgts(salarioNum * aliquotaNum);
        } else {
            setFgts(0);
        }
    }

    const decimo = () => {
        const decimoTerceiro = parseFloat(salario);
        if (!isNaN(decimoTerceiro) && decimoTerceiro > 0) {
            setTerceiro(decimoTerceiro / 12);
        } else {
            setTerceiro(0);
        }
    }

    const ferias = () => {
        const remunerado = parseFloat(salario);
        const ferias = parseFloat(terceiro);
        if (!isNaN(remunerado) && !isNaN(ferias)) {
            setViagem((remunerado / 12) + (ferias / 3))
        } else {
            setViagem(0);
        }
    }

    const patronall = () => {
        const patronalNum = parseFloat(inssPatronal);
        const salarioVal = parseFloat(salario);
        if (!isNaN(patronalNum) && !isNaN(salarioVal)) {
            setPatronalVal(patronalNum * salarioVal);
        } else {
            setPatronalVal(0);
        }
    }

    const encargos = () => {
        const encargosNum = parseFloat(outrosEncargos);
        const outrosNum = parseFloat(salario);
        if (!isNaN(encargosNum) && !isNaN(outrosNum)) {
            setEncargosVal(encargosNum * outrosNum);
        } else {
            setEncargosVal(0);
        }
    }

    const soma = () => {
        const N1 = parseFloat(salario);
        const N2 = parseFloat(fgts);
        const N3 = parseFloat(terceiro);
        const N4 = parseFloat(viagem);
        const N5 = parseFloat(patronalVal);
        const N6 = parseFloat(encargosVal);
        if (!isNaN(N1) && !isNaN(N2) && !isNaN(N3) && !isNaN(N4) && !isNaN(N5) && !isNaN(N6)) {
            setJunto(N1 + N2 + N3 + N4 + N5 + N6);
            setCalculosRealizados(true);
        } else {
            setJunto(0);
            setCalculosRealizados(false);
        }
    }

    return (
        <Container>
            <h1 className="centro mt-3" style={{ marginBottom: '40px' }}>Cadastro de Funcionários</h1>
            <Row>
                <Col sm={1}></Col>
                <Col sm={1}></Col>
                <Col sm={8}>

                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                        <form onSubmit={handleSubmit}>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Nome Funcionário:</div>
                                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite seu nome completo aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Email:</div>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Telefone:</div>
                                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder='Digite seu telefone aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Data Nascimento:</div>
                                        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>CEP:</div>
                                        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder='Insira seu CEP aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>RG:</div>
                                        <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} placeholder='Insira seu RG aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Sexo:</div>
                                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required>
                                            <option value="" disabled>Sexo</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Salario:</div>
                                        <input type="number" value={salario} onChange={(e) => { setSalario(e.target.value); calcularFGTS(); decimo(); ferias(); patronall(); encargos(); soma(); }} placeholder='Insira seu salario aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Aliquota:</div>
                                        <input type="text" value={aliquota} onChange={(e) => { setAliquota(e.target.value); calcularFGTS(); }} placeholder='Insira sua aliquota aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>



                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Inss Patronal:</div>
                                        <input type="text" value={inssPatronal} onChange={(e) => { setInssPatronal(e.target.value); patronall(); }} placeholder='Seu Inss vai aqui!' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Outros Encargos:</div>
                                        <input type="text" value={outrosEncargos} onChange={(e) => { setOutrosEncargos(e.target.value); encargos(); }} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Funcionário</Button>
                                <Link to="/listar" style={{ flex: 1 }}>
                                    <Button variant="secondary" style={{ width: '100%' }}>Listar Funcionários</Button>
                                </Link>

                                {calculosRealizados && (
                                    <>
                                        <div>
                                            <b>FGTS: R$ {fgts.toFixed(2)}</b>
                                        </div>
                                        <div>
                                            <b>13°: R$ {terceiro.toFixed(2)}</b>
                                        </div>
                                        <div>
                                            <b>Férias: R$ {viagem.toFixed(2)}</b>
                                        </div>
                                        <div>
                                            <b>INSS Patronal: R$ {patronalVal.toFixed(2)}</b>
                                        </div>
                                        <div>
                                            <b>Outros Encargos: R$ {encargosVal.toFixed(2)}</b>
                                        </div>
                                        <div>
                                            <b>Custo Total: R$ {junto.toFixed(2)}</b>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdicionarFuncionario;
