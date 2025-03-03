import React, { useState } from "react";
import { contract } from "./data";
import "../styles/main.scss";
import IconPlaceholder from "../img/IconPlaceholder.svg";

const statusClasses: { [key: string]: string } = {
  Active: "status-active",
  Disabled: "status-disabled",
  Paused: "status-paused",
};

interface ContractsTableProps {
  onCountChange: (count: number, selectedIndexes: number[]) => void;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  rows: contract[];
  setRows: React.Dispatch<React.SetStateAction<contract[]>>;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  onCountChange,
  selectedRows,
  setSelectedRows,
  rows,
  setRows,
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === rows.length && rows.length > 0}
              />
            </th>
            {[
              "Contract Name",
              "Contract Number",
              "Company",
              "Contract Type",
              "Licenses",
              "Start Date",
              "End Date",
              "Status",
            ].map((header) => (
              <th key={header}>
                {header} <img className="arrows" src={IconPlaceholder} alt="download" />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((contract) => (
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
    </div>
  );
};

export default ContractsTable;
