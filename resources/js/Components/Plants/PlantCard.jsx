import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    useTheme,
    IconButton,
    Tooltip,
    CardActionArea,
} from '@mui/material';
import {
    WaterDrop,
    Spa,
    BugReport,
    CalendarMonth,
    Agriculture,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from '@inertiajs/react';

const DataRow = ({ icon, label, value, color = 'primary' }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {React.cloneElement(icon, { 
            sx: { mr: 1, color: `${color}.main` },
            fontSize: "small"
        })}
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {label}:
        </Typography>
        <Typography variant="body2" color="text.primary">
            {value}
        </Typography>
    </Box>
);

export default function PlantCard({ plant, bed, onDelete, showEditButton = false }) {
    const theme = useTheme();

    // Calculate earliest harvest date based on plant type and planting date
    // TODO: This should be moved to the backend, perhaps on the plant model
    const calculateHarvestDate = () => {
        if (!plant.seed_start_date || !plant.plant_type?.growth_days_min) return 'Unknown';
        const startDate = new Date(plant.seed_start_date);
        const harvestDate = new Date(startDate);
        harvestDate.setDate(harvestDate.getDate() + plant.plant_type.growth_days_min);
        return harvestDate.toLocaleDateString();
    };

    return (
        <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
            }
        }}>
            <CardActionArea 
                component={Link}
                href={route(
                    'gardens.beds.plants.show',
                    {
                        garden: bed.garden.id,
                        bed: bed.id,
                        plant: plant.id
                    }
                )}
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'stretch',
                    '& .MuiCardContent-root': {
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {plant.plant_type?.image_url && (
                                <Box
                                    component="img"
                                    src={plant.plant_type.image_url}
                                    alt={plant.plant_type.name}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        mr: 2,
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            )}
                            <Box>
                                <Typography variant="h6" component="div">
                                    {plant.name}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {plant.plant_type?.name}
                                </Typography>
                            </Box>
                        </Box>
                        
                        {showEditButton && (
                            <Box onClick={(e) => e.stopPropagation()}>
                                <Tooltip title="Edit Plant">
                                    <IconButton 
                                        size="small" 
                                        color="primary"
                                        component={Link}
                                        href={route('gardens.beds.plants.edit', { garden: bed.garden.id, bed: bed.id, plant: plant.id })}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                {onDelete && (
                                    <Tooltip title="Delete Plant">
                                        <IconButton 
                                            size="small" 
                                            color="error"
                                            onClick={() => onDelete(plant)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        )}
                    </Box>

                    {plant.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {plant.description}
                        </Typography>
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <DataRow 
                                icon={<CalendarMonth />}
                                label="Planted"
                                value={plant.seed_start_date ? new Date(plant.seed_start_date).toLocaleDateString() : 'Not planted'}
                            />
                            <DataRow 
                                icon={<Agriculture />}
                                label="Est. Harvest"
                                value={calculateHarvestDate()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DataRow 
                                icon={<WaterDrop />}
                                label="Water Every"
                                value={`${plant.plant_type?.watering_frequency || '?'} days`}
                                color="info"
                            />
                            <DataRow 
                                icon={<Spa />}
                                label="Fertilize Every"
                                value={`${plant.plant_type?.fertilizing_frequency || '?'} days`}
                                color="success"
                            />
                            <DataRow 
                                icon={<BugReport />}
                                label="Pest Control"
                                value={`${plant.plant_type?.pest_control_frequency || '?'} days`}
                                color="warning"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
} 