import { NumberReading } from "@/types/numerology";

// Deterministic Random Helper (Pseudo-random based on date + number)
// Ensures the same user sees the same 'random' variant for the whole day, but it changes tomorrow.
const getVariantIndex = (seedNumber: number, dateString: string, variantCount: number): number => {
    let hash = 0;
    const combined = `${dateString}-${seedNumber}`;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % variantCount;
};

// MULTI-VARIANT DAILY READINGS
// Each number has multiple "flavors" of the same core energy to prevent repetition.
// Flavors: 
// 1. Behavioral (Action-oriented)
// 2. Shadow (Warning/Psychological)
// 3. Strategic (Business/Power)
// 4. Emotional (Internal state)
export const DAILY_ENERGY_VARIANTS: Record<number, Array<{ meaning: string; opportunity: string; challenge: string }>> = {
    1: [
        { // Behavioral
            meaning: "A high-velocity day of ego assertions. The universe is rewarding boldness, not politeness. If you've been waiting for a sign to launch, speak up, or quit—this is it. Today is for the 'Self,' not the group.",
            opportunity: "Push your agenda. The door is open, but it will slam shut if you hesitate.",
            challenge: "Arrogance. You may trample on others in your rush to get to the front."
        },
        { // Shadow
            meaning: "Today brings a sharp, isolating energy. You may feel a sudden, intense need to sever ties or prove you don't need anyone. This is your independence kicking in overdrive.",
            opportunity: "Stand alone. Realize that your reliance on others has been a crutch.",
            challenge: "Alienation. Don't burn a bridge just to see the fire."
        },
        { // Strategic
            meaning: "The market favors the aggressor today. In business or negotiation, the first one to move wins. Passive waiting will be punished. Take the head of the table.",
            opportunity: "Launch the prototype. Send the pitch. Ask for the raise.",
            challenge: "Impulsiveness. Moving fast is good; moving blind is suicide."
        }
    ],
    2: [
        { // Behavioral
            meaning: "A painfully slow day of details and shadows. The energy is thick and emotional. Nothing moves fast today. You are being forced to listen to what is *not* being said.",
            opportunity: "Read the room. Your intuition is sharper than your logic today. Use it.",
            challenge: "Paranoia. Don't invent specific conflict where there is only silence."
        },
        { // Shadow
            meaning: "You are an emotional sponge today. The boundaries between you and others are dissolving. You might feel heavy with feelings that aren't even yours.",
            opportunity: "Diplomacy. You can soothe a beast today just by listening.",
            challenge: "Codependency. Don't say 'yes' just to stop someone else's discomfort."
        },
        { // Strategic
            meaning: "Success today is in the fine print. Do not skim. The devil—and the profit—is in the details. It is a day for negotiation, not war.",
            opportunity: "Find the compromise. The middle ground is where the gold is buried.",
            challenge: "Indecision. Analysis paralysis can cost you the timeline."
        }
    ],
    3: [
        { // Behavioral
            meaning: "A day of social lubrication and creative chaos. The filter is off. You will find it hard to focus on spreadsheets today when your soul wants to perform.",
            opportunity: "Pitch, present, or perform. Your charisma is your currency today.",
            challenge: "Scattering your energy. You might start ten fires and put out none."
        },
        { // Shadow
            meaning: "Your need for validation is screaming today. You might find yourself performing for applause rather than authentic connection. The mask is heavy.",
            opportunity: "Express a raw truth. Use your words to heal, not just to entertain.",
            challenge: "Gossip. Loose lips will sink ships (and reputations) today."
        },
        { // Strategic
            meaning: "The energy is magnetic but unfocused. It's a perfect day for marketing, brainstorming, or networking, but a terrible day for finishing administrative tasks.",
            opportunity: "Sell the vision. People are buying *you* today, not the product.",
            challenge: "Superficiality. Don't promise what you can't deliver just to be liked."
        }
    ],
    4: [
        { // Behavioral
            meaning: "A 'reality check' day. The universe is auditing your life. If you have been skipping details, today is the bill. It's not sexy, but it's necessary.",
            opportunity: "Fix the foundation. Organize the chaos so you don't collapse later.",
            challenge: "Rigidity. Don't snap just because the world feels heavy."
        },
        { // Shadow
            meaning: "You may feel boxed in today. A sense of restriction or heaviness rests on your shoulders. This pressure is meant to turn you into a diamond, not crush you.",
            opportunity: "Discipline. Doing what you *don't* want to do is the path to freedom.",
            challenge: "Stubbornness. Refusing to adapt will cause the structure to break."
        },
        { // Strategic
            meaning: "Day of the Architect. Ignore the noise and look at the blueprints. Is the system working? If not, tear it down and rebuild it right.",
            opportunity: "Systematize. Create a process that works while you sleep.",
            challenge: "Micromanagement. Trust the system, or trust your team. Don't do both jobs."
        }
    ],
    5: [
        { // Behavioral
            meaning: "Disruption imminent. The schedule will break. The universe is shaking the cage to see if you're awake. If you try to stick to the plan, you will suffer.",
            opportunity: "Pivot. A sudden change in rules is a shortcut to better luck.",
            challenge: "Self-destruction. Seeking a thrill just to escape the boredom."
        },
        { // Shadow
            meaning: "Your addiction to 'more' is triggered today. The hunger for new sensation can lead to reckless choices. You are craving freedom, but from what?",
            opportunity: "Adventure. Take a calculated risk that expands your horizon.",
            challenge: "Escapism. Running away isn't the same as moving forward."
        },
        { // Strategic
            meaning: "High volatility. Great for sales, marketing, and agile moves. Terrible for signing 30-year mortgages. Keep your assets liquid today.",
            opportunity: "Network. You can meet a game-changer in the chaos today.",
            challenge: "Inconsistency. Don't change the strategy just because you're bored."
        }
    ],
    6: [
        { // Behavioral
            meaning: "You are called home. The focus forces you back to the tribe, the family, and the heavy obligations of love. You are the caretaker today.",
            opportunity: "Heal a relationship. The energy supports deep, honest reconciliation.",
            challenge: "Martyrdom. Don't play the victim just because you're helping."
        },
        { // Shadow
            meaning: "The shadow of control acts up today. You may feel a compulsive need to 'fix' everyone around you, confusing your anxiety with care.",
            opportunity: "Beautify. Fix the environment, not the people.",
            challenge: "Judging. Acceptance is the only way to peace today."
        },
        { // Strategic
            meaning: "Service is the strategy. Today, you win by helping others win. It is a day regarding loyalty, contracts, and long-term customer care.",
            opportunity: "Nurture the client. A small act of care secures loyalty forever.",
            challenge: "Over-giving. Ensure the exchange of value is fair."
        }
    ],
    7: [
        { // Behavioral
            meaning: "A day of isolation. You feel alien to the world. The noise of society grates on your nerves. It's a day to unplug and go into the cave.",
            opportunity: "Deep work. You can solve complex problems if you shut the door.",
            challenge: "Cynicism. Don't mistake your need for solitude as hatred for others."
        },
        { // Shadow
            meaning: "Paranoia and over-analysis. Your mind is a razor blade today, cutting everything into pieces. You might be looking for a lie that isn't there.",
            opportunity: "Research. Dive into the data/truth until you hit the bottom.",
            challenge: "Disconnect. You cannot think your way out of a feeling."
        },
        { // Strategic
            meaning: "Strategy over execution. Do not build today; plan. Look at the data, the trends, and the hidden variables. Trust your skepticism.",
            opportunity: "Strategic review. Find the flaw in the plan before launch.",
            challenge: "Analysis Paralysis. At some point, you have to trust and act."
        }
    ],
    8: [
        { // Behavioral
            meaning: "A 'Boss' day. Money, power, and authority are on the table. The universe asks: 'What are you worth?' Do not undervalue yourself today.",
            opportunity: "Closing the deal. Ask for the money. The answer is likely yes.",
            challenge: "Greed. Winning at all costs will cost you your soul."
        },
        { // Shadow
            meaning: "You feel the weight of the crown. The drive for success might feel like a crushing pressure to prove your existence through material results.",
            opportunity: "Empowerment. Step up and take responsibility for the outcome.",
            challenge: "Bullying. Authority is not the same as domination."
        },
        { // Strategic
            meaning: "ROI day. Focus purely on return on investment. If it doesn't make money or sense, cut it. Emotions have no place on the balance sheet today.",
            opportunity: "Maximize efficiency. Leverage your resources for a bigger gain.",
            challenge: "Materialism. Don't forget the human cost of the profit."
        }
    ],
    9: [
        { // Behavioral
            meaning: "A day of emotional purging. The cycle is ending. You may feel a sudden urge to clean, quit, or cry. Let it go. The baggage is too heavy.",
            opportunity: "Release. Throw out the old files, clothes, and grudges.",
            challenge: "Clinging. If you hold on to what is dead, you rot with it."
        },
        { // Shadow
            meaning: "Grief and loss are near the surface. You are feeling the collective pain of the world. It is a day of heavy compassion, but also potential drama.",
            opportunity: "Philanthropy. Give something away to break the stagnation.",
            challenge: "Despair. The end is just the space for a new beginning."
        },
        { // Strategic
            meaning: "Wrap it up. Do not start the new campaign today. Focus on delivery, completion, and exit strategies. Clear the desk.",
            opportunity: "Completion. Finishing the project feels better than starting it.",
            challenge: "Impracticality. Don't dream about tomorrow while today is burning."
        }
    ],
    11: [
        { // Behavioral
            meaning: "High-Voltage Tension. You are a radio antenna picking up static from the future. Great ideas come with anxiety. Ground yourself.",
            opportunity: "Breakthrough insight. A solution appears out of thin air.",
            challenge: "Nervous breakdown. The energy is too high for your body."
        },
        { // Shadow
            meaning: "Illumination vs Delusion. You see things others don't, but are they real? The line between genius and madness is thin today.",
            opportunity: "Inspire. Your words can light up a room today.",
            challenge: "Preaching. Don't force your truth on those not ready to hear it."
        }
    ],
    22: [
        { // Behavioral
            meaning: "The Master Builder. It's time to build the empire. The vision is massive, but the work is manual. Stop dreaming and start laying cement.",
            opportunity: "Building legacy. Today's work will last for decades.",
            challenge: "Overwhelm. The mountain looks too high to climb."
        },
        { // Strategic
            meaning: "Scale. Think bigger. Whatever you are planning, double it. You have the power to manifest global systems today.",
            opportunity: "Organizational mastery. Connect the dream to the deadline.",
            challenge: "Rigidity. Don't let the plan crush the people."
        }
    ]
};

// Getter that selects a variant based on the DATE
export const getDailyReading = (dayNumber: number, dateString: string = new Date().toISOString().split('T')[0]): { meaning: string; opportunity: string; challenge: string } => {
    const variants = DAILY_ENERGY_VARIANTS[dayNumber] || DAILY_ENERGY_VARIANTS[1];
    const index = getVariantIndex(dayNumber, dateString, variants.length);
    return variants[index];
};

