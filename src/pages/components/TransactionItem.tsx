import { css } from "@emotion/react";
import { useState } from "react";
import type {
  Categories,
  Transaction,
} from "../../ui-transactions-challenge-kit/TransactionAPI";
import { TransactionHeader } from "./TransactionHeader";
import { TransactionMoreInfo } from "./TransactionMoreInfo";

export function TransactionItem({
  transaction,
  categories,
  updateCategory,
  updateMemo,
}: {
  transaction: Transaction;
  categories: Categories;
  updateCategory: (transactionId: string, categoryId: string) => Promise<void>;
  updateMemo: (transactionId: string, memo: string) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTransactionClick = () => setIsOpen((prev) => !prev);
  return (
    <div css={styles.transactionItem}>
      <TransactionHeader
        transaction={transaction}
        categories={categories}
        onClick={handleTransactionClick}
        isOpen={isOpen}
      />
      {isOpen && (
        <TransactionMoreInfo
          transaction={transaction}
          categories={categories}
          updateCategory={updateCategory}
          updateMemo={updateMemo}
        />
      )}
    </div>
  );
}

const styles = {
  transactionItem: css`
    border: 1px solid #f1f1f1;
    box-shadow: #f1f1f1;
  `,
};
