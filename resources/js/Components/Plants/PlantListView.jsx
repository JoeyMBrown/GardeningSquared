import { Link } from '@inertiajs/react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
    Grid,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Add as AddIcon,
    ViewModule as ViewModuleIcon,
    TableChart as TableChartIcon,
} from '@mui/icons-material';
import PlantCard from '@/Components/Plants/PlantCard';
import PlantTableView from '@/Components/Plants/PlantTableView';

export default function PlantListView({ 
    plants, 
    bed, 
    garden, 
    viewMode, 
    onToggleView, 
    onDeletePlant 
}) {
    return (
        <Card elevation={3}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" component="h2">
                            Plants in this Bed
                        </Typography>
                        <Tooltip title={viewMode === 'card' ? 'Switch to Table View' : 'Switch to Card View'}>
                            <IconButton
                                onClick={onToggleView}
                                color="primary"
                                size="small"
                                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                            >
                                {viewMode === 'card' ? <TableChartIcon /> : <ViewModuleIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        component={Link}
                        href={route(
                            'gardens.beds.plants.create',
                            {
                                garden: garden.id,
                                bed: bed.id
                            }
                        )}
                    >
                        Add Plant
                    </Button>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {plants && plants.length > 0 ? (
                    viewMode === 'card' ? (
                        <Grid container spacing={3}>
                            {plants.map((plant) => (
                                <Grid item xs={12} sm={6} md={4} key={plant.id}>
                                    <PlantCard
                                        bed={bed}
                                        plant={plant} 
                                        onDelete={() => onDeletePlant(plant)}
                                        showEditButton={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <PlantTableView
                            plants={plants}
                            bed={bed}
                            garden={garden}
                            onDeletePlant={onDeletePlant}
                        />
                    )
                ) : (
                    <Typography variant="body1" color="text.secondary" textAlign="center">
                        No plants have been added to this bed yet.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
} 