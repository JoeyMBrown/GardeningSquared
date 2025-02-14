import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PlantForm from '@/Components/Plants/PlantForm';

export default function Create({ garden, plantTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        plant_type_id: null,
        garden_id: garden.id,
        seed_start_date: null,
        transplant_date: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('plants.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Plant" />
            <PlantForm
                garden={garden}
                plantTypes={plantTypes}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEditing={false}
            />
        </AuthenticatedLayout>
    );
} 