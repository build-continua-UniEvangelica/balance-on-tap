
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, WalletCards } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionModal from './TransactionModal';

export interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('credit');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData = JSON.parse(user);
    setBalance(userData.balance || 0);
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, [navigate]);

  const handleTransaction = (amount: number) => {
    const newBalance = transactionType === 'credit' ? balance + amount : balance - amount;
    const newTransaction = {
      type: transactionType,
      amount,
      date: new Date().toISOString(),
    };
    
    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    localStorage.setItem('transactions', JSON.stringify([newTransaction, ...transactions]));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...user, balance: newBalance }));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full max-w-[400px] md:max-w-[600px] mx-auto">
      <Card className="bg-white/60 glass border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle role="heading" className="text-base font-semibold text-gray-700">Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-light text-gray-900 select-none" data-testid="balance">R$ {balance.toFixed(2)}</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md"
          onClick={() => {
            setTransactionType('credit');
            setIsModalOpen(true);
          }}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Crédito
        </Button>
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-md"
          onClick={() => {
            setTransactionType('debit');
            setIsModalOpen(true);
          }}
        >
          <WalletCards className="mr-2 h-4 w-4" />
          Débito
        </Button>
      </div>
      <Card className="glass border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-700">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-2 py-2 bg-white/30 rounded-md text-sm"
              >
                <div className="flex items-center">
                  {transaction.type === 'credit' ? (
                    <CreditCard className="mr-2 h-4 w-4 text-gray-900" />
                  ) : (
                    <WalletCards className="mr-2 h-4 w-4 text-gray-500" />
                  )}
                  <span className="font-normal">
                    {transaction.type === 'credit' ? 'Crédito' : 'Débito'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                  data-testid="transaction-amount"
                    className={
                      transaction.type === 'credit'
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }
                  >
                    R$ {transaction.amount.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-center text-gray-400">Nenhuma transação realizada</p>
            )}
          </div>
        </CardContent>
      </Card>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleTransaction}
        type={transactionType}
      />
    </div>
  );
};

export default Dashboard;
