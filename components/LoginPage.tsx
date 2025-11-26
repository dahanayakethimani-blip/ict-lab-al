import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Smartphone, Lock, ArrowRight, Chrome, AlertCircle } from 'lucide-react';
import { ConfirmationResult } from 'firebase/auth';

interface LoginPageProps {
    onBack?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInWithPhone } = useAuth();
    const [mode, setMode] = useState<'login' | 'register' | 'phone'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            if (mode === 'login') {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const result = await signInWithPhone(phone);
            setConfirmationResult(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmationResult) return;
        try {
            setLoading(true);
            setError(null);
            await confirmationResult.confirm(otp);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-8">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mb-6 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to Home
                        </button>
                    )}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-500 dark:text-gray-400">Sign in to continue to ICT Lab</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            <Chrome className="w-5 h-5" />
                            Continue with Google
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode('login')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'login' || mode === 'register'
                                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Email
                            </button>
                            <button
                                onClick={() => setMode('phone')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'phone'
                                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Phone
                            </button>
                        </div>

                        {(mode === 'login' || mode === 'register') && (
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
                                >
                                    {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                    >
                                        {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {mode === 'phone' && (
                            <div className="space-y-4">
                                {!confirmationResult ? (
                                    <form onSubmit={handlePhoneSignIn} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                                                    placeholder="+94 77 123 4567"
                                                />
                                            </div>
                                        </div>
                                        <div id="recaptcha-container"></div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-brand-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
                                        >
                                            {loading ? 'Sending Code...' : 'Send Verification Code'}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Verification Code</label>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-center text-2xl tracking-widest text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                                                placeholder="123456"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                                        >
                                            {loading ? 'Verifying...' : 'Verify & Sign In'}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setConfirmationResult(null)}
                                            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            Change Phone Number
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
