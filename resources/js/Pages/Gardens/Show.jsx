import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Typography,
    Grid,
    Fab,
    Container,
    Card,
    CardContent,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Alert,
} from '@mui/material';
import GardenDetails from '@/Components/Gardens/GardenDetails';
import BedCard from '@/Components/Beds/BedCard';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Show({ garden, success }) {
    const [deletingBed, setDeletingBed] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const handleDeleteBed = (bed) => {
        setDeletingBed(bed);
        setConfirmDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingBed) {
            router.delete(route('gardens.beds.destroy', { garden: garden.id, bed: deletingBed.id }));
        }
        setConfirmDialogOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        {garden.name}
                    </Typography>
                </Box>
            }
        >
            <Head title={`Garden - ${garden.name}`} />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {success}
                    </Alert>
                )}
                
                <GardenDetails garden={garden} />
                
                <Box sx={{ mt: 4 }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" component="h2">
                                    Garden Beds
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    startIcon={<AddIcon />}
                                    component={Link}
                                    href={route('gardens.beds.create', { garden: garden.id })}
                                >
                                    Add Bed
                                </Button>
                            </Box>
                            
                            <Divider sx={{ mb: 3 }} />
                            
                            <Grid container spacing={3}>
                                {garden.beds.map((bed) => (
                                    <Grid item xs={12} sm={6} md={4} key={bed.id}>
                                        <BedCard 
                                            bed={bed}
                                            garden={garden}
                                            onDelete={handleDeleteBed}
                                        />
                                    </Grid>
                                ))}
                                {garden.beds.length === 0 && (
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="text.secondary" textAlign="center">
                                            No beds have been added to this garden yet.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
                
                {/* Confirmation Dialog for Bed Deletion */}
                <Dialog
                    open={confirmDialogOpen}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the bed "{deletingBed?.name}"? 
                            This will also delete all plants in this bed.
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
