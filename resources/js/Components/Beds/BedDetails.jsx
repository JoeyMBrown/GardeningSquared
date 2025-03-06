import { Link } from '@inertiajs/react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Straighten as StraightenIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { router } from '@inertiajs/react';

export default function BedDetails({ bed, garden }) {
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

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    {bed.name}
                </Typography>
                <Box>
                    <IconButton
                        color="primary"
                        component={Link}
                        href={route(
                            'gardens.beds.edit',
                            {
                                garden: garden.id,
                                bed: bed.id
                            }
                        )}
                        sx={{ mr: 1 }}
                        aria-label="Edit Bed"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => router.delete(route(
                            'gardens.beds.destroy',
                            {
                                garden: garden.id,
                                bed: bed.id
                            }
                        ))}
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
                href={route('gardens.show', garden.id)}
                sx={{ mt: 2 }}
            >
                Back to Garden
            </Button>
        </Paper>
    );
} 