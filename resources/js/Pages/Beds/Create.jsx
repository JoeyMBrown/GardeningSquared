import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import BedForm from '@/Components/Beds/BedForm';

export default function Create({ garden, ...props }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        garden_id: garden.id,
        length: '',
        width: '',
        height: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('gardens.beds.store', { garden: garden.id }));
    };

    return (
        <AuthenticatedLayout
            {...props}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Bed</h2>
                </div>
            }
        >
            <Head title="Add Bed" />
            <BedForm
                garden={garden}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                isEditing={false}
                success={success}
            />
        </AuthenticatedLayout>
    );
} 