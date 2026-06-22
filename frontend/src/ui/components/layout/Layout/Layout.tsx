import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <Header />

            <Container maxWidth="lg" className="layout-content">
                <Outlet />
            </Container>
        </div>
    );
};

export default Layout;