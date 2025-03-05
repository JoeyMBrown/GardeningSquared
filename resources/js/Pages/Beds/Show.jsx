import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Typography,
    Grid,
    Container,
    Card,
    CardContent,
    Divider,
    Button,
    Alert,
    Paper,
    Breadcrumbs,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
} from '@mui/material';
import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Straighten as StraightenIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import PlantCard from '@/Components/Plants/PlantCard';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Show({ bed, success }) {
    const [deletingPlant, setDeletingPlant] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    // Convert inches to feet and inches for display
    // TODO: This should be moved to backend.
    const formatDimension = (inches) => {
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round(inches % 12);
        
        if (feet === 0) {
            return `${remainingInches}"`;
        } else if (remainingInches === 0) {
            return `${feet}'`;
        } else {
            return `${feet}' ${remainingInches}"`;
        }
    };

    const handleDeletePlant = (plant) => {
        setDeletingPlant(plant);
        setConfirmDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deletingPlant) {
            router.delete(route('gardens.beds.plants.destroy', { garden: bed.garden.id, bed: bed.id, plant: deletingPlant.id }));
        }
        setConfirmDialogOpen(false);
    };

    return (
        <AuthenticatedLayout
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
                {/* 
                    TODO: Add alert functionality throughout rest of app,
                    likely makes sense at the layout level. 
                */}
                
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {success}
                    </Alert>
                )}
                
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                    <Link href={route('gardens.index')}>Gardens</Link>
                    <Link href={route('gardens.show', bed.garden.id)}>{bed.garden.name}</Link>
                    <Typography color="text.primary">{bed.name}</Typography>
                </Breadcrumbs>
                
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h4" component="h1">
                            {bed.name}
                        </Typography>
                        <Box>
                            <IconButton
                                color="primary"
                                component={Link}
                                href={route('gardens.beds.edit', { garden: bed.garden.id, bed: bed.id })}
                                sx={{ mr: 1 }}
                                aria-label="Edit Bed"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => router.delete(route('gardens.beds.destroy', { garden: bed.garden.id, bed: bed.id }))}
                                aria-label="Delete Bed"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    
                    {bed.description && (
                        <Typography variant="body1" paragraph>
                            {bed.description}
                        </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <StraightenIcon sx={{ mr: 1, color: 'info.main' }} />
                        <Typography variant="body1">
                            <strong>Dimensions:</strong> {formatDimension(bed.length)} × {formatDimension(bed.width)} × {formatDimension(bed.height)}
                        </Typography>
                    </Box>
                    
                    <Button 
                        variant="contained" 
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        href={route('gardens.show', bed.garden.id)}
                        sx={{ mt: 2 }}
                    >
                        Back to Garden
                    </Button>
                </Paper>
                
                <Card elevation={3}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h5" component="h2">
                                Plants in this Bed
                            </Typography>
                            <Button 
                                variant="contained" 
                                startIcon={<AddIcon />}
                                component={Link}
                                href={route('gardens.beds.plants.create', { garden: bed.garden.id, bed: bed.id })}
                            >
                                Add Plant
                            </Button>
                        </Box>
                        
                        <Divider sx={{ mb: 3 }} />
                        
                        <Grid container spacing={3}>
                            {bed.plants && bed.plants.length > 0 ? (
                                bed.plants.map((plant) => (
                                    <Grid item xs={12} sm={6} md={4} key={plant.id}>
                                        <PlantCard
                                            bed={bed}
                                            plant={plant} 
                                            onDelete={() => handleDeletePlant(plant)}
                                            showEditButton={true}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="text.secondary" textAlign="center">
                                        No plants have been added to this bed yet.
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
                
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