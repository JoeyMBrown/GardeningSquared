import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import BedDetails from '@/Components/Beds/BedDetails';
import PlantListView from '@/Components/Plants/PlantListView';

export default function Show({ bed, garden, ...props }) {
    const [deletingPlant, setDeletingPlant] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

    const handleDeletePlant = (plant) => {
        setDeletingPlant(plant);
        setConfirmDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingPlant) {
            router.delete(route(
                'gardens.beds.plants.destroy',
                {
                    garden: garden.id,
                    bed: bed.id,
                    plant: deletingPlant.id
                }
            ));
        }
        setConfirmDialogOpen(false);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'card' ? 'table' : 'card');
    };

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        {bed.name}
                    </Typography>
                </Box>
            }
        >
            <Head title={`Bed - ${bed.name}`} />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                    <Link href={route('gardens.index')}>Gardens</Link>
                    <Link href={route(
                        'gardens.show',
                        garden.id
                    )}>{garden.name}</Link>
                    <Typography color="text.primary">{bed.name}</Typography>
                </Breadcrumbs>
                
                <BedDetails bed={bed} garden={garden} />
                
                <PlantListView
                    plants={bed.plants}
                    bed={bed}
                    garden={garden}
                    viewMode={viewMode}
                    onToggleView={toggleViewMode}
                    onDeletePlant={handleDeletePlant}
                />
                
                {/* Confirmation Dialog for Plant Deletion */}
                <Dialog
                    open={confirmDialogOpen}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the plant "{deletingPlant?.name}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
                        <Button onClick={confirmDelete} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AuthenticatedLayout>
    );
} 