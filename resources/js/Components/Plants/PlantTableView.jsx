import { Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

export default function PlantTableView({ plants, bed, garden, onDeletePlant }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Planting Date</TableCell>
                        <TableCell>Transplant Date</TableCell>
                        <TableCell>Earliest Harvest</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {plants.map((plant) => (
                        <TableRow key={plant.id}>
                            <TableCell>{plant.name}</TableCell>
                            <TableCell>{plant.plant_type?.name}</TableCell>
                            <TableCell>{plant.seed_start_date ? new Date(plant.seed_start_date).toLocaleDateString() : '-'}</TableCell>
                            <TableCell>{plant.transplant_date ? new Date(plant.transplant_date).toLocaleDateString() : '-'}</TableCell>
                            <TableCell>
                                {plant.seed_start_date && plant.plant_type?.growth_days_min
                                    ? new Date(new Date(plant.seed_start_date).getTime() + (plant.plant_type.growth_days_min * 24 * 60 * 60 * 1000)).toLocaleDateString()
                                    : '-'
                                }
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    href={route('gardens.beds.plants.edit', { garden: garden.id, bed: bed.id, plant: plant.id })}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => onDeletePlant(plant)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 