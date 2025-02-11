import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Index({ gardens }) {
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        garden: null,
        confirmText: ''
    });

    const handleDeleteClick = (garden) => {
        setDeleteModal({
            isOpen: true,
            garden: garden,
            confirmText: ''
        });
    };

    const handleDeleteClose = () => {
        setDeleteModal({
            isOpen: false,
            garden: null,
            confirmText: ''
        });
    };

    const handleConfirmTextChange = (e) => {
        setDeleteModal(prev => ({
            ...prev,
            confirmText: e.target.value
        }));
    };

    const handleDeleteConfirm = () => {
        router.delete(route('gardens.destroy', { garden: deleteModal.garden.id }));
        handleDeleteClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">My Gardens</Typography>
                    <Link href={route('gardens.create')}>
                        <Button variant="contained" color="primary">
                            Create New Garden
                        </Button>
                    </Link>
                </Box>
            }
        >
            <Head title="Gardens" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="gardens table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gardens.map((garden) => (
                                    <TableRow
                                        key={garden.id}
                                        hover
                                        component={Link}
                                        href={route('gardens.show', garden.id)}
                                        sx={{ 
                                            textDecoration: 'none',
                                            '&:hover': {
                                                cursor: 'pointer',
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {garden.name}
                                        </TableCell>
                                        <TableCell>{garden.address.street_address}</TableCell>
                                        <TableCell>{garden.description}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Link href={route('gardens.edit', { garden: garden.id })} onClick={(e) => e.stopPropagation()}>
                                                    <IconButton color="primary" aria-label={`Edit ${garden.name}`}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton 
                                                    color="error" 
                                                    aria-label={`Delete ${garden.name}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        // Necessary to prevent the link from being followed.
                                                        // Stop propagation does not prevent links from being followed.
                                                        e.preventDefault();
                                                        handleDeleteClick(garden);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <DeleteConfirmationModal
                open={deleteModal.isOpen}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                itemName={deleteModal.garden?.name}
                confirmText={deleteModal.confirmText}
                onConfirmTextChange={handleConfirmTextChange}
                itemType="Garden"
            />
        </AuthenticatedLayout>
    );
}
