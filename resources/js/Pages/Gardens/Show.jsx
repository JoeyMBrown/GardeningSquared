import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Grid,
    Divider
} from '@mui/material';

export default function Show({ garden }) {
    console.log(garden);
    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">{garden.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link href={route('gardens.edit', { id: garden.id })}>
                            <Button variant="contained" color="primary">
                                Edit Garden
                            </Button>
                        </Link>
                        <Link href={route('gardens.index')}>
                            <Button variant="outlined">
                                Back to Gardens
                            </Button>
                        </Link>
                    </Box>
                </Box>
            }
        >
            <Head title={`Garden - ${garden.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary">
                                        Garden Details
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Name
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {garden.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Created At
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {new Date(garden.created_at).toLocaleDateString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Description
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {garden.description}
                                    </Typography>
                                </Grid>

                                {garden.address && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Location
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {garden.address.street_address}, {garden.address.city}, {garden.address.state} {garden.address.postal_code}
                                        </Typography>
                                    </Grid>
                                )}

                                {garden.size && (
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Garden Size
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {garden.size} sq ft
                                        </Typography>
                                    </Grid>
                                )}

                                {garden.zone && (
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Growing Zone
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {garden.zone}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
