/**
 * An object containing transaction details
 */
export declare type Transaction = {
  id: string;
  categoryId: string;
  accrualDate: string;
  amountInCents: number;
  merchant: {
    name: string;
    website: string;
    address: string;
  };
  memo: string | null;
  captureMethod: "Online" | "In Person";
};
/**
 * An object containing multiple transactions, keyed by transaction ID
 */
export declare type Transactions = {
  [id: string]: Transaction;
};
/**
 * An object containing category id and name
 */
export declare type Category = {
  id: string;
  name: string;
};
/**
 * An object containing multiple categories, keyed by category ID
 */
export declare type Categories = {
  [id: string]: Category;
};
/**
 * Fetch all transactions
 *
 * Returns a promise that resolves with the transactions
 */
export declare function getTransactions(): Promise<Transactions>;
/**
 * Fetch all categories
 *
 * Returns a promise that resolves with the categories
 */
export declare function getCategories(): Promise<Categories>;
/**
 * Update the category of a transaction
 *
 * @param transactionId ID of transaction to update
 * @param categoryId ID of category to set for transaction
 *
 * Returns a promise that resolves with the updated transaction
 */
export declare function setTransactionCategory(
  transactionId: string,
  categoryId: string,
): Promise<Transaction>;
/**
 * Update the memo of a transaction
 *
 * @param transactionId ID of transaction to update
 * @param memo String to use for the transaction memo
 *
 * Returns a promise that resolves with the updated transaction
 */
export declare function setTransactionMemo(
  transactionId: string,
  memo: string,
): Promise<Transaction>;
