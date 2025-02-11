import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    Typography,
    Grid,
} from '@mui/material';

export default function Edit({ garden }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: garden.name || '',
        description: garden.description || '',
        address_id: garden.address_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('gardens.update', { id: garden.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">Edit Garden</Typography>
                </Box>
            }
        >
            <Head title="Edit Garden" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Garden Name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            error={errors.name !== undefined}
                                            helperText={errors.name}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            error={errors.description !== undefined}
                                            helperText={errors.description}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                            <Button
                                                href={route('gardens.show', { id: garden.id })}
                                                variant="outlined"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={processing}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
