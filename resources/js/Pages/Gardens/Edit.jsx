import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GardenForm from '@/Components/Gardens/GardenForm';

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
        <AuthenticatedLayout>
            <Head title="Edit Garden" />
            <GardenForm
                addresses={addresses}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEditing={true}
            />
        </AuthenticatedLayout>
    );
}
