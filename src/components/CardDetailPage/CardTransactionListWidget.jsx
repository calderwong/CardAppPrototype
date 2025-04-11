import React from 'react';
import TransactionList from "@/components/TransactionList";

function CardTransactionListWidget({ transactions, rewardsRate }) {
  return (
    <div className="mt-8 lg:mt-10">
      <TransactionList 
        transactions={transactions} 
        rewardsRate={rewardsRate} 
      />
    </div>
  );
}

export default CardTransactionListWidget;
