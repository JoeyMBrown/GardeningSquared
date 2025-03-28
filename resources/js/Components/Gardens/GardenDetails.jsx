import { Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useState } from 'react';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { router } from '@inertiajs/react';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

export default function GardenDetails({ garden }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleEdit = () => {
        router.visit(route('gardens.edit', { id: garden.id }));
        handleClose();
    };
    
    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleClose();
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setConfirmText('');
    };

    const handleDeleteConfirm = () => {
        if (confirmText === garden.name) {
            router.delete(route('gardens.destroy', { id: garden.id }));
            setDeleteDialogOpen(false);
            setConfirmText('');
        }
    };

    const handleConfirmTextChange = (e) => {
        setConfirmText(e.target.value);
    };

    return (
        <>
            <Card elevation={3}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Garden Details
                        </Typography>
                        <IconButton
                            aria-label="garden options"
                            aria-controls={open ? 'garden-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="garden-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'garden-options-button',
                            }}
                        >
                            <MenuItem onClick={handleEdit}>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit Garden</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleDeleteClick}>
                                <ListItemIcon>
                                    <DeleteIcon fontSize="small" color="error" />
                                </ListItemIcon>
                                <ListItemText>Remove Garden</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                    
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {garden.name}
                            </Typography>
                        </Grid>

                        {garden.address && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {garden.address.street_address}, {garden.address.city}, {garden.address.state_province_region} {garden.address.postal_code}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Description
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {garden.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Farming Since
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {new Date(garden.created_at).toLocaleDateString()}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

            {/* Use the reusable DeleteConfirmationModal component */}
            <DeleteConfirmationModal
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                itemName={garden.name}
                confirmText={confirmText}
                onConfirmTextChange={handleConfirmTextChange}
                itemType="Garden"
            />
        </>
    );
}