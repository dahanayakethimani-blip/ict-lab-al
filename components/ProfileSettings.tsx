import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Mail, Shield, Moon, Sun, Camera, Save } from 'lucide-react';

const ProfileSettings: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        // In a real app, this would update the user profile in Firebase
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and personal details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 p-[3px] mx-auto">
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 overflow-hidden">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.email?.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors shadow-lg">
                                <Camera size={18} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.displayName || 'User'}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user?.email}</p>

                        <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium border border-brand-100 dark:border-brand-900/30 mx-auto w-fit">
                            <Shield size={14} />
                            <span>Student Account</span>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isEditing
                                        ? 'bg-brand-500 text-white hover:bg-brand-600'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {isEditing ? <Save size={16} /> : null}
                                {isEditing ? 'Save Changes' : 'Edit Details'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Email address cannot be changed.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h3>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10 text-purple-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">Appearance</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {theme === 'dark' ? 'Dark mode is enabled' : 'Light mode is enabled'}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                Toggle Theme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
