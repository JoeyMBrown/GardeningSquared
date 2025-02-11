import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GardenForm from '@/Components/Gardens/GardenForm';

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
        <AuthenticatedLayout>
            <Head title="Create Garden" />
            <GardenForm
                addresses={addresses}
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
