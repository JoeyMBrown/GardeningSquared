import React from 'react';
import { 
    Card, 
    CardContent, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Typography, 
    Divider,
    IconButton,
    Box
} from '@mui/material';
import { Link } from '@inertiajs/react';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function GardenListCard({ gardens }) {
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    My Gardens
                </Typography>
                
                <List sx={{ width: '100%' }}>
                    {gardens.map((garden, index) => (
                        <React.Fragment key={garden.id}>
                            <ListItem 
                                alignItems="flex-start"
                                secondaryAction={
                                    <IconButton 
                                        edge="end" 
                                        component={Link} 
                                        href={route('gardens.show', garden.id)}
                                    >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                }
                                sx={{ 
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                                component={Link}
                                href={route('gardens.show', garden.id)}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#2E7D32' }}>
                                        <GrassIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            {garden.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                                            {garden.address ? (
                                                <>
                                                    <Typography component="span" variant="body2" color="text.primary">
                                                        {garden.address.street_address}
                                                        {garden.address.unit_number && `, Unit ${garden.address.unit_number}`}
                                                    </Typography>
                                                    <Typography component="span" variant="body2" display="block">
                                                        {garden.address.city}, {garden.address.state_province_region} {garden.address.postal_code}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    No address specified
                                                </Typography>
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < gardens.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))}
                </List>
                
                {gardens.length === 0 && (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        You don't have any gardens yet. Create your first garden to get started!
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
} 