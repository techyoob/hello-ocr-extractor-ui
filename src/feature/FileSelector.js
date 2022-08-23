






// Core
import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'

// Third 
import {useDropzone} from 'react-dropzone';
import { Dialog, Alert } from '@mui/material';


// Application
import './feature.css';





function FileSelector(props) {
    const { onFileSelect} = props;
    const [isAlertDialog, setIsAlertDialog] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    // const [sizeLimit, setSizeLimit] = useState(10485760);
    const sizeLimit = 6291456;


    const onDrop = useCallback(acceptedFiles => {
                
        if(acceptedFiles.length  === 1){
            
            if(acceptedFiles[0]?.size < sizeLimit){
                onFileSelect(acceptedFiles[0]);
            } else {
                setAlertMsg("File size must not exceed 6MB!")
            }
        } else {            
            setAlertMsg("Only one file allowed!")
        }


      }, [onFileSelect])
      
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const onMessageClose = () => {
        setIsAlertDialog(false);
      };

      useEffect(()=>{
        if(alertMsg.length > 0){
            setIsAlertDialog(true)
        }
      }, [alertMsg])



    return (
        <>
            <Dialog onClose={onMessageClose} open={isAlertDialog}>
                <Alert severity="warning">{alertMsg}</Alert>
            </Dialog>
            <div className='file-selector-container'
                {...getRootProps()}>
                <input {...getInputProps()} multiple={false}/>
                {
                    isDragActive ?
                        <p>Drop the file here ...</p> :
                        <p>Drag 'n' drop PDF image here, or click to select file</p>
                }
            </div>
        </>
    )
}

FileSelector.propTypes = {
    onFileSelect: PropTypes.func,

}

export default FileSelector
