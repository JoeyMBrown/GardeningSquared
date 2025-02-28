import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    CardActionArea
} from '@mui/material';

export default function PlantTypeCard({ 
    plantType, 
    onSelect, 
    isSelected 
}) {
    return (
        <Card 
            sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: isSelected ? '2px solid' : '1px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                boxShadow: isSelected ? 3 : 1
            }}
        >
            {plantType.is_in_garden && (
                <Chip
                    label="In Garden"
                    color="primary"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1
                    }}
                />
            )}
            
            <CardActionArea 
                onClick={() => onSelect(plantType)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <CardMedia
                    component="img"
                    height="100"
                    image={plantType.image_url || 'https://via.placeholder.com/300x100?text=No+Image'}
                    alt={plantType.name}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1, pt: 1 }}>
                    <Typography 
                        variant="subtitle2" 
                        component="div" 
                        sx={{ 
                            fontWeight: isSelected ? 'bold' : 'medium',
                            color: isSelected ? 'primary.main' : 'inherit',
                            textAlign: 'center',
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }
                        }}
                    >
                        {plantType.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
} 