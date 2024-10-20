import  { useState } from 'react';
import styled from 'styled-components';


const CustomDropdown = ({ options, onSelect }:any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option:any) => {
        setSelectedOption(option);
        onSelect(option); // Call the onSelect function passed as a prop
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <DropdownContainer>
            <DropdownToggle onClick={toggleDropdown}>
                {selectedOption ? selectedOption?.label : 'Select an option'}
            </DropdownToggle>
            {isOpen && (
                <DropdownMenu>
                    {options.map((option:any) => (
                        <DropdownItem key={option.value} onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default CustomDropdown;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownToggle = styled.button`
    padding: 10px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
    width: 200px;
    border-radius: 5px;
    text-align: left;
    &:focus {
        outline: none;
        border-color: #007bff; 
    }
`;

const DropdownMenu = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1; 
`;

const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0; 
    }
`;