export const MONTH_INFLUENCES: Record<number, string> = {
    1: "You approach life with a relentless, self-contained engine of ambition that rarely asks for permission. There is a part of you that always feels 'on,' constantly scanning the horizon for the next mountain to climb, even when you are supposedly resting.",
    2: "You navigate the world with a heightened emotional radar, picking up on the unspoken currents in every room you enter. This sensitivity isn't weakness; it's a strategic tool allowing you to influence outcomes through subtle diplomacy and connection rather than brute force.",
    3: "You possess a need for self-expression that feels as vital as breathing, often struggling if you cannot externalize your vivid inner world. Your charm is a protective mechanism; you use humor and lightness to keep people engaged while guarding the deeper, more complex emotions you carry.",
    4: "You find comfort in the tangible and the proven, often feeling a low-level anxiety when life lacks a clear structure or plan. You are the quiet anchor in any storm, possessing a stamina for detail and routine that others find exhausting but you find grounding.",
    5: "You carry a restless spirit that equates routine with a slow death, constantly seeking the dopamine hit of a new experience or idea. This adaptability makes you a chameleon, able to thrive in chaos, though you sometimes struggle to stay long enough to harvest what you've planted.",
    6: "You bear a heavy, often self-imposed burden of responsibility for the well-being of everyone around you. Your love language is 'fixing,' and you struggle to detach from the problems of your loved ones, often blurring the line between support and control.",
    7: "You are a natural observer who processes life through a filter of deep analysis, often feeling like an outsider looking in. You require periods of distinctive solitude to recharge, as your mind is constantly hunting for the 'why' behind the surface-level 'what.'",
    8: "You have an innate understanding of power dynamics and a drive for material mastery that pushes you to take charge even when you don't intend to. You fear vulnerability, preferring to show your love through provision and protection rather than messy emotional displays.",
    9: "You view the world through a wide-angle lens, feeling a sense of compassion and obligation that extends far beyond your immediate circle. You are prone to carrying the weight of the world, struggling to let go of past hurts because you feel everything so deeply and permanently.",
    10: "You possess a regenerative quality that allows you to start over with fresh enthusiasm, no matter how many times you've been knocked down. You carry an air of authority that is felt rather than announced, and you thrive only when you are the captain of your own ship.",
    11: "You operate on a high-voltage frequency, often feeling a nervous tension between your visionary intuition and the practical world. You pick up on cosmic downloads and future trends before they happen, which can make you feel misunderstood or ahead of your time.",
    12: "You are a natural creative catalyst who finds wisdom through the joy of living and connecting with others. You have a tendency to play the therapist or the entertainer, sometimes hiding your own critical need for validation behind a mask of sunny optimism."
};

export const DAY_NUANCES: Record<number, string> = {
    1: "You have an allergic reaction to being managed or told what to do, driven by a fierce need to imprint your unique identity on everything you touch. You are often the one who steps into the void when others hesitate, trusting your gut over the manual every single time.",
    2: "You are a natural diplomat who can sense a conflict brewing before a word is spoken, often absorbing the emotions of those around you like a sponge. Your challenge is distinguishing your own feelings from the ones you've unknowingly picked up from others.",
    3: "You possess a sparkle that demands an audience, feeling physically drained if you are forced to bottle up your creativity or voice. You use your quick wit as a shield, deflecting heavy emotions with humor to keep the atmosphere—and your heart—light.",
    4: "You examine the world through a lens of 'does this work?', possessing a frustration with inefficiency that makes you the most reliable person in the room. You show you care by showing up, fixing the leak, and paying the bill, not by writing poetry.",
    5: "You are a sensory hunter, constantly scanning your environment for the new, the exciting, and the unspoken. You have a fear of missing out that drives you to overcommit, fueled by a deep-seated belief that freedom is more important than security.",
    6: "Your home is an extension of your soul, and you feel a physical disruption when your environment or relationships are out of harmony. You often over-give to earn love, struggling to accept that you don't need to be useful to be worthy.",
    7: "You carry a private, mystical inner world that you rarely share completely, leading others to perceive you as mysterious or aloof. You require deep dives into specific subjects to feel grounded; surface-level knowledge feels like a lie to you.",
    8: "You have a finely tuned radar for value and quality, instinctively knowing how to maximize resources and organize chaos into success. You often hide your soft, sentimental heart behind a suit of armor made of competence and achievement.",
    9: "You are driven by a vague but powerful sense of mission, often feeling a compassionate detachment that allows you to help many but let few close. You have a dramatic flair and a tendency to hold onto the past, struggling to accept that some chapters must close.",
    10: "You vibrate with an intensity that can be intimidating, possessing a 'double dose' of willpower that pushes you to dominate any field you choose. You are an all-or-nothing player; you don't see the point in playing a game you don't intend to win.",
    11: "You are a lightning rod for inspiration, frequently overwhelmed by nervous energy and intuitive hits that act as a direct line to the collective unconscious. You must learn to ground this voltage, or you risk burning out from the sheer intensity of your own potential.",
    12: "You move through life with an artistic flair, using your creativity not just as a hobby, but as a necessary release valve for your complex emotions. You can be prone to mood swings, needing to learn that your vulnerability is actually the source of your magnetism.",
    13: "You are the breaker of chains, constantly deconstructing old systems and beliefs to build something truer in their place. This path is not easy; you adhere to a rigorous work ethic and often face drastic makeovers of your life that leave you stronger but changed.",
    14: "You are a thrill-seeker who learns through direct experience, often taking risks that others deem unnecessary just to feel the rush of being alive. You struggle with moderation, needing to learn that true freedom involves checking the map once in a while.",
    15: "You possess a magnetic charm that draws people to you, often finding yourself in positions of influence without trying. You are deeply devoted to your loved ones but can be prone to smothering them, needing to learn that love involves letting go.",
    16: "You are a seeker of deep truths who often learns through sudden insights that shatter your previous worldview. You have a piercing intellect that can see through facades instantly, making it impossible for others to lie to you without you knowing.",
    17: "You have a mind for business and a soul for spirit, capable of managing large-scale projects while maintaining a visionary outlook. You are ambitious and determined, often rising to positions of authority where your sound judgment is relied upon.",
    18: "You are a humanitarian with a broad perspective, often torn between your desire to serve the world and your need for personal recognition. You have a complex emotional nature and can be prone to charitable causes that border on self-sacrifice.",
    19: "You are a pioneer who insists on learning life's lessons firsthand, often refusing help until you've exhausted every other option. Once you surrender your need to do it all alone, your natural warmth and leadership align to inspire everyone around you.",
    20: "You are a peacemaker who thrives in partnership, often feeling like half a soul until you find your counterpart or community. You are gentle and tactful, but you can be prone to indecisiveness, needing to learn to trust your own quiet voice.",
    21: "You are a creative socialite who finds success through charm, communication, and connecting with diverse groups of people. You have a 'lucky' quality that seems to smooth obstacles, but you must avoid scattering your energy on too many superficial pursuits.",
    22: "You are a master builder with big dreams and the practical genius to execute them, often feeling a heavy pressure to achieve something monumental. You bridge the gap between the visionary and the concrete, turning 'impossible' ideas into structures that last.",
    23: "You are a quick-silver thinker who loves change and variety, often possessing a talent for words that can talk anyone into anything. You are adaptable and resilient, but you need to watch out for a tendency to run away when things get emotionally heavy.",
    24: "You are the ultimate nurturer, creating a 'family' dynamic in every group you join and feeling responsible for the emotional safety of others. You are loyal to a fault, sometimes staying in situations longer than you should because you swore you wouldn't give up.",
    25: "You are a spiritual detective who requires solitude to process your deep, intuitive thoughts and discover the hidden mechanics of reality. You can seem distant or critical, but this is simply your way of protecting your highly sensitive inner core.",
    26: "You are a powerhouse of practical capability, balancing a strong drive for financial success with a deep commitment to family and home. You are a generous provider, but you need to ensure you aren't trying to buy love or control outcomes with your resources.",
    27: "You are a compassionate leader who seeks to uplift others, often finding yourself in the role of counselor or spiritual guide. You have a broad, open-minded view of the world, but you can be prone to dramatic emotional highs and lows.",
    28: "You are a fiercely independent non-conformist who prefers to lead the charge rather than follow the herd. You are ambitious and direct, often achieving great success once you learn to temper your aggression with a little bit of patience.",
    29: "You are a high-frequency intuitive with a massive capacity for spiritual connection, often feeling like a bridge between this world and the next. You can be prone to extreme nervous tension and need a peaceful environment to function at your best.",
    30: "You are a joyous creator who brings light and optimism into any room, often using your artistic talents to express what words cannot. You are essentially a 'social' creative, thriving on the feedback and energy of an audience.",
    31: "You are a practical visionary who combines the creative spark of the 3 with the grounded leadership of the 1. You are organized and disciplined in your creativity, often building solid structures around your artistic or community-based ideas."
};

