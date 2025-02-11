import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from '@mui/material';

export default function DeleteConfirmationModal({ 
    open, 
    onClose, 
    onConfirm, 
    itemName, 
    confirmText, 
    onConfirmTextChange,
    itemType = 'item' // default value
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Delete ${itemType}`}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    This action cannot be undone. To confirm deletion, please type the {itemType.toLowerCase()} name:
                    <Typography component="span" fontWeight="bold"> {itemName}</Typography>
                </Typography>
                <TextField
                    autoFocus
                    fullWidth
                    value={confirmText}
                    onChange={onConfirmTextChange}
                    margin="dense"
                    label={`${itemType} Name`}
                    variant="outlined"
                    error={confirmText !== '' && confirmText !== itemName}
                    helperText={
                        confirmText !== '' && 
                        confirmText !== itemName && 
                        `${itemType} name doesn't match`
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    onClick={onConfirm}
                    disabled={confirmText !== itemName}
                    color="error" 
                    variant="contained"
                >
                    Delete {itemType}
                </Button>
            </DialogActions>
        </Dialog>
    );
} 