import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumerologyProfile } from "@/utils/numerology";
import { BIRTH_DAY_READINGS, getLayeredLifePathReading } from "@/utils/interpretations";
import { PaywallModal } from "@/components/ui/paywall-modal";
import { ReadingDrawer } from "@/components/reading/reading-drawer";
import { TabNavigation } from "@/components/ui/tab-navigation";

// Tap Components
import { BlueprintTab } from "@/components/dashboard/tabs/BlueprintTab";
import { ForecastTab } from "@/components/dashboard/tabs/ForecastTab";
import { DestinyMatrixTab } from "@/components/dashboard/tabs/DestinyMatrixTab";
import { ConnectTab } from "@/components/dashboard/tabs/ConnectTab";

interface DashboardProps {
    profile: NumerologyProfile;
}

export type UserTier = 'FREE' | 'BASIC' | 'INFINITY';

export const Dashboard = ({ profile }: DashboardProps) => {
    const [userTier, setUserTier] = useState<UserTier>('FREE');
    const [compatibilityChecksUsed, setCompatibilityChecksUsed] = useState(0);
    const [showAnalysisPaywall, setShowAnalysisPaywall] = useState(false);
    const [activeTab, setActiveTab] = useState("Blueprint");

    // Reading Drawer State
    const [drawerState, setDrawerState] = useState<{
        isOpen: boolean;
        type: 'lifePath' | 'birthDay' | null;
    }>({ isOpen: false, type: null });

    // Load user status from local storage
    useEffect(() => {
        // 1. Check for Stripe redirect success
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        const tier = params.get('tier') as UserTier;

        if (sessionId && tier) {
            // In a real app, you would verify the session on the backend here.
            // For now, we'll trust the redirect and update the tier.
            setUserTier(tier);
            localStorage.setItem('numerio_user_tier', tier);
            if (tier === 'BASIC') {
                setCompatibilityChecksUsed(0);
                localStorage.setItem('numerio_compatibility_checks_used', '0');
            }
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 2. Load from localStorage
        const savedTier = localStorage.getItem('numerio_user_tier') as UserTier;
        const savedChecks = localStorage.getItem('numerio_compatibility_checks_used');

        if (savedTier) {
            setUserTier(savedTier);
        } else {
            // Check for legacy infinity pass
            const legacyPremium = localStorage.getItem('numerio_infinity_pass');
            if (legacyPremium === 'true') {
                setUserTier('INFINITY');
                localStorage.setItem('numerio_user_tier', 'INFINITY');
            }
        }

        if (savedChecks) {
            setCompatibilityChecksUsed(parseInt(savedChecks, 10));
        }
    }, []);

    const handleUnlockInfinity = useCallback(() => {
        setUserTier('INFINITY');
        localStorage.setItem('numerio_user_tier', 'INFINITY');
        setShowAnalysisPaywall(false);
    }, []);

    const handleUnlockBasic = useCallback(() => {
        setUserTier('BASIC');
        localStorage.setItem('numerio_user_tier', 'BASIC');
        setCompatibilityChecksUsed(0); // Reset or set initial
        localStorage.setItem('numerio_compatibility_checks_used', '0');
        setShowAnalysisPaywall(false);
    }, []);

    const handleIncrementChecks = useCallback(() => {
        if (userTier === 'BASIC') {
            const newVal = compatibilityChecksUsed + 1;
            setCompatibilityChecksUsed(newVal);
            localStorage.setItem('numerio_compatibility_checks_used', newVal.toString());
        }
    }, [compatibilityChecksUsed, userTier]);

    // Derived flags
    const isPremium = userTier === 'INFINITY';
    const canAccessCompatibility = userTier === 'INFINITY' || (userTier === 'BASIC' && compatibilityChecksUsed < 2);

    const handleOpenReading = useCallback((type: 'lifePath' | 'birthDay') => {
        setDrawerState({ isOpen: true, type });
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleShowPaywall = useCallback(() => {
        setShowAnalysisPaywall(true);
    }, []);

    // Derived Data for Drawer
    const birthDayReading = BIRTH_DAY_READINGS[profile.birthDayNumber] || BIRTH_DAY_READINGS[1];

    // Layered Reading Logic
    const layeredLifePathReading = getLayeredLifePathReading(
        profile.lifePathNumber,
        profile.birthMonthNumber,
        profile.birthDayNumber
    );

    const currentReading = drawerState.type === 'birthDay' ? birthDayReading : layeredLifePathReading;
    const currentReadingNumber = drawerState.type === 'birthDay' ? profile.birthDayNumber : profile.lifePathNumber;

    // Title Logic
    let currentReadingTitle = "";
    if (drawerState.type === 'birthDay') {
        currentReadingTitle = `The Archetype of the ${birthDayReading.archetype}`;
    } else {
        // Safe access for layered reading
        const lpArchetype = layeredLifePathReading.layer1_lifePath.archetype;
        currentReadingTitle = `The Path of the ${lpArchetype}`;
    }

    const TABS = ["Blueprint", "Forecast", "Destiny Matrix", "Compatibility"];

    return (
        <div className="min-h-screen relative z-10 pb-20">
            <PaywallModal
                isOpen={showAnalysisPaywall}
                onClose={() => setShowAnalysisPaywall(false)}
                onUnlockBasic={handleUnlockBasic}
                onUnlockInfinity={handleUnlockInfinity}
                title="Unlock Full Analysis"
                description="Dive deep into your shadow work, challenge interpretations, and compatibility scores."
            />

            <ReadingDrawer
                isOpen={drawerState.isOpen}
                onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
                reading={currentReading}
                number={currentReadingNumber}
                title={currentReadingTitle}
                isPremium={isPremium}
                onUnlock={handleShowPaywall}
            />

            <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="w-full max-w-6xl mx-auto px-4 md:px-8">

                {/* Header Spacer */}
                <div className="h-12" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "Blueprint" && (
                            <BlueprintTab
                                profile={profile}
                                onOpenReading={handleOpenReading}
                                isPremium={isPremium}
                                onShowPaywall={handleShowPaywall}
                                onTabChange={setActiveTab}
                            />
                        )}

                        {activeTab === "Forecast" && (
                            <ForecastTab
                                profile={profile}
                                isPremium={isPremium}
                                onShowPaywall={handleShowPaywall}
                            />
                        )}

                        {activeTab === "Destiny Matrix" && (
                            <DestinyMatrixTab
                                profile={profile}
                                isPremium={isPremium}
                                onShowPaywall={handleShowPaywall}
                            />
                        )}

                        {activeTab === "Compatibility" && (
                            <ConnectTab
                                isUnlocked={isPremium || (userTier === 'BASIC' && compatibilityChecksUsed < 2)}
                                userTier={userTier}
                                checksUsed={compatibilityChecksUsed}
                                onIncrementChecks={handleIncrementChecks}
                                onUnlock={handleShowPaywall}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
