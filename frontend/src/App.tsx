import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RecipesProvider from './providers/recipesProvider.tsx';
import SnackbarProvider from './providers/snackbarProvider.tsx';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/home/HomePage/HomePage.tsx';

const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline />

            <SnackbarProvider>
                <RecipesProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </RecipesProvider>
            </SnackbarProvider>
        </BrowserRouter>
    );
};

export default App;