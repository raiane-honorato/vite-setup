import { css } from "@emotion/react";
import { format } from "date-fns";
import { useRef } from "react";
import type {
  Categories,
  Transaction,
} from "../../ui-transactions-challenge-kit/TransactionAPI";

export function TransactionHeader({
  transaction,
  categories,
  onClick,
  isOpen,
}: {
  transaction: Transaction;
  categories: Categories;
  onClick: () => void;
  isOpen: boolean;
}) {
  const hasMemo = transaction.memo !== null && transaction.memo !== "";
  const buttonRef = useRef(null);

  const formattedDate = format(
    new Date(transaction.accrualDate),
    "MMM dd, HH:MM",
  );
  const formattedAmount = (transaction.amountInCents / 100).toLocaleString([], {
    style: "currency",
    currency: "USD",
  });
  return (
    <div
      css={styles.transactionHeader}
      onClick={() =>
        buttonRef.current && (buttonRef.current as HTMLButtonElement).click()
      }
      aria-expanded={isOpen}
      aria-controls={`${transaction.id}-more-info`}
    >
      <div>
        <button
          onClick={(e) => {
            onClick();
            e.stopPropagation();
          }}
          css={styles.transactionTitle}
          ref={buttonRef}
        >
          <h3>{transaction.merchant.name}</h3>
        </button>
        <div css={styles.additionalInfo}>
          <span>{formattedDate}</span>
          <span>{categories?.[transaction.categoryId].name}</span>
          <span>{transaction.captureMethod}</span>
        </div>
      </div>
      <div css={styles.amountMemoContainer}>
        <h4>{formattedAmount}</h4>
        {hasMemo && <span css={styles.memoIcon}>M</span>}
      </div>
    </div>
  );
}

const styles = {
  transactionHeader: css`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  `,
  transactionTitle: css`
    background: none;
    border: none;
  `,
  additionalInfo: css`
    display: flex;
    gap: 10px;
    color: grey;
  `,
  amountMemoContainer: css`
    display: flex;
    gap: 20px;
    align-items: center;
  `,
  memoIcon: css`
    padding: 5px;
    background-color: #ff673e;
    color: white;
    border-radius: 4px;
  `,
};
