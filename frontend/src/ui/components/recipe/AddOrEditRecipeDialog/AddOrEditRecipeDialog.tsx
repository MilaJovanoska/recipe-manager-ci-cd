import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from '@mui/material';
import recipeApi from '../../../../api/recipeApi.ts';
import type {
    CreateOrUpdateRecipeRequest,
    RecipeDifficulty,
    RecipeResponse,
} from '../../../../api/types/recipe.ts';
import useCategories from '../../../../hooks/useCategories.ts';
import useSnackbar from '../../../../hooks/useSnackbar.ts';

interface AddOrEditRecipeDialogProps {
    open: boolean;
    recipe: RecipeResponse | null;
    onClose: () => void;
    onSubmit: (recipe: CreateOrUpdateRecipeRequest) => Promise<void>;
}

const initialFormData: CreateOrUpdateRecipeRequest = {
    name: '',
    description: '',
    categoryId: 0,
    preparationTime: 1,
    difficulty: 'EASY',
    servings: 1,
    ingredients: '',
    instructions: '',
    imageUrl: '',
};

const difficultyOptions: RecipeDifficulty[] = ['EASY', 'MEDIUM', 'HARD'];

const AddOrEditRecipeDialog = ({
                                   open,
                                   recipe,
                                   onClose,
                                   onSubmit,
                               }: AddOrEditRecipeDialogProps) => {
    const [formData, setFormData] =
        useState<CreateOrUpdateRecipeRequest>(initialFormData);
    const [detailsLoading, setDetailsLoading] = useState<boolean>(Boolean(recipe));
    const [saving, setSaving] = useState<boolean>(false);

    const { categories, loading: categoriesLoading } = useCategories();
    const { showSnackbar } = useSnackbar();

    const isEditMode = Boolean(recipe);

    useEffect(() => {
        if (!open || !recipe) {
            return;
        }

        let active = true;

        const loadRecipeDetails = async () => {
            try {
                const response = await recipeApi.findWithDetailsById(recipe.id);
                const recipeDetails = response.data;

                if (active) {
                    setFormData({
                        name: recipeDetails.name,
                        description: recipeDetails.description,
                        categoryId: recipeDetails.category.id,
                        preparationTime: recipeDetails.preparationTime,
                        difficulty: recipeDetails.difficulty,
                        servings: recipeDetails.servings,
                        ingredients: recipeDetails.ingredients,
                        instructions: recipeDetails.instructions,
                        imageUrl: recipeDetails.imageUrl ?? '',
                    });
                }
            } catch {
                if (active) {
                    showSnackbar('Failed to load recipe details.', 'error');
                }
            } finally {
                if (active) {
                    setDetailsLoading(false);
                }
            }
        };

        void loadRecipeDetails();

        return () => {
            active = false;
        };
    }, [open, recipe, showSnackbar]);

    const handleTextChange =
        (field: keyof Pick<
            CreateOrUpdateRecipeRequest,
            'name' | 'description' | 'ingredients' | 'instructions' | 'imageUrl'
        >) =>
            (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setFormData((previousFormData) => ({
                    ...previousFormData,
                    [field]: event.target.value,
                }));
            };

    const handleNumberChange =
        (field: keyof Pick<
            CreateOrUpdateRecipeRequest,
            'categoryId' | 'preparationTime' | 'servings'
        >) =>
            (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setFormData((previousFormData) => ({
                    ...previousFormData,
                    [field]: Number(event.target.value),
                }));
            };

    const handleDifficultyChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((previousFormData) => ({
            ...previousFormData,
            difficulty: event.target.value as RecipeDifficulty,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const request: CreateOrUpdateRecipeRequest = {
            ...formData,
            imageUrl: formData.imageUrl?.trim() ? formData.imageUrl : undefined,
        };

        setSaving(true);

        try {
            await onSubmit(request);
            onClose();
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {isEditMode ? 'Edit Recipe' : 'Add Recipe'}
            </DialogTitle>

            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {detailsLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack spacing={2}>
                            <TextField
                                label="Name"
                                value={formData.name}
                                onChange={handleTextChange('name')}
                                required
                                fullWidth
                            />

                            <TextField
                                label="Description"
                                value={formData.description}
                                onChange={handleTextChange('description')}
                                required
                                fullWidth
                                multiline
                                minRows={2}
                            />

                            <TextField
                                label="Category"
                                value={formData.categoryId}
                                onChange={handleNumberChange('categoryId')}
                                required
                                fullWidth
                                select
                                disabled={categoriesLoading}
                            >
                                <MenuItem value={0} disabled>
                                    Select category
                                </MenuItem>

                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: '1fr 1fr 1fr',
                                    },
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Preparation time"
                                    type="number"
                                    value={formData.preparationTime}
                                    onChange={handleNumberChange('preparationTime')}
                                    required
                                    fullWidth
                                />

                                <TextField
                                    label="Difficulty"
                                    value={formData.difficulty}
                                    onChange={handleDifficultyChange}
                                    required
                                    fullWidth
                                    select
                                >
                                    {difficultyOptions.map((difficulty) => (
                                        <MenuItem key={difficulty} value={difficulty}>
                                            {difficulty}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Servings"
                                    type="number"
                                    value={formData.servings}
                                    onChange={handleNumberChange('servings')}
                                    required
                                    fullWidth
                                />
                            </Box>

                            <TextField
                                label="Ingredients"
                                value={formData.ingredients}
                                onChange={handleTextChange('ingredients')}
                                required
                                fullWidth
                                multiline
                                minRows={4}
                            />

                            <TextField
                                label="Instructions"
                                value={formData.instructions}
                                onChange={handleTextChange('instructions')}
                                required
                                fullWidth
                                multiline
                                minRows={5}
                            />

                            <TextField
                                label="Image URL"
                                value={formData.imageUrl ?? ''}
                                onChange={handleTextChange('imageUrl')}
                                fullWidth
                            />
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} disabled={saving}>
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            saving ||
                            detailsLoading ||
                            categoriesLoading ||
                            formData.categoryId === 0
                        }
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddOrEditRecipeDialog;