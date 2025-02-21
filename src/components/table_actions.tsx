import download from "../img/download.svg"
import vector from "../img/Vector.svg"
import search from "../img/search.svg"
import menu from "../img/menu.svg"

const tableActions = () => {

    return(
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
                            required
                        />
                    </div>
                </div>
                <button className="butadd">+ Add Contract</button>
                </div>

                <div className="main_action">
                    <div className="selbut_box">
                    <div className="selected_box">
                        <img src={vector} alt="Vector" />
                        <div className="selected_text">0 Selected</div> 
                    </div>
                    <div className="action_box">
                        <button className="butbulk">Bulk Actions <img src={menu} className="menu" alt="menu" /></button>
                        
                    </div>
                    </div>
                    <div className="download_box">
                        <img src={download} alt="download" />
                        <div className="download_text">Download as CSV</div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default tableActions; 

