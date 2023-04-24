import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { BsSearch } from "react-icons/bs";

const ResultsWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: theme.zIndex.modal + 1, // set a higher zIndex than other content
    backgroundColor: '#ffffff',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'
}));

export default function SuggestionSearchBar ({children, label, searchText, setSearchText, handleSearch}) {
  const [resultsVisible, setResultsVisible] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setResultsVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setResultsVisible(false);
    }, 200);
  };
  const handleFocus = () => {
    setTimeout(() => {
      setResultsVisible(true);
    }, 200);
  };  

  return (
    <div className="input-group">
        <input
            className="form-control py-2 border-0"
            placeholder="Tìm kiếm sản phẩm ở đây ..."
            aria-label="Tìm kiếm sản phẩm ở đây..."
            aria-describedby="basic-addon2" 
            autoComplete='off'
            value={searchText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
        <button className="input-group-text p-3 border-0 rounded-end" type="submit" id="basic-addon2">
            <BsSearch className="fs-6" />
        </button>      
        {resultsVisible && (
            <ResultsWrapper>
            {children}
            </ResultsWrapper>
        )}
    </div>
  );
};
SuggestionSearchBar.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    searchText: PropTypes.string.isRequired,
    setSearchText: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
};