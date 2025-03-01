import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GardenForm from '@/Components/Gardens/GardenForm';
import { Box, Container, Typography } from '@mui/material';

export default function Create({ addresses }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        address_id: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('gardens.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h1">
                        Create Garden
                    </Typography>
                </Box>
            }
        >
            <Head title="Create Garden" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                <GardenForm
                    addresses={addresses}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    isEditing={false}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
