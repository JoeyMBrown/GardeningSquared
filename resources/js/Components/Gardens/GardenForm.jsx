import { styled } from '@mui/material/styles';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Autocomplete,
    CircularProgress
} from '@mui/material';
import { useState } from 'react';
import CreateAddressModal from '@/Components/Addresses/CreateAddressModal';
import { router } from '@inertiajs/react';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
    marginTop: theme.spacing(4),
}));

const FormField = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export default function GardenForm({ 
    addresses, 
    data, 
    setData, 
    errors, 
    processing, 
    onSubmit, 
    isEditing = false 
}) {
    const [openAddressModal, setOpenAddressModal] = useState(false);

    const handleAddressCreated = (newAddress) => {
        setData('address_id', newAddress.id);
    };

    const handleBack = () => {
        router.visit(window.history.state?.back ?? '/gardens', {
            method: 'get'
        });
    };

    return (
        <FormContainer elevation={3}>
            <Typography variant="h5" component="h1" gutterBottom>
                {isEditing ? 'Edit Garden' : 'Create New Garden'}
            </Typography>

            <form onSubmit={onSubmit}>
                <FormField>
                    <TextField
                        label="Garden Name"
                        fullWidth
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                </FormField>

                <FormField>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </FormField>

                <FormField>
                    <Autocomplete
                        options={addresses}
                        getOptionLabel={(address) => 
                            `${address.street_address}${address.unit_number ? ` Unit ${address.unit_number}` : ''}, ${address.city}, ${address.state_province_region} ${address.postal_code}`
                        }
                        value={addresses.find(addr => addr.id === data.address_id) || null}
                        onChange={(_, newValue) => {
                            setData('address_id', newValue?.id || null);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Address"
                                error={!!errors.address_id}
                                helperText={errors.address_id}
                                required
                            />
                        )}
                    />
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'primary.main', 
                            cursor: 'pointer',
                            mt: 1
                        }}
                        onClick={() => setOpenAddressModal(true)}
                    >
                        Add New Address
                    </Typography>
                </FormField>

                <ButtonContainer>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                        fullWidth
                    >
                        Back
                    </Button>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        fullWidth
                    >
                        {processing ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            isEditing ? 'Save Changes' : 'Create Garden'
                        )}
                    </Button>
                </ButtonContainer>
            </form>

            <CreateAddressModal 
                open={openAddressModal}
                onClose={() => setOpenAddressModal(false)}
                onAddressCreated={handleAddressCreated}
            />
        </FormContainer>
    );
} 