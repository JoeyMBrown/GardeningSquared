import { Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Grid,
    Divider,
    CardActions
} from '@mui/material';

export default function GardenDetails({ garden }) {

return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
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
                        </Grid>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href={route('gardens.index')}>
                                <Button variant="outlined">
                                    Back to Gardens
                                </Button>
                            </Link>
                            <Link href={route('gardens.edit', { id: garden.id })}>
                                <Button variant="contained" color="primary">
                                    Edit Garden
                                </Button>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}