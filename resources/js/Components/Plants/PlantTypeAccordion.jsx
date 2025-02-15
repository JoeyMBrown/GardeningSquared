import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlantTypeAccordion({ 
    plantType, 
    onSelect, 
    isSelected 
}) {
    return (
        <Accordion sx={{ mb: 1 }}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    backgroundColor: isSelected ? 'primary.light' : 'inherit',
                    '&:hover': {
                        backgroundColor: isSelected ? 'primary.light' : 'inherit',
                    }
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    width: '100%', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        {plantType.name} - {plantType.brand}
                    </Typography>
                    <Button
                        variant={isSelected ? "contained" : "outlined"}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(plantType);
                        }}
                        sx={{ ml: 2 }}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </Button>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography><strong>Description:</strong> {plantType.description}</Typography>
                    <Typography><strong>Growth Time:</strong> {plantType.growth_time_min} - {plantType.growth_time_max} days</Typography>
                    <Typography><strong>Indoor Seed Start:</strong> {plantType.indoor_seed_start_date}</Typography>
                    <Typography><strong>Outdoor Seed Start:</strong> {plantType.outdoor_seed_start_date}</Typography>
                    <Typography><strong>Transplant Date:</strong> {plantType.transplant_date}</Typography>
                    <Typography><strong>Last Plant Date:</strong> {plantType.last_plant_date}</Typography>
                    <Typography><strong>Watering Frequency:</strong> {plantType.recommended_watering_frequency}</Typography>
                    <Typography><strong>Fertilizing Frequency:</strong> {plantType.recommended_fertilizing_frequency}</Typography>
                    <Typography><strong>Pest Control Frequency:</strong> {plantType.recommended_pest_control_frequency}</Typography>
                    <Typography><strong>Planting Depth:</strong> {plantType.planting_depth} inches</Typography>
                    <Typography><strong>Spacing:</strong> {plantType.planting_space_x}″ x {plantType.planting_space_y}″</Typography>
                    <Typography><strong>Sun Needed:</strong> {plantType.sun_needed}</Typography>
                    <Typography><strong>Germination Days:</strong> {plantType.germination_days}</Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
} 