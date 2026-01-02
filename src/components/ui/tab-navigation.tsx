import { motion } from "framer-motion";

interface TabNavigationProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/20 border-b border-white/5 mb-8">
            <div className="max-w-6xl mx-auto px-4 py-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={`
                                    relative px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300
                                    ${isActive ? 'text-black font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
