import { useCallback, useEffect, useState } from 'react';
import categoryApi from '../api/categoryApi.ts';
import type { CategoryResponse } from '../api/types/category.ts';
import useSnackbar from './useSnackbar.ts';

interface UseCategoriesResult {
    categories: CategoryResponse[];
    loading: boolean;
    fetchCategories: () => Promise<void>;
}

const useCategories = (): UseCategoriesResult => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { showSnackbar } = useSnackbar();

    const fetchCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await categoryApi.findAll();
            setCategories(response.data);
        } catch {
            showSnackbar('Failed to load categories.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    useEffect(() => {
        let active = true;

        const loadCategories = async () => {
            try {
                const response = await categoryApi.findAll();

                if (active) {
                    setCategories(response.data);
                }
            } catch {
                if (active) {
                    showSnackbar('Failed to load categories.', 'error');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadCategories();

        return () => {
            active = false;
        };
    }, [showSnackbar]);

    return {
        categories,
        loading,
        fetchCategories,
    };
};

export default useCategories;