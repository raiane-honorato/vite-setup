import { css } from "@emotion/react";
import { TransactionItem } from "./components/TransactionItem";
import { useGetCategories } from "./hooks/useGetCategories";
import { useGetTransactions } from "./hooks/useGetTransactions";
const YOUR_TRANSACTIONS = "Your transactions";
export function Transactions() {
  const { transactionsState, updateCategory, updateMemo } =
    useGetTransactions();

  const categoriesState = useGetCategories();
  const categories = categoriesState.categories;

  if (transactionsState.isLoading || categoriesState.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (
    transactionsState.showError ||
    categoriesState.showError ||
    transactionsState.transactions == null ||
    categories == null
  ) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1 css={styles.title}>{YOUR_TRANSACTIONS}</h1>
      <ul css={styles.transactionsList}>
        {Object.entries(transactionsState?.transactions).map(
          ([transactionId, transaction]) => (
            <li key={transactionId}>
              <TransactionItem
                transaction={transaction}
                categories={categories}
                updateCategory={updateCategory}
                updateMemo={updateMemo}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

const styles = {
  title: css`
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
  `,
  transactionsList: css`
    font-family: Arial, Helvetica, sans-serif;
    list-style: none;
  `,
};
