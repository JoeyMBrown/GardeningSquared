import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
    BottomNavigation, 
    BottomNavigationAction, 
    styled 
} from '@mui/material';
import { 
    Home as HomeIcon,
    Spa as SpaIcon,
    Yard as YardIcon,
    AccountCircle as AccountIcon,
} from '@mui/icons-material';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

export default function MobileNavigation() {
    const [value, setValue] = useState(0);
    
    // Set the active tab based on current route
    useEffect(() => {
        const path = window.location.pathname;
        
        if (path.includes('/gardens')) {
            setValue(1);
        } else if (path.includes('/plants')) {
            setValue(2);
        } else if (path.includes('/profile')) {
            setValue(3);
        } else if (path.includes('/dashboard')) {
            setValue(0);
        }
    }, []);

    return (
        <StyledBottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction 
                component={Link} 
                href="/dashboard" 
                label="Home" 
                icon={<HomeIcon />} 
            />
            <BottomNavigationAction 
                component={Link} 
                href="/gardens" 
                label="Gardens" 
                icon={<YardIcon />} 
            />
            <BottomNavigationAction 
                component={Link} 
                href="#" 
                label="Plants" 
                icon={<SpaIcon />} 
            />
            <BottomNavigationAction 
                component={Link} 
                href="/profile" 
                label="Profile" 
                icon={<AccountIcon />} 
            />
        </StyledBottomNavigation>
    );
} 