export const LIFE_PATH_READINGS: Record<number, NumberReading> = {
    1: {
        archetype: "The Wounded Warrior",
        essence: "You carry a specific terror that most people don't understand: the fear that if you're not first, you're nothing. This isn't arrogance—it's a wound so deep you've built your entire personality around it. You learned early, probably before you could articulate it, that the world rewards winners and forgets everyone else. So you decided you would never be forgotten.\n\nHere's what you won't admit: your relentless drive isn't confidence—it's compensation. You push so hard because stopping feels like dying. You refuse help not because you don't need it, but because needing anything feels like weakness, and weakness feels like annihilation. You've confused independence with safety, and now you're exhausted but can't stop running.\n\nThe pattern you keep repeating: You start strong, dominate the field, achieve the goal... and then feel empty. Because the achievement was never the point—the point was proving you matter. But external validation is a drug that wears off faster each time. You're chasing a feeling that can only come from within, but you're looking for it everywhere else.",
        light: [
            "You possess a raw, primal life force that can move mountains when properly channeled.",
            "Your ability to start from zero and build something real is genuinely rare.",
            "You have the courage to stand alone when everyone else is sitting down.",
            "Your resilience isn't just impressive—it's your superpower. You get knocked down and get up faster than anyone.",
            "When you finally trust someone enough to let them in, your loyalty is absolute and fierce."
        ],
        shadow: [
            "You push people away before they can leave you, then feel lonely and blame them for not trying harder.",
            "You mistake aggression for strength and vulnerability for weakness, which keeps you isolated.",
            "You're so focused on being 'right' that you'd rather win the argument than save the relationship.",
            "You have a hair-trigger temper that you justify as 'passion' but is really just fear dressed up as anger.",
            "You secretly believe that if you're not in control, everything will fall apart—so you never let go, and you never rest."
        ],
        love: "Let's be honest about your relationship pattern: You're attracted to strong people, but the moment they show real strength (by disagreeing with you or having their own needs), you feel threatened. You say you want a partner, but what you really want is a fan. Someone who admires your achievements but doesn't ask you to be emotionally available.\n\nHere's the uncomfortable truth: You've never actually been vulnerable with anyone. You've been naked, you've been passionate, you've even been 'committed'—but you've never let someone see you weak, confused, or afraid. You think that's protecting the relationship, but it's actually killing it. Intimacy requires surrender, and surrender feels like death to you.\n\nThe person you need isn't someone who will 'let you lead'—that's just another person you'll eventually resent for being weak. You need someone strong enough to call you on your bullshit, secure enough to not need your approval, and patient enough to wait for you to finally drop the armor. When you find them, your instinct will be to run. Don't. That discomfort is growth.",
        career: "You're reading this thinking 'I already know I'm supposed to be the boss'—but here's what you don't know: Your need to be in charge is sabotaging you. You've turned down opportunities because they required collaboration. You've burned bridges because someone dared to give you feedback. You've stayed in situations below your potential because at least there you could be the smartest person in the room.\n\nThe pattern: You start something, dominate it, get bored, blow it up, and start over. You tell yourself you're 'entrepreneurial' but really you're just afraid of being in something long enough for people to see your weaknesses. You'd rather be a big fish in a small pond than risk being average in a bigger game.\n\nWhat you actually need: A challenge so big it humbles you. A project that requires you to ask for help. A team that's better than you at specific things. Your growth isn't in being the boss—it's in being the boss who's secure enough to hire people smarter than them. The day you can celebrate someone else's success without making it about you is the day you become an actual leader instead of just a dictator with a vision.",
        soulLesson: "Your soul didn't come here to prove you're better than everyone—it came here to discover that you don't have to be. The lesson you're avoiding is this: You are inherently valuable, not because of what you achieve, but because you exist. But you'll never believe that until you stop achieving long enough to feel it.\n\nHere's your assignment: Fail at something. Not a strategic failure, not a 'learning experience'—actually fail. Let someone see you cry. Ask for help and mean it. Admit you don't know something. Watch what happens. Spoiler: You don't die. You don't disappear. The people who matter don't leave. And in that moment, you'll discover the thing you've been searching for your whole life: You were always enough. The war is over. You can finally rest."
    },
    2: {
        archetype: "The Invisible Martyr",
        essence: "You learned a devastating lesson early in life: You don't matter unless you're needed. Somewhere along the way—maybe from a parent who only noticed you when you were helpful, maybe from being the 'good child' who kept the peace—you internalized the belief that your value is conditional. So you became indispensable. You became the one who remembers everyone's birthday, who can read a room in seconds, who knows what people need before they ask.\n\nHere's the brutal truth you're avoiding: You're not actually kind—you're strategic. Every act of service is a transaction. You give so you'll be owed. You help so you'll be needed. You're so busy being what everyone else needs that you have no idea who you actually are. And the worst part? You resent them for it. You're furious that no one sees how much you do, but you'd panic if they stopped needing you.\n\nThe pattern you're trapped in: You attract people who take and take and take. You tell yourself you're 'unlucky in love' or 'always the friend, never the priority,' but the truth is darker—you're addicted to being needed by people who can't actually love you back. Because if they could love you without needing you, you'd have to face the terrifying question: What if I'm not actually valuable?",
        light: [
            "Your intuition is genuinely supernatural—you can feel a shift in energy before anyone speaks.",
            "You have a gift for creating harmony in chaos that makes you invaluable in crisis.",
            "Your attention to detail means nothing falls through the cracks when you're involved.",
            "When you finally learn to give from overflow instead of depletion, your generosity is breathtaking.",
            "You possess an emotional intelligence that could heal the world if you'd stop using it to manage everyone else's feelings."
        ],
        shadow: [
            "You say 'I'm fine' when you're dying inside, then resent people for believing you.",
            "You're passive-aggressive as hell—you won't say what you need, but you'll punish people for not reading your mind.",
            "You've confused being nice with being loved, and now you're trapped in relationships where you're useful but not cherished.",
            "You absorb other people's emotions like a sponge, then wonder why you're always exhausted and don't know what you actually feel.",
            "You'd rather silently suffer than risk conflict, which means you've never actually been honest in a relationship."
        ],
        love: "Let's talk about your relationship pattern, because it's painful to watch: You choose people who need fixing. Not consciously—you'd never admit it—but look at your history. Every partner has been emotionally unavailable, damaged, or 'going through something.' You tell yourself you're compassionate, but really, you're just terrified of being with someone who doesn't need you.\n\nHere's what you do: You become their therapist, their mother, their emotional support animal. You anticipate their needs, manage their moods, smooth over their rough edges. And you call this love. But it's not love—it's a hostage situation where you're both the hostage and the captor. You're so busy being indispensable that you never ask yourself: Do I even like this person? Or do I just like being needed?\n\nThe person you actually need would terrify you: Someone who doesn't need you to fix them. Someone who asks 'What do YOU want?' and won't accept 'I don't know' or 'Whatever you want' as an answer. Someone who loves you for who you are, not what you do. When you meet them, every instinct will scream that they're 'not your type.' Good. Your type has been destroying you. Choose differently.",
        career: "You're the person everyone relies on, and you hate it, but you'd die before you'd stop. You're the one who stays late, picks up the slack, remembers the details everyone else forgets. And you're convinced this makes you valuable. It doesn't—it makes you exploited.\n\nHere's your pattern: You take jobs where you're 'helping' people, but really you're just making yourself indispensable so they can't fire you. You don't negotiate your salary because asking for what you're worth feels 'selfish.' You do the work of three people and get paid for one, and you tell yourself it's because you're 'a team player.' No—it's because you're terrified that if you set a boundary, they'll realize they don't actually need you.\n\nWhat you actually need: A role where your value is obvious and non-negotiable. Where you're paid for your insight, not your labor. Where saying 'no' doesn't mean you're difficult—it means you're strategic. Stop being the assistant and become the advisor. Your gift isn't doing—it's seeing. But you'll never be valued for your vision if you're too busy being everyone's secretary.",
        soulLesson: "Your soul's lesson is the hardest one: You have to learn that you matter even when you're not useful. That you're lovable even when you're not giving. That you can rest without earning it. That 'no' is a complete sentence.\n\nHere's your assignment, and it will feel like death: Stop helping. For one week, don't anticipate anyone's needs. Don't smooth over awkward moments. Don't fix anything that isn't yours to fix. Watch what happens. Some people will be annoyed—let them. Some people will step up—let them. And some people will leave—LET THEM. Because the people who only love you when you're useful don't actually love you. They love what you do for them.\n\nThe day you can sit in a room full of people and not feel responsible for their comfort is the day you become free. Your worth isn't in what you give—it's in who you are. And who you are is enough. You always were."
    },
    3: {
        archetype: "The Performing Addict",
        essence: "You learned early that being entertaining is safer than being real. Maybe you were the class clown who deflected bullies with humor. Maybe you were the child who kept the family from falling apart by making everyone laugh. Either way, you discovered a superpower: If you're charming enough, funny enough, creative enough, people won't look too close. And looking too close is what you're terrified of.\n\nHere's what you won't admit: You're not actually happy—you're just really good at performing happiness. You use words like confetti, scattering them everywhere to distract from the emptiness underneath. You've confused being interesting with being loved, and now you're trapped on a stage you can't leave. The applause is the only thing that makes you feel real, but it wears off the second you're alone.\n\nThe pattern you can't escape: You start projects with explosive enthusiasm, dazzle everyone with your vision, then abandon ship the moment it requires sustained effort or gets emotionally heavy. You tell yourself you're 'multi-passionate' but really you're just terrified of committing to anything long enough for people to see that you're not as special as you pretend to be.",
        light: [
            "Your ability to light up a room is genuine magic—people feel better just being near your energy.",
            "You have a gift for seeing beauty and possibility where others see only gray.",
            "Your creativity isn't just a talent—it's a survival skill that's saved you more times than you know.",
            "When you finally let someone see the real you, your vulnerability is more magnetic than any performance.",
            "You possess an emotional range that, if channeled into art, could move thousands."
        ],
        shadow: [
            "You use humor as a weapon to keep people at arm's length while pretending to let them in.",
            "You're addicted to new—new people, new projects, new drama—because the old requires depth you're not ready to give.",
            "You gossip. Not maliciously, but because talking about others is easier than being honest about yourself.",
            "You exaggerate and embellish stories until you can't remember what's true, and that scares you more than you admit.",
            "You'd rather be liked by everyone than loved by anyone, because love requires you to stop performing."
        ],
        love: "Your relationship pattern is exhausting to watch: You're the life of the party, charming and flirtatious, and you attract partners easily. But the moment things get real—the moment someone asks 'How are you really?'—you make a joke, change the subject, or pick a fight. You've never actually let anyone in.\n\nHere's the uncomfortable truth: You don't want a partner—you want an audience. Someone who laughs at your jokes, admires your creativity, and doesn't ask you to sit still long enough to feel your feelings. The second someone stops being entertained and starts being concerned, you label them 'too serious' and move on.\n\nWhat you actually need: Someone who sees through the performance and loves you anyway. Someone who says 'I don't need you to be funny right now, I need you to be honest.' Someone who can handle your darkness without trying to fix it or running away. When you meet them, you'll want to run. Don't. That discomfort is intimacy, and intimacy is what you've been running from your whole life.",
        career: "You're reading this thinking 'I know, I'm creative, I need freedom, blah blah'—but here's what you don't know: Your inability to finish anything is destroying your potential. You have a graveyard of half-finished projects, abandoned dreams, and 'someday' ideas. You tell yourself you're waiting for inspiration, but really you're just afraid of being mediocre.\n\nThe pattern: You start with fireworks, impress everyone with your vision, then disappear when the work gets tedious. You blame 'corporate culture' or 'toxic environments,' but the truth is you've never stayed anywhere long enough to build mastery. You're a professional beginner, and it's keeping you broke and bitter.\n\nWhat you actually need: Discipline. Not the fun kind—the boring, unglamorous kind. Finish one thing. Not perfectly, just completely. Your gift isn't in starting—it's in expressing. But you can't express anything if you're too scattered to complete a thought.",
        soulLesson: "Your soul didn't come here to entertain—it came here to connect. The lesson you're avoiding is this: You are lovable when you're boring. You are valuable when you're sad. You are enough when you're quiet.\n\nHere's your assignment: Sit with someone you love and don't perform. Don't tell a story, don't make them laugh, don't fill the silence. Just be. Watch what happens. Spoiler: They don't leave. They don't get bored. They see you. And that's what you've been terrified of your whole life—being seen without the mask. The day you can be boring and still feel worthy is the day you become free."
    },
    4: {
        archetype: "The Control Addict",
        essence: "You learned a terrifying lesson early: Chaos kills. Maybe your childhood was unstable—financially, emotionally, or both. Maybe you watched someone you love fall apart because they 'didn't have their shit together.' Either way, you internalized a belief that has ruled your life ever since: If I can control everything, I'll be safe. So you built a fortress of routines, systems, and rules. And now you're trapped inside it.\n\nHere's what you won't admit: Your need for order isn't strength—it's fear. You're not disciplined, you're terrified. Every system you build, every plan you make, every detail you obsess over is a desperate attempt to prevent the chaos you're convinced is coming. And the worst part? You judge everyone who doesn't live this way. You call them 'irresponsible' or 'flaky,' but really you're just jealous of their freedom.\n\nThe pattern you're stuck in: You work yourself to exhaustion building something 'secure,' then resent everyone who isn't working as hard. You tell yourself you're being responsible, but really you're just afraid to stop moving because stopping means feeling, and feeling means facing the terror underneath all this control.",
        light: [
            "Your ability to create structure from chaos is genuinely rare and valuable.",
            "When you commit to something, you're the most reliable person in the room—people know you'll deliver.",
            "Your attention to detail saves projects, relationships, and sometimes lives.",
            "You possess a work ethic that, when directed toward something you love, is unstoppable.",
            "Your integrity is unshakeable—you'd rather lose than cheat, and that's increasingly rare."
        ],
        shadow: [
            "You're rigid as hell. Your way is the 'right way,' and anyone who disagrees is wrong, lazy, or both.",
            "You use work as an excuse to avoid intimacy, vulnerability, and anything that can't be controlled.",
            "You're judgmental. You look at people who are 'less responsible' and feel superior, but it's just fear dressed up as virtue.",
            "You'd rather be right than happy, and it's cost you relationships you'll never get back.",
            "You're so focused on the future that you've forgotten how to be present, and life is passing you by."
        ],
        love: "Let's talk about your relationship pattern: You choose partners who are 'a mess' so you can fix them. Or you choose partners who are stable but then criticize them for not being ambitious enough. Either way, you're never satisfied because you're not actually looking for a partner—you're looking for a project or a subordinate.\n\nHere's the brutal truth: You don't know how to love—you only know how to manage. You show love by fixing the car, paying the bills, organizing the house. And when your partner says 'I don't need you to fix me, I need you to hold me,' you have no idea what to do. Emotional intimacy feels like chaos, and chaos is your enemy.\n\nWhat you actually need: Someone who refuses to be managed. Someone who says 'I love you, but I'm not your employee.' Someone who can be messy and still be worthy. When you meet them, you'll want to control them. Don't. That urge is your prison guard. Let them be human, and you might finally learn to be human too.",
        career: "You're the backbone of every organization you join. You're the one who actually does the work while everyone else talks about it. And you're furious about it. You're underpaid, overworked, and convinced that if you just work harder, they'll finally see your value. They won't. Because you've taught them you'll do it anyway.\n\nThe pattern: You take on more than your share, resent everyone who doesn't, then burn out and blame them. You don't delegate because 'no one does it right,' which really means 'I can't let go of control.' You're so busy being indispensable that you've made yourself impossible to promote—because who would do your job if you left?\n\nWhat you actually need: To build systems that work without you. To trust other people. To say 'no' without guilt. Your value isn't in how much you can carry—it's in what you can build. But you'll never build anything great if you're too busy micromanaging the small stuff.",
        soulLesson: "Your soul didn't come here to control everything—it came here to learn that you can't. The lesson you're avoiding is this: Life is inherently chaotic, and trying to control it is making you miserable. Security is an illusion. The only real safety is in accepting uncertainty.\n\nHere's your assignment: Let something be messy. Leave the dishes in the sink. Miss a deadline. Let someone else be in charge. Watch what happens. Spoiler: The world doesn't end. You don't die. And in that moment of letting go, you might finally feel what you've been chasing your whole life: peace. Not the peace of having everything under control, but the peace of accepting that you never did."
    },
    5: {
        archetype: "The Commitment Phobic",
        essence: "You learned early that staying in one place too long is dangerous. Maybe your family moved a lot. Maybe you watched someone you love become trapped in a life they hated. Either way, you internalized a belief that has shaped everything: Freedom is survival. Commitment is death. So you've spent your life running—from jobs, from relationships, from anything that asks you to stay.\n\nHere's what you won't admit: You're not free—you're just afraid to land. Every time you quit, move, or start over, you tell yourself it's because you're 'seeking growth' or 'following your intuition.' But really, you're just running from the terror of being known. Because being known means being seen, and being seen means being vulnerable, and vulnerability feels like a trap.\n\nThe pattern you can't escape: You start something new with explosive enthusiasm. It's perfect, it's exactly what you've been looking for. Then, inevitably, it gets hard or boring or requires commitment. And you panic. You find a flaw, manufacture a crisis, or just disappear. You tell yourself you're 'not settling,' but really you're just terrified of staying long enough to fail.",
        light: [
            "Your adaptability is genuinely superhuman—you can land on your feet in any situation.",
            "You possess a curiosity about life that keeps you young and makes you magnetic.",
            "Your ability to embrace change makes you invaluable in crisis—you don't freeze, you pivot.",
            "When you finally commit to something, your passion is contagious and transformative.",
            "You have stories and experiences that most people only dream about."
        ],
        shadow: [
            "You're unreliable. People learn not to count on you because you'll probably be gone by next month.",
            "You use 'freedom' as an excuse to avoid depth, commitment, and anything that requires you to grow up.",
            "You're addicted to the high of new—new places, new people, new drama—because the old requires you to face yourself.",
            "You judge people who 'settle' for stable lives, but really you're just jealous of their peace.",
            "You've confused movement with progress, and now you're exhausted but no closer to anything real."
        ],
        love: "Your relationship pattern is predictable: You fall fast and hard. It's intense, passionate, perfect. Then, around the 3-6 month mark, you start to feel trapped. They want to meet your friends, talk about the future, or—god forbid—move in together. And you run. You tell yourself they were 'too clingy' or 'not right,' but the truth is darker: You're terrified of being loved.\n\nHere's the uncomfortable truth: You don't actually want freedom—you want the fantasy of it. You want someone who loves you but doesn't need you. Who's there when you want them but disappears when you don't. That's not a relationship—that's a fantasy. And it's keeping you alone.\n\nWhat you actually need: Someone who gives you space but won't let you run. Someone who says 'I see you're scared, and I'm staying anyway.' Someone who's secure enough to not chase you, but present enough to not let you disappear. When you meet them, every instinct will scream to bolt. Don't. That discomfort is intimacy, and intimacy is what you've been running from.",
        career: "You've had more jobs than most people have had first dates. You tell yourself you're 'multi-talented' or 'entrepreneurial,' but really you just can't commit. The pattern is always the same: You start with enthusiasm, impress everyone, then get bored and quit. You blame 'toxic culture' or 'lack of growth,' but the truth is you've never stayed anywhere long enough to build mastery.\n\nHere's what you don't know: Your inability to commit is keeping you broke. You're always starting over, always at the bottom, always 'about to' make it big. But success requires sustained effort, and sustained effort requires commitment, and commitment feels like death to you.\n\nWhat you actually need: To finish something. Not perfectly, just completely. To stay in one place long enough to see the fruits of your labor. Your gift isn't in starting—it's in connecting. But you can't connect anything if you're always leaving.",
        soulLesson: "Your soul didn't come here to run—it came here to learn that you can stay and still be free. The lesson you're avoiding is this: Freedom isn't about having no commitments—it's about choosing your commitments consciously. True freedom is internal, not external.\n\nHere's your assignment: Stay. When every fiber of your being screams to run, stay. When it gets boring, stay. When it gets hard, stay. Watch what happens. Spoiler: You don't die. You don't lose yourself. And on the other side of that discomfort, you might finally find what you've been searching for: a home. Not a place—a feeling. The feeling of being known and loved anyway."
    },
    6: {
        archetype: "The Savior Complex",
        essence: "You learned a devastating lesson early: Your value is in fixing things. Maybe you were the parentified child who took care of everyone. Maybe you watched someone you love suffer and decided you'd never let that happen again. Either way, you internalized a belief that has shaped your entire life: If I can fix everyone, I'll be safe. I'll be loved. I'll matter. So you became the fixer, the helper, the one everyone calls in a crisis. And now you're drowning.\n\nHere's what you won't admit: You don't actually want them to get better. Not consciously—you'd never admit it—but look at your pattern. Every time someone you're 'helping' starts to improve, you find a new problem to fix. Because if they don't need you anymore, what are you? Your identity is so wrapped up in being needed that the thought of someone being okay without you is terrifying.\n\nThe pattern you're trapped in: You attract broken people, fix them just enough to keep them around, then resent them for not appreciating your sacrifice. You call it love, but it's not love—it's control disguised as care. And it's destroying you.",
        light: [
            "Your capacity for unconditional love is genuinely rare—you see potential in people others have given up on.",
            "Your ability to create beauty and harmony in your environment is a gift that heals.",
            "You possess a nurturing energy that makes people feel safe enough to be vulnerable.",
            "When you finally learn to give from overflow instead of depletion, your generosity changes lives.",
            "Your sense of justice and fairness makes you a fierce advocate for those who can't advocate for themselves."
        ],
        shadow: [
            "You're controlling as hell. You call it 'helping,' but really you're just managing everyone's life so you feel needed.",
            "You're self-righteous. You know what's best for everyone, and you'll tell them—whether they asked or not.",
            "You're a martyr. You give and give and give, then resent everyone for not appreciating your sacrifice.",
            "You use guilt as a weapon. 'After all I've done for you' is your favorite phrase.",
            "You've confused fixing people with loving them, and now you can't tell the difference."
        ],
        love: "Let's be honest about your relationship pattern: You don't choose partners—you choose projects. You're attracted to people who are damaged, struggling, or 'going through something.' You tell yourself you're compassionate, but really you're just terrified of being with someone who doesn't need you.\n\nHere's the brutal truth: You don't actually love them—you love being needed by them. You become their therapist, their parent, their savior. And you call this love. But it's not love—it's codependency. You're so busy fixing them that you never ask yourself: Do I even like who they are when they're not broken?\n\nWhat you actually need: Someone who doesn't need fixing. Someone who's whole on their own and chooses you anyway. Someone who says 'I don't need you to save me—I need you to be my equal.' When you meet them, you'll feel bored or unnecessary. Good. That discomfort is what a healthy relationship feels like, and you've been avoiding it your whole life.",
        career: "You're in a 'helping' profession, and you're burned out. You're a teacher, nurse, therapist, social worker—something where you can save people. And you're exhausted, underpaid, and resentful. But you can't leave because 'who would help them if I left?' That's not dedication—that's a savior complex.\n\nThe pattern: You take on more than your share, work yourself to exhaustion, then resent everyone who isn't sacrificing as much. You don't set boundaries because 'they need me,' which really means 'I need to be needed.' You're so busy saving everyone else that you're neglecting yourself, and it's killing you.\n\nWhat you actually need: To let people save themselves. To trust that they're capable. To understand that sometimes the most loving thing you can do is nothing. Your value isn't in how much you sacrifice—it's in who you are. But you'll never believe that until you stop doing long enough to just be.",
        soulLesson: "Your soul didn't come here to save everyone—it came here to learn that you can't. The lesson you're avoiding is this: You are not responsible for other people's happiness, healing, or choices. Your worth is not conditional on your usefulness.\n\nHere's your assignment: Let someone fail. Let someone struggle. Let someone figure it out on their own. Watch what happens. Spoiler: They survive. They grow. They might even thank you for not interfering. And in that moment, you'll discover the thing you've been terrified of your whole life: You are lovable even when you're not fixing anything. You matter even when you're not needed. You are enough just as you are."
    },
    7: {
        archetype: "The Paranoid Genius",
        essence: "You learned early that people are disappointing. Maybe someone you trusted betrayed you. Maybe you watched the adults in your life make stupid, emotional decisions that hurt everyone. Either way, you internalized a belief that has isolated you ever since: The mind is safe. People are not. So you retreated into your head, where you could analyze, understand, and control everything. And now you're alone.\n\nHere's what you won't admit: Your intelligence isn't wisdom—it's a defense mechanism. You use your mind like a fortress, analyzing everything to death so you never have to feel anything. You call it 'being rational,' but really you're just terrified of being vulnerable. You've convinced yourself that you're above the messy, emotional chaos of human connection, but the truth is you're just afraid of it.\n\nThe pattern you can't escape: You meet someone, connect intellectually, then retreat the moment they want emotional intimacy. You tell yourself they're 'not deep enough' or 'too emotional,' but really you're just scared. Because emotional intimacy requires trust, and trust requires vulnerability, and vulnerability feels like death to you.",
        light: [
            "Your ability to see patterns and connections that others miss is genuinely extraordinary.",
            "You possess a depth of thought that, when shared, can change people's entire worldview.",
            "Your need for truth makes you incorruptible—you can't be bought, manipulated, or swayed by popularity.",
            "When you finally trust someone enough to let them in, your loyalty is absolute and your insight invaluable.",
            "You have a direct line to wisdom that most people spend their whole lives searching for."
        ],
        shadow: [
            "You're cynical as hell. You see the worst in everything and call it 'being realistic.'",
            "You use your intelligence as a weapon to make others feel stupid, then wonder why you're alone.",
            "You're so busy analyzing life that you forget to live it—you're the person watching the party from the corner, judging everyone.",
            "You mistake isolation for independence and loneliness for enlightenment.",
            "You'd rather be right than connected, and it's cost you every meaningful relationship you've ever had."
        ],
        love: "Your relationship pattern is painful: You're attracted to people who seem 'deep' or 'different.' You connect intellectually, have amazing conversations, then panic the moment they want more. They want to know how you feel, not just what you think. They want you to be present, not just analyze the relationship. And you can't do it.\n\nHere's the brutal truth: You don't actually want intimacy—you want intellectual companionship. Someone to discuss ideas with, but who doesn't ask you to be emotionally available. That's not a relationship—that's a debate partner. And it's keeping you alone.\n\nWhat you actually need: Someone who refuses to stay in your head. Someone who says 'I don't care what you think about this—I care how you feel.' Someone who's patient enough to wait for you to come out of your fortress, but strong enough to not let you hide there forever. When you meet them, you'll want to intellectualize the connection. Don't. That's your defense mechanism. Feel it instead.",
        career: "You're brilliant at what you do, and you're probably underpaid because you can't network or play politics. You're the specialist, the researcher, the person who solves problems no one else can solve. And you're invisible because you refuse to 'sell yourself' or engage in what you call 'corporate bullshit.'\n\nThe pattern: You do exceptional work, get overlooked for promotions, then resent everyone who's less competent but more social. You tell yourself the system is broken, and maybe it is—but your refusal to engage with it is keeping you stuck.\n\nWhat you actually need: To come out of your cave. To share your insights in a way people can actually hear them. To understand that connection isn't weakness—it's how ideas spread. Your genius is wasted if you're too proud or too scared to share it.",
        soulLesson: "Your soul didn't come here to be right—it came here to learn that being connected is more important than being correct. The lesson you're avoiding is this: The mind can't love. The heart can. And you've been living in your head so long you've forgotten you have a heart.\n\nHere's your assignment: Feel something. Not think about feeling it—actually feel it. Cry. Laugh. Get angry without analyzing why. Let someone see you messy, confused, and human. Watch what happens. Spoiler: You don't lose your intelligence. You don't become stupid. You become whole. And that's what you've been searching for in all those books and theories—wholeness. It was never in your head. It was always in your heart."
    },
    8: {
        archetype: "The Power Addict",
        essence: "You learned a lesson that changed everything: Powerlessness is death. Maybe you grew up poor and watched your family struggle. Maybe you watched someone you love get crushed by the system. Either way, you made a vow: That will never be me. I will never be powerless. So you climbed, fought, and dominated your way to the top. And now you're there, and you're still terrified.\n\nHere's what you won't admit: Your success isn't confidence—it's compensation. You're not building an empire—you're building a fortress against the terror of being ordinary. You equate your net worth with your self-worth, and it's never enough. Because external power can't fix internal fear, but you keep trying anyway.\n\nThe pattern you can't escape: You achieve the goal, feel empty, set a bigger goal. You tell yourself you're ambitious, but really you're just running from the feeling that if you stop achieving, you'll disappear. You've confused being powerful with being safe, and now you can't rest because resting feels like dying.",
        light: [
            "Your ability to manifest material success is genuinely rare—you see opportunities others miss and execute flawlessly.",
            "You possess a natural authority that makes people trust your leadership in crisis.",
            "Your resilience is legendary—you've been knocked down more times than most people have tried, and you always get up.",
            "When you finally use your power for something beyond yourself, you can change entire systems.",
            "You have the capacity to create generational wealth and legacy if you can heal the wound driving you."
        ],
        shadow: [
            "You're ruthless. You'll sacrifice relationships, health, and happiness for success, then wonder why you're lonely.",
            "You use money and status as a weapon to control people and situations.",
            "You're terrified of vulnerability because it feels like weakness, and weakness feels like death.",
            "You judge people by their 'success' and dismiss anyone who doesn't meet your standards.",
            "You've confused being feared with being respected, and now you're surrounded by people who want something from you, not people who actually love you."
        ],
        love: "Your relationship pattern is predictable: You're attracted to people who are either equally powerful (so you can have a 'power couple') or completely dependent (so you can be in control). Either way, you're not actually looking for love—you're looking for a strategic alliance or a subordinate.\n\nHere's the uncomfortable truth: You don't know how to be vulnerable. You show love by providing, protecting, and solving problems. And when your partner says 'I don't need you to fix this—I need you to hold me,' you have no idea what to do. Emotional intimacy feels like powerlessness, and powerlessness is your greatest fear.\n\nWhat you actually need: Someone who doesn't need your money, doesn't fear your power, and doesn't want to compete with you. Someone who says 'I see you're scared, and I love you anyway.' Someone who makes you feel safe enough to finally put down the armor. When you meet them, you'll want to impress them or control them. Don't. That's your wound talking. Just be human with them.",
        career: "You're at the top, or you're clawing your way there. You're the CEO, the founder, the person everyone either admires or fears. And you're exhausted. You work 80-hour weeks, sacrifice your health, and tell yourself it's because you're 'building something.' But really, you're just running from the terror of being ordinary.\n\nThe pattern: You achieve success, feel empty, chase bigger success. You tell yourself 'just one more deal' or 'just one more million,' but it's never enough. Because you're trying to fill an internal void with external achievements, and it doesn't work.\n\nWhat you actually need: To discover that your worth isn't in what you build—it's in who you are. To understand that true power is inner peace, not outer control. To learn that the most powerful thing you can do is rest.",
        soulLesson: "Your soul didn't come here to dominate—it came here to learn that true power is surrender. The lesson you're avoiding is this: You are valuable even when you're not achieving. You are worthy even when you're not in control. You are enough even when you're powerless.\n\nHere's your assignment: Lose something. Not strategically—actually lose. Let someone else win. Admit you don't know. Ask for help. Watch what happens. Spoiler: You don't disappear. You don't become nothing. And in that moment of surrender, you might finally feel what you've been chasing your whole life: peace. Not the peace of having everything under control, but the peace of accepting that you never did."
    },
    9: {
        archetype: "The Suffering Artist",
        essence: "You learned early that you don't quite belong anywhere. Maybe you were different from your family. Maybe you felt like an alien in your own life. Either way, you internalized a belief that has shaped everything: I am here to suffer for something greater. So you became the humanitarian, the artist, the one who feels everything for everyone. And now you're drowning in other people's pain.\n\nHere's what you won't admit: You're addicted to suffering. Not consciously—you'd never say it—but look at your pattern. Every time life gets good, you find a new tragedy to focus on. Every time you heal, you find a new wound. Because suffering makes you feel special, deep, important. Without it, who are you?\n\nThe pattern you can't escape: You fall in love with broken people, broken causes, broken dreams. You tell yourself you're compassionate, but really you're just afraid of being happy. Because happiness feels shallow, and you've built your entire identity around being deep.",
        light: [
            "Your capacity for compassion is genuinely rare—you feel the pain of the world and actually care.",
            "You possess an artistic or creative gift that, when expressed, can heal thousands.",
            "Your ability to see the interconnectedness of all things gives you wisdom beyond your years.",
            "When you finally channel your pain into purpose, you become a force for massive change.",
            "You have the potential to inspire an entire generation if you can stop martyring yourself."
        ],
        shadow: [
            "You're dramatic as hell. Everything is a tragedy, and you're always the victim or the savior.",
            "You're addicted to intensity—if it's not painful or profound, you're not interested.",
            "You hold onto the past like it's a trophy, refusing to let go because your suffering is your identity.",
            "You judge people who are 'shallow' or 'happy,' but really you're just jealous of their peace.",
            "You've confused suffering with depth, and now you can't tell the difference between healing and giving up."
        ],
        love: "Your relationship pattern is exhausting: You fall in love with damaged people who need saving. It's intense, passionate, and doomed. You become their savior, their muse, their reason to live. And when they inevitably can't be saved (because that's not how healing works), you're devastated. Then you find someone new to save.\n\nHere's the brutal truth: You don't want a healthy relationship—you want a tragic love story. You want the intensity, the drama, the feeling of being needed. Because a stable, healthy relationship feels boring, and boring feels like death to you.\n\nWhat you actually need: Someone who's already whole. Someone who doesn't need you to save them or complete them. Someone who says 'I choose you, not because I need you, but because I want you.' When you meet them, you'll feel nothing. No fireworks, no drama, no intensity. Good. That emptiness is what healthy love feels like, and you've been running from it your whole life.",
        career: "You're in a 'meaningful' career—artist, teacher, nonprofit worker, healer. And you're broke, burned out, and resentful. You tell yourself money doesn't matter because you're doing 'important work,' but really you're just afraid of success. Because success would mean you're not suffering anymore, and suffering is your identity.\n\nThe pattern: You create something beautiful, then sabotage it. You get close to success, then pull back. You tell yourself the world isn't ready or the system is broken, but really you're just terrified of being happy and successful because then you'd have to find a new identity.\n\nWhat you actually need: To let go of the past. To forgive. To understand that your worth isn't in your suffering—it's in your joy. To create from overflow, not from wound.",
        soulLesson: "Your soul didn't come here to suffer—it came here to learn that you can be deep without being in pain. The lesson you're avoiding is this: Happiness isn't shallow. Peace isn't boring. And you are allowed to let go.\n\nHere's your assignment: Be happy. Not fake happy—actually happy. Let something good happen and don't sabotage it. Let someone love you without making it complicated. Let yourself succeed without feeling guilty. Watch what happens. Spoiler: You don't become shallow. You don't lose your depth. You become free. And that freedom is what you've been searching for in all that suffering—the freedom to just be."
    },
    11: {
        archetype: "The Anxious Visionary",
        essence: "You were born with your nervous system tuned to a frequency most people can't hear. You pick up on things before they happen. You see patterns in the chaos. You have downloads of insight that feel like they're coming from somewhere else. And it's terrifying. Because no one prepared you for this. No one told you that being a channel for higher wisdom would feel like anxiety, insomnia, and constant overwhelm.\n\nHere's what you won't admit: You're not crazy—you're just ungrounded. Your gift is real, but you don't know how to manage it. So you swing between feeling like you're going insane and feeling like you're the only sane person in a world gone mad. You have something important to share, but you're too scared or too scattered to share it clearly.\n\nThe pattern you can't escape: You get a brilliant insight, feel called to share it, then panic and retreat. You tell yourself you're not ready, or people won't understand, or you need to learn more first. But really, you're just terrified of your own power.",
        light: [
            "Your intuition is genuinely psychic—you know things you have no logical way of knowing.",
            "You have the capacity to inspire massive change through your words, art, or presence.",
            "Your sensitivity, when channeled, is a superpower that can heal and awaken others.",
            "You see possibilities that others can't even imagine.",
            "When you finally trust your vision and ground it, you can change the world."
        ],
        shadow: [
            "You're anxious all the time. Your nervous system is fried from picking up everyone's energy.",
            "You're impractical as hell. You have visions but no idea how to execute them.",
            "You're so sensitive that you take everything personally, which makes you impossible to give feedback to.",
            "You use your 'sensitivity' as an excuse to avoid responsibility or hard work.",
            "You're terrified of your own power, so you play small and then resent everyone who's playing big."
        ],
        love: "You need a partner who can ground you. Someone stable, practical, and patient enough to handle your intensity. But you're attracted to other sensitives, other visionaries, other anxious people. And it's a disaster. Two ungrounded people don't make a grounded relationship—they make chaos.\n\nWhat you actually need: Someone who's your opposite. Someone who says 'That's a beautiful vision—now let's make a plan.' Someone who can hold space for your intensity without being consumed by it.",
        career: "You're meant to inspire, teach, or create. But you're probably working a job that drains you because you're too scared to step into your power. You tell yourself you're not ready, but really you're just afraid of being seen.\n\nWhat you actually need: To ground your vision. To find a mentor who's done what you want to do. To stop waiting for permission and just start.",
        soulLesson: "Your soul came here to be a lighthouse, not a lifeboat. You're here to shine, not to save. The lesson is learning to ground your gifts and trust that you're ready."
    },
    22: {
        archetype: "The Overwhelmed Builder",
        essence: "You were born with the capacity to build empires, but the weight of that potential is crushing you. You see the vision clearly—the massive, world-changing thing you're meant to create. And it terrifies you. Because what if you fail? What if you're not good enough? So you either work yourself to death trying to prove you are, or you do nothing and hate yourself for wasting your potential.\n\nHere's what you won't admit: You're paralyzed by your own potential. The gap between where you are and where you could be is so vast that you don't know where to start. So you either overwork or underachieve, and both are killing you.",
        light: [
            "You have the rare combination of vision and practicality—you can dream big and execute.",
            "Your capacity for work is legendary when you're aligned with your purpose.",
            "You can build things that outlast you and change the world."
        ],
        shadow: [
            "You're either a workaholic or completely paralyzed—there's no middle ground.",
            "You're terrified of your own potential, so you sabotage yourself.",
            "You're so focused on the big picture that you miss the present moment."
        ],
        love: "You are a stable and supportive partner, but you are often married to your mission. You need a partner who supports your grand vision and can manage the home front while you conquer the world. You are loyal and dependable.\n\nYour challenge is balance. Don't let your ambition consume your relationship. Your ideal partner is someone who is your equal in competence but perhaps softer in approach.",
        career: "You are designed for big projects. International business, politics, large-scale construction, philanthropy, or institutional leadership. You can handle huge amounts of stress and responsibility. You are not just building a house; you are building a city.",
        soulLesson: "Your soul came here to build something massive, but first you have to build yourself. The lesson is learning that you don't have to do it all at once. One brick at a time."
    },
    33: {
        archetype: "The Burned Out Healer",
        essence: "You were born to heal the world, and it's killing you. You feel everyone's pain. You take on everyone's problems. You give and give and give until there's nothing left. And then you give more. Because stopping feels selfish, and selfish feels like death.\n\nHere's what you won't admit: You can't save everyone. And trying to is destroying you.",
        light: [
            "Your capacity for unconditional love is genuinely Christ-like.",
            "You have the ability to heal through your presence alone.",
            "When you finally learn to heal yourself first, you can change the world."
        ],
        shadow: [
            "You're a martyr. You suffer for others and resent them for it.",
            "You're so busy saving everyone else that you're neglecting yourself.",
            "You've confused self-sacrifice with love."
        ],
        love: "You love completely and unconditionally. You are the ultimate caretaker. However, you must be careful not to attract 'broken' partners who need saving. You need a relationship where you are fed too.\n\nYou need a partner who is spiritually aligned and supports your mission of service. You create a home that is a sanctuary for all.",
        career: "You are drawn to helping professions on a grand scale. While a 6 helps the family, a 33 helps the village or the world. Teaching, healing, crisis management, or artistic expression that heals.",
        soulLesson: "Your soul's lesson is detachment with love. You must learn to help without suffering. You are learning that by healing yourself, you heal the world. Be the lighthouse, not the lifeboat."
    }
};

