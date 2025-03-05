import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GardenForm from '@/Components/Gardens/GardenForm';
import { Box, Container, Typography } from '@mui/material';

export default function Edit({ garden, addresses }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: garden.name || '',
        description: garden.description || '',
        address_id: garden.address_id || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('gardens.update', { id: garden.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        Edit Garden
                    </Typography>
                </Box>
            }
        >
            <Head title="Edit Garden" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                <GardenForm
                    gardenId={garden?.id}
                    addresses={addresses}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    isEditing={true}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
