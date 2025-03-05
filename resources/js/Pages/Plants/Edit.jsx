import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PlantForm from '@/Components/Plants/PlantForm';

export default function Edit({ plant, garden, bed, beds, plantTypes, ...props }) {
    const { data, setData, put, processing, errors } = useForm({
        name: plant.name || '',
        description: plant.description || '',
        plant_type_id: plant.plant_type_id || null,
        bed_id: bed.id || null,
        seed_start_date: plant.seed_start_date || null,
        transplant_date: plant.transplant_date || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('gardens.beds.plants.update', [garden.id, bed.id, plant.id]));
    };

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Plant: {plant.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Plant - ${plant.name}`} />
            <PlantForm
                garden={garden}
                bed={bed}
                beds={beds}
                plantTypes={plantTypes}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEditing={true}
                success={success}
            />
        </AuthenticatedLayout>
    );
} 