export const PERSONAL_YEAR_CYCLES: Record<number, { title: string; phase: string; description: string }> = {
    1: {
        title: "The New Beginning",
        phase: "Cycle Start",
        description: "This is your year of pure potential—the blank canvas, the fresh start, the moment where anything becomes possible. You might feel a restlessness, an urgency to move forward, to create, to become. That's not anxiety; that's life force calling you forward. This year is asking you to be unapologetically focused on your vision. The seeds you plant now—the risks you take, the projects you start, the person you choose to become—these will feed you for the next nine years. This is your time to choose boldly."
    },
    2: {
        title: "The Patience",
        phase: "Patience Phase",
        description: "This is your year of gestation—a time when everything is forming beneath the surface, even though you can't see it yet. You might feel frustrated by the pace, like nothing is happening fast enough. But here's the truth: the most important growth happens in the dark. This year is asking you to trust the process, to focus on relationships and collaboration, to let things develop naturally. If you force it, you'll break it. If you trust it, you'll be amazed by what emerges."
    },
    3: {
        title: "The Expression",
        phase: "Expression Phase",
        description: "This is your year of emergence—when everything you've been building finally breaks through the surface and becomes visible. You might feel a surge of creative energy, a desire to be seen, to share, to express. That's exactly right. This year is asking you to say yes to the invitations, to let yourself be visible, to use your voice. Your words carry extra power right now. Speak your truth, create your art, and watch how the world responds. This is your time to shine."
    },
    4: {
        title: "The Builder",
        phase: "Foundation Phase",
        description: "This is your foundation year—and foundations are where real power lives. You might feel the urge to rush, to skip the details, to escape into something more exciting. But here's what's actually happening: you're building something that will hold the weight of your dreams. The work feels heavy because it matters. Every system you create, every detail you perfect, every 'boring' task you complete—this is you choosing your future over your comfort. By the end of this year, you'll have something solid. Something that lasts."
    },
    5: {
        title: "The Freedom Year",
        phase: "Change Phase",
        description: "This is your year of liberation—and liberation rarely feels comfortable at first. You might experience sudden changes in your job, your home, your relationships, or your entire life direction. Things that felt stable might shift. Plans might change. And here's the truth: this isn't chaos; this is evolution. You're being freed from what no longer fits so you can discover what does. The only way through this year is to stay flexible, trust the process, and remember that change is how life makes space for what you've been asking for."
    },
    6: {
        title: "The Responsibility",
        phase: "Relationship Phase",
        description: "This is your year of service and love—a time when you're being called to show up for the people and commitments that matter most. You might feel the weight of responsibility more than usual, like everyone needs something from you. And here's the truth: this year is asking you to find the joy in service, to discover that love is a verb, not just a feeling. The work you do for your family, your community, your relationships—this is sacred work. Don't resent it. Let it fill you up."
    },
    7: {
        title: "The Inner Journey",
        phase: "Spiritual Phase",
        description: "This is your year of depth—a time to go inward and discover what you actually think, feel, and believe when you're not performing for anyone else. You might feel disconnected from the noise of the world, and that's exactly right. This isn't depression; this is recalibration. You're being called to study, to reflect, to understand yourself at a deeper level. The external world might feel less important this year, and that's okay. You're not falling behind—you're going deeper. The insights you gain now will change everything that comes after."
    },
    8: {
        title: "The Harvest",
        phase: "Harvest Phase",
        description: "This is your year of manifestation—when everything you've been building since Year 1 finally comes to fruition. You might feel a surge of power, of authority, of recognition. That's because you've earned it. This year is asking you to step up, to claim what's yours, to own your success without apology. The money, the opportunities, the authority—these are coming because you did the work. Don't shrink. Don't play small. This is your moment to receive what you've been creating."
    },
    9: {
        title: "The Completion",
        phase: "Closing Phase",
        description: "This is your year of completion—a time to release what's no longer serving you so you can make space for what's coming. You might notice people, jobs, or situations naturally falling away. This can feel painful, but here's the truth: you're not losing anything that was meant to stay. You're being cleared out for the new beginning that's coming in your next cycle. This year isn't about starting new things; it's about finishing old ones with grace. Let go. Forgive. Release. The emptiness you feel right now is actually space—space for the miracle that's already on its way."
    },
    11: {
        title: "The Illumination",
        phase: "Master Cycle",
        description: "This is your year of heightened intuition and spiritual awakening. You might feel more sensitive than usual, picking up on energies and insights that others miss. Your nervous system is being upgraded to a higher frequency, and yes, that can feel intense. But here's what's happening: you're being prepared to channel something greater than yourself. The insights you receive this year, the visions you have, the truth you see—these are meant to be shared. You're not going crazy; you're waking up. Trust what you know."
    },
    22: {
        title: "The Master Builder",
        phase: "Master Cycle",
        description: "This is your year of massive potential—when your biggest dreams are asking to become real. You might feel the weight of this potential, the pressure to build something that matters, something that lasts. And here's the truth: you're capable of it. This year is asking you to think bigger than you've ever thought before, to build something that outlasts you. The pressure you feel isn't burden—it's calling. You're being asked to step into your power and create something the world needs. One brick at a time, you can build an empire."
    },
    33: {
        title: "The Healer",
        phase: "Master Cycle",
        description: "This is your year of pure service—a time when you're being called to heal, to teach, to uplift others through your presence and your love. You might feel the pain of the world more acutely this year, and that's because your heart is open in a way that allows you to truly help. But here's what you need to remember: you can't pour from an empty cup. This year is asking you to serve from overflow, not from depletion. Fill yourself first. Then let your love spill over and heal everyone it touches. You are the lighthouse, not the lifeboat."
    }
};

