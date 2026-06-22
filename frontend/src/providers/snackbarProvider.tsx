import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';
import SnackbarContext, { type SnackbarSeverity } from '../contexts/snackbarContext.ts';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'success') => {
        setState({
            open: true,
            message,
            severity,
        });
    }, []);

    const handleClose = useCallback(() => {
        setState((previousState) => ({
            ...previousState,
            open: false,
        }));
    }, []);

    const value = useMemo(
        () => ({
            showSnackbar,
        }),
        [showSnackbar],
    );

    return (
        <SnackbarContext.Provider value={value}>
            {children}

            <Snackbar
                open={state.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={state.severity} onClose={handleClose}>
                    {state.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;