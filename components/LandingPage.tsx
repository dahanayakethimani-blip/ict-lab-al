import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Cpu,
    Code,
    Network,
    Database,
    BookOpen,
    Zap,
    BrainCircuit,
    Globe,
    Terminal
} from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-100 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span>ICT Lab <span className="text-brand-500">A/L</span></span>
                </div>
                <button
                    onClick={onGetStarted}
                    className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold tracking-wider mb-6">
                            GRADE 12 & 13 SYLLABUS
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
                            Master A/L ICT with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                                Interactive Simulations
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Experience a new way of learning. Visualize complex concepts, practice with real-world scenarios, and track your progress towards exam success.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onGetStarted}
                                className="w-full sm:w-auto px-8 py-4 bg-brand-500 rounded-full font-bold text-lg text-white shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <button className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                View Syllabus
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 py-20 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Everything you need to excel</h2>
                        <p className="text-gray-500 dark:text-gray-400">Comprehensive tools covering the entire A/L ICT curriculum</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Cpu className="text-orange-500" />}
                            title="Logic & CPU Simulators"
                            desc="Build circuits and visualize the Fetch-Execute cycle in real-time."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Code className="text-blue-500" />}
                            title="Python & Web Lab"
                            desc="Write and execute Python code, HTML, and CSS directly in the browser."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Network className="text-green-500" />}
                            title="Network Designer"
                            desc="Design network topologies and practice subnetting calculations."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={<Database className="text-purple-500" />}
                            title="SQL Playground"
                            desc="Master database queries and normalization with interactive exercises."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-500" />}
                            title="IoT Systems"
                            desc="Simulate smart home sensors and actuators with visual feedback."
                            delay={0.5}
                        />
                        <FeatureCard
                            icon={<BrainCircuit className="text-pink-500" />}
                            title="AI & Neural Nets"
                            desc="Understand the basics of Artificial Intelligence and Machine Learning."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <StatItem value="100%" label="Syllabus Coverage" />
                    <StatItem value="50+" label="Interactive Labs" />
                    <StatItem value="1000+" label="Practice Questions" />
                    <StatItem value="24/7" label="AI Tutor Support" />
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>&copy; 2025 ICT Lab. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all group"
    >
        <div className="w-12 h-12 bg-gray-50 dark:bg-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gray-100 dark:border-gray-800">
            {React.cloneElement(icon as React.ReactElement, { size: 24 } as any)}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
);

const StatItem = ({ value, label }: { value: string, label: string }) => (
    <div>
        <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">{value}</div>
        <div className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-xs">{label}</div>
    </div>
);

export default LandingPage;
