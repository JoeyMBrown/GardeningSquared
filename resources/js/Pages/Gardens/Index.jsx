import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Box, 
    Container, 
    Typography, 
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GardenListCard from '@/Components/Gardens/GardenListCard';
import { useTheme } from '@mui/material/styles';

export default function Index({ gardens, ...props }) {
    const theme = useTheme();

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        Gardens
                    </Typography>
                </Box>
            }
        >
            <Head title="Gardens" />

            <Container maxWidth="md" sx={{ py: 4 }}>
                <GardenListCard gardens={gardens} />
                
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
                    aria-label="add garden"
                    component={Link}
                    href={route('gardens.create')}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    New Garden
                </Fab>
            </Container>
        </AuthenticatedLayout>
    );
}
