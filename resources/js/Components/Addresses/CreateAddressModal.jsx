import { useForm } from '@inertiajs/react';
import { 
    Button, 
    Modal, 
    Box, 
    TextField,
    Typography 
} from '@mui/material';

export default function CreateAddressModal({ open, onClose, onAddressCreated }) {
    const { data, setData, post, processing, reset } = useForm({
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
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-address-modal"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography variant="h6" component="h2" mb={3}>
                    Add New Address
                </Typography>
                <form onSubmit={handleSubmit}>
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
                    <TextField
                        required
                        fullWidth
                        label="State/Province/Region"
                        value={data.state_province_region}
                        onChange={(e) => setData('state_province_region', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Postal Code"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Country"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        margin="normal"
                    />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
            </Box>
        </Modal>
    );
} 