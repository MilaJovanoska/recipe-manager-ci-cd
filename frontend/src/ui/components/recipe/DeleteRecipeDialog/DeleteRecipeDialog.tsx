import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import type { RecipeResponse } from '../../../../api/types/recipe.ts';

interface DeleteRecipeDialogProps {
    open: boolean;
    recipe: RecipeResponse | null;
    onClose: () => void;
    onDelete: () => Promise<void>;
}

const DeleteRecipeDialog = ({
                                open,
                                recipe,
                                onClose,
                                onDelete,
                            }: DeleteRecipeDialogProps) => {
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleDelete = async () => {
        setDeleting(true);

        try {
            await onDelete();
            onClose();
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onClose={deleting ? undefined : onClose} fullWidth maxWidth="sm">
            <DialogTitle>Delete Recipe</DialogTitle>

            <DialogContent>
                <Typography>
                    Are you sure you want to delete the recipe{' '}
                    <strong>{recipe?.name}</strong>?
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={deleting}>
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={() => void handleDelete()}
                    disabled={deleting || !recipe}
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteRecipeDialog;