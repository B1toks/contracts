import { useState } from "react";
import "./App.css";
import TableActions from "./components/table_actions";
import ContractsTable from "./components/table";
import { contracts as initialContracts } from "./components/data";
import "./styles/header.scss";
import "./styles/main.scss";

function App() {
  const [contracts, setContracts] = useState(initialContracts || []);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(contracts);

  const handleCountChange = (count: number, selectedIndexes: number[]) => {
    setSelectedCount(count);
    setSelectedRows(selectedIndexes);
  };

  const handleDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setSelectedCount(0);
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="logo_title">Contracts</div>
      </div>
      <div className="content">
        <TableActions
          selectedCount={selectedCount}
          handleDelete={handleDelete}
          contracts={contracts}
          setContracts={setContracts}
          rows={rows}
          setRows={setRows}
        />
        <ContractsTable
          onCountChange={handleCountChange}
          rows={rows}
          setRows={setRows}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}

export default App;
