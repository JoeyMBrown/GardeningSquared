import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import BedForm from '@/Components/Beds/BedForm';

export default function Edit({ bed, garden, ...props }) {
    const { data, setData, put, processing, errors } = useForm({
        name: bed.name || '',
        description: bed.description || '',
        length: bed.length || '',
        width: bed.width || '',
        height: bed.height || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('gardens.beds.update', { garden: garden.id, bed: bed.id }));
    };

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Bed: {bed.name}</h2>
                </div>
            }
        >
            <Head title={`Edit Bed - ${bed.name}`} />
            <BedForm
                bedId={bed?.id}
                garden={garden}
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