export const BIRTH_DAY_READINGS: Record<number, NumberReading> = {
    1: {
        archetype: "The Magician",
        essence: "Born under the energy of The Magician, you are a powerful manifestor. You have the innate ability to turn ideas into reality. You are a pioneer, a leader, and an innovator. Your talent lies in your word—when you speak, the universe listens. You are here to believe in yourself and create your own world.",
        light: ["Unstoppable willpower.", "Innovative thinking.", "Leadership skills.", "High magical potential.", "Self-confidence."],
        shadow: ["Self-doubt or impostor syndrome.", "Manipulating others.", "Egoism.", "Starting but not finishing.", "Aggression."],
        love: "You need a partner who supports your ambitions but is strong enough to stand up to you. You love the chase and the feeling of being the 'Lead' in the relationship.",
        career: "You excel in entrepreneurship, speaking, sales, or any field where you can be the boss. You are not a follower.",
        soulLesson: "To believe in your own power. You must learn that you have everything you need within you to succeed."
    },
    2: {
        archetype: "The High Priestess",
        essence: "You are the keeper of secrets and the bridge to the unconscious. Your talent is your intuition. You see what others miss. You are deeply connected to nature, animals, and the subtle energies of the world. You are a natural diplomat and healer.",
        light: ["Profound intuition.", "Diplomacy and grace.", "Healing abilities.", "Deep wisdom.", "Ability to keep secrets."],
        shadow: ["Passive-aggressiveness.", "Gossip or duplicity.", "Hidden agendas.", "Emotional coldness.", "Laziness."],
        love: "You crave deep, soulful connection. You are sensitive and need a partner who is gentle and understanding. You communicate telepathically with your lover.",
        career: "Ideally suited for psychology, healing, research, or roles requiring confidentiality and diplomacy.",
        soulLesson: "To trust your inner voice. You are learning to lift the veil of illusion and see the truth."
    },
    3: {
        archetype: "The Empress",
        essence: "You are the embodiment of abundance, fertility, and beauty. You are the ultimate creator. Whether it is children, businesses, or art, you are constantly giving birth to new life. You are magnetic, charming, and deeply connected to the material world.",
        light: ["Creativity and fertility.", "Material abundance", "Magnetism and charm.", "Nurturing nature.", "Connection to luxury."],
        shadow: ["Greed and materialism.", "Obsession with appearance.", "Control issues with children/projects.", "Laziness.", "Dependency."],
        love: "You are the ultimate partner. You love to spoil and be spoiled. You create a beautiful, comfortable home. You need a partner who appreciates beauty and enjoys the good life.",
        career: "Fashion, design, real estate, or any female-dominated industry. Also excellent in management as a 'mother figure'.",
        soulLesson: "To rule with love. You are learning to manage your empire without becoming a tyrant."
    },
    4: {
        archetype: "The Emperor",
        essence: "You are the structure, the law, and the order. You are a natural born leader and manager. You bring stability to chaos. Your talent is professional success and building lasting foundations. You are the rock that others lean on.",
        light: ["Discipline and order.", "Professional success.", "Authority.", "Logical thinking.", "Reliability."],
        shadow: ["Tyranny and control.", "Rigidity.", "Workaholism.", "Suppression of emotions.", "Cruelty."],
        love: "You are a provider and protector. You take your commitments seriously. You may struggle to show emotion, showing love through stability instead.",
        career: "CEO, government, military, construction, or banking. Any role where you are in charge of structure/systems.",
        soulLesson: "To lead with compassion. You are learning that true power comes from service, not just control."
    },
    5: {
        archetype: "The Hierophant",
        essence: "You are the teacher, the guide, and the keeper of tradition. You have a thirst for knowledge and a gift for sharing it. You are here to bring order through education and systems. You are a bridge between the divine law and human understanding.",
        light: ["Wisdom and teaching ability.", "Respect for tradition.", "Moral compass.", "Family values.", "Good counsel."],
        shadow: ["Dogmatism and judgment.", "Hypocrisy.", "Rebellion against all rules.", "Rigidity in belief.", "Preaching."],
        love: "You value traditional commitment. You want a partner who shares your values and potentially your spiritual beliefs. Marriage is important to you.",
        career: "Teaching, law, mentoring, public speaking, or religious/spiritual leadership.",
        soulLesson: "To teach by example. You are learning to live your truth, not just preach it."
    },
    6: {
        archetype: "The Lovers",
        essence: "You are the energy of choice, love, and connection. You are social, charming, and beautiful. Relationships are your world. You are here to learn how to connect intimately with others and to make choices from the heart.",
        light: ["Charm and beauty.", "Ability to connect people.", "Love and romance.", "Good taste.", "Communication."],
        shadow: ["Indecisiveness.", "Superficiality.", "Relationship dependency.", "Idealization of partners.", "Vanity."],
        love: "Love is your religion. You need connection like air. You are a romantic but can be prone to having 'options' or fear of making the wrong choice.",
        career: "PR, communications, matchmaking, beauty industry, or any role involving networking.",
        soulLesson: "To choose love over fear. You are learning that true union starts with loving yourself."
    },
    7: {
        archetype: "The Chariot",
        essence: "You are the warrior. You are driven, focused, and goal-oriented. You are a winner. Your talent is movement—whether physical (travel) or metaphorical (career advancement). You conquer obstacles through sheer force of will.",
        light: ["Determination.", "Goal achievement.", "Leadership in action.", "Speed and travel.", "Victory."],
        shadow: ["Aggression.", "Steamrolling others.", "Restlessness.", "Win-at-all-costs mentality.", "Burnout."],
        love: "You need a partner who can keep up. You are often busy 'conquering', so you need someone independent. You view relationships as another area to succeed in.",
        career: "Travel, sales, sports, management, or transport. You need to be moving forward towards a goal.",
        soulLesson: "To control the ego. You are learning that the greatest victory is mastery over oneself."
    },
    8: {
        archetype: "Justice",
        essence: "You are the balancer of the scales. You have a deep need for fairness, truth, and equilibrium. You see the cause and effect in everything (Karma). You are cool-headed, rational, and often act as a mediator or judge.",
        light: ["Fairness and integrity.", "Analytical mind.", "Objective view.", "Understanding of Karma.", "Honesty."],
        shadow: ["Judgmentalism.", "Rigidity.", "Coldness.", "Obsession with 'rules'.", "Indecisiveness due to over-weighing."],
        love: "You need an equal partnership. Fairness is key—you track the give and take. You are not overly emotional but are deeply loyal to the 'contract' of love.",
        career: "Law, contracts, administration, coordination, or any regulatory role.",
        soulLesson: "To see the truth. You are learning that universal justice is higher than human laws."
    },
    9: {
        archetype: "The Hermit",
        essence: "You are the old soul. You have deep wisdom gained from experience. You prefer solitude and depth over shallow socialising. You are a natural researcher, philosopher, and sage. You light the way for others by first walking the path yourself.",
        light: ["Deep wisdom.", "Self-sufficiency.", "Detail-oriented.", "Healing presence.", "Sincerity."],
        shadow: ["Isolation.", "Cynicism.", "Misanthropy.", "Perfectionism.", "Depression."],
        love: "You are picky. You need a soul connection, not just a body. You value your alone time, so a clingy partner is a dealbreaker.",
        career: "Research, science, writing, philosophy, or specialized consulting. Work best alone.",
        soulLesson: "To share your light. You are learning that wisdom is meant to be shared, not hoarded in a cave."
    },
    10: {
        archetype: "Wheel of Fortune",
        essence: "You are a lucky star. You are destined for a life of ups and downs, but you always land on your feet. You are a gambler, a traveler, and a person of the world. Your life is cyclical, and you are here to learn to flow with change.",
        light: ["Good luck.", "Optimism.", "Adaptability.", "Generosity.", "Fun-loving."],
        shadow: ["Laziness (waiting for luck).", "Instability.", "Repeating cycles.", "Passive approach to life.", "Financial volatility."],
        love: "You are fun and easy-going. You need a partner who is spontaneous and willing to ride the rollercoaster of life with you.",
        career: "Freelancing, casino/stock market, seasonal work, or anything involving travel and variety.",
        soulLesson: "To trust the flow. You are learning that you are not the victim of fate, but the co-creator of it."
    },
    11: {
        archetype: "Strength",
        essence: "You possess a dual nature—the beast and the beauty. You have immense potential for power (Strength). You are energetic, charismatic, and physically strong. Your talent lies in handling intense energy and leading masses.",
        light: ["Great energy potential.", "Charism/Sexuality.", "Physical strength.", "Resilience.", "Work capacity."],
        shadow: ["Aggression/Violence.", "Workaholism.", "Sexual obsession.", "Suppressing instincts.", "Burnout."],
        love: "Passionate and intense. You need a partner who can handle your high energy and drive. Physical connection is vital.",
        career: "Personal training, leadership, high-pressure roles, or anything requiring stamina.",
        soulLesson: "To tame the beast. You are learning to channel your raw power into constructive action."
    },
    12: {
        archetype: "The Hanged Man",
        essence: "You see the world upside down—in a good way. You are a visionary, an innovator, and a creative genius. You are here to bring a new perspective. You are capable of great sacrifice for a higher cause. Your empathy is boundless.",
        light: ["Unique perspective.", "Creative genius.", "Empathy and service.", "Spiritual depth.", "Innovation."],
        shadow: ["Victim mentality.", "Laziness/Stagnation.", "Inability to say no.", "Living in fantasy.", "Depression."],
        love: "You are a giver. You love deeply and sacrificially. Be careful not to lose yourself in your partner.",
        career: "Music, psychology, innovation, charity, or any creative field. You invent things.",
        soulLesson: "To serve without suffering. You are learning value your own unique view of the world."
    },
    13: {
        archetype: "Death",
        essence: "You are the agent of transformation. You are intense, mysterious, and powerful. You are not afraid of change; you instigate it. People clarify their lives just by being near you. You go through many 'lives' within this one life.",
        light: ["Transformative power.", "Fearlessness.", "Ability to let go.", "Depth.", "Risk-taking."],
        shadow: ["Destructiveness.", "Fear of death/change.", "Holding on too tight.", "Cruelty.", "Risking life unnecessarily."],
        love: "Intense and transformative. A relationship with you changes a person forever. You need depth and honesty.",
        career: "Crisis management, extreme sports, surgery, psychology, or turnaround specialist.",
        soulLesson: "To accept change. You are learning that every ending is a new beginning."
    },
    14: {
        archetype: "Temperance",
        essence: "You are the alchemist. You mix fire and water to create art. You are a calm, balanced soul with a gift for healing and the arts. You are patient and moderate. You heal through presence and harmony.",
        light: ["Balance and patience.", "Artistic talent.", "Healing ability.", "Emotional stability.", "Good listener."],
        shadow: ["Imbalance.", "Addiction.", "Emotional extremes.", "Passivity.", "Stifled creativity."],
        love: "You want a soul mate connection that is calm and harmonious. You are a gentle and attentive lover.",
        career: "Healing, fine arts, chemistry/cooking, or diplomacy.",
        soulLesson: "To find the middle path. You are learning moderation in all things."
    },
    15: {
        archetype: "The Devil",
        essence: "You are the master of the material world. You have incredible charisma, sexual magnetism, and the ability to see the shadow side of humantity. You are a great manifester of money and pleasure. You are the life of the party.",
        light: ["Charisma and magnetism.", "Psychological insight.", "Financial success.", "Fun and pleasure.", "Liberation."],
        shadow: ["Addiction.", "Manipulation.", "Obsession.", "Materialism.", "Enslavement to vice."],
        love: "Passionate, seductive, and perhaps a bit dangerous. You need to watch out for toxic attachments or codependency.",
        career: "Show business, psychology (shadow work), sales, or high finance.",
        soulLesson: "To master your desires. You are learning that you can enjoy the world without being chained to it."
    },
    16: {
        archetype: "The Tower",
        essence: "You are the awakener. You build structures only to break them down when they become false. You have a high energy that can be explosive but ultimately leads to spiritual liberation. You survive things that would break others.",
        light: ["Spiritual awakening.", "Rebuilding ability.", "Resilience.", "Breaking old patterns.", "Energy."],
        shadow: ["Chaos and destruction.", "Anger issues.", "Accident prone.", "Refusal to change.", "Pride."],
        love: "Relationships can be volatile. You may experience sudden breakups or dramatic beginnings. You need stability, but you attract storms.",
        career: "Construction/Demolition, renovation, crisis intervention, or revolutionizing industries.",
        soulLesson: "To build on truth. You are learning that what is true cannot be destroyed."
    },
    17: {
        archetype: "The Star",
        essence: "You are the star. You have a talent for fame, recognition, and shining in public. You are hopeful, inspiring, and creative. You are connected to the cosmos and have a gift for astrology or astronomy.",
        light: ["Stardom/Talent.", "Hope and optimism.", "Creativity.", "Connection to universe.", "Inspiration."],
        shadow: ["Arrogance.", "Coldness/Distance.", "Unfulfilled dreams.", "Living for applause.", "Lack of grounding."],
        love: "You need a fan as much as a partner. You can be a bit distant, like a star in the sky. You need admiration.",
        career: "Performing arts, astrology, modeling, or public figure.",
        soulLesson: "To shine for all. You are learning that your talent is a gift to the world, not just your ego."
    },
    18: {
        archetype: "The Moon",
        essence: "You are the mystic. You live in a world of imagination, magic, and fears. You have the ability to manifest your thoughts instantly (law of attraction). You are deeply connected to the cycles of the moon.",
        light: ["Magic and manifestation.", "Imagination.", "Psychic ability.", "Depth.", "Mystery."],
        shadow: ["Fear and anxiety.", "Illusions/Delusions.", "Black magic.", "Mental instability.", "Living in a dream."],
        love: "Mysterious and deep. You need a partner who understands your fluid nature. You bond telepathically.",
        career: "Writing (fiction), magic/occult, psychology, or design.",
        soulLesson: "To conquer fear. You are learning that you create your own reality."
    },
    19: {
        archetype: "The Sun",
        essence: "You are the child of the universe. You radiate joy, warmth, and success. You are a natural leader for large groups. Generosity is your nature. Where you go, shadows disappear.",
        light: ["Joy and happiness.", "Generosity.", "Success and wealth.", "Leadership.", "Optimism."],
        shadow: ["Ego and narcissism.", "Burning others out.", "Guilt.", "Aggression when ignored.", "Controlling."],
        love: "You love big. You are generous and warm. You need a partner who lets you shine and doesn't try to dim your light.",
        career: "Public leadership, philanthropy, performing, or working with children.",
        soulLesson: "To serve the many. You are learning to shine on everyone equally, like the sun."
    },
    20: {
        archetype: "Judgment",
        essence: "You are the announcer. You have a connection to your ancestors and family karma. You are here to wake up your lineage. You have a gift for information, media, and clear judgment.",
        light: ["Clarity and judgment.", "Connection to ancestors.", "Spiritual awakening.", "Communication.", "Renewal."],
        shadow: ["Judgmentalism.", "Family drama.", "Refusal to change.", "Living in the past.", "Aggressive speech."],
        love: "Family is huge for you. You need a partner who accepts your clan. You value deep, karmic connections.",
        career: "Journalism, media, law, genealogy, or family healing.",
        soulLesson: "To heal the lineage. You are breaking the chains of the past."
    },
    21: {
        archetype: "The World",
        essence: "You are the globally minded peacekeeper. You think big—international scale. You are a peacemaker and a connector of cultures. You are here to complete cycles and bring harmony to the world.",
        light: ["Global consciousness.", "Peacemaking.", "Completion.", "Travel and languages.", "Harmony."],
        shadow: ["Hostility to world.", "Feeling incomplete.", "Aggressive expansion.", "Cultural intolerance.", "Limiting self."],
        love: "You likely love someone from a different culture or country. You need a big, open-minded love.",
        career: "Diplomacy, international business, travel, internet/web, or peace work.",
        soulLesson: "To embrace the whole. You are learning that the world is your home."
    },
    22: {
        archetype: "The Fool",
        essence: "You are the free spirit. You are the beginning and the end. You start new cycles with zero baggage. You are fun, free, and unrestricted. You have a child-like trust in the universe.",
        light: ["Absolute freedom.", "Trust and faith.", "New beginnings.", "Non-attachment.", "Humor."],
        shadow: ["Irresponsibility.", "Recklessness.", "Did not grow up.", "Criminal tendencies (breaking rules).", "Chaos."],
        love: "You need space! A cage is death to you. You love the honeymoon phase. Commitment is hard unless it is free.",
        career: "Travel, comedy, freelancing, or anything new and unstructured.",
        soulLesson: "To trust the leap. You are learning that freedom is a state of mind."
    }
};

