
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name, email, balance: 0 }));
    navigate('/dashboard');
  };

  return (
    <Card className="w-[370px] max-w-[95%] glass shadow-lg border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-light text-gray-900 mb-1" role='heading'>Criar Conta</CardTitle>
        <CardDescription className="text-gray-500 font-normal">
          Preencha seus dados para começar a usar o banco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-gray-700">Nome</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50 text-gray-900"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 text-gray-900"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-gray-700">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 text-gray-900"
            />
          </div>
          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-all">
            Criar Conta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
