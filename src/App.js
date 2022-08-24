

// Core
import React, {useEffect, useState} from 'react';

// Third
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from "axios";
import { 
  CircularProgress,
  Button 
} from '@mui/material';

// Application
import FileSelector from './feature/FileSelector';
import LanguageSelector from './feature/LanguageSelector';
import './App.css';






const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <MainOCR />
    </QueryClientProvider>
  );
}

export default App;




const url = process.env.REACT_APP_HELLO_OCR_API




 function MainOCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLang, setSelectedLang ] = useState('');

  // const [welcomeMsg, setWelcomeMsg] = useState("Optical Character Recognition");
  const [ocrResults, setOcrResults] = useState("Please select PDF image to convert")  
  const welcomeMsg = "Optical Character Recognition";


  const mutation = useMutation(newFormData => {
    return axios.post(url, 
                    newFormData,
                    {
                      headers: {
                          'Content-Type': 'application/json',
                        },
                      withCredentials: false
                    })
                .then((res) => res?.data);
  })


  
  useEffect(()=>{
    
    if(mutation.isSuccess){
      setOcrResults(mutation?.data?.text)
    } else {
      setOcrResults("Cannot convert image file!")
    }
    
  }, [mutation.data, mutation.isSuccess])





  const onFileSelect = (file) => {
    setSelectedFile(file);
  }
  const onLanguageSelect = (lang) => {
    setSelectedLang(lang);
  }

  const handleSubmission = () => {

    console.log(" the fetch url is ", url);
    if(mutation.isLoading){
      mutation.reset();
      return;
    }
    
    
    if(selectedLang.length > 0 && selectedFile!=null){

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('lang', selectedLang);
      mutation.mutate(formData);

    }
  }


  console.log(" am here and there ");


  return (
    <div className="App">
      <div className='welcome-message-container'>
        {welcomeMsg}
      </div>
      <FileSelector onFileSelect={onFileSelect} />
      <div className='file-info-box'>
        <span> Selected File:  </span>
        {`${selectedFile?.name === undefined ? " No File " : selectedFile?.name}`}
      </div>
      <div className='tools-container'>
        <LanguageSelector onLanguageSelect={onLanguageSelect} />
        <Button 
          variant="contained"
          onClick={handleSubmission}
          sx={{backgroundColor: mutation.isLoading  ? '#a86114' : '#1976d2'}}>
            {`${mutation.isLoading  ? 'Cancel' : 'Convert'}`}
        </Button>
      </div>
      <div className='ocr-result-container'>
        <span>
          { mutation.isLoading ? <CircularProgress /> : ocrResults}
        </span>
        <Button 
          variant="contained"
          size="small"
          sx={{width: 50}}
          onClick={()=>navigator.clipboard.writeText(ocrResults)}>
            Copy
        </Button> 
      </div>
    </div>
  )
}