import { LayeredReading } from "@/types/numerology";

// Helper to determine the "Element" / Nature of a number for interaction logic
// Fire: Action, Intensity, Ego (1, 5, 8, 10, 22)
// Water: Emotion, Intuition, Connection (2, 6, 9, 11, 20, 33)
// Air: Intellect, Communication, Freedom (3, 12, 14, 21, 23)
// Earth: Structure, Stability, Analysis (4, 7, 13, 16, 19, 25, 28, 31)
const getNumberElement = (num: number): 'fire' | 'water' | 'air' | 'earth' => {
    if ([1, 5, 8, 10, 15, 17, 19, 22, 26, 28].includes(num)) return 'fire';
    if ([2, 6, 9, 11, 18, 20, 24, 27, 29, 33].includes(num)) return 'water';
    if ([3, 12, 14, 21, 23, 30].includes(num)) return 'air';
    return 'earth'; // 4, 7, 13, 16, 25, 31
};

// Helper to generate the contextual intro
const getElementalInteraction = (lp: number, modifier: number): string => {
    const lpElement = getNumberElement(lp);
    const modElement = getNumberElement(modifier);

    // Same Number - Amplification
    if (lp === modifier) {
        return `As a Life Path ${lp}, being born under the exact same frequency creates a "Double Strength" effect. This amplifies your archetypal traits to their absolute maximum, making you a pure embodiment of this energy.`;
    }

    // Interaction Matrix
    // Fire Base
    if (lpElement === 'fire') {
        if (modElement === 'fire') return `This combination adds jet fuel to your fire. Your natural drive and intensity are supercharged, making you nearly unstoppable but potentially prone to burnout.`;
        if (modElement === 'water') return `This influence interestingly softens your intense edges. It adds a layer of emotional depth and intuition that prevents your strong will from becoming steamrolling.`;
        if (modElement === 'air') return `This adds a spark of brilliance to your force. Your raw power is directed through intellect and creativity, making you not just a doer, but a visionary.`;
        if (modElement === 'earth') return `This grounds your high-voltage energy. It gives your natural ambition a practical container, ensuring that your actions lead to tangible, lasting results.`;
    }

    // Water Base
    if (lpElement === 'water') {
        if (modElement === 'fire') return `This adds a surprising backbone of steel to your sensitive nature. It gives you the drive to protect your boundaries and act on your intuitive hits.`;
        if (modElement === 'water') return `This deepens your ocean. Your capacity for empathy and connection is profound, though you must guard against drowning in the emotions of others.`;
        if (modElement === 'air') return `This lifts your emotions into the realm of expression. It allows you to articulate your deep feelings with artistry and charm, rather than keeping them hidden.`;
        if (modElement === 'earth') return `This builds a riverbank for your flow. It helps you channel your vast emotional energy into practical care and service, preventing you from feeling scattered is overwhelming.`;
    }

    // Air Base
    if (lpElement === 'air') {
        if (modElement === 'fire') return `This ignites your ideas. It transforms your mental concepts into immediate action, bridging the gap between "thinking" and "doing."`;
        if (modElement === 'water') return `This adds soul to your speech. It blends your sharp intellect with deep emotional resonance, making you a communicator who touches hearts, not just minds.`;
        if (modElement === 'air') return `This creates a whirlwind of creativity. You are a lightning-fast thinker and social butterfly, though you may struggle to ever land in one place.`;
        if (modElement === 'earth') return `This gives weight to your words. It ensures that your brilliant ideas are not just theories, but blueprints for something real.`;
    }

    // Earth Base
    if (lpElement === 'earth') {
        if (modElement === 'fire') return `This warms up your reserve. It adds a dynamism and risk-taking ability that helps you break out of rigid structures when necessary.`;
        if (modElement === 'water') return `This makes the stone porous. It allows you to connect not just functionally, but emotionally, adding a nurturing softness to your reliable strength.`;
        if (modElement === 'air') return `This opens the windows of your mind. It encourages you to be curious and flexible, preventing your need for order from turning into stubbornness.`;
        if (modElement === 'earth') return `This reinforces your foundation. You are the rock of the zodiac, possessing an unshakable stability and discipline that others can only dream of.`;
    }

    return `This energy adds a unique nuance to your path.`;
};

export const getLayeredLifePathReading = (lp: number, month: number, day: number): LayeredReading => {


    // Generate Contextual Intros
    // Generate Contextual Intros during object creation
    return {
        layer1_lifePath: LIFE_PATH_READINGS[lp] || LIFE_PATH_READINGS[1],
        layer2_monthStats: {
            monthName: new Date(2024, month - 1).toLocaleString('default', { month: 'long' }),
            influence: getElementalInteraction(lp, month) + " " + (MONTH_INFLUENCES[month] || "Your birth month adds a unique flavor.")
        },
        layer3_dayStats: {
            dayNumber: day,
            nuance: getElementalInteraction(lp, day) + " " + (DAY_NUANCES[day] || "Your birth day adds specific detail.")
        }
    };
};
