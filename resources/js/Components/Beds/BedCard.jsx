import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    useTheme,
    Divider,
    IconButton,
    Tooltip,
    CardActionArea,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Straighten as StraightenIcon,
    Visibility as VisibilityIcon,
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

export default function BedCard({ bed, garden, onDelete }) {
    const theme = useTheme();

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

    // Prevent event propagation when clicking on action buttons
    const handleActionClick = (e) => {
        e.stopPropagation();
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
                href={route('gardens.beds.show', { garden: garden.id, bed: bed.id })}
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
                        <Typography variant="h6" component="div">
                            {bed.name}
                        </Typography>
                        <Box onClick={handleActionClick}>
                            <Tooltip title="View Bed Details">
                                <IconButton 
                                    size="small" 
                                    color="primary"
                                    component={Link}
                                    href={route('gardens.beds.show', { garden: garden.id, bed: bed.id })}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add Plant">
                                <IconButton 
                                    size="small" 
                                    color="primary"
                                    component={Link}
                                    href={route('plants.create', { bed: bed.id })}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Bed">
                                <IconButton 
                                    size="small" 
                                    color="primary"
                                    component={Link}
                                    href={route('gardens.beds.edit', { garden: garden.id, bed: bed.id })}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Bed">
                                <IconButton 
                                    size="small" 
                                    color="error"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(bed);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {bed.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {bed.description}
                        </Typography>
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DataRow 
                                icon={<StraightenIcon />}
                                label="Dimensions"
                                value={`${formatDimension(bed.length)} × ${formatDimension(bed.width)} × ${formatDimension(bed.height)}`}
                                color="info"
                            />
                        </Grid>
                    </Grid>

                    {bed.plants && bed.plants.length > 0 && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" gutterBottom>
                                Plants ({bed.plants.length})
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                {bed.plants.map((plant) => (
                                    <Typography key={plant.id} variant="body2" sx={{ mb: 0.5 }}>
                                        • {plant.name} ({plant.plant_type?.name})
                                    </Typography>
                                ))}
                            </Box>
                        </>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
} 