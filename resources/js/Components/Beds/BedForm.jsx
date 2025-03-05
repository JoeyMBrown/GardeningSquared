import { styled } from '@mui/material/styles';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Grid,
    InputAdornment,
    Container,
    Card,
    CardContent,
    Breadcrumbs,
    Alert,
} from '@mui/material';
import { router, Link } from '@inertiajs/react';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const FormField = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export default function BedForm({ 
    garden,
    data,
    setData,
    errors,
    processing,
    onSubmit,
    isEditing = false,
    bedId
}) {
    const handleBack = () => {
        if (isEditing) {
            router.visit(route('gardens.beds.show', { garden: garden.id, bed: bedId }), {
                method: 'get'
            });
        } else {
            router.visit(route('gardens.show', garden.id), {
                method: 'get'
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                <Link href={route('gardens.index')}>Gardens</Link>
                <Link href={route('gardens.show', garden.id)}>{garden.name}</Link>
                <Typography color="text.primary">{isEditing ? `Edit ${data.name}` : 'Add New Bed'}</Typography>
            </Breadcrumbs>
            
            <Card elevation={3}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Typography variant="h5" component="h1">
                            {isEditing ? `Edit Bed: ${data.name}` : 'Add New Bed'}
                        </Typography>
                    </Box>

                    <form onSubmit={onSubmit}>
                        <FormField>
                            <TextField
                                label="Bed Name"
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

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={4}>
                                <FormField>
                                    <TextField
                                        label="Length"
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">inches</InputAdornment>,
                                        }}
                                        value={data.length}
                                        onChange={(e) => setData('length', e.target.value)}
                                        error={!!errors.length}
                                        helperText={errors.length}
                                        required
                                    />
                                </FormField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormField>
                                    <TextField
                                        label="Width"
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">inches</InputAdornment>,
                                        }}
                                        value={data.width}
                                        onChange={(e) => setData('width', e.target.value)}
                                        error={!!errors.width}
                                        helperText={errors.width}
                                        required
                                    />
                                </FormField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormField>
                                    <TextField
                                        label="Height"
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">inches</InputAdornment>,
                                        }}
                                        value={data.height}
                                        onChange={(e) => setData('height', e.target.value)}
                                        error={!!errors.height}
                                        helperText={errors.height}
                                        required
                                    />
                                </FormField>
                            </Grid>
                        </Grid>

                        <ButtonContainer>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={handleBack}
                            >
                                {bedId ? 'Back to Bed' : 'Back to Garden'}
                            </Button>
                            
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    isEditing ? 'Save Changes' : 'Add Bed'
                                )}
                            </Button>
                        </ButtonContainer>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
} 