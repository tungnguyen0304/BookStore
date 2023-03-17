import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const SearchWrapper = styled('div')({
    width: '100%',
    maxWidth: 400,
    position: 'relative',
    backgroundColor: '#F2F4F4'
    // backgroundColor: (props) => props.theme.palette.background.paper,
});
const ResultsWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: theme.zIndex.modal + 1, // set a higher zIndex than other content
    backgroundColor: '#ffffff',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'
}));

export default function SuggestionSearchBar ({children, label, searchText, setSearchText}) {
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

  return (
    <SearchWrapper>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {resultsVisible && (
        <ResultsWrapper>
          {children}
        </ResultsWrapper>
      )}
    </SearchWrapper>
  );
};
SuggestionSearchBar.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    searchText: PropTypes.string.isRequired,
    setSearchText: PropTypes.func.isRequired
};
// how to use
{/* <SuggestionSearchBar label="Nhập thông tin cần tìm" searchText={searchText} setSearchText={setSearchText}>
<MenuList>
  {searchResults.map((result) => (
    <>
    <MenuItem key={result.id} >
      <ListItemText>{result.name} </ListItemText>
    </MenuItem>
    </>
  ))}
</MenuList>
</SuggestionSearchBar> */}