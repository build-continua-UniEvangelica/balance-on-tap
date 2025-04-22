
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionModal from './TransactionModal';
import { CreditCard, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      navigate('/');
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
    
    // Atualizar localStorage
    localStorage.setItem('transactions', JSON.stringify([newTransaction, ...transactions]));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...user, balance: newBalance }));
    
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full max-w-[800px] p-4">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">R$ {balance.toFixed(2)}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => {
            setTransactionType('credit');
            setIsModalOpen(true);
          }}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Adicionar Crédito
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            setTransactionType('debit');
            setIsModalOpen(true);
          }}
        >
          <WalletCards className="mr-2 h-4 w-4" />
          Realizar Débito
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  {transaction.type === 'credit' ? (
                    <CreditCard className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <WalletCards className="mr-2 h-4 w-4 text-blue-500" />
                  )}
                  <span>
                    {transaction.type === 'credit' ? 'Crédito' : 'Débito'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={
                      transaction.type === 'credit'
                        ? 'text-green-500'
                        : 'text-blue-500'
                    }
                  >
                    R$ {transaction.amount.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-center text-gray-500">
                Nenhuma transação realizada
              </p>
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
