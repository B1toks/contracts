import React, { useState } from "react";
import { contracts } from "./data";
import "../styles/main.scss";
import IconPlaceholder from "../img/IconPlaceholder.svg"

interface Contract {
  contractName: string;
  contractNumber: string;
  company: string;
  contractType: string;
  licenses: string;
  startDate: string;
  endDate: string;
  status: string;
}

const statusClasses: { [key: string]: string } = {
  Active: "status-active",
  Disabled: "status-disabled",
  Paused: "status-paused",
};

const ContractsTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(contracts.map((_, i) => i));
                  } else {
                    setSelectedRows([]);
                  }
                }}
                checked={selectedRows.length === contracts.length}
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
              <th key={header}>{header} <img className = "arrows"src={IconPlaceholder} alt="download" /></th>
            ))}
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract: Contract, index: number) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
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
                <button className="menu-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsTable;
