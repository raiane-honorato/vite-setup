import { useEffect, useState } from "react";
import {
  getCategories,
  type Categories,
} from "../../ui-transactions-challenge-kit/TransactionAPI";

export interface CategoriesState {
  isLoading: boolean;
  showError: boolean;
  categories: Categories | null;
}

const initialState: CategoriesState = {
  isLoading: false,
  showError: false,
  categories: null,
};

export function useGetCategories() {
  const [categoriesState, setCategoriesState] =
    useState<CategoriesState>(initialState);

  useEffect(() => {
    async function getData() {
      try {
        setCategoriesState({
          ...initialState,
          isLoading: true,
          showError: false,
        });
        const res = await getCategories();
        setCategoriesState({
          ...initialState,
          isLoading: false,
          categories: res,
        });
      } catch (e) {
        setCategoriesState({ ...initialState, showError: true });
      }
    }
    getData();
  }, []);

  return categoriesState;
}
