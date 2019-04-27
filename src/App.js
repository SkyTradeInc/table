import React from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Data from './components/Data'
import Container from 'react-bootstrap/Container'



function App() {
  return (
    <div className="App">
    <Container>
    <Data/>
    </Container>
    </div>
  );
}

export default App;
