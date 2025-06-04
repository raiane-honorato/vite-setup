import { useEffect, useState } from "react";
import {
  getTransactions,
  setTransactionCategory,
  setTransactionMemo,
  type Transactions,
} from "../../ui-transactions-challenge-kit/TransactionAPI";

interface TransactionsState {
  isLoading: boolean;
  showError: boolean;
  transactions: Transactions | null;
}

const initialState: TransactionsState = {
  isLoading: false,
  showError: false,
  transactions: null,
};

export function useGetTransactions() {
  const [transactionsState, setTransactionsState] =
    useState<TransactionsState>(initialState);

  const [categoryChangeState, setCategoryChangeState] = useState({
    isLoading: false,
    isError: false,
  });

  const [memoChangeState, setMemoChangeState] = useState({
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        setTransactionsState({
          ...initialState,
          isLoading: true,
          showError: false,
        });
        const res = await getTransactions();
        setTransactionsState({
          ...initialState,
          isLoading: false,
          transactions: res,
        });
      } catch (e) {
        setTransactionsState({ ...initialState, showError: true });
      }
    }
    getData();
  }, []);

  async function updateCategory(transactionId: string, categoryId: string) {
    try {
      setCategoryChangeState({ isLoading: true, isError: false });
      const newTransaction = await setTransactionCategory(
        transactionId,
        categoryId,
      );

      setTransactionsState((prev) => ({
        ...prev,
        isLoading: false,
        transactions: {
          ...prev.transactions,
          [transactionId]: newTransaction,
        },
      }));
      setCategoryChangeState({ isLoading: false, isError: false });
    } catch (e) {
      setCategoryChangeState({ isLoading: false, isError: true });
    }
  }

  async function updateMemo(transactionId: string, memo: string) {
    try {
      setMemoChangeState({ isLoading: true, isError: false });
      const newTransaction = await setTransactionMemo(transactionId, memo);

      setTransactionsState((prev) => ({
        ...prev,
        isLoading: false,
        transactions: {
          ...prev.transactions,
          [transactionId]: newTransaction,
        },
      }));
      setMemoChangeState({ isLoading: false, isError: false });
    } catch (e) {
      setMemoChangeState({ isLoading: false, isError: true });
    }
  }

  return {
    transactionsState,
    updateCategory,
    updateMemo,
    categoryChangeState,
    memoChangeState,
  };
}
