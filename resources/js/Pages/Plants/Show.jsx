import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Paper,
    Grid,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    WaterDrop as WaterDropIcon,
    Spa as SpaIcon,
    BugReport as BugReportIcon,
    Agriculture as AgricultureIcon,
    Send as SendIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Show({ plant, garden, bed, plantEventTypes, ...props }) {
    console.log(plant);
    const [selectedEventType, setSelectedEventType] = useState(null);
    const [notes, setNotes] = useState('');
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const handleEventClick = (eventType) => {
        console.log('Event Types:', plantEventTypes);
        console.log('Selected Event Type:', eventType);
        setSelectedEventType(eventType);
        setNotes('');
    };

    const handleSubmitEvent = () => {
        router.post(route('gardens.beds.plants.events.store', {
            garden: garden.id,
            bed: bed.id,
            plant: plant.id
        }), {
            plant_event_type_id: selectedEventType.id,
            notes: notes
        }, {
            onSuccess: () => {
                setSelectedEventType(null);
                setNotes('');
            }
        });
    };

    const handleDelete = () => {
        router.delete(route('gardens.beds.plants.destroy', {
            garden: garden.id,
            bed: bed.id,
            plant: plant.id
        }));
    };

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        {plant.name}
                    </Typography>
                </Box>
            }
        >
            <Head title={`Plant - ${plant.name}`} />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                    <Link href={route('gardens.index')}>Gardens</Link>
                    <Link href={route('gardens.show', garden.id)}>{garden.name}</Link>
                    <Link href={route('gardens.beds.show', { garden: garden.id, bed: bed.id })}>{bed.name}</Link>
                    <Typography color="text.primary">{plant.name}</Typography>
                </Breadcrumbs>

                {/* Plant Image */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        mb: 3,
                        position: 'relative',
                        height: { xs: '200px', sm: '300px' },
                        overflow: 'hidden',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        component="img"
                        src={plant.plant_type?.image_url || '/images/plant_placeholder.png'}
                        alt={plant.name}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }}
                    />
                </Paper>

                {/* Action Buttons */}
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<WaterDropIcon />}
                                onClick={() => handleEventClick(plantEventTypes.find(t => t.name === 'Watered'))}
                                sx={{
                                    bgcolor: 'blue.main',
                                    '&:hover': {
                                        bgcolor: 'blue.secondary',
                                    },
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Water
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<BugReportIcon />}
                                onClick={() => handleEventClick(plantEventTypes.find(t => t.name === 'Pest Controled'))}
                                sx={{
                                    bgcolor: '#FFB74D', // Light orange
                                    '&:hover': {
                                        bgcolor: '#FFA726',
                                    },
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Pest Control
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<AgricultureIcon />}
                                onClick={() => handleEventClick(plantEventTypes.find(t => t.name === 'Harvested'))}
                                sx={{
                                    bgcolor: '#81C784', // Light green
                                    '&:hover': {
                                        bgcolor: '#66BB6A',
                                    },
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Harvest
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<SpaIcon />}
                                onClick={() => handleEventClick(plantEventTypes.find(t => t.name === 'Weeded'))}
                                sx={{
                                    bgcolor: '#9575CD', // Light purple
                                    '&:hover': {
                                        bgcolor: '#7E57C2',
                                    },
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Weed
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<SpaIcon />}
                                onClick={() => handleEventClick(plantEventTypes.find(t => t.name === 'Fertilized'))}
                                sx={{
                                    bgcolor: '#8D6E63', // Brown
                                    '&:hover': {
                                        bgcolor: '#795548',
                                    },
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Fertilize
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Event History */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Plant History
                    </Typography>
                    <Box sx={{ 
                        maxHeight: { xs: '300px', sm: '400px' },
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '4px',
                            '&:hover': {
                                background: '#555',
                            },
                        },
                    }}>
                        {plant?.plant_events?.map((event) => (
                            <Box
                                key={event.id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="medium">
                                        {event.plant_event_type.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(event.created_at).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                {event.notes && (
                                    <Typography variant="body2" color="text.secondary">
                                        {event.notes}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                        {plant?.plant_events?.length === 0 && (
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                No events recorded yet.
                            </Typography>
                        )}
                    </Box>
                </Paper>

                {/* Event Notes Dialog */}
                <Dialog 
                    open={!!selectedEventType} 
                    onClose={() => setSelectedEventType(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Record {selectedEventType?.name}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Notes (optional)"
                            fullWidth
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedEventType(null)}>Cancel</Button>
                        <Button 
                            onClick={handleSubmitEvent} 
                            variant="contained"
                            startIcon={<SendIcon />}
                        >
                            Record Event
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmDeleteOpen(false)}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this plant? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
                        <Button onClick={handleDelete} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AuthenticatedLayout>
    );
} 