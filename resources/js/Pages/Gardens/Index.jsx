import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box
} from '@mui/material';

export default function Index({ gardens }) {
    return (
        <AuthenticatedLayout
            header={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">My Gardens</Typography>
                    <Link href={route('gardens.create')}>
                        <Button variant="contained" color="primary">
                            Create New Garden
                        </Button>
                    </Link>
                </Box>
            }
        >
            <Head title="Gardens" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="gardens table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gardens.map((garden) => (
                                    <TableRow
                                        key={garden.id}
                                        hover
                                        component={Link}
                                        href={route('gardens.show', garden.id)}
                                        sx={{ 
                                            textDecoration: 'none',
                                            '&:hover': {
                                                cursor: 'pointer',
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {garden.name}
                                        </TableCell>
                                        <TableCell>{garden.address.street_address}</TableCell>
                                        <TableCell>{garden.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
