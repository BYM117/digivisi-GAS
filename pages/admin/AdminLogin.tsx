
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { auth } from '../../firebase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
            <Lock className="text-brand-black" size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">DIGIVISI Admin</h1>
        <p className="text-neutral-500 text-center mb-8 text-sm">Firebase 관리자 계정으로 로그인하세요.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
             <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full border border-neutral-300 p-3 rounded focus:outline-none focus:border-brand-black transition-colors mb-4"
              placeholder="admin@email.com"
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full border border-neutral-300 p-3 rounded focus:outline-none focus:border-brand-black transition-colors"
              placeholder="Password"
            />
            {error && <p className="text-brand-red text-xs mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-brand-black text-white py-3 rounded font-bold hover:bg-neutral-800 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
            <a href="/" className="text-xs text-neutral-400 hover:text-black">← 메인 홈페이지로 돌아가기</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;