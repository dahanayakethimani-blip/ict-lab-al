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
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span>ICT Lab <span className="text-blue-500">A/L</span></span>
                </div>
                <button
                    onClick={onGetStarted}
                    className="px-6 py-2.5 bg-slate-900 border border-slate-700 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
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
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider mb-6">
                            GRADE 12 & 13 SYLLABUS
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Master A/L ICT with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Interactive Simulations
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Experience a new way of learning. Visualize complex concepts, practice with real-world scenarios, and track your progress towards exam success.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onGetStarted}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 rounded-full font-bold text-lg shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors text-slate-300">
                                View Syllabus
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 py-20 bg-slate-900/50 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to excel</h2>
                        <p className="text-slate-400">Comprehensive tools covering the entire A/L ICT curriculum</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Cpu className="text-orange-400" />}
                            title="Logic & CPU Simulators"
                            desc="Build circuits and visualize the Fetch-Execute cycle in real-time."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Code className="text-blue-400" />}
                            title="Python & Web Lab"
                            desc="Write and execute Python code, HTML, and CSS directly in the browser."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Network className="text-green-400" />}
                            title="Network Designer"
                            desc="Design network topologies and practice subnetting calculations."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={<Database className="text-purple-400" />}
                            title="SQL Playground"
                            desc="Master database queries and normalization with interactive exercises."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-400" />}
                            title="IoT Systems"
                            desc="Simulate smart home sensors and actuators with visual feedback."
                            delay={0.5}
                        />
                        <FeatureCard
                            icon={<BrainCircuit className="text-pink-400" />}
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
            <footer className="relative z-10 py-12 border-t border-slate-800 bg-slate-950 text-center text-slate-500 text-sm">
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
        className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 transition-all group"
    >
        <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-800">
            {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
);

const StatItem = ({ value, label }: { value: string, label: string }) => (
    <div>
        <div className="text-4xl md:text-5xl font-black text-white mb-2">{value}</div>
        <div className="text-slate-500 font-medium uppercase tracking-wider text-xs">{label}</div>
    </div>
);

export default LandingPage;
