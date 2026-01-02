
export interface CompatibilityReading {
    core: {
        title: string;
        dynamic: string;
        gift: string;
        challenge: string;
        growth: string;
    };
    interaction: {
        description: string;
        work: string;
    };
    truth: {
        description: string;
        insight: string;
    };
    soulParams: {
        teaching: string;
    };
    advice: string[];
    viral?: {
        roast: string;
        receipt: {
            item1: { label: string; value: string };
            item2: { label: string; value: string };
            item3: { label: string; value: string };
        };
        redFlags: string[];
        greenFlags: string[];
    };
    deep?: {
        communication: {
            personA: string;
            personB: string;
        };
        triggers: string;
        intimacy: string;
        trajectory: string;
    };
    gossip?: {
        narrative: string;
        argumentStyle: string;
        apologyWho: string;
    };
}

export const LIFE_PATH_COMPATIBILITY: Record<number, Record<number, CompatibilityReading>> = {
    // LIFE PATH 1 Combinations
    1: {
        // 1 + 1: The Power Couple
        1: {
            core: {
                title: "The Mirror of Power",
                dynamic: "Two alphas in one room. The energy is intense, competitive, and driven. You both want to lead. You both want to win. When you align, you're unstoppable. When you clash, it's war.",
                gift: "One initiates, the other accelerates. You understand each other's ambition without explanation. No one else gets your drive like this.",
                challenge: "The battle for control. Neither of you likes to compromise or apologize. It can become a power struggle over who is 'right'.",
                growth: "Learning that there's room for two leaders. Moving from competition to collaboration."
            },
            interaction: {
                description: "Fast-paced and fiery. Decisions happen instantly. You challenge each other constantly. It's never boring, but it can be exhausting.",
                work: "Take turns driving. Literally and metaphorically. Agree on who leads which domain."
            },
            truth: {
                description: "You trigger each other's fear of not being good enough. You compete because deep down, you're afraid the other one is better than you.",
                insight: "Your competition is actually just admiration in disguise."
            },
            soulParams: {
                teaching: "To surrender without losing power. To support another's win as if it were your own."
            },
            advice: [
                "Stop keeping score.",
                "Celebrate each other's wins louder than your own.",
                "Admit when you're wrong immediately (it saves time)."
            ],
            viral: {
                roast: "The couple most likely to start a cult or kill each other over the thermostat.",
                receipt: {
                    item1: { label: "Ego Collision Damage", value: "Critical" },
                    item2: { label: "Power Struggles", value: "24/7" },
                    item3: { label: "World Domination", value: "Pending" }
                },
                redFlags: [
                    "You both need to be right.",
                    "Neither of you apologizes first.",
                    "Competition masquerading as support."
                ],
                greenFlags: [
                    "Instant understanding of ambition.",
                    "You move at the same speed.",
                    "Unstoppable when aligned."
                ]
            },
            deep: {
                communication: {
                    personA: "Speaks in commands and visions. Needs to feel respected above all else.",
                    personB: "Hears challenge in every statement. Needs to pause before reacting defensively."
                },
                triggers: "Feeling 'managed' or controlled by the other. Any perceived disrespect lights the fuse immediately.",
                intimacy: "Passionate but combative. The connection is intense, but vulnerability is often mistaken for weakness.",
                trajectory: "If you don't learn to take turns leading, you will burn out in 3 years. If you do, you're the 50-year power couple."
            }
        },
        // 1 + 2: The Leader and The Supporter
        2: {
            core: {
                title: "The Leader and The Peacemaker",
                dynamic: "The archetypal masculine meets the archetypal feminine (regardless of gender). 1 leads, 2 supports. 1 protects, 2 nurtures. It feels natural, but can become unbalanced.",
                gift: "1 brings direction and decisiveness. 2 brings emotional intelligence and softness. 1 builds the house, 2 makes it a home.",
                challenge: "1 can be too harsh for sensitive 2. 2 can be too passive for decisive 1. 1 bulldozes, 2 builds resentment.",
                growth: "1 learns sensitivity. 2 learns assertion. Balancing the 'doing' with the 'feeling'."
            },
            interaction: {
                description: "1 makes the plans, 2 goes along (mostly). 2 feels everything, 1 just wants to fix it. There's a dance of push and flow.",
                work: "1 needs to ask for input. 2 needs to speak up before they are asked."
            },
            truth: {
                description: "1, your independence triggers 2's abandonment wound. 2, your need for reassurance triggers 1's fear of being trapped.",
                insight: "1 needs to learn interdependence. 2 needs to learn autonomy."
            },
            soulParams: {
                teaching: "1 teaches 2 courage. 2 teaches 1 vulnerability."
            },
            advice: [
                "1: Ask 'How does that feel?' before deciding.",
                "2: Say 'I want' instead of 'I don't mind'.",
                "Both: Schedule time for feelings (2 needs it) and time for action (1 needs it)."
            ],
            viral: {
                roast: "Basically a CEO dating their Executive Assistant.",
                receipt: {
                    item1: { label: "Decisions Made by 1", value: "100%" },
                    item2: { label: "Resentment from 2", value: "Growing" },
                    item3: { label: "Power Balance", value: "Skewed" }
                },
                redFlags: [
                    "1 treats 2 like an employee.",
                    "2 uses silence/guilt to punish 1.",
                    "1 forgets 2 has an opinion."
                ],
                greenFlags: [
                    "1 protects 2 fiercely.",
                    "2 softens 1's rough edges.",
                    "Traditional polarity that just works."
                ]
            },
            deep: {
                communication: {
                    personA: "Direct, blunt, solution-oriented. 'Fix it and move on.'",
                    personB: "Indirect, emotional, connection-oriented. 'Listen to me first.'"
                },
                triggers: "1's abrasiveness crushes 2. 2's indecision infuriates 1.",
                intimacy: "Healing if balanced. 1 learns to be held, 2 learns to self-stand. If unbalanced, it's parent/child.",
                trajectory: "Stable if 2 finds a voice. Toxic if 2 becomes a doormat."
            }
        },
        // 1 + 3: The Creative Sparks
        3: {
            core: {
                title: "The Captain and The Entertainer",
                dynamic: "A high-energy, socially magnetic duo. 1 provides the structure and drive, 3 provides the charm and creativity. You look great together.",
                gift: "1 turns 3's creative ideas into reality. 3 helps 1 lighten up and enjoy the journey. You inspire each other.",
                challenge: "1 gets annoyed by 3's lack of focus. 3 feels stifled by 1's seriousness. 1 wants results, 3 wants fun.",
                growth: "Merging discipline with play. Achieving goals joyfully."
            },
            interaction: {
                description: "Lots of talking, lots of ideas. 1 is trying to make a plan, 3 is telling a story. It's vibrant but scattered.",
                work: "1 needs to relax the schedule. 3 needs to respect the timeline."
            },
            truth: {
                description: "1 judges 3 as superficial. 3 judges 1 as boring. You both secretly envy what the other has.",
                insight: "1 needs 3's joy. 3 needs 1's focus."
            },
            soulParams: {
                teaching: "1 teaches 3 follow-through. 3 teaches 1 how to smile during the battle."
            },
            advice: [
                "Plan fun dates, but actually stick to the plan.",
                "1: Laugh at 3's jokes. 3: Show up on time.",
                "Create something together—1 manages, 3 designs."
            ],
            viral: {
                roast: "A stressed parent trying to control a toddler on sugar.",
                receipt: {
                    item1: { label: "Attention Needed", value: "High" },
                    item2: { label: "Budget Adherence", value: "Low" },
                    item3: { label: "Social Status", value: "Elite" }
                },
                redFlags: [
                    "1 parenting 3.",
                    "3 flaking on 1 constantly.",
                    "1 criticizing 3's 'adventures'."
                ],
                greenFlags: [
                    "You look amazing together.",
                    "1 helps 3 succeed; 3 helps 1 relax.",
                    "Never a boring day."
                ]
            },
            deep: {
                communication: {
                    personA: "Logical, linear, demanding.",
                    personB: "Expressive, scattered, exaggerating."
                },
                triggers: "3's chaos triggers 1's need for control. 1's criticism triggers 3's shame.",
                intimacy: "Fun and lighter than others. You connect through doing and social energy.",
                trajectory: "The 'It Couple'. As long as 1 doesn't burn out from managing 3's chaos."
            }
        },
        // 1 + 4: The Builders
        4: {
            core: {
                title: "The Visionary and The Manager",
                dynamic: "The ultimate power couple for business or execution. 1 has the vision, 4 handles the details. You are both workers, both ambitious, both solid.",
                gift: "You can build an empire. 1 starts it, 4 sustains it. There is immense trust and reliability here.",
                challenge: "You both want control. 1 wants to move fast, 4 wants to be careful. 1 takes risks, 4 mitigates them. It's gas vs. brake.",
                growth: "Valuing the other's pace. Understanding that speed and stability need each other."
            },
            interaction: {
                description: "Serious, focused, possibly work-centric. 1 says 'Let's go', 4 says 'Do we have the budget?'. It's a boardroom dynamic.",
                work: "Schedule mandatory fun. Stop working and look at each other."
            },
            truth: {
                description: "1 thinks 4 is too slow/stubborn. 4 thinks 1 is reckless/arrogant. You're both stubborn in different ways.",
                insight: "You are the anchor and the sail. You need both."
            },
            soulParams: {
                teaching: "1 teaches 4 to dream bigger. 4 teaches 1 to build stronger."
            },
            advice: [
                "Don't treat your relationship like a project.",
                "1: Listen to 4's warnings. 4: Trust 1's gut.",
                "Define clear roles so you don't micromanage each other."
            ],
            viral: {
                roast: "A business merger masquerading as a marriage.",
                receipt: {
                    item1: { label: "Romance", value: "Scheduled" },
                    item2: { label: "Productivity", value: "500%" },
                    item3: { label: "Spontaneity", value: "None" }
                },
                redFlags: [
                    "Talking about taxes during sex.",
                    "Treating the relationship like a KPI.",
                    "Control battles over trivial details."
                ],
                greenFlags: [
                    "Empire building potential.",
                    "Unshakable trust.",
                    "You always show up."
                ]
            },
            deep: {
                communication: {
                    personA: "Fast, big picture, 'Go'.",
                    personB: "Slow, details, 'Wait'."
                },
                triggers: "Risk. 1 loves it, 4 hates it. 1 feels held back, 4 feels unsafe.",
                intimacy: "Grounded and physical. Not overly emotional. You bond through building a life.",
                trajectory: "You will own 5 houses and hate each other, or own 5 houses and rule the world. Choose one."
            }
        },
        // 1 + 5: The Adventurers
        5: {
            core: {
                title: "The Pioneer and The Explorer",
                dynamic: "Explosive energy. You both value freedom and independence above all else. Neither of you can be caged. It's exciting, passionate, and unstable.",
                gift: "Total respect for autonomy. You don't cling. You support each other's growth and risky ideas.",
                challenge: "Who is steering the ship? 1 is focused on a goal, 5 is all over the place. 1 wants consistency, 5 wants variety.",
                growth: "Finding commitment within freedom. Staying together because you choose to, not because you have to."
            },
            interaction: {
                description: "Fast, loud, independent. You do your own things and meet in the middle. It's intense bursts of connection followed by space.",
                work: "Create a shared goal or you'll drift apart."
            },
            truth: {
                description: "1 tries to control 5 to maximize efficiency. 5 rebels against 1's structure. It's a control-freedom loop.",
                insight: "1's structure creates the container for 5's freedom."
            },
            soulParams: {
                teaching: "1 teaches 5 focus. 5 teaches 1 flexibility."
            },
            advice: [
                "Give each other massive space.",
                "Travel together—1 plans the destination, 5 finds the adventures along the way.",
                "Don't try to change each other."
            ],
            viral: {
                roast: "Trying to put a leash on a cat.",
                receipt: {
                    item1: { label: "Flight Risk", value: "High" },
                    item2: { label: "Boredom", value: "Impossible" },
                    item3: { label: "Stability", value: "N/A" }
                },
                redFlags: [
                    "5 ghosting for 'space'.",
                    "1 becoming possessive/controlling.",
                    "Living parallel lives."
                ],
                greenFlags: [
                    "Fueling each other's independence.",
                    "Zero stagnation.",
                    "Respecting the need for freedom."
                ]
            },
            deep: {
                communication: {
                    personA: "Focuses on the goal/outcome.",
                    personB: "Focuses on the experience/sensation."
                },
                triggers: "Restriction. Any sense of 'have to' makes 5 run and makes 1 angry.",
                intimacy: "Electric but inconsistent. High passion, low safety.",
                trajectory: "A thrilling fling or a non-traditional long-term arrangement. Don't expect a white picket fence."
            }
        },
        // 1 + 6: The Protector and The Nurturer
        6: {
            core: {
                title: "The King and The Queen",
                dynamic: "A very traditional, protective dynamic. 1 provides, 6 cares. 1 battles the world, 6 manages the castle. It feels safe and secure.",
                gift: "One of the most loyal combinations. You cover all the bases of life—external success and internal harmony.",
                challenge: "1 can feel smothered by 6's care. 6 can feel neglected by 1's ambition. 6 wants 'us' time, 1 wants 'me' time.",
                growth: "Integrating ambition with connection. Valuing the home as much as the career."
            },
            interaction: {
                description: "6 asks 'Are you okay? Did you eat?'. 1 says 'I'm fine, I'm working.' 6 tries to fix 1, 1 tries to fix the world.",
                work: "1 needs to come home mentally, not just physically."
            },
            truth: {
                description: "6 judges 1 as selfish. 1 judges 6 as needy. You simply prioritize different realms (Self vs. Others).",
                insight: "1 needs the sanctuary 6 builds. 6 needs the safety 1 provides."
            },
            soulParams: {
                teaching: "1 teaches 6 independence. 6 teaches 1 interdependence."
            },
            advice: [
                "1: Say thank you for the small things 6 does.",
                "6: Support 1's goals without interfering.",
                "Have a weekly date night that is sacred family time."
            ],
            viral: {
                roast: "The 1950s called, they want their gender roles back.",
                receipt: {
                    item1: { label: "Domestic Labor", value: "6" },
                    item2: { label: "Career Focus", value: "1" },
                    item3: { label: "Codependency", value: "Risk" }
                },
                redFlags: [
                    "1 taking 6 for granted.",
                    "6 smothering 1 to feel needed.",
                    "Resentment over 'who works harder'."
                ],
                greenFlags: [
                    "Perfect balance of home/world.",
                    "Creating a sanctuary together.",
                    "Deep loyalty."
                ]
            },
            deep: {
                communication: {
                    personA: "Self-referencing ('I need').",
                    personB: "Other-referencing ('We should')."
                },
                triggers: "Neglect. 6 feels unloved if 1 works late. 1 feels trapped if 6 demands time.",
                intimacy: "Warm and protective. A safe harbor, if 1 slows down enough to enter it.",
                trajectory: "The Classic Marriage. Stable, respectable, but requires 1 to value 6's unseen labor."
            }
        },
        // 1 + 7: The Mind Types
        7: {
            core: {
                title: "The Doer and The Thinker",
                dynamic: "Ideally, this is strategy met with execution. 1 acts, 7 analyzes. You respect each other's minds and need for space.",
                gift: "Intellectual stimulation. You challenge each other. 7 provides the wisdom, 1 provides the vehicle to bring it to the world.",
                challenge: "Emotional coolness. Neither of you is visibly mushy. You can become strangers living in the same house. 1 moves too fast for deep 7.",
                growth: "Connecting from the heart, not just the head. Slowing down enough to truly see each other."
            },
            interaction: {
                description: "Quiet understanding or silent disconnect. 1 is busy doing, 7 is busy thinking. You intersect, exchange data, and separate.",
                work: "Schedule eye contact. Literally."
            },
            truth: {
                description: "1 thinks 7 is lazy or detached. 7 thinks 1 is shallow or ego-driven. You judge the other's pace.",
                insight: "1 is the external warrior, 7 is the internal warrior."
            },
            soulParams: {
                teaching: "1 teaches 7 to manifest. 7 teaches 1 to contemplate."
            },
            advice: [
                "Respect the 7's need for strict privacy.",
                "Respect the 1's need for visible achievement.",
                "Connect through shared intellectual interests."
            ],
            viral: {
                roast: "Living together but sending emails instead of talking.",
                receipt: {
                    item1: { label: "Deep Convos", value: "Daily" },
                    item2: { label: "Physical Touch", value: "Scheduled" },
                    item3: { label: "Misunderstandings", value: "Frequent" }
                },
                redFlags: [
                    "7 withdrawing into a shell.",
                    "1 pushing for answers 7 doesn't have.",
                    "Intellectual arrogance from both."
                ],
                greenFlags: [
                    "Meeting of the minds.",
                    "Giving each other silence.",
                    "Respecting the unknown."
                ]
            },
            deep: {
                communication: {
                    personA: "Loud, clear, assertive.",
                    personB: "Quiet, cryptic, analytical."
                },
                triggers: "Invasion vs. Isolation. 1 invades 7's space, 7 shuts the door. Cycle repeats.",
                intimacy: "Mental first, physical second. You connect through ideas and silence.",
                trajectory: "The Intellectual Power Couple. Unique, private, and deeply respectful if you don't force it."
            }
        },
        // 1 + 8: The Powerhouse
        8: {
            core: {
                title: "The CEO and The Chairman",
                dynamic: "The most ambitious pairing in numerology. You both speak the language of power, money, and success. It's a dynasty in the making.",
                gift: "You can achieve anything together. 1 innovates, 8 organizes and scales. You understand the hustle.",
                challenge: "Ego clash. Two bosses. Who is in charge? You can undermine each other to prove dominance. And you might forget to just love.",
                growth: "Dropping the armor. Being vulnerable lovers, not just business partners.",
            },
            interaction: {
                description: "Intense, high-stakes, productive. You talk about goals, money, and plans. Romantic dinners turn into strategy sessions.",
                work: "Create a 'no business talk' zone."
            },
            truth: {
                description: "You are mirroring each other's desire for control. You fight because you are the same.",
                insight: "You don't need to compete. You are on the same team."
            },
            soulParams: {
                teaching: "1 teaches 8 to innovate. 8 teaches 1 to endure."
            },
            advice: [
                "Divide and conquer: different domains of authority.",
                "Leave the egos at the door.",
                "Support each other's ambitions ferociously."
            ],
            viral: {
                roast: "Sending each other calendar invites for sex.",
                receipt: {
                    item1: { label: "Combined Income", value: "$$$" },
                    item2: { label: "Ego Size", value: "Massive" },
                    item3: { label: "Relaxation", value: "Never" }
                },
                redFlags: [
                    "Competing with your spouse.",
                    "Treating marriage like an acquisition.",
                    "Forgetting to be human."
                ],
                greenFlags: [
                    "Unstoppable force meets immovable object.",
                    "Building a dynasty.",
                    "Respecting each other's power."
                ]
            },
            deep: {
                communication: {
                    personA: "Direct, forceful, 'I want'.",
                    personB: "Authoritative, strategic, 'We will'."
                },
                triggers: "Disrespect. If one feels undermined, it's war. There is no submissive partner here.",
                intimacy: "Intense and physical. Power play is often part of the dynamic.",
                trajectory: "State heads. You rule together or you destroy each other. High risk, high reward."
            }
        },
        // 1 + 9: The Beginning and The End
        9: {
            core: {
                title: "The Individual and The Humanist",
                dynamic: "1 is self-focused, 9 is world-focused. 1 wants to win, 9 wants to heal. It's a polar opposite attraction.",
                gift: "1 helps 9 focus on themselves for once. 9 helps 1 see the bigger picture beyond their own nose. You expand each other.",
                challenge: "1 can seem arrogant to selfless 9. 9 can seem impractical or distant to focused 1. 1 lives in the now, 9 lives in the abstract.",
                growth: "Bridging the gap between 'Me' and 'Us'. Finding a selfish reason to change the world.",
            },
            interaction: {
                description: "1 pushes forward, 9 flows around. 1 demands, 9 yields (or passive-aggressively resists). It's fire vs. water.",
                work: "1 needs to be gentle. 9 needs to be direct."
            },
            truth: {
                description: "1 is annoyed by 9's lack of boundaries. 9 is hurt by 1's lack of empathy.",
                insight: "1 teaches 9 boundaries. 9 teaches 1 compassion."
            },
            soulParams: {
                teaching: "1 teaches 9 to say 'I'. 9 teaches 1 to say 'We'."
            },
            viral: {
                roast: "A narcissist dating a martyr.",
                receipt: {
                    item1: { label: "1's Needs Met", value: "100%" },
                    item2: { label: "9's Needs Met", value: "Optional" },
                    item3: { label: "Moral High Ground", value: "9" }
                },
                redFlags: [
                    "1 exploiting 9's giving nature.",
                    "9 being passive-aggressive about 1's selfishness.",
                    "Preaching at each other."
                ],
                greenFlags: [
                    "1 fights for 9's causes.",
                    "9 softens 1's heart.",
                    "A hero's journey together."
                ]
            },
            deep: {
                communication: {
                    personA: "Self-focused, immediate.",
                    personB: "Universal, abstract, distant."
                },
                triggers: "Selfishness. 1 sees 9 as vague/impractical. 9 sees 1 as cruel/small.",
                intimacy: "Spiritual. 9 loves the soul of 1, 1 loves the acceptance of 9.",
                trajectory: "The Leader and the Sage. You change the world if you stop judging each other."
            },
            advice: [
                "1: Ask 9 about their dreams for the world.",
                "9: Tell 1 what you need clearly.",
                "Volunteer together—1 leads the team, 9 cares for the people."
            ]
        }
    },
    // LIFE PATH 2 Combinations
    2: {
        // 2 + 1: (Covered in 1+2)

        // 2 + 2: The Deep Emotional Mirror
        2: {
            core: {
                title: "The Sanctuary",
                dynamic: "Profoundly sensitive, intuitive, and caring. You both want peace above all else. Conflict is rare but avoided at all costs.",
                gift: "Undspoken understanding. You can sit in silence and know exactly how the other feels.",
                challenge: "Lack of assertion. You both wait for the other to decide. Passive-aggressiveness is the main weapon.",
                growth: "Learning to fight cleanly instead of retreating."
            },
            interaction: {
                description: "Soft, gentle, nurturing. A lot of 'No, you go first.'",
                work: "Someone needs to take the lead."
            },
            truth: {
                description: "You are both waiting to be rescued.",
                insight: "There is no rescuer. It's just you two."
            },
            soulParams: {
                teaching: "To find strength in sensitivity."
            },
            advice: [
                "Practice saying 'No' to each other.",
                "Don't assume; ask directly.",
                "Create a safe word for when you need space."
            ],
            viral: {
                roast: "Two people apologizing to a door for bumping into it.",
                receipt: {
                    item1: { label: "Apologies Given", value: "500+" },
                    item2: { label: "Decisions Made", value: "0" },
                    item3: { label: "Tears Shed", value: "Daily" }
                },
                redFlags: [
                    "Communicating via sighs.",
                    "Neither of you can pick a restaurant.",
                    "Secret resentment buildup."
                ],
                greenFlags: [
                    "Psychic emotional connection.",
                    "Safe space for feelings.",
                    "Zero yelling."
                ]
            },
            deep: {
                communication: {
                    personA: "Passive, gentle, hints at needs.",
                    personB: "Intuitive, soft, reads between lines."
                },
                triggers: "Conflict. Any raised voice feels like violence. You both retreat.",
                intimacy: "Profoundly merging. You lose where one ends and the other begins.",
                trajectory: "A soft, safe cocoon. But if you don't face the world, you'll suffocate."
            }
        },
        // 2 + 3: The Heart and The Voice
        3: {
            core: {
                title: "The Artist and The Muse",
                dynamic: "2 provides the emotional depth, 3 provides the expression. 2 listens, 3 talks. It flows.",
                gift: "3 brings 2 out of their shell. 2 grounds 3's erratic energy with love.",
                challenge: "3's carelessly spoken words can crush sensitive 2. 2's moodiness can drain sunny 3.",
                growth: "Valuing feelings and fun equally."
            },
            interaction: {
                description: "3 entertains, 2 supports. It's a classic performer/audience dynamic.",
                work: "3 needs to listen more. 2 needs to speak up."
            },
            truth: {
                description: "3 uses 2 as an emotional dumping ground. 2 allows it to feel needed.",
                insight: "3 needs to self-soothe. 2 needs boundaries."
            },
            soulParams: {
                teaching: "2 teaches depth. 3 teaches lightness."
            },
            advice: [
                "3: Watch your sarcasm.",
                "2: Don't take everything personally.",
                "Share a creative hobby."
            ],
            viral: {
                roast: "An artist and their dedicated fan/therapist.",
                receipt: {
                    item1: { label: "Speaking Time", value: "3: 90%" },
                    item2: { label: "Listening Time", value: "2: 90%" },
                    item3: { label: "Drama Level", value: "High" }
                },
                redFlags: [
                    "3 treating 2 like an emotional trash can.",
                    "2 silently judging 3's chaos.",
                    "3 making fun of 2's sensitivity."
                ],
                greenFlags: [
                    "3 makes 2 laugh.",
                    "2 makes 3 feel safe.",
                    "Beautiful creative synergy."
                ]
            },
            deep: {
                communication: {
                    personA: "Absorbs emotions (Sponge).",
                    personB: "Projects emotions (Projector)."
                },
                triggers: "Criticism. 3 is careless with words, 2 remembers every word forever.",
                intimacy: "Sweet and fun, but 2 craves a depth that 3 sometimes skims over.",
                trajectory: "The Artist and the Muse. Beautiful if 2 doesn't get exhausted by being the audience."
            }
        },
        // 2 + 4: The Anchor
        4: {
            core: {
                title: "The Homebuilders",
                dynamic: "Ideally stable. 2 nurtures, 4 builds. 2 is water, 4 is earth/stone. Very traditional and secure.",
                gift: "Safety. You feel safe with each other. A relationship built to last a lifetime.",
                challenge: "Boredom. 4 can be too rigid/cold for 2. 2 can be too needy for stoic 4.",
                growth: "Finding romance in the routine."
            },
            interaction: {
                description: "Routine, calm, predictable. 4 plans, 2 cares for the plan.",
                work: "Inject spontaneity or you'll stagnate."
            },
            truth: {
                description: "2 thinks 4 doesn't care because they don't emote. 4 thinks 2 is irrational.",
                insight: "Love looks different to both of you."
            },
            soulParams: {
                teaching: "2 teaches softness. 4 teaches strength."
            },
            advice: [
                "4: Buy flowers for no reason.",
                "2: Respect 4's need for order.",
                "Build a home you both love."
            ],
            viral: {
                roast: "The most boring couple you know (and you love it).",
                receipt: {
                    item1: { label: "Bedtime", value: "9:00 PM" },
                    item2: { label: "Risk Taken", value: "None" },
                    item3: { label: "Safety Level", value: "Bunker" }
                },
                redFlags: [
                    "Using 'safety' to avoid living.",
                    "4 invalidating 2's feelings as 'illogical'.",
                    "2 manipulating 4 with moods."
                ],
                greenFlags: [
                    "Unshakable loyalty.",
                    "You build a legacy together.",
                    "The safest place on earth."
                ]
            },
            deep: {
                communication: {
                    personA: "Emotional, fluid, 'I feel'.",
                    personB: "Stoic, rigid, 'I think'."
                },
                triggers: "Change. 2 fears emotional change, 4 fears structural change.",
                intimacy: "Slow burn. Not fiery, but deeply enduring. Romance is found in reliability.",
                trajectory: "The long haul. You will verify this app's prediction in 50 years."
            }
        },
        // 2 + 5: The Odd Couple
        5: {
            core: {
                title: "The Introvert and The Extrovert",
                dynamic: "Oil and water. 2 wants to stay home and cuddle. 5 wants to travel and party. It's a massive stretch.",
                gift: "If it works, 2 gets a life of adventure, and 5 gets a warm place to land.",
                challenge: "Insecurity. 5's freedom triggers 2's abandonment issues instantly. 2's clinginess makes 5 run.",
                growth: "Trusting without holding on."
            },
            interaction: {
                description: "2 waits, 5 moves. 2 asks 'When will you be back?', 5 says 'Don't fence me in.'",
                work: "Negotiate freedom vs. connection explicitly."
            },
            truth: {
                description: "2 is secretly waiting for 5 to 'grow up'. 5 is secretly waiting for 2 to 'loosen up'.",
                insight: "You are attracted to your shadow."
            },
            soulParams: {
                teaching: "2 teaches consistency. 5 teaches independence."
            },
            advice: [
                "2: Get a life outside the relationship.",
                "5: Check in frequently to reassure 2.",
                "Don't force the other to be you."
            ],
            viral: {
                roast: "A librarian dating a rockstar during their midlife crisis.",
                receipt: {
                    item1: { label: "Anxiety Attacks (2)", value: "Daily" },
                    item2: { label: "Flights Booked (5)", value: "Many" },
                    item3: { label: "Compatibility", value: "?" }
                },
                redFlags: [
                    "Classic Anxious-Avoidant trap.",
                    "2 clinging, 5 running.",
                    "Trying to 'fix' each other."
                ],
                greenFlags: [
                    "2 gives 5 a home base.",
                    "5 shows 2 the world.",
                    "Growth through discomfort."
                ]
            },
            deep: {
                communication: {
                    personA: "Needs constant reassurance.",
                    personB: "Needs constant stimulation."
                },
                triggers: "Abandonment vs. Engulfment. The closer 2 gets, the further 5 pulls away.",
                intimacy: "Challenging. 2 wants to merge, 5 wants to experience. Requires massive trust.",
                trajectory: "A rollercoaster. You either crash or you learn to ride the loops together."
            }
        },
        // 2 + 6: The Lovebirds
        6: {
            core: {
                title: "The Caregivers",
                dynamic: "Pure romance. You both speak the language of service, care, and family. You love to love.",
                gift: "A harmonious, beautiful home. You heavily prioritize the relationship.",
                challenge: "Smothering each other. Who takes care of you if you're both taking care of each other? Co-dependency risk is high.",
                growth: "Loving without losing yourself."
            },
            interaction: {
                description: "Sweet, affectionate, domestic. You discuss family, feelings, and home decor.",
                work: "Allow healthy conflict. Stop being 'nice'."
            },
            truth: {
                description: "You avoid truth to keep the peace. You resent silently.",
                insight: "Conflict is intimacy too."
            },
            soulParams: {
                teaching: "To love unconditionally, including yourselves."
            },
            advice: [
                "Speak your truth even if it shakes the peace.",
                "Don't enable each other's weaknesses.",
                "Host dinner parties together."
            ],
            viral: {
                roast: "Competitive caretaking. 'No, I'LL make the tea.'",
                receipt: {
                    item1: { label: "Guilt Trips", value: "Subtle" },
                    item2: { label: "Lasagna Made", value: "Infinite" },
                    item3: { label: "Boundaries", value: "None" }
                },
                redFlags: [
                    "Enabling each other's victimhood.",
                    "Keeping score of 'sacrifices'.",
                    "Smothering love."
                ],
                greenFlags: [
                    "The kindest home on the block.",
                    "You truly care.",
                    "Beautiful family energy."
                ]
            },
            deep: {
                communication: {
                    personA: "Careful, polite, repressing anger.",
                    personB: "Nurturing, worried, avoiding conflict."
                },
                triggers: "Selfishness. If one person does something for themselves, the other feels betrayed.",
                intimacy: "Warm but heavy. There is a lot of 'expectation' in your love.",
                trajectory: "The Love Bubble. Wonderful if you don't pop it with silent resentment."
            }
        },
        // 2 + 7: The Intuitive Link
        7: {
            core: {
                title: "The Psychic Connection",
                dynamic: "2 feels, 7 knows. You both live below the surface. A quiet, potentially spiritual bond.",
                gift: "You don't need words. The connection is telepathic. 2 warms up cold 7.",
                challenge: "7 needs alone time (Cave). 2 needs together time (Connection). 7's withdrawal feels like rejection to 2.",
                growth: "Respecting solitary recharge vs. social recharge."
            },
            interaction: {
                description: "Quiet evenings. 2 wants to hold hands, 7 reads a book. It's peaceful but can be distant.",
                work: "7 needs to explain their withdrawal. 'I am recharging, not leaving.'",
            },
            truth: {
                description: "2 tries to fix 7's loneliness. 7 likes the loneliness.",
                insight: "7 is alone, not lonely. 2 needs to learn the difference."
            },
            soulParams: {
                teaching: "2 teaches emotional connection. 7 teaches spiritual autonomy."
            },
            advice: [
                "2: Don't take 7's silence personally.",
                "7: Schedule connection time.",
                "Explore spiritual topics together."
            ],
            viral: {
                roast: "A psychic trying to date a ghost.",
                receipt: {
                    item1: { label: "Silence", value: "Deafening" },
                    item2: { label: "Mind Reading", value: "Attempted" },
                    item3: { label: "Actual Words", value: "Rare" }
                },
                redFlags: [
                    "2 chasing, 7 running (internally).",
                    "7 acting superior/intellectual.",
                    "2 becoming needy/manipulative."
                ],
                greenFlags: [
                    "Telepathic bond.",
                    "Shared spiritual depth.",
                    "Gentle energy."
                ]
            },
            deep: {
                communication: {
                    personA: "Emotional, seeking connection.",
                    personB: "Mental, seeking truth/solitude."
                },
                triggers: "Intrusion. 7 feels invaded by 2's care. 2 feels rejected by 7's privacy.",
                intimacy: "Ethereal. You connect on a soul plane, but day-to-day life can feel distant.",
                trajectory: "The Mystic Couple. Deeply bonded if you respect the need for the Cave."
            }
        },
        // 2 + 8: The Power Behind the Throne
        8: {
            core: {
                title: "The Executive and The Diplomat",
                dynamic: "A classic robust pairing. 8 goes out and conquers, 2 manages the emotional landscape. 8 provides, 2 nurtures.",
                gift: "8 feels safe to be vulnerable with 2. 2 feels protected by 8's strength.",
                challenge: "8 can be blunt and hurt 2's feelings daily. 2 can be too passive for 8's respect.",
                growth: "Balancing soft power (2) and hard power (8)."
            },
            interaction: {
                description: "8 leads, 2 supports. 8 speaks loud, 2 whispers. But 2 steers the ship subtly.",
                work: "8 needs to tone it down. 2 needs to toughen up."
            },
            truth: {
                description: "8 thinks feelings are a waste of time. 2 thinks money/success is a distraction.",
                insight: "Success means nothing without someone to share it with."
            },
            soulParams: {
                teaching: "2 teaches 8 feelings. 8 teaches 2 boundaries."
            },
            advice: [
                "8: Listen without fixing.",
                "2: Speak up without apologizing.",
                "Celebrate 8's wins, soothe 8's losses."
            ],
            viral: {
                roast: "The Trophy Wife/Husband dynamic (regardless of gender).",
                receipt: {
                    item1: { label: "8 Paying", value: "Yes" },
                    item2: { label: "2 Obeying", value: "Mostly" },
                    item3: { label: "Love or Deal?", value: "Unclear" }
                },
                redFlags: [
                    "Financial control involved.",
                    "8 bullying 2.",
                    "2 losing their identity."
                ],
                greenFlags: [
                    "8 protects 2 from the world.",
                    "2 humanizes 8.",
                    "Ideally balanced power."
                ]
            },
            deep: {
                communication: {
                    personA: "Soft, yielding, emotional.",
                    personB: "Hard, driving, logical."
                },
                triggers: "Weakness. 8 is triggered by 2's tears (sees them as manipulation or weakness). 2 is triggered by 8's anger.",
                intimacy: "Polarized. Can be very passionate due to the masculine/feminine split.",
                trajectory: "The Executive and the Diplomat. You rule the world, but 2 softens the blow."
            }
        },
        // 2 + 9: The Universal Hearts
        9: {
            core: {
                title: "The High Priestess and The Sage",
                dynamic: "Very emotional, very giving. 2 cares for the family, 9 cares for the world. You both have huge hearts.",
                gift: "Deep empathy. You understand each other's need to help and serve.",
                challenge: "Emotional flooding. You both feel everything. Who is the rock? 9 can be distant, loving humanity but ignoring the partner.",
                growth: "Prioritizing the 'Us' over the 'All'."
            },
            interaction: {
                description: "Flowing, supportive, sometimes dramatic. Lots of feelings everywhere.",
                work: "Create boundaries for your empathy."
            },
            truth: {
                description: "2 acts small, 9 acts big. 2 wants 9 to focus on them, 9 feels suffocated by 'small' love.",
                insight: "Personal love (2) vs. Universal love (9)."
            },
            soulParams: {
                teaching: "2 teaches intimacy. 9 teaches perspective."
            },
            advice: [
                "Focus on your specific relationship, not just general love.",
                "9: Show up for the small things.",
                "2: Support 9's big causes."
            ],
            viral: {
                roast: "Two martyrs fighting over who suffers more for humanity.",
                receipt: {
                    item1: { label: "Tears Shed", value: "Gallons" },
                    item2: { label: "Boundaries", value: "Zero" },
                    item3: { label: "Reality Check", value: "Bounced" }
                },
                redFlags: [
                    "Spiritual bypassing.",
                    "Ignoring your own needs.",
                    "Getting lost in emotions."
                ],
                greenFlags: [
                    "The most compassionate couple.",
                    "Healing energy.",
                    "Unconditional love."
                ]
            },
            deep: {
                communication: {
                    personA: "Personal feelings ('Me').",
                    personB: "Impersonal feelings ('Everyone')."
                },
                triggers: "Scale. 2 wants 9 to focus on the home. 9 wants 2 to focus on the world.",
                intimacy: "Deep, spiritual, and potentially overwhelming. You can drown in each other.",
                trajectory: "Healers. You will likely adopt 10 dogs or start a non-profit."
            }
        }
    },
    // LIFE PATH 3 Combinations
    3: {
        // 3 + 1: (Covered in 1+3)
        // 3 + 2: (Covered in 2+3)

        // 3 + 3: The Glitter Twins
        3: {
            core: {
                title: "The Party",
                dynamic: "Fun, creative, social, chaotic. You amplify each other's joy and lack of focus. Life is a game.",
                gift: "Never a dull moment. Laughter is the glue.",
                challenge: "No grounding. Who pays the bills? Who has the serious talks? You both avoid reality.",
                growth: "Growing up together without growing old."
            },
            interaction: {
                description: "Talking over each other, laughing, socializing. High energy, low depth unless forced.",
                work: "Sit down and talk about money/feelings seriously."
            },
            truth: {
                description: "You compete for attention. Two stars, one stage.",
                insight: "You can share the spotlight."
            },
            soulParams: {
                teaching: "To find depth in the shallow end."
            },
            advice: [
                "Get a financial advisor.",
                "Take turns telling stories.",
                "Allow silence."
            ],
            viral: {
                roast: "Two toddlers running a lemonade stand.",
                receipt: {
                    item1: { label: "Focus", value: "None" },
                    item2: { label: "Fun", value: "100%" },
                    item3: { label: "Bills Paid", value: "Late" }
                },
                redFlags: [
                    "Ignoring reality mutually.",
                    "Competing for the spotlight.",
                    "Talk with no action."
                ],
                greenFlags: [
                    "Never boring.",
                    "Constant laughter.",
                    "Creative explosion."
                ]
            },
            deep: {
                communication: {
                    personA: "Talking, interrupting, laughing.",
                    personB: "Talking, interrupting, laughing."
                },
                triggers: "Silence. If the music stops, you have to face reality.",
                intimacy: "Playful but shallow. You avoid the dark stuff.",
                trajectory: "A permanent party or a beautiful disaster. You need a third party (accountant/therapist) to survive."
            }
        },
        // 3 + 4: The Artist and The Architect
        4: {
            core: {
                title: "The Checkerboard",
                dynamic: "Complete opposites. 3 pushes boundaries, 4 sets them. 3 is chaos, 4 is order. Frustrating but necessary.",
                gift: "4 gives 3 a platform to build on. 3 teaches 4 how to enjoy the building.",
                challenge: "3 thinks 4 is boring. 4 thinks 3 is flaky. Constant judgment.",
                growth: "Integrating structure (4) with flow (3)."
            },
            interaction: {
                description: "4 tries to schedule, 3 tries to flow. 4 scowls, 3 laughs nervously.",
                work: "Meet in the middle. Scheduled fun."
            },
            truth: {
                description: "3 is afraid of 4's discipline. 4 is afraid of 3's freedom.",
                insight: "Discipline creates freedom."
            },
            soulParams: {
                teaching: "3 teaches 4 joy. 4 teaches 3 foundation."
            },
            advice: [
                "4: Don't parent 3.",
                "3: Honor your commitments to 4.",
                "Find a project: 3 designs, 4 builds."
            ],
            viral: {
                roast: "A strict teacher dating the class clown.",
                receipt: {
                    item1: { label: "Rules Broken", value: "3" },
                    item2: { label: "Rules Made", value: "4" },
                    item3: { label: "Eye Rolls", value: "Hourly" }
                },
                redFlags: [
                    "4 treating 3 like a child.",
                    "3 lying to avoid 4's judgment.",
                    "Resentment over 'fun' vs 'work'."
                ],
                greenFlags: [
                    "4 builds the stage, 3 performs.",
                    "Balancing order and chaos.",
                    "Learning from opposites."
                ]
            },
            deep: {
                communication: {
                    personA: "Expressive, exaggerated.",
                    personB: "Literal, factual."
                },
                triggers: "Responsibility. 3 feels trapped by it, 4 feels unsafe without it.",
                intimacy: "Friction. 4 finds 3's chaos unsexy, 3 finds 4's rigidity boring. You have to work for the spark.",
                trajectory: "The Odd Couple. If you respect the difference, you cover all bases. If not, you divorce."
            }
        },
        // 3 + 5: The Socialites
        5: {
            core: {
                title: "The Fireworks",
                dynamic: "The most social, fun, and dynamic pairing. You both love people, travel, and novelty. Boredom is the enemy.",
                gift: "Variety. You will never be bored. You 'get' each other's need for stimulation.",
                challenge: "Instability. Who is staying home? Who is saving money? It can burn out fast.",
                growth: "Finding stability in the chaos."
            },
            interaction: {
                description: "Fast, witty, flirtatious. You look like the most fun couple at the party.",
                work: "Slow down. Actually look at each other."
            },
            truth: {
                description: "You stay shallow to avoid pain. You distract each other from real life.",
                insight: "Intimacy requires staying still."
            },
            soulParams: {
                teaching: "3 teaches expression. 5 teaches experience."
            },
            advice: [
                "Commit to one boring night a week.",
                "Don't compete for attention.",
                "Create a shared creative vision."
            ],
            viral: {
                roast: "The couple most likely to move to a new country on a Tuesday and break up by Friday.",
                receipt: {
                    item1: { label: "Impulse Decisions", value: "Daily" },
                    item2: { label: "Boredom Level", value: "0%" },
                    item3: { label: "Savings Account", value: "Lol" }
                },
                redFlags: [
                    "You both avoid 'heavy' conversations.",
                    "Competing to be the funniest person in the room.",
                    "Ghosting each other while living together."
                ],
                greenFlags: [
                    "Telepathic humor connection.",
                    "Never having the same day twice.",
                    "Forgiving each other instantly."
                ]
            },
            deep: {
                communication: {
                    personA: "Speaks in hyperbole and emotion. Wants a reaction.",
                    personB: "Speaks in questions and devil's advocate. Wants stimulation."
                },
                triggers: "Boredom or routine. If one person wants to stay in, the other feels trapped.",
                intimacy: "Playful and experimental, but can lack emotional grounding. You connect through doing, not feeling.",
                trajectory: "You will either have the most exciting 50-year marriage or a 3-month whirlwind. There is no middle ground."
            }
        },
        // 3 + 6: The Creative Home
        6: {
            core: {
                title: "The Heart and The Art",
                dynamic: "Creative and loving. 3 brings the spark, 6 brings the warmth. A very artistic, social connection.",
                gift: "6 nurtures 3's creativity. 3 brings joy to 6's responsibilities.",
                challenge: "6 can be too parent-like for free-spirit 3. 3's flakiness hurts responsible 6.",
                growth: "Balancing duty (6) and play (3)."
            },
            interaction: {
                description: "6 takes care of 3. 3 makes 6 laugh. It's sweet but can become parent/child.",
                work: "3 needs to take responsibility."
            },
            truth: {
                description: "6 secretly judges 3 as immature. 3 secretly feels suffocated by 6's 'care'.",
                insight: "Care is not control."
            },
            soulParams: {
                teaching: "3 teaches 6 to let go. 6 teaches 3 to hold on."
            },
            advice: [
                "6: Don't fix 3's messes.",
                "3: Say thank you for the care.",
                "Decorate your home together."
            ],
            viral: {
                roast: "A messy artist dating a clean freak.",
                receipt: {
                    item1: { label: "Mess Created", value: "3" },
                    item2: { label: "Mess Cleaned", value: "6" },
                    item3: { label: "Aesthetic", value: "Perfect" }
                },
                redFlags: [
                    "6 martyring themselves.",
                    "3 taking advantage of 6's kindness.",
                    "Trying to be 'nice' instead of honest."
                ],
                greenFlags: [
                    "Most beautiful home ever.",
                    "Endless creativity.",
                    "Mutual adoration."
                ]
            },
            deep: {
                communication: {
                    personA: "Social, witty, deflecting.",
                    personB: "Caring, worried, pressing."
                },
                triggers: "Disappointment. 6 is easily disappointed by 3's flakey nature. 3 feels guilt-tripped.",
                intimacy: "Sweet and romantic. You assume traditional roles easily (Artist/Supporter).",
                trajectory: "The Studio. You build a beautiful, artistic life, as long as 6 stops trying to 'raise' 3."
            }
        },
        // 3 + 7: The Surface and The Deep
        7: {
            core: {
                title: "The Sunshine and The Shadow",
                dynamic: "3 wants to talk, 7 wants to think. 3 is out socially, 7 is in the cave. Difficult connection.",
                gift: "If it works, 3 lightens 7's load, and 7 gives depth to 3's fluff.",
                challenge: "Disconnect. 3 feels rejected by 7's silence. 7 feels drained by 3's noise.",
                growth: "Meeting at the bridge of intellect."
            },
            interaction: {
                description: "3 talks, 7 listens (or tunes out). 3 tries to entertain 7.",
                work: "3 needs to be quiet. 7 needs to speak up."
            },
            truth: {
                description: "3 is afraid of silence. 7 is afraid of noise.",
                insight: "Silence is a form of communication."
            },
            soulParams: {
                teaching: "3 teaches joy. 7 teaches truth."
            },
            advice: [
                "Find a mental connection (books, philosophy).",
                "3: Go out alone sometimes.",
                "7: Come out of the cave for the fun stuff."
            ],
            viral: {
                roast: "A talk show host dating a monk.",
                receipt: {
                    item1: { label: "Words Per Day", value: "3: 10k" },
                    item2: { label: "Words Per Day", value: "7: 10" },
                    item3: { label: "Confusion", value: "High" }
                },
                redFlags: [
                    "3 talking to fill the silence.",
                    "7 judging 3's 'depth'.",
                    "Living separate lives."
                ],
                greenFlags: [
                    "3 brings 7 light.",
                    "7 gives 3 depth.",
                    "Fascinating conversations."
                ]
            },
            deep: {
                communication: {
                    personA: "External processing (Talks to think).",
                    personB: "Internal processing (Thinks to talk)."
                },
                triggers: "Noise. 3 is noise to 7. 7 is a void to 3.",
                intimacy: "Difficult. 3 wants affirmation, 7 wants connection. You miss each other often.",
                trajectory: "The Bridge. Hard to build, but if you do, it connects two different worlds."
            }
        },
        // 3 + 8: The Showman and The Boss
        8: {
            core: {
                title: "The Power Couple (Creative)",
                dynamic: "High energy. 3 promotes, 8 produces. 3 is the face, 8 is the muscle. Very successful publicly.",
                gift: "You make things happen. 3 has the ideas, 8 has the resources.",
                challenge: "8 is too serious/work-focused for playful 3. 3 spends what 8 earns.",
                growth: "Respecting the other's currency (Joy vs. Money)."
            },
            interaction: {
                description: "Dynamic, expensive, loud. You look good together.",
                work: "Don't let money define the relationship."
            },
            truth: {
                description: "8 thinks 3 is trivial. 3 thinks 8 is hollow.",
                insight: "You both want recognition."
            },
            soulParams: {
                teaching: "3 teaches 8 to enjoy the wealth. 8 teaches 3 to create value."
            },
            advice: [
                "8: Fund 3's dreams (within reason).",
                "3: Respect 8's hard work.",
                "Plan lavish vacations."
            ],
            viral: {
                roast: "The CEO and the Influencer.",
                receipt: {
                    item1: { label: "Spending", value: "High" },
                    item2: { label: "Earning", value: "High" },
                    item3: { label: "Showing Off", value: "Very High" }
                },
                redFlags: [
                    "Transactional love.",
                    "Materialism over connection.",
                    "Using each other for status."
                ],
                greenFlags: [
                    "Power couple energy.",
                    "You make things happen.",
                    "Generous love."
                ]
            },
            deep: {
                communication: {
                    personA: "Charm and persuasion.",
                    personB: "Authority and command."
                },
                triggers: "Value. 8 values results, 3 values experience. 8 can make 3 feel useless.",
                intimacy: "Flashy and fun from the outside. Inside, it can feel like a performance.",
                trajectory: "The Empire. You look great on Instagram. Just make sure you actually like each other."
            }
        },
        // 3 + 9: The World Stage
        9: {
            core: {
                title: "The Visionaries",
                dynamic: "Ideally matched. Both creative, artistic, and generous. 3 is personal expression, 9 is universal expression.",
                gift: "Flow. You understand each other's need to express and give. Very romantic.",
                challenge: "Practicality. Who is handling the details? You can get lost in dreams and drama.",
                growth: "Grounding the vision."
            },
            interaction: {
                description: "Passionate, dramatic, artistic. Life is a movie.",
                work: "Pay the bills first, then dream."
            },
            truth: {
                description: "You feed each other's delusions.",
                insight: "Dreaming is not doing."
            },
            soulParams: {
                teaching: "3 teaches 9 the joy of now. 9 teaches 3 the bigger picture."
            },
            advice: [
                "Support each other's art.",
                "Be realistic about finances.",
                "Travel to places with culture/art."
            ],
            viral: {
                roast: "A drama queen dating a humanitarian.",
                receipt: {
                    item1: { label: "Emotions", value: "Overflowing" },
                    item2: { label: "Plans", value: "Vague" },
                    item3: { label: "Inspiration", value: "Infinite" }
                },
                redFlags: [
                    "Getting lost in fantasies.",
                    "Ignoring practical problems.",
                    "Dramatic fights for dopamine."
                ],
                greenFlags: [
                    "Creative soulmates.",
                    "Healing the world together.",
                    "Inspiring everyone around you."
                ]
            },
            deep: {
                communication: {
                    personA: "Self-expression.",
                    personB: "Universal truth."
                },
                triggers: "Reality. You both avoid it. When it hits (bills, illness), you crumble.",
                intimacy: "Romantic and idealistic. You are in love with love.",
                trajectory: "The Dreamers. Beautiful if you have a trust fund. Hard if you have to work."
            }
        }
    },
    // LIFE PATH 4 Combinations
    4: {
        // 4 + 1: (Covered in 1+4)
        // 4 + 2: (Covered in 2+4)
        // 4 + 3: (Covered in 3+4)

        // 4 + 4: The Fortress
        4: {
            core: {
                title: "The Fortress",
                dynamic: "Solid, unbreakable, and predictable. Two builders working on the same foundation. You both value safety, loyalty, and hard work.",
                gift: "Total reliability. You never have to worry about where the other stands. You build wealth and security effectively.",
                challenge: "Rigidity. You can become stuck in a rut for decades. Romance can die under the weight of routine.",
                growth: "Learning to bend without breaking."
            },
            interaction: {
                description: "Practical conversations about plans, budgets, and schedules. Very little drama.",
                work: "Schedule spontaneity. Seriously, put 'fun' in the calendar."
            },
            truth: {
                description: "You stay together because it's safe, not because it's passionate.",
                insight: "Safety is not the only virtue."
            },
            soulParams: {
                teaching: "To find freedom within structure."
            },
            advice: [
                "Take a vacation without an itinerary.",
                "Hired help for chores so you can relax.",
                "Talk about dreams, not just duties."
            ],
            viral: {
                roast: "Two bricks pretending to be people.",
                receipt: {
                    item1: { label: "Spontaneity", value: "0%" },
                    item2: { label: "Reliability", value: "100%" },
                    item3: { label: "Bedtime", value: "Early" }
                },
                redFlags: [
                    "Falling into a coma of routine.",
                    "Thinking work is a personality.",
                    "Zero romance."
                ],
                greenFlags: [
                    "Unbreakable foundation.",
                    "Wealth building.",
                    "Trust is absolute."
                ]
            },
            deep: {
                communication: {
                    personA: "Factual, blunt.",
                    personB: "Factual, blunt."
                },
                triggers: "Change. You both hate it. You will stay in a bad situation just because it's familiar.",
                intimacy: "Physical and routine. Not verbal. You show love by fixing the sink.",
                trajectory: "The Rock. You will be together forever, even if you're bored to death."
            }
        },
        // 4 + 5: The Tornado and The Stone
        5: {
            core: {
                title: "The Anchor and The Sail",
                dynamic: "One of the most difficult pairings. 4 wants to stay, 5 wants to go. 4 wants rules, 5 breaks them.",
                gift: "If balanced, 4 gives 5 a place to land, and 5 shows 4 the world.",
                challenge: "Fundamental value clash. 4 sees 5 as irresponsible. 5 sees 4 as a prison warden.",
                growth: "Respecting the other's need for their opposite polarities."
            },
            interaction: {
                description: "4 tries to plan, 5 changes the plan. 4 gets angry, 5 laughs it off or leaves.",
                work: "4 needs to loosen the grip. 5 needs to honor promises."
            },
            truth: {
                description: "4 envies 5's freedom. 5 envies 4's stability.",
                insight: "You attract what you suppress."
            },
            soulParams: {
                teaching: "4 teaches 5 roots. 5 teaches 4 wings."
            },
            advice: [
                "4: Don't ask 'Where are you going?' every time.",
                "5: Be home when you say you will.",
                "Have separate bank accounts."
            ],
            viral: {
                roast: "A prison warden dating an escape artist.",
                receipt: {
                    item1: { label: "Attempts to Control", value: "High" },
                    item2: { label: "Attempts to Flee", value: "High" },
                    item3: { label: "Tension", value: "Max" }
                },
                redFlags: [
                    "4 controlling 5's schedule.",
                    "5 lying about whereabouts.",
                    "Mutual resentment."
                ],
                greenFlags: [
                    "4 gives 5 roots.",
                    "5 gives 4 wings.",
                    "Growth through friction."
                ]
            },
            deep: {
                communication: {
                    personA: "Defines limits.",
                    personB: "Tests limits."
                },
                triggers: "Freedom vs. Security. 5's freedom feels like danger to 4. 4's security feels like death to 5.",
                intimacy: "Volatile. The friction creates sparks, but it burns out.",
                trajectory: "The Tornado and the Stone. Usually ends in a breakup unless you live in separate houses."
            }
        },
        // 4 + 6: The Homemakers
        6: {
            core: {
                title: "The Traditionalists",
                dynamic: "Very compatible. 4 provides the house, 6 makes it a home. You both value family, duty, and community.",
                gift: "A stable, beautiful life. You are the pillars of your community/family.",
                challenge: "Self-righteousness. You both think your way is the 'right' way. 4 is stubborn, 6 is perfectionistic.",
                growth: "Allowing imperfection."
            },
            interaction: {
                description: "Domestic bliss or domestic control. You focus heavily on house/family matters.",
                work: "Let the small things slide."
            },
            truth: {
                description: "You judge others for not being as 'together' as you are.",
                insight: "Perfection is a trap."
            },
            soulParams: {
                teaching: "4 teaches 6 boundaries. 6 teaches 4 beauty."
            },
            advice: [
                "Don't critique each other's methods.",
                "Focus on romance, not just running the household.",
                "Host events together."
            ],
            viral: {
                roast: "The couple most likely to judge everyone else's life choices silently over dinner.",
                receipt: {
                    item1: { label: "Rules Enforced", value: "Strict" },
                    item2: { label: "Spontaneity", value: "None" },
                    item3: { label: "Family Empire", value: "Building" }
                },
                redFlags: [
                    "Using 'duty' to manipulate guilt.",
                    "Silent resentment instead of fighting.",
                    "Treating the relationship like a business."
                ],
                greenFlags: [
                    "Unshakable loyalty.",
                    "You show up when it matters.",
                    "Building a legacy together."
                ]
            },
            deep: {
                communication: {
                    personA: "Speaks in facts, plans, and logistics. Needs to know the 'what' and 'when'.",
                    personB: "Speaks in obligations and care. Needs to know the 'who' and 'why'."
                },
                triggers: "Chaos or change of plans. 4 gets rigid, 6 gets anxious/martyr-ish.",
                intimacy: "Comforting and secure. Romance is expressed through acts of service and creating a sanctuary.",
                trajectory: "The bedrock of society. You will build a fortress of a life, but you must remember to open the windows sometimes."
            }
        },
        // 4 + 7: The Masterminds
        7: {
            core: {
                title: "The Builder and The Monk",
                dynamic: "Intellectually solid. 4 builds on earth, 7 builds in the mind. You both value privacy and quality.",
                gift: "Mutual respect. You don't need constant validation. A quiet, dignified relationship.",
                challenge: "Emotional dryness. 4 is work-focused, 7 is thought-focused. Who focuses on the heart?",
                growth: "Opening up without feeling exposed."
            },
            interaction: {
                description: "Serious, quiet, efficient. You solve problems well together.",
                work: "Share a feeling, not just a thought."
            },
            truth: {
                description: "You hide behind work (4) and analysis (7) to avoid intimacy.",
                insight: "Vulnerability is efficient for connection."
            },
            soulParams: {
                teaching: "4 teaches 7 reality. 7 teaches 4 spirituality."
            },
            advice: [
                "4: Don't pressure 7 to socialize.",
                "7: Respect 4's need for material security.",
                "Take long walks in nature."
            ],
            viral: {
                roast: "Two introverts sitting in silence (romantically?).",
                receipt: {
                    item1: { label: "Silence", value: "Preferred" },
                    item2: { label: "Parties Attended", value: "0" },
                    item3: { label: "Depth", value: "Infinite" }
                },
                redFlags: [
                    "Becoming hermits.",
                    "Intellectual snobbery.",
                    "Forgetting to connect emotionally."
                ],
                greenFlags: [
                    "Intellectual respect.",
                    "Zero drama.",
                    "High quality life."
                ]
            },
            deep: {
                communication: {
                    personA: "Practical, worldly.",
                    personB: "Abstract, spiritual."
                },
                triggers: "Shallowness. 7 thinks 4 is too materialistic. 4 thinks 7 is too 'head in the clouds'.",
                intimacy: "Quiet and private. You respect each other's boundaries perfectly.",
                trajectory: "The Hermitage. A quiet, dignified life. Very stable, very private."
            }
        },
        // 4 + 8: The Empire
        8: {
            core: {
                title: "The Powerhouse (Material)",
                dynamic: "The ultimate business partners. 4 manages, 8 leads. You both understand hard work, money, and success.",
                gift: "Results. You get things done. You build wealth and legacy.",
                challenge: "All work, no play. You can become just business partners. 8 risks too much for cautious 4.",
                growth: "Defining success as happiness, not just money."
            },
            interaction: {
                description: "Productive. You talk shop constantly. You respect each other's competence.",
                work: "Stop working at 6 PM."
            },
            truth: {
                description: "You measure love by provision/success.",
                insight: "You are worthy even if you fail."
            },
            soulParams: {
                teaching: "4 teaches 8 caution. 8 teaches 4 expansion."
            },
            advice: [
                "Plan romance like you plan business.",
                "Don't compete on who works harder.",
                "Celebrate wins without immediately setting the next goal."
            ],
            viral: {
                roast: "A couple that reviews their quarterly earnings on date night.",
                receipt: {
                    item1: { label: "Net Worth", value: "Rising" },
                    item2: { label: "Romance", value: "Outsourced" },
                    item3: { label: "Efficiency", value: "100%" }
                },
                redFlags: [
                    "Working 80 hours a week.",
                    "Treating children like employees.",
                    "No vulnerability."
                ],
                greenFlags: [
                    "Building a dynasty.",
                    "Pushing each other to greatness.",
                    "Unstoppable team."
                ]
            },
            deep: {
                communication: {
                    personA: "Managerial.",
                    personB: "Executive."
                },
                triggers: "Failure. You both fear it. You project that fear onto each other.",
                intimacy: "Power-based. You respect strength. Weakness turns you off.",
                trajectory: "The Power Couple (Material). You will be rich, but will you be happy?"
            }
        },
        // 4 + 9: The Common Good
        9: {
            core: {
                title: "The Builder and The Philanthropist",
                dynamic: "Difficult. 4 fits in a box, 9 has no box. 4 cares about the details, 9 cares about the big picture.",
                gift: "4 can build the foundation for 9's humanitarian dreams.",
                challenge: "4 thinks 9 is impractical. 9 thinks 4 is narrow-minded. Frustration is common.",
                growth: "See the value in the other's perspective."
            },
            interaction: {
                description: "4 tries to organize 9. 9 resists being organized.",
                work: "4 needs to let go. 9 needs to show up."
            },
            truth: {
                description: "You operate in different dimensions (Local vs. Universal).",
                insight: "You can meet in the heart."
            },
            soulParams: {
                teaching: "4 teaches 9 focus. 9 teaches 4 letting go."
            },
            advice: [
                "Find a shared cause.",
                "4: Don't critique 9's dreams.",
                "9: Respect 4's systems."
            ],
            viral: {
                roast: "An accountant dating a hippie.",
                receipt: {
                    item1: { label: "Spreadsheets (4)", value: "Many" },
                    item2: { label: "Visions (9)", value: "Many" },
                    item3: { label: "Agreement", value: "Low" }
                },
                redFlags: [
                    "4 crushing 9's spirit.",
                    "9 flaking on 4's plans.",
                    "Constant frustration."
                ],
                greenFlags: [
                    "4 builds the school 9 dreamed of.",
                    "Balance of heaven and earth.",
                    "Serving the world."
                ]
            },
            deep: {
                communication: {
                    personA: "Details.",
                    personB: "Concepts."
                },
                triggers: "Perspective. 4 zooms in, 9 zooms out. You argue about what matters.",
                intimacy: "Hard work. 4 feels unappreciated, 9 feels misunderstood.",
                trajectory: "The Architect and the Dreamer. If you collaborate, you change the world. If you fight, you go nowhere."
            }
        }
    },

    // LIFE PATH 5 Combinations
    5: {
        // 5 + 1: (Covered in 1+5)
        // 5 + 2: (Covered in 2+5)
        // 5 + 3: (Covered in 3+5)
        // 5 + 4: (Covered in 4+5)

        // 5 + 5: The Freedom Fighters
        5: {
            core: {
                title: "The Wild Ones",
                dynamic: "Pure chaos and adrenaline. You both need constant stimulation. Freedom is your religion.",
                gift: "No boredom, ever. Total understanding of the need for space and adventure.",
                challenge: "Who grounds the energy? You can spin out of control. Commitment phobia x2.",
                growth: "Choosing to stay when the excitement fades."
            },
            interaction: {
                description: "Fast, exciting, unpredictable. You might break up and make up weekly.",
                work: "Plant some roots somewhere."
            },
            truth: {
                description: "You use chaos to avoid intimacy.",
                insight: "True freedom includes the freedom to commit."
            },
            soulParams: {
                teaching: "To find adventure in stillness."
            },
            advice: [
                "Don't enable each other's bad habits.",
                "Create a calm sanctuary together.",
                "Check your bank account."
            ],
            viral: {
                roast: "Two commitment-phobes trying to date.",
                receipt: {
                    item1: { label: "Adrenaline", value: "High" },
                    item2: { label: "Rent Paid", value: "Maybe" },
                    item3: { label: "Stability", value: "0%" }
                },
                redFlags: [
                    "Living purely for dopamine.",
                    "Ghosting responsibilities.",
                    "Enabling each other's recklessness."
                ],
                greenFlags: [
                    "Life is an adventure.",
                    "Zero judgment.",
                    "Best travel buddies ever."
                ]
            },
            deep: {
                communication: {
                    personA: "Fast, loud, scattered.",
                    personB: "Fast, loud, scattered."
                },
                triggers: "Boredom. You panic if nothing is happening. You create drama just to feel something.",
                intimacy: "Fun but fleeing. It's hard to hold space for deep emotion when you're always moving.",
                trajectory: "A blaze of glory or a slow burnout. You need an anchor provided by the outside world."
            }
        },
        // 5 + 6: The Wanderer and The Nester
        6: {
            core: {
                title: "The Bird and The Cage",
                dynamic: "6 wants commitment, 5 wants freedom. 6 wants to nurture, 5 wants to experience. Opposites attract and repel.",
                gift: "6 gives 5 a home. 5 helps 6 loosen up.",
                challenge: "6 tries to 'fix' or 'save' wild 5. 5 feels trapped by 6's expectations.",
                growth: "Redefining what 'home' means."
            },
            interaction: {
                description: "6 asks 'When are we getting married/settled?'. 5 changes the subject.",
                work: "Honest conversation about commitment timelines."
            },
            truth: {
                description: "6 wants to own 5. 5 wants to use 6 as a safety net.",
                insight: "Love is not possession."
            },
            soulParams: {
                teaching: "5 teaches 6 autonomy. 6 teaches 5 responsibility."
            },
            advice: [
                "6: Stop mothering 5.",
                "5: Keep your promises.",
                "Travel together (satisfies 5) to see family (satisfies 6)."
            ],
            viral: {
                roast: "A stressed mother dating her rebellious teenager.",
                receipt: {
                    item1: { label: "Nagging (6)", value: "Daily" },
                    item2: { label: "Running Away (5)", value: "Daily" },
                    item3: { label: "Cohesion", value: "Low" }
                },
                redFlags: [
                    "6 trying to 'domesticate' 5.",
                    "5 lying to get freedom.",
                    "Resentment loops."
                ],
                greenFlags: [
                    "6 gives 5 a warm home.",
                    "5 teaches 6 to live.",
                    "Balance of roots and wings."
                ]
            },
            deep: {
                communication: {
                    personA: "Protective/Controlling.",
                    personB: "Evasive/Defensive."
                },
                triggers: "Expectation. 6 has many expectations, 5 hates all of them. 5 feels trapped, 6 feels disrespected.",
                intimacy: "Warm if 5 stays still. 6 pours love, but 5 might put up a shield.",
                trajectory: "The Bird and the Cage. Can work if the cage door is always open. If 6 locks it, 5 dies (or leaves)."
            }
        },
        // 5 + 7: The Philosophers
        7: {
            core: {
                title: "The Seeker and The Skeptic",
                dynamic: "Mental and spiritual. 5 seeks experience in the world, 7 seeks truth in the mind. You are both loners in a way.",
                gift: "Great conversations. You respect each other's need for space. No clinginess.",
                challenge: "Drifting apart. You can live parallel lives without intersecting.",
                growth: "Connecting the inner world (7) with the outer world (5)."
            },
            interaction: {
                description: "Intellectual, distant, respectful. 5 goes out, 7 stays in.",
                work: "Schedule connection points."
            },
            truth: {
                description: "You are both running from emotional intimacy.",
                insight: "The mind cannot hold the heart."
            },
            soulParams: {
                teaching: "5 teaches 7 to live. 7 teaches 5 to reflect."
            },
            advice: [
                "Share your discoveries.",
                "Don't ghost each other.",
                "Explore metaphysics together."
            ],
            viral: {
                roast: "Two ghosts passing in the night.",
                receipt: {
                    item1: { label: "Physical Touch", value: "Rare" },
                    item2: { label: "Mental Touch", value: "Deep" },
                    item3: { label: "Texts Returned", value: "Never" }
                },
                redFlags: [
                    "Forgetting you're in a relationship.",
                    "Living parallel lives.",
                    "Intellectualizing feelings."
                ],
                greenFlags: [
                    "Mental stimulation.",
                    "Huge autonomy.",
                    "Respecting the journey."
                ]
            },
            deep: {
                communication: {
                    personA: "Curious, probing.",
                    personB: "Secretive, analytical."
                },
                triggers: "Intimacy. 5 wants experience, 7 wants truth. Emotional vulnerability scares you both.",
                intimacy: "Dry. You connect better in a library or a museum than in bed (sometimes).",
                trajectory: "The Philosophers. A great friendship that might lack romantic glue."
            }
        },
        // 5 + 8: The Executives
        8: {
            core: {
                title: "The Dealmakers",
                dynamic: "High energy, money, and power. 5 takes risks, 8 manages assets. You both want the best in life.",
                gift: "A power couple dynamic with excitement. 8 funds the adventures, 5 brings the ideas.",
                challenge: "Control. 8 wants to control the outcome, 5 refuses to be controlled. 5 is reckless with money, 8 is strict.",
                growth: "Respecting authority (8) vs. respecting liberty (5)."
            },
            interaction: {
                description: "Loud, successful, argumentative. You are big personalities.",
                work: "8 needs to stop bossing 5. 5 needs to stop ignoring 8."
            },
            truth: {
                description: "You use status/money to measure worth.",
                insight: "Worth is internal."
            },
            soulParams: {
                teaching: "5 teaches 8 adaptability. 8 teaches 5 discipline."
            },
            advice: [
                "8: Let 5 have a 'play' budget.",
                "5: Respect 8's hard work.",
                "Take expensive, adventurous vacations."
            ],
            viral: {
                roast: "A reckless spender dating a strict accountant.",
                receipt: {
                    item1: { label: "Money Made (8)", value: "High" },
                    item2: { label: "Money Spent (5)", value: "High" },
                    item3: { label: "Fights over Money", value: "Weekly" }
                },
                redFlags: [
                    "8 controlling 5 with money.",
                    "5 acting like a spoiled child.",
                    "Power struggles."
                ],
                greenFlags: [
                    "Unstoppable energy.",
                    "Living the high life.",
                    "8 funds 5's dreams."
                ]
            },
            deep: {
                communication: {
                    personA: "Persuasive, charming.",
                    personB: "Commanding, direct."
                },
                triggers: "Control. 8 needs it, 5 hates it. It's the central conflict of your lives.",
                intimacy: "High voltage. Passionate fights lead to passionate makeups. But it's exhausting.",
                trajectory: "The Dealmakers. If 5 respects 8's empire and 8 respects 5's freedom, you rule the world."
            }
        },
        // 5 + 9: The Humanitarians
        9: {
            core: {
                title: "The Global Citizens",
                dynamic: "You both care about the world and freedom. 5 wants personal freedom, 9 wants universal freedom. Very compatible vision.",
                gift: "A life of travel, learning, and growth. You accept each other's fluid nature.",
                challenge: "Practicality. Neither likes the boring details of life. You can float away.",
                growth: "Grounding your ideals."
            },
            interaction: {
                description: "Inspiring, fluid, changing. You likely travel or move often.",
                work: "Hire an accountant."
            },
            truth: {
                description: "You avoid difficult emotions by moving/changing focus.",
                insight: "You can't run from yourself."
            },
            soulParams: {
                teaching: "5 teaches 9 to experience joy. 9 teaches 5 compassion."
            },
            advice: [
                "Volunteer abroad together.",
                "Respect 9's emotions.",
                "Respect 5's need for fun."
            ],
            viral: {
                roast: "Two people fleeing the country to avoid real life.",
                receipt: {
                    item1: { label: "Passports Stamped", value: "Full" },
                    item2: { label: "Roots", value: "None" },
                    item3: { label: "Causes Supported", value: "All" }
                },
                redFlags: [
                    "Using 'ideals' to avoid intimacy.",
                    "Never settling down.",
                    "Ignoring practical problems."
                ],
                greenFlags: [
                    "World changers.",
                    "Total acceptance.",
                    "Beautiful adventures."
                ]
            },
            deep: {
                communication: {
                    personA: "Personal freedom.",
                    personB: "Universal freedom."
                },
                triggers: "Commitment. You both fear being tied down. You might float away from each other.",
                intimacy: "Spacious. A lot of freedom, maybe too much. You need a reason to stay together.",
                trajectory: "The Global Citizens. Perfect for a nomadic lifestyle. Hard for a mortgage."
            }
        }
    },

    // LIFE PATH 6 Combinations
    6: {
        // 6 + 1: (Covered in 1+6)
        // 6 + 2: (Covered in 2+6)
        // 6 + 3: (Covered in 3+6)
        // 6 + 4: (Covered in 4+6)
        // 6 + 5: (Covered in 5+6)

        // 6 + 6: The Caretakers
        6: {
            core: {
                title: "The Pod",
                dynamic: "Double the care, double the responsibility. You are heavily focused on home, family, and duty.",
                gift: "A beautiful, harmonious home. You are the couple everyone relies on.",
                challenge: "Codependency. You can become enmeshed. Also, self-righteousness—you both think you know best.",
                growth: "Letting go of 'shoulds'."
            },
            interaction: {
                description: "Nurturing, potentially smothering. 'Did you eat?' 'Put on a sweater.'",
                work: "Stop parenting each other."
            },
            truth: {
                description: "You judge everyone else.",
                insight: "Judgment is not love."
            },
            soulParams: {
                teaching: "To love without expectation."
            },
            advice: [
                "Get out of the house.",
                "Don't complain about how much you do for others.",
                "Love yourself as much as you love the other."
            ],
            viral: {
                roast: "Two grandmothers fighting over who baked the better pie.",
                receipt: {
                    item1: { label: "Care Given", value: "Too much" },
                    item2: { label: "Resentment", value: "Simmering" },
                    item3: { label: "Casseroles", value: "Daily" }
                },
                redFlags: [
                    "Keeping score of sacrifices.",
                    "Guilt-tripping implies affection.",
                    "Becoming hermits in your home."
                ],
                greenFlags: [
                    "Ideally nurturing.",
                    "Safest home ever.",
                    "Deep loyalty."
                ]
            },
            deep: {
                communication: {
                    personA: "Passive-aggressive care.",
                    personB: "Passive-aggressive care."
                },
                triggers: "Ingratitude. If you don't thank each other for the tea, it's a war crime.",
                intimacy: "Cozy but stifling. You can become more like siblings or caretakers than lovers.",
                trajectory: "The Pod. Safe, warm, and potentially suffocating. Open a window."
            }
        },
        // 6 + 7: The Fixer and The Loner
        7: {
            core: {
                title: "The Heart and The Mind",
                dynamic: "Difficult. 6 wants to be close/fix things. 7 wants to be alone/analyze things. 6 feels shut out.",
                gift: "If 6 gives space, 7 gives wisdom. 6 can warm up 7's world.",
                challenge: "Proximity. 6 stands at the door knocking, 7 locks it. 6 takes 7's need for space as personal rejection.",
                growth: "Understanding different love languages."
            },
            interaction: {
                description: "6 pursues, 7 retreats. The classic distancer-pursuer dance.",
                work: "6 needs to back off. 7 needs to open up."
            },
            truth: {
                description: "6 needs to be needed. 7 needs to not be needed.",
                insight: "You are whole on your own."
            },
            soulParams: {
                teaching: "6 teaches 7 connection. 7 teaches 6 solitude."
            },
            advice: [
                "6: Get a hobby that isn't the relationship.",
                "7: Say 'I love you' verbally.",
                "Respect the difference in social needs."
            ],
            viral: {
                roast: "A golden retriever dating a cat.",
                receipt: {
                    item1: { label: "Retriever Energy", value: "6" },
                    item2: { label: "Cat Energy", value: "7" },
                    item3: { label: "Scratches", value: "Frequent" }
                },
                redFlags: [
                    "6 chasing/nagging.",
                    "7 icing 6 out.",
                    "6 treating 7 like a project."
                ],
                greenFlags: [
                    "6 provides safety.",
                    "7 provides wisdom.",
                    "Learning opposite ways of love."
                ]
            },
            deep: {
                communication: {
                    personA: "Emotional demand.",
                    personB: "Intellectual withdrawal."
                },
                triggers: "Space. 6 closes the gap, 7 widens it. It's a constant elasticity test.",
                intimacy: "One-sided often. 6 does the emotional lifting, 7 watches. 7 loves deeply but quietly.",
                trajectory: "The Fixer and the Loner. 6 must stop fixing. 7 must stop hiding."
            }
        },
        // 6 + 8: The Power Couple (Domestic)
        8: {
            core: {
                title: "The Provider and The Nurturer",
                dynamic: "Very traditional and powerful. 8 brings the resources, 6 manages the family/home. It works well.",
                gift: "Security and status. You look like the perfect family.",
                challenge: "8 can be too domineering for 6. 6's emotional demands annoy efficient 8.",
                growth: "Valuing the invisible work (6) as much as the visible work (8)."
            },
            interaction: {
                description: "Supportive roles. 8 works, 6 cares. 8 decides, 6 advises.",
                work: "8 needs to be present, not just a provider."
            },
            truth: {
                description: "You prioritize image over intimacy.",
                insight: "Success is not a replace for connection."
            },
            soulParams: {
                teaching: "6 teaches 8 compassion. 8 teaches 6 strength."
            },
            advice: [
                "8: Leave work at the office.",
                "6: detailed appreciation of 8's effort.",
                "Plan family empire goals."
            ],
            viral: {
                roast: "The 1950s sitcom couple (with more money).",
                receipt: {
                    item1: { label: "Role Clarity", value: "High" },
                    item2: { label: "Romance", value: "Traditional" },
                    item3: { label: "Power Balance", value: "8 leads" }
                },
                redFlags: [
                    "8 treating 6 like a subordinate.",
                    "6 losing identity in the family.",
                    "Materialism replacing love."
                ],
                greenFlags: [
                    "Perfect public image.",
                    "Successful family unit.",
                    "Loyalty."
                ]
            },
            deep: {
                communication: {
                    personA: "Emotional/Supportive.",
                    personB: "Direct/Authoritative."
                },
                triggers: "Sensitivity. 8 steamrolls 6. 6's feelings are 'inefficient' to 8.",
                intimacy: "Structured. 8 protects, 6 nurtures. It works if you like tradition.",
                trajectory: "The Dynasty. You raise successful kids and own a nice house. Just make sure you talk."
            }
        },
        // 6 + 9: The Healers
        9: {
            core: {
                title: "The Lovers of the World",
                dynamic: "Deeply compatible in values. 6 loves the family, 9 loves the world. Both are giving and artistic.",
                gift: "A relationship based on service and love. Very compassionate.",
                challenge: "6 focuses on the micro (family), 9 focuses on the macro (humanity). 6 can feel 9 is too distant/abstract.",
                growth: "Balancing the near and the far."
            },
            interaction: {
                description: "Loving, sacrificing, supportive. You give a lot.",
                work: "Keep some energy for yourselves."
            },
            truth: {
                description: "You are martyrs. You sacrifice to feel worthy.",
                insight: "You don't need to bleed to be loved."
            },
            soulParams: {
                teaching: "6 teaches 9 personal love. 9 teaches 6 unconditional love."
            },
            advice: [
                "Don't over-give.",
                "Support 9's causes, but demand presence at home.",
                "Create a sanctuary together."
            ],
            viral: {
                roast: "Two martyrs competing for the Nobel Peace Prize.",
                receipt: {
                    item1: { label: "Self-Sacrifice", value: "MAX" },
                    item2: { label: "Boundaries", value: "None" },
                    item3: { label: "Guilt", value: "Shared" }
                },
                redFlags: [
                    "Ignoring your own needs completely.",
                    "Resenting the world + each other.",
                    "Burnout."
                ],
                greenFlags: [
                    "Deepest compassion.",
                    "Healing energy.",
                    "True service."
                ]
            },
            deep: {
                communication: {
                    personA: "Personal care.",
                    personB: "Universal care."
                },
                triggers: "Priorities. 6 puts family first, 9 puts the world first. 6 feels neglected for 'strangers'.",
                intimacy: "Soft and spiritual. You bond over helping others.",
                trajectory: "The Healers. Beautiful soul connection, provided you don't give away everything you own."
            }
        }
    },
    // LIFE PATH 7 Combinations
    7: {
        // 7 + 1: (Covered in 1+7)
        // 7 + 2: (Covered in 2+7)
        // 7 + 3: (Covered in 3+7)
        // 7 + 4: (Covered in 4+7)
        // 7 + 5: (Covered in 5+7)
        // 7 + 6: (Covered in 6+7)

        // 7 + 7: The Hermit Kingdom
        7: {
            core: {
                title: "The Silent Bond",
                dynamic: "Profoundly quiet, psychic, and respectful. You both understand the need for silence. It's not empty silence; it's full.",
                gift: "Total lack of pressure. You can be alone together. You don't need to perform.",
                challenge: "Who initiates? You can both retreat so far into your separate caves/minds that the relationship atrophies.",
                growth: "Learning to bridge the physical gap."
            },
            interaction: {
                description: "You read side-by-side. You have deep discussions about the universe, then go silent for hours.",
                work: "Schedule physical intimacy or it will disappear."
            },
            truth: {
                description: "You are hiding from the world together.",
                insight: "The world is not the enemy."
            },
            soulParams: {
                teaching: "To find God in the other, not just in solitude."
            },
            advice: [
                "Go unrelated places (movies, museums) to have external input.",
                "Don't isolate completely.",
                "Touch each other daily."
            ],
            viral: {
                roast: "Two hermits who sometimes wave at each other.",
                receipt: {
                    item1: { label: "Words Spoken", value: "0" },
                    item2: { label: "Books Read", value: "100" },
                    item3: { label: "Eye Contact", value: "Avoiding" }
                },
                redFlags: [
                    "Forgetting you live together.",
                    "Using 'spirituality' to avoid sex.",
                    "Becoming roommates."
                ],
                greenFlags: [
                    "Telepathic understanding.",
                    "Zero drama.",
                    "Respect for silence."
                ]
            },
            deep: {
                communication: {
                    personA: "Internal.",
                    personB: "Internal."
                },
                triggers: "Noise. You both hate it. But you also hate the silence if it feels 'heavy'.",
                intimacy: "Rare but profound. You connect in the ether, not always in the body.",
                trajectory: "The Hermit Kingdom. Peaceful, quiet, and perhaps a bit lonely. You need to make an effort to be human."
            }
        },
        // 7 + 8: The Mystic and The Boss
        8: {
            core: {
                title: "The Strategy",
                dynamic: "8 runs the world, 7 understands how the world works. 8 is the body, 7 is the mind. Powerful if respectable.",
                gift: "8 gives 7 the resources to study/explore. 7 gives 8 the strategy to win.",
                challenge: "Values. 8 values money/status, 7 values truth/wisdom. 7 can look down on 8's materialism.",
                growth: "Merging the spiritual (7) and the material (8)."
            },
            interaction: {
                description: "8 talks business, 7 listens and gives a one-sentence solution that blows 8's mind.",
                work: "8 needs to respect 7's silence. 7 needs to respect 8's noise."
            },
            truth: {
                description: "7 thinks they are superior. 8 thinks they are superior. Drop the ego.",
                insight: "Matter needs Spirit. Spirit needs Matter."
            },
            soulParams: {
                teaching: "7 teaches 8 meaningfulness. 8 teaches 7 manifestation."
            },
            advice: [
                "8: Don't force 7 to network.",
                "7: Support 8's ambitions from behind the scenes.",
                "Invest in knowledge together."
            ],
            viral: {
                roast: "The Monk and The Millionaire.",
                receipt: {
                    item1: { label: "Cash (8)", value: "High" },
                    item2: { label: "Wisdom (7)", value: "High" },
                    item3: { label: "Common Ground", value: "Low" }
                },
                redFlags: [
                    "8 judging 7's lack of ambition.",
                    "7 judging 8's greed.",
                    "Living in different worlds."
                ],
                greenFlags: [
                    "8 funds the research, 7 finds the truth.",
                    "Strategic mastery.",
                    "Respecting differences."
                ]
            },
            deep: {
                communication: {
                    personA: "Direct, loud.",
                    personB: "Subtle, quiet."
                },
                triggers: "Priorities. 8 prioritizes the external, 7 the internal. You fundamentally disagree on what 'success' means.",
                intimacy: "Challenging. 8 wants to possess, 7 wants to be free. Requires compromise.",
                trajectory: "The Strategy. You can build an empire (8) based on truth (7), but you might never truly 'get' each other."
            }
        },
        // 7 + 9: The Spiritual Seekers
        9: {
            core: {
                title: "The Guru and The Humanitarian",
                dynamic: "Very spiritual. 7 leads the mind, 9 leads the heart/soul. You both care about 'higher' things.",
                gift: "Deep conversations about the meaning of life. You are on the same frequency.",
                challenge: "Disconnect from reality. Who pays the electric bill? You can be so 'high' you forget to be human.",
                growth: "Grounding the spiritual connection."
            },
            interaction: {
                description: "Distant but loving. 7 is cool, 9 is warm. You meet in the realm of ideas and philosophy.",
                work: "Do practical things together (cook, clean)."
            },
            truth: {
                description: "You avoid the messy, gritty parts of humanity.",
                insight: "Enlightenment includes the laundry."
            },
            soulParams: {
                teaching: "7 teaches 9 discernment. 9 teaches 7 compassion."
            },
            advice: [
                "Meditate together.",
                "Don't use spirituality to bypass relationship issues.",
                "Keep a joint budget."
            ],
            viral: {
                roast: "Two aliens trying to understand earth.",
                receipt: {
                    item1: { label: "Humaning", value: "Failed" },
                    item2: { label: "Philosophizing", value: "A+" },
                    item3: { label: "Dishes Done", value: "No" }
                },
                redFlags: [
                    "Dissociating from reality.",
                    "Ignoring bills/chores.",
                    "Superiority complex ('we are so evolved')."
                ],
                greenFlags: [
                    "Soulmate connection.",
                    "Teaching each other.",
                    "Serving the light."
                ]
            },
            deep: {
                communication: {
                    personA: "Abstract (Mental).",
                    personB: "Abstract (Heart)."
                },
                triggers: "Reality. The doorbell ringing is a crisis. You struggle with the mundane.",
                intimacy: "Beautiful and high-vibrational. But can you survive a trip to IKEA?",
                trajectory: "The Spiritual Seekers. Wonderful if you have a patron. Hard if you have to hustle."
            }
        }
    },

    // LIFE PATH 8 Combinations
    8: {
        // 8 + 1: (Covered in 1+8)
        // 8 + 2: (Covered in 2+8)
        // 8 + 3: (Covered in 3+8)
        // 8 + 4: (Covered in 4+8)
        // 8 + 5: (Covered in 5+8)
        // 8 + 6: (Covered in 6+8)
        // 8 + 7: (Covered in 7+8)

        // 8 + 8: The Merger
        8: {
            core: {
                title: "The Empire Builders",
                dynamic: "Pure power. Two bosses, one relationship. It's explosive, expensive, and impressive.",
                gift: "You can conquer the world. Literally. You understand the drive for success like no one else.",
                challenge: "Power struggle. If you disagree, it's World War III. Neither submits. Romance is a negotiation.",
                growth: "Surrendering control to intimacy."
            },
            interaction: {
                description: "Intense. You argue over who is right, who leads, who decides. But you respect strength.",
                work: "Find a domain where the other is the boss and submit to it."
            },
            truth: {
                description: "You fight for dominance because you are afraid of vulnerability.",
                insight: "Love is not a transaction."
            },
            soulParams: {
                teaching: "To be powerful enough to be weak."
            },
            advice: [
                "Leave work at the door (impossible, but try).",
                "Don't compete on income.",
                "Take turns leading."
            ],
            viral: {
                roast: "World War III or the cover of Forbes.",
                receipt: {
                    item1: { label: "Power Plays", value: "Daily" },
                    item2: { label: "Surrender", value: "Never" },
                    item3: { label: "Success", value: "Guaranteed" }
                },
                redFlags: [
                    "Trying to destroy each other.",
                    "Using money as a weapon.",
                    "Zero vulnerability."
                ],
                greenFlags: [
                    "Unstoppable force.",
                    "Mutual respect for strength.",
                    "Building a dynasty."
                ]
            },
            deep: {
                communication: {
                    personA: "Commanding.",
                    personB: "Commanding."
                },
                triggers: "Weakness. You despise it in yourselves and each other. You only show armor.",
                intimacy: "Combative passion. The makeup sex is great, but the fight that led to it was scary.",
                trajectory: "The Merger. You will own everything, but you might burn the house down."
            }
        },
        // 8 + 9: The Executive and The Philanthropist
        9: {
            core: {
                title: "The Benefactors",
                dynamic: "8 makes the money, 9 gives it away. 8 builds, 9 heals. A powerful, if contradictory, pairing.",
                gift: "8 provides the structure for 9's vision. 9 gives 8 a purpose beyond money.",
                challenge: "8 can be ruthless, 9 is compassionate. 9 judges 8's greed, 8 judges 9's naivety.",
                growth: "Using power (8) for good (9)."
            },
            interaction: {
                description: "8 drives, 9 directs. 8 focuses on the 'how', 9 focuses on the 'why'.",
                work: "Align your goals. Make money TO help people."
            },
            truth: {
                description: "8 feels used for money. 9 feels controlled by money.",
                insight: "Money is just energy."
            },
            soulParams: {
                teaching: "8 teaches 9 effectiveness. 9 teaches 8 heart."
            },
            advice: [
                "8: Don't belittle 9's lack of business sense.",
                "9: Don't shame 8's desire for wealth.",
                "Run a charity gala together."
            ],
            viral: {
                roast: "The CEO and the Hippie trying to agree on a budget.",
                receipt: {
                    item1: { label: "Power Clashes", value: "Daily" },
                    item2: { label: "Net Worth Goal", value: "High" },
                    item3: { label: "Moral Superiority", value: "Shared" }
                },
                redFlags: [
                    "8 valuing money over 9's feelings.",
                    "9 judging 8's ambition as 'evil'.",
                    "Using spirituality to bypass responsibility."
                ],
                greenFlags: [
                    "Combining resources with vision.",
                    "8 protects 9; 9 inspires 8.",
                    "Power couple energy with a heart."
                ]
            },
            deep: {
                communication: {
                    personA: "Direct, brutal, result-oriented. Wants the bottom line.",
                    personB: "Philosophical, evasive, feeling-oriented. Wants the bigger picture."
                },
                triggers: "8 gets triggered by 9's vagueness. 9 gets triggered by 8's harshness/materialism.",
                intimacy: "A mix of earthly power and spiritual depth. Can be transformative if you respect the difference.",
                trajectory: "If you align, you change the world (Bill & Melinda Gates style). If not, you judge each other into a breakup."
            }
        }
    },

    // LIFE PATH 9 Combinations
    9: {
        // 9 + 1: (Covered in 1+9)
        // 9 + 2: (Covered in 2+9)
        // 9 + 3: (Covered in 3+9)
        // 9 + 4: (Covered in 4+9)
        // 9 + 5: (Covered in 5+9)
        // 9 + 6: (Covered in 6+9)
        // 9 + 7: (Covered in 7+9)
        // 9 + 8: (Covered in 8+9)

        // 9 + 9: The Soul Mates
        9: {
            core: {
                title: "The Mirrors",
                dynamic: "Deep, emotional, spiritual, and dramatic. You are two old souls. You understand each other perfectly.",
                gift: "Total empathy. You finish each other's sentences. You care about the same big issues.",
                challenge: "Lack of boundaries. You dissolve into each other. Also, lack of practicality. Who is flying the plane?",
                growth: "Differentiation. Being two whole people, not one blob."
            },
            interaction: {
                description: "Loving, flowing, artistic. You cry at the same movies.",
                work: "Get grounded. Do yard work. Pay bills."
            },
            truth: {
                description: "You use the relationship to hide from the harshness of the world.",
                insight: "Validation must come from within."
            },
            soulParams: {
                teaching: "To love without losing yourself."
            },
            advice: [
                "Have separate friends.",
                "Don't trauma dump on each other constantly.",
                "Create something tangible together."
            ],
            viral: {
                roast: "Twin flames... or codependent ghosts.",
                receipt: {
                    item1: { label: "Boundaries", value: "None" },
                    item2: { label: "Empathy", value: "Infinite" },
                    item3: { label: "Reality", value: "Optional" }
                },
                redFlags: [
                    "Drowning in each other's emotions.",
                    " Losing your identity.",
                    "Martyrolympics."
                ],
                greenFlags: [
                    "Purest love.",
                    "Deepest understanding.",
                    "Healing connection."
                ]
            },
            deep: {
                communication: {
                    personA: "Feeling.",
                    personB: "Feeling."
                },
                triggers: "Separation. You feel like one soul, so being apart feels like death.",
                intimacy: "Total merging. It's beautiful but dangerous. You need to remember you are two bodies.",
                trajectory: "The Soul Mates. The danger is dissolving. Stay solid enough to hold the love."
            }
        }
    }
};
