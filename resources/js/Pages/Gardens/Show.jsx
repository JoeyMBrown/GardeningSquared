import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Typography,
    Grid,
    Button
} from '@mui/material';
import GardenDetails from '@/Components/Gardens/GardenDetails';
import PlantCard from '@/Components/Plants/PlantCard';
import { Add as AddIcon } from '@mui/icons-material';

export default function Show({ garden }) {
    return (
        <AuthenticatedLayout
            header={
                <Box>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {garden.name}
                    </h2>
                </Box>
            }
        >
            <Head title={`Garden - ${garden.name}`} />

            <GardenDetails garden={garden} />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Typography variant="h5" component="h2">
                                Plants
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                href={route('plants.create', { garden: garden.id })}
                            >
                                Add Plant
                            </Button>
                        </Box>

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
                    </Box>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
