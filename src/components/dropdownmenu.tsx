import React, {useState} from "react";
import "../styles/header.scss"
import menu from "../img/menu.svg";


type Props = {
    label: string;
};

export const Dropdown = ({label}: Props) => {
    const [isOpen, setIsOpen] = useState (false);

    const toggleDropdown = () => 
        {setIsOpen(prev => !prev)};

    return (
        <div className="root">
            <button className="butbulk" onClick = {toggleDropdown}> {label} <img src={menu} className="menu" alt="menu" /></button>
            {isOpen && (
                <ul className="menu_dd">
                    <li className="item_dd"> Delete</li>
                </ul>
            )}
        </div>
    );
};
