import React, { useEffect, useState} from "react";
import download from "../assets/download.svg";  
import vector from "../assets/Vector.svg"; 
import search from "../assets/Search.svg"; 
import menu from "../assets/Menu.svg";  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDebounce } from "./useDebounce";

interface Contract {
  id: number;
  contractName: string;
  contractNumber: string;
  company: string;
  startDate: string;
  endDate: string;
  status: string;
  contractType: string; 
  licenses: string;
}

interface TableActionsProps {
  selectedCount: number;
  handleDelete: () => void;
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  setRows: React.Dispatch<React.SetStateAction<Contract[]>>;
  rows: Contract[];
}

type Props = {
  label: string;
};

const TableActions: React.FC<TableActionsProps> = ({
  selectedCount,
  handleDelete,
  contracts = [],
  setContracts,
  setRows,
  rows,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contractName, setContractName] = useState("");
  const [company, setCompany] = useState("Shell");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [contractType, setContractType] = useState("Project");

  useEffect (() => {
    if (!debouncedSearchTerm) {
      setRows (contracts);
      return;
    }
    const filtered = contracts.filter((contract) =>
      contract.contractName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    setRows(filtered);
  }, [debouncedSearchTerm, contracts, setRows]);

  // Export
  const exportToCSV = () => {
    if (rows.length === 0) {
      alert ("There is no data for export.");
      return;
    }
    const csvHeader = "ID, Contract Name, Contract Number, Company, Start Date, End Date, Status, Contract Type, Licenses\n";
    const csvRows = rows.map(contract =>
      `${contract.id},"${contract.contractName}","${contract.contractNumber}","${contract.company}","${contract.startDate}","${contract.endDate}","${contract.status}","${contract.contractType}","${contract.licenses}"`
    );
  
    const csvContent = csvHeader + csvRows.join ("\n");
    const blob = new Blob ([csvContent], {type: "text/csv; charset = utf-8;"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "contracts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const generateContractNumber = () => {
    if (contracts.length === 0) {
      return `CN000001`;
    }
  
    const lastContract = contracts[contracts.length - 1];
    const match = lastContract.contractNumber.match(/^CN(\d+)$/);
  
    if (!match) {
      console.error("Невірний формат номера контракту:", lastContract.contractNumber);
      return `CN000001`;
    }
  
    const lastNumber = parseInt(match[1], 10);
    const nextNumber = lastNumber + 1;
    return `CN${nextNumber.toString().padStart(6, "0")}`;
  };

  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleCreateContract = () => {
    if (!contractName.trim()) return;

    const newContract: Contract = {
      id: Date.now(),
      contractName,
      contractNumber: generateContractNumber(),
      company,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      status: "Active",  
      contractType: contractType,  
      licenses: "100/100", 
    };

    setContracts((prevContracts) => [...prevContracts, newContract]);
    setRows((prevRows) => [...prevRows, newContract]);
    setIsCreateModalOpen(false);
    setContractName("");
  };

  const Dropdown = ({ label }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="root">
        <button className="butbulk" onClick={() => setIsOpen((prev) => !prev)} disabled={selectedCount === 0}>
          {label} <img src={menu} className="menu" alt="menu" />
        </button>
        {isOpen && (
          <ul className="menu_dd">
            <li className="item_dd" onClick={() => setIsDeleteModalOpen(true)}>
              {" "}
              Delete
            </li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="main">
      <div className="title">Contracts</div>
      <div className="main_content">
        <div className="sb_box">
        <div className="search">
            <img src={search} alt="search" />
            <div className="search-container">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="butadd" onClick={() => setIsCreateModalOpen(true)}>
            + Add Contract
          </button>
        </div>

        <div className="main_action">
          <div className="selbut_box">
            <div className="selected_box">
              <img src={vector} alt="Vector" />
              <div className="SelectedNumber">{selectedCount}</div>
              <div className="selected_text"> Selected</div>
            </div>
            <div className="action_box">
              <Dropdown label="Bulk Actions" />
            </div>
          </div>
          <button className="download_box">
            <img className = "downloadbut" src={download} alt="download" />
            <div className="download_text" onClick={exportToCSV}>
              <div className="download_text">Download as CSV</div>
            </div>
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete the selected items?</p>
            <button onClick={() => { handleDelete(); setIsDeleteModalOpen(false); }}>Yes</button>
            <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <div className="custom-modal-content-header">
              <h3>New Contract</h3>
              <button className="close-button" onClick={() => setIsCreateModalOpen(false)}>
                ✖
              </button>
            </div>
            <div className="contract-name-number-box">
              <div className="contract-name-box">
                <label>Contract Name</label>
                <input type="text" className="contract-half-input" value={contractName} onChange={(e) => setContractName(e.target.value)} />
              </div>
              
              <div className="contract-number-box">
                <label>Contract Number</label>
                <input type="text" className="contract-half-input" value={generateContractNumber()} disabled />
              </div>
              
            </div>

            <label>Company</label>
            <select value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="Shell">Shell</option>
              <option value="BP">BP</option>
              <option value="Exxon">Exxon</option>
            </select>
            
            <div className="full-data-box">
              <div className="start-date-box">
                <label>Start Date</label>
                <DatePicker className="contract-half-input" selected={startDate} onChange={(date) => setStartDate(date!)} />
              </div>
              
              <div className="end-date-box">
                <label>End Date</label>
                <DatePicker className="contract-half-input" selected={endDate} onChange={(date) => setEndDate(date!)} />
              </div>
            </div>
            

            <label>Contract Type</label>
            <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
              <option value="Project">Project</option>
              <option value="Recurring">Recurring</option>
              <option value="Trial">Trial</option>
            </select>

            <div className="custom-modal-buttons">
              <button className="cancel" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
              <button className="create" onClick={handleCreateContract}>Create Contract</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableActions;
