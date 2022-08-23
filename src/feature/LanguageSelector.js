

// Core
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

// Third
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';




// Application
import languages from '../data/languages.json'




function LanguageSelector(props) {
    const { onLanguageSelect } = props;

    const [language, setLanguage] = useState(languages[2])

    useEffect(()=>{
        onLanguageSelect(language);
    }, [language, onLanguageSelect])

    const langugeChange = (event) => {
        setLanguage(event.target.value);
    };
    


  return (
    <Box sx={{ minWidth: 120, marginRight: '15px'}}>
    <FormControl fullWidth>
      <InputLabel id="language-select-input-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language}
        label="language"
        onChange={langugeChange}
      >
        {languages.map((lang, i)=>{
            return <MenuItem key={i} value={lang}>{lang.toUpperCase()}</MenuItem>
        })}
      </Select>
    </FormControl>
  </Box>
  )
}


LanguageSelector.propTypes = {
  onLanguageSelect: PropTypes.func
}

export default LanguageSelector