import { css } from "@emotion/react";
import { useState } from "react";
import type {
  Categories,
  Transaction,
} from "../../ui-transactions-challenge-kit/TransactionAPI";

const TRANSACTION_TYPE = "Transaction type";
const MERCHANT_ADDRESS = "Merchant address";
const MERCHANT_NAME = "Merchant name";
const WEBSITE = "Website";
const CATEGORY = "Category";
const DETAILS = "Details";
const MEMO = "Memo";
const SAVE = "Save";
const NO_MEMO = "No memo for this transaction";

export function TransactionMoreInfo({
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
  const initialMemo = transaction.memo;
  const initialCategory = categories[transaction.categoryId];
  const [memo, setMemo] = useState(initialMemo);
  const [category, setCategory] = useState(initialCategory);

  const hasMemoChanged = memo !== initialMemo;
  const hasCategoryChanged = category.id !== initialCategory.id;

  const hasStateChanged = hasMemoChanged || hasCategoryChanged;

  function handleSave() {
    if (hasMemoChanged) {
      updateMemo(transaction.id, memo ?? "");
    }
    if (hasCategoryChanged) {
      updateCategory(transaction.id, category.id);
    }
  }

  return (
    <div css={styles.moreInfoContainer} id={`${transaction.id}-more-info`}>
      <section css={styles.sectionContainer}>
        <h5 css={styles.sectionTitle}>{DETAILS}</h5>
        <div css={styles.infoItem}>
          <span>{TRANSACTION_TYPE}</span>
          <span>{transaction.captureMethod}</span>
        </div>
        <div css={styles.infoItem}>
          <span>{MERCHANT_ADDRESS}</span>
          <span>{transaction.merchant.address}</span>
        </div>
        <div css={styles.infoItem}>
          <span>{MERCHANT_NAME}</span>
          <span>{transaction.merchant.name}</span>
        </div>
        <div css={styles.infoItem}>
          <span>{WEBSITE}</span>
          <a css={styles.website} href={transaction.merchant.website}>
            {transaction.merchant.website}
          </a>
        </div>
        <div css={styles.infoItem}>
          <span>{CATEGORY}</span>

          <select
            name="select"
            value={category.id}
            onChange={(e) => setCategory(categories[e.target.value])}
            css={styles.categorySelector}
          >
            {Object.entries(categories).map(([id, category]) => (
              <option value={category.id} key={id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section css={styles.sectionContainer}>
        <h5 css={styles.sectionTitle}>{MEMO}</h5>
        {
          <textarea
            css={styles.memoInput}
            value={memo ?? NO_MEMO}
            onChange={(e) => setMemo(e.target.value)}
          />
        }
        <button
          css={styles.saveBtn}
          onClick={handleSave}
          disabled={!hasStateChanged}
        >
          {SAVE}
        </button>
      </section>
    </div>
  );
}

const styles = {
  moreInfoContainer: css`
    background-color: #f1f1f1;
    padding: 1.5rem;
    display: flex;
    gap: 1.5rem;
  `,
  sectionContainer: css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  `,
  sectionTitle: css`
    margin: 0;
    margin-bottom: 1rem;
    color: #a0a0a0;
    text-transform: uppercase;
  `,
  infoItem: css`
    display: flex;
    justify-content: space-between;

    > span:first-child {
      font-weight: bold;
    }
  `,
  website: css`
    color: #ff673e;
    font-weight: bold;
    text-decoration: none;
  `,
  categorySelector: css`
    padding: 5px;
    background: none;
    border: none;
    color: #ff673e;
    font-size: 1rem;
    font-weight: bold;
  `,
  memoInput: css`
    background-color: #f1f1f1;
    border: none;
    min-height: 80px;
  `,
  saveBtn: css`
    background-color: #ff673e;
    width: 100px;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 5px;
    cursor: pointer;

    &:disabled {
      background-color: grey;
      cursor: auto;
    }
  `,
};
