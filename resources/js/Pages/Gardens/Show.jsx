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

export default function Show({ garden, ...props }) {
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
            {...props}
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
                
                <GardenDetails garden={garden} />
                
                <Box sx={{ mt: 4 }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" component="h2">
                                    Garden Beds
                                </Typography>
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
                
                {/* FAB visible on all screen sizes */}
                <Fab 
                    variant="extended"
                    sx={{ 
                        position: 'fixed', 
                        bottom: { xs: 72, sm: 16 },
                        right: 16,
                        color: 'white',
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                    aria-label="add bed"
                    component={Link}
                    href={route('gardens.beds.create', { garden: garden.id })}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Add Bed
                </Fab>
                
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
