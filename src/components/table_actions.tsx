import React, {useState} from "react";
import download from "../img/download.svg";
import vector from "../img/Vector.svg";
import search from "../img/search.svg";
import menu from "../img/menu.svg";


interface TableActionsProps {
  selectedCount: number; 
  handleDelete: () => void
}

type Props = {
  label: string;
};




const TableActions: React.FC<TableActionsProps> = ({ selectedCount, handleDelete }) => {
  // Bulk actions
  const [isModalOpen, setIsModalOpen] = useState (false);
  const Dropdown = ({label}: Props) => {
    const [isOpen, setIsOpen] = useState (false);
  
    const toggleDropdown = () => 
        {setIsOpen(prev => !prev)};
  
    
    
    return (
        <div className="root">
            <button className="butbulk" onClick = {toggleDropdown} disabled = {selectedCount === 0}> {label} <img src={menu} className="menu" alt="menu" /></button>
            {isOpen && (
                <ul className="menu_dd">
                    <li className="item_dd" onClick = {() => setIsModalOpen(true)}> Delete</li>
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
              <input type="text" id="search" name="search" placeholder="Search contracts..." required />
            </div>
          </div>
          <button className="butadd">+ Add Contract</button>
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
          <div className="download_box">
            <img src={download} alt="download" />
            <div className="download_text">Download as CSV</div>
          </div>
        </div>
      </div>

      {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <p>Are you sure you want to delete the selected items?</p>
          <button onClick={() => { handleDelete(); setIsModalOpen(false); }}>Yes</button>
            <button onClick={() => setIsModalOpen(false)}>No</button>
        </div>
      </div>
    )}

    </div>
  );
};

export default TableActions;
