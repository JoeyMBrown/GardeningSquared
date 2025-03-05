import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SnackBarAlert({ 
    message, 
    severity = 'success', 
    autoHideDuration = 3000 
}) {
    const [open, setOpen] = useState(true);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => {setOpen(false)}}
        >
            <Alert 
                severity={severity} 
                variant="filled" 
                sx={{ width: '100%' }}
                elevation={6}
            >
                {message}
            </Alert>
        </Snackbar>
    );
} 