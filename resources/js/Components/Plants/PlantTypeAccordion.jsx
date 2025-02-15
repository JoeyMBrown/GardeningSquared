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
        <Accordion sx={{ 
            mb: 1,
            borderLeft: plantType.is_in_garden ? '4px solid' : 'none',
            borderLeftColor: 'primary.main',
        }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {plantType.is_in_garden && (
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    mr: 1, 
                                    color: 'primary.main',
                                    fontWeight: 'medium'
                                }}
                            >
                                In Garden
                            </Typography>
                        )}
                        <Typography variant="subtitle1" fontWeight="medium">
                            {plantType.name} - {plantType.brand}
                        </Typography>
                    </Box>
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
                    <Typography><strong>Growth Time:</strong> {plantType.growth_days_min} - {plantType.growth_days_max} days</Typography>
                    <Typography><strong>Indoor Seed Start:</strong> {plantType.indoor_seed_start_days} days before last frost</Typography>
                    <Typography><strong>Outdoor Seed Start:</strong> {plantType.outdoor_seed_start_days} days after last frost</Typography>
                    <Typography><strong>Transplant Date:</strong> {plantType.transplant_days} days after last frost</Typography>
                    <Typography><strong>Last Plant Date:</strong> {plantType.last_plant_days} days after last frost</Typography>
                    <Typography><strong>Watering Frequency:</strong> Every {plantType.watering_frequency} days</Typography>
                    <Typography><strong>Fertilizing Frequency:</strong> Every {plantType.fertilizing_frequency} days</Typography>
                    <Typography><strong>Pest Control Frequency:</strong> Every {plantType.pest_control_frequency} days</Typography>
                    <Typography><strong>Planting Depth:</strong> {plantType.plant_depth} inches</Typography>
                    <Typography><strong>Plant Spacing:</strong> {plantType.plant_spacing} inches</Typography>
                    <Typography><strong>Sun Needed:</strong> {plantType.sun_needed} minutes per day</Typography>
                    <Typography><strong>Germination Days:</strong> {plantType.germination_days}</Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
} 