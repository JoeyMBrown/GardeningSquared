import { useForm } from '@inertiajs/react';
import { 
    Button, 
    Modal, 
    Box, 
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Autocomplete
} from '@mui/material';
import { states } from '@/Data/unitedStates';
import { countries } from '@/Data/countries';

export default function CreateAddressModal({ open, onClose, onAddressCreated }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        street_address: '',
        unit_number: '',
        city: '',
        state_province_region: '',
        postal_code: '',
        country: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('addresses.store'), {
            preserveScroll: true,
            onSuccess: (response) => {
                onAddressCreated(response.props.addresses[response.props.addresses.length - 1]);
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Address</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        label="Street Address"
                        value={data.street_address}
                        onChange={(e) => setData('street_address', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Unit Number"
                        value={data.unit_number}
                        onChange={(e) => setData('unit_number', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="City"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        margin="normal"
                    />
                    <Autocomplete
                        options={states}
                        getOptionLabel={(option) => option.name}
                        value={states.find(state => state.name === data.state_province_region) || null}
                        onChange={(_, newValue) => {
                            setData('state_province_region', newValue?.name || '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="State/Province/Region"
                                required
                                error={!!errors.state_province_region}
                                helperText={errors.state_province_region}
                            />
                        )}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Postal Code"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        margin="normal"
                    />
                    <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option.name}
                        value={countries.find(country => country.name === data.country) || null}
                        onChange={(_, newValue) => {
                            setData('country', newValue?.name || '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Country"
                                required
                                error={!!errors.country}
                                helperText={errors.country}
                                margin="normal"
                            />
                        )}
                    />
                </DialogContent>
                <Box sx={{ m: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        type="submit"
                        disabled={processing}
                    >
                        Add Address
                    </Button>
                </Box>
            </form>
        </Dialog>
    );
} 