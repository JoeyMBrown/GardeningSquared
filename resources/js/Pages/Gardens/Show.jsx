import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box } from '@mui/material';
import GardenDetails from '@/Components/Gardens/GardenDetails';

export default function Show({ garden }) {
    return (
        <AuthenticatedLayout
            header={
                <Box>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {garden.name}
                    </h2>
                </Box>
            }
        >
            <Head title={`Garden - ${garden.name}`} />

            <GardenDetails garden={garden} />
        </AuthenticatedLayout>
    );
}
