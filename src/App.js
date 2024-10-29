import React from 'react';
import './App.css';                                                                                  
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarFuncionario from './AdicionarFuncionario';
import ListarFuncionario from './ListarFuncionario';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container>
        <Link to="/adicionar" style={{color:'white'}} > Adicionar Funcionário</Link>
        <Link to="/listar" style={{color:'white'}}> Listar Funcionários</Link>
        <Routes>
          <Route path="/adicionar" element={<AdicionarFuncionario />} />
          <Route path="/listar" element={<ListarFuncionario />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
