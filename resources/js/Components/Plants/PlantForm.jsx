import { styled } from '@mui/material/styles';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Autocomplete,
    CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';

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

export default function PlantForm({ 
    garden,
    plantTypes,
    data, 
    setData, 
    errors, 
    processing, 
    onSubmit, 
    isEditing = false 
}) {
    const handleBack = () => {
        router.visit(route('gardens.show', garden.id), {
            method: 'get'
        });
    };

    return (
        <FormContainer elevation={3}>
            <Typography variant="h5" component="h1" gutterBottom>
                {isEditing ? 'Edit Plant' : 'Add New Plant'}
            </Typography>

            <form onSubmit={onSubmit}>
                <FormField>
                    <TextField
                        label="Plant Name"
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
                        options={plantTypes}
                        getOptionLabel={(option) => option.name}
                        value={plantTypes.find(type => type.id === data.plant_type_id) || null}
                        onChange={(_, newValue) => {
                            setData('plant_type_id', newValue?.id || null);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Plant Type"
                                error={!!errors.plant_type_id}
                                helperText={errors.plant_type_id}
                                required
                            />
                        )}
                    />
                </FormField>

                <FormField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Seed Start Date"
                            value={data.seed_start_date ? dayjs(data.seed_start_date) : null}
                            onChange={(newValue) => {
                                setData('seed_start_date', newValue ? newValue.format('YYYY-MM-DD') : null);
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!errors.seed_start_date,
                                    helperText: errors.seed_start_date
                                }
                            }}
                        />
                    </LocalizationProvider>
                </FormField>

                <FormField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Transplant Date"
                            value={data.transplant_date ? dayjs(data.transplant_date) : null}
                            onChange={(newValue) => {
                                setData('transplant_date', newValue ? newValue.format('YYYY-MM-DD') : null);
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!errors.transplant_date,
                                    helperText: errors.transplant_date
                                }
                            }}
                            minDate={data.seed_start_date ? dayjs(data.seed_start_date) : null}
                        />
                    </LocalizationProvider>
                </FormField>

                <ButtonContainer>
                    <Button
                        variant="outlined"
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
                            isEditing ? 'Save Changes' : 'Add Plant'
                        )}
                    </Button>
                </ButtonContainer>
            </form>
        </FormContainer>
    );
} 