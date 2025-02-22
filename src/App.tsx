import { useState } from 'react'
import './App.css'
import TableActions from './components/table_actions'
import ContractsTable from "./components/table";
import "./styles/header.scss"
import "./styles/main.scss"


function App() {


  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="logo_title">Contracts</div></div>
          <div className="content">
          <TableActions />
          <ContractsTable />
          </div>

      </div>
      
    </>
  )
}

export default App
