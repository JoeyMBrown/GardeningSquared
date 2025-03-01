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
    Divider
} from '@mui/material';
import GardenDetails from '@/Components/Gardens/GardenDetails';
import PlantCard from '@/Components/Plants/PlantCard';
import { Add as AddIcon } from '@mui/icons-material';

export default function Show({ garden }) {
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

            <Container maxWidth="md" sx={{ py: 4 }}>
                <GardenDetails garden={garden} />
                
                <Box sx={{ mt: 4 }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Plants
                            </Typography>
                            
                            <Divider sx={{ mb: 3 }} />
                            
                            <Grid container spacing={3}>
                                {garden.plants.map((plant) => (
                                    <Grid item xs={12} sm={6} md={4} key={plant.id}>
                                        <PlantCard plant={plant} />
                                    </Grid>
                                ))}
                                {garden.plants.length === 0 && (
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="text.secondary" textAlign="center">
                                            No plants have been added to this garden yet.
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
                    aria-label="add plant"
                    component={Link}
                    href={route('plants.create', { garden: garden.id })}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Add Plant
                </Fab>
            </Container>
        </AuthenticatedLayout>
    );
}
