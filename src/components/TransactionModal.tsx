
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  type: 'credit' | 'debit';
}

const TransactionModal = ({ isOpen, onClose, onConfirm, type }: TransactionModalProps) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onConfirm(value);
      setAmount('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-light text-gray-900">
            {type === 'credit' ? 'Adicionar Crédito' : 'Realizar Débito'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-gray-50 text-gray-900"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}
              className="rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={type === 'credit'
                ? 'bg-gray-900 text-white rounded-md hover:bg-gray-800'
                : 'bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300'}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
