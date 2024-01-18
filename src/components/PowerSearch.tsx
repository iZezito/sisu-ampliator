import React from 'react';
import {AutoComplete, AutoCompleteProps, Input} from "antd";

interface PowerSearchProps extends AutoCompleteProps {
    onButtonClick?: () => void;
}



const PowerSearch: React.FC<PowerSearchProps> = ({options, onSelect, onSearch, onButtonClick}) => {
    return (
        <React.Fragment>
            <AutoComplete
                style={{ width: '40%' }}
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
            >
                <Input.Search placeholder="Pesquisar" enterButton onClick={onButtonClick}/>
            </AutoComplete>
        </React.Fragment>
    )
};

export default PowerSearch;