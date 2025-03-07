import React, { useState, useEffect } from "react";
import { contracts } from "./data"; 
import "../styles/main.scss";
import IconPlaceholder from "../../public/IconPlaceholder.svg";

const statusClasses: { [key: string]: string } = {
  Active: "status-active",
  Disabled: "status-disabled",
  Paused: "status-paused",
};

interface Contract {
  id: number;
  contractName: string;
  contractNumber: string;
  company: string;
  contractType: string;
  licenses: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface ContractsTableProps {
  onCountChange: (count: number, selectedIndexes: number[]) => void;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  rows: Contract[];
  setRows: React.Dispatch<React.SetStateAction<Contract[]>>;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  onCountChange,
  selectedRows,
  setSelectedRows,
  rows,
  setRows,
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Contract; direction: string } | null>(null);

  useEffect(() => {
    setRows(contracts); 
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((id) => contracts.some((contract) => contract.id === id))
    );
  }, []);

  const handleSort = (key: keyof Contract) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setRows((prevRows) => {
      return [...prevRows].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    });
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((i) => i !== id)
        : [...prevSelectedRows, id];
      onCountChange(newSelectedRows.length, newSelectedRows);
      return newSelectedRows;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allSelected = rows.map((contract) => contract.id);
      setSelectedRows(allSelected);
      onCountChange(allSelected.length, allSelected);
    } else {
      setSelectedRows([]);
      onCountChange(0, []);
    }
  };

  const handleDelete = (idsToDelete: number[]) => {
    setRows((prevRows) => prevRows.filter((contract) => !idsToDelete.includes(contract.id)));
    setSelectedRows((prevSelected) => prevSelected.filter((id) => !idsToDelete.includes(id)));
    onCountChange(0, []);
    setOpenMenuId(null);
  };

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRows = rows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length > 0 && selectedRows.length === rows.length}
              />
            </th>
            {["contractName", "contractNumber", "company", "contractType", "licenses", "startDate", "endDate", "status"].map((key) => (
              <th key={key} onClick={() => handleSort(key as keyof Contract)}>
                {key.replace(/([A-Z])/g, " $1").trim()} <img className="arrows" src={IconPlaceholder} alt="sort" />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((contract) => (
            <tr key={contract.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(contract.id)}
                  onChange={() => handleCheckboxChange(contract.id)} 
                />
              </td>
              <td>{contract.contractName}</td>
              <td>{contract.contractNumber}</td>
              <td>{contract.company}</td>
              <td>{contract.contractType}</td>
              <td>{contract.licenses}</td>
              <td>{contract.startDate}</td>
              <td>{contract.endDate}</td>
              <td className={`status ${statusClasses[contract.status] || ""}`}>
                {contract.status}
              </td>
              <td className="actions">
                <button className="menu-btn" onClick={() => setOpenMenuId(openMenuId === contract.id ? null : contract.id)}>⋮</button>
                {openMenuId === contract.id && (
                  <div className="menu-dd">
                    <button className="delete-btn" onClick={() => handleDelete([contract.id])}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
        <span>{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
        <select
          className="select-container"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContractsTable;
