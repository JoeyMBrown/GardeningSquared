import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    useTheme,
} from '@mui/material';
import {
    WaterDrop,
    Spa,
    BugReport,
    CalendarMonth,
    Agriculture,
} from '@mui/icons-material';

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

export default function PlantCard({ plant }) {
    const theme = useTheme();

    console.log(plant);

    // Calculate earliest harvest date based on plant type and planting date
    // TODO: This should be moved to the backend, perhaps on the plant model
    const calculateHarvestDate = () => {
        if (!plant.seed_start_date || !plant.plant_type.growth_time_min) return 'Unknown';
        const startDate = new Date(plant.seed_start_date);
        const harvestDate = new Date(startDate);
        harvestDate.setDate(harvestDate.getDate() + plant.plant_type.growth_time_min);
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
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                        component="img"
                        src={plant.plant_type?.image_url}
                        alt={plant.plant_type?.name}
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }}
                    />
                    <Box>
                        <Typography variant="h6" component="div">
                            {plant.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {plant.plant_type?.name}
                        </Typography>
                    </Box>
                </Box>

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
                            value={`${plant.plant_type.recommended_watering_frequency || '?'} days`}
                            color="info"
                        />
                        <DataRow 
                            icon={<Spa />}
                            label="Fertilize Every"
                            value={`${plant.plant_type.recommended_fertilizing_frequency || '?'} days`}
                            color="success"
                        />
                        <DataRow 
                            icon={<BugReport />}
                            label="Pest Control"
                            value={`${plant.plant_type.recommended_pest_control_frequency || '?'} days`}
                            color="warning"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
} 