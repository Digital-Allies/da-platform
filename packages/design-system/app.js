// Digital Allies Business Management Dashboard
class BusinessDashboard {
    constructor() {
        // In-memory data storage (not using localStorage as per requirements)
        this.data = {
            projects: [],
            content: [],
            notes: [],
            development: [],
            notifications: [],
            contentCalendar: [],
            pages: [],
            settings: {
                siteName: 'Digital Allies',
                siteTagline: 'Close the technology gap',
                contactEmail: 'contact@digitalallies.net',
                primaryColor: '#3A7BD5',
                signalColor: '#C5301A',
                accentColor: '#FADEEB',
                twitterUrl: 'https://twitter.com/DigitalAlliesAZ',
                linkedinUrl: 'https://linkedin.com/company/digital-allies',
                instagramUrl: 'https://instagram.com/digitalalliesaz',
                githubUrl: 'https://github.com/Digital-Allies'
            }
        };
        
        // Current state
        this.currentSection = 'dashboard';
        this.currentProject = null;
        this.editingNote = null;
        this.editingDevTask = null;
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.bindEvents();
        this.updateDashboardStats();
        this.renderContent();
        this.renderProjects();
        this.renderNotes();
        this.renderDevelopment();
        this.renderContentCalendar();
        this.renderPages();
        this.displaySettings();
    }

    loadSampleData() {
        // Sample pages
        this.data.pages = [
            {
                id: 1,
                title: 'Home',
                slug: 'home',
                metaDesc: 'Digital Allies — Close the technology gap for your business',
                content: 'Welcome to Digital Allies. We help small businesses, nonprofits, and everyday people get professional-grade technology tools without the confusion.',
                status: 'Published',
                createdDate: '2025-10-01'
            },
            {
                id: 2,
                title: 'About Us',
                slug: 'about',
                metaDesc: 'Learn about Digital Allies and our mission to empower small businesses',
                content: 'Digital Allies exists to close the technology gap. We believe technology should work for you — quietly, reliably, and without requiring a master\'s degree to operate.',
                status: 'Published',
                createdDate: '2025-10-02'
            },
            {
                id: 3,
                title: 'Services',
                slug: 'services',
                metaDesc: 'Web design, automation, and digital strategy for your business',
                content: 'Our services include web design, business automation, digital strategy, and ongoing support. Everything tailored to your needs.',
                status: 'Published',
                createdDate: '2025-10-03'
            }
        ];
        // Load sample data from the provided JSON
        this.data.projects = [
            {
                id: 1,
                name: "Website Launch",
                description: "Complete Digital Allies website development and launch",
                columns: ["Backlog", "In Progress", "Review", "Done"],
                tasks: [
                    {id: 1, title: "Design homepage mockup", column: "Done", priority: "High", dueDate: "2025-10-15"},
                    {id: 2, title: "Implement contact form", column: "In Progress", priority: "Medium", dueDate: "2025-10-20"},
                    {id: 3, title: "SEO optimization", column: "Backlog", priority: "Low", dueDate: "2025-10-25"}
                ]
            },
            {
                id: 2,
                name: "Content Marketing",
                description: "Blog posts and social media content creation",
                columns: ["Ideas", "Writing", "Review", "Published"],
                tasks: [
                    {id: 4, title: "Write about business automation", column: "Writing", priority: "High", dueDate: "2025-10-18"},
                    {id: 5, title: "Social media campaign", column: "Ideas", priority: "Medium", dueDate: "2025-10-22"}
                ]
            }
        ];

        this.data.content = [
            {
                id: 1,
                title: "Why Bilingual Websites Matter for Kingman Businesses",
                type: "Blog Post",
                status: "Published",
                tags: ["bilingual", "web design", "local business"],
                content: "For small businesses in Kingman, Arizona, serving both English and Spanish-speaking customers is no longer optional—it's essential. This guide explains why bilingual websites drive growth, build trust, and expand your market reach.\n\nThe Market Reality\nMohave County has a significant Spanish-speaking population. If your website only serves English speakers, you're leaving money on the table. Our research shows that customers are more likely to do business with companies that communicate in their language.\n\nBeyond Translation\nA bilingual website isn't just a translation. It's a complete redesign that respects both languages and cultures. From form validation to SEO, every detail matters. When you get it right, you're saying: \"I see you. I value you. You belong here.\"\n\nThe Digital Allies Approach\nWe don't bolt Spanish onto English sites. We rebuild bilingual from the start. Same brand, same voice, both languages. Human review of every word. Real results in customer engagement and conversions.\n\nReady to go bilingual? Let's talk.",
                createdDate: "2025-10-08",
                publishDate: "2025-10-10"
            },
            {
                id: 2,
                title: "Digital Allies Announces Bilingual Web Design Service for Kingman Businesses",
                type: "Press Release",
                status: "Published",
                tags: ["press release", "company news", "service launch"],
                content: "KINGMAN, AZ — October 10, 2025 — Digital Allies today announced the launch of its comprehensive bilingual web design service, bringing professional-grade digital tools to English and Spanish-speaking businesses in Kingman and Mohave County.\n\nThe new service addresses a critical gap in the local market: most small business websites serve only English speakers, leaving Spanish-speaking customers unable to fully engage.\n\n\"We're not translating websites. We're rebuilding them bilingual from the ground up,\" said Anthony, founder of Digital Allies. \"When you speak someone's language, you're saying their business matters. That's the Digital Allies standard.\"\n\nThe bilingual web design service includes:\n- Complete website redesign with bilingual architecture\n- Human review of all Spanish and English copy\n- Bilingual form setup and validation\n- SEO optimization in both languages\n- Ongoing content support and strategy\n\nAbout Digital Allies\nDigital Allies exists to close the technology gap for small businesses, nonprofits, and everyday people who deserve professional-grade tools without the professional-grade confusion. Based in Kingman, Arizona, we specialize in web design, automation, and digital strategy for local and remote clients.",
                createdDate: "2025-10-09",
                publishDate: "2025-10-10"
            },
            {
                id: 3,
                title: "Case Study: Local Restaurant Increases Spanish-Speaking Customer Engagement by 40%",
                type: "Case Study",
                status: "Published",
                tags: ["case study", "bilingual", "results"],
                content: "Client: Casa Buena, Local Restaurant\nChallenge: Despite having a diverse customer base, Casa Buena's website only served English speakers. Spanish-speaking customers couldn't access menus, make reservations, or find basic information online.\n\nSolution: Digital Allies rebuilt Casa Buena's website with complete bilingual support. We redesigned the navigation, translated menus and content with human review, set up bilingual reservation forms, and optimized both versions for local search.\n\nResults:\n- 40% increase in Spanish-language website traffic\n- 25% increase in online reservations from Spanish-speaking customers\n- Improved local search rankings for Spanish keywords\n- Positive customer feedback about feeling welcomed\n\nCustomer Testimonial:\n\"Before the redesign, we were turning away customers who couldn't navigate our site in Spanish. Now, both communities feel welcomed. It's made a real difference in our business.\" — Maria, Owner, Casa Buena\n\nKey Takeaway:\nWhen you speak your customer's language, you're not just improving your website. You're showing respect, building trust, and growing your business. That's the bilingual difference.",
                createdDate: "2025-10-07",
                publishDate: "2025-10-10"
            }
        ];

        this.data.notes = [
            {
                id: 1,
                title: "Market Research - Small Business Needs",
                notebook: "Research",
                tags: ["market-research", "small-business", "needs-analysis"],
                content: "Key findings from small business survey:\n- 67% struggle with digital presence\n- Main pain points: time management, tech adoption\n- Opportunity: simplified automation solutions",
                createdDate: "2025-10-09"
            },
            {
                id: 2,
                title: "Competitor Analysis - TechSolutions Inc",
                notebook: "Competitive Intelligence",
                tags: ["competitor", "analysis", "techsolutions"],
                content: "TechSolutions Inc Analysis:\nStrengths: Strong enterprise focus, robust platform\nWeaknesses: Complex pricing, poor small business support\nOpportunity: Target their underserved small business segment",
                createdDate: "2025-10-08"
            }
        ];

        this.data.development = [
            {
                id: 1,
                title: "User Authentication System",
                type: "Feature",
                status: "In Progress",
                priority: "High",
                description: "Implement secure login and user management",
                dueDate: "2025-10-20"
            },
            {
                id: 2,
                title: "Contact form not submitting",
                type: "Bug",
                status: "Open",
                priority: "Medium",
                description: "Form validation errors preventing submission",
                dueDate: "2025-10-15"
            }
        ];

        // 30-day marketing content calendar
        this.data.contentCalendar = [
            // Week 1: Local Data
            { day: 1, week: 1, category: "Local data", topic: "Mohave County Market Overview", hook: "67% of local businesses say their digital presence needs work.", caption: "New market research shows digital gaps in Mohave County. We surveyed 200+ small business owners about their tech challenges.", cta: "Ask for a bilingual audit", promptRef: "Day 1 · Bilingual storefront audit", status: "draft", scheduledDate: "2025-10-15" },
            { day: 2, week: 1, category: "Local data", topic: "Mobile vs Desktop Usage", hook: "Local users prefer mobile. Your site isn't ready.", caption: "70% of Kingman-area searches happen on phones. Most local websites weren't built for mobile-first users.", cta: "Audit your site's mobile UX", promptRef: "Day 2 · Phone mockup showing slow load", status: "draft", scheduledDate: "2025-10-16" },
            { day: 3, week: 1, category: "Local data", topic: "Spanish-Speaking Market Size", hook: "You're leaving money on the table if you ignore Spanish.", caption: "18,000+ Spanish speakers in Mohave County. That's not a niche—that's your market.", cta: "See how bilingual helps", promptRef: "Day 3 · Bilingual website comparison", status: "approved", scheduledDate: "2025-10-17" },
            { day: 4, week: 1, category: "Local data", topic: "Search Behavior Analysis", hook: "Local Spanish speakers search differently than English speakers.", caption: "Keyword research shows distinct search patterns. 'Fontanero' vs 'plumber.' Get both right.", cta: "Request bilingual SEO audit", promptRef: "Day 4 · Search console heatmap", status: "draft", scheduledDate: "2025-10-18" },
            { day: 5, week: 1, category: "Local data", topic: "Business Owner Pain Points", hook: "What keeps Kingman business owners up at night?", caption: "Tech confusion, staffing, time. Not fancy features. Solution: simplicity.", cta: "Let's talk about your pain points", promptRef: "Day 5 · Conversation graphic", status: "draft", scheduledDate: "2025-10-19" },
            { day: 6, week: 1, category: "Local data", topic: "Competitor Blind Spots", hook: "Your competitors are ignoring Spanish speakers.", caption: "We analyzed 50+ local websites. Most treat Spanish like an afterthought.", cta: "See the competitive advantage", promptRef: "Day 6 · Competitor comparison chart", status: "scheduled", scheduledDate: "2025-10-20" },
            
            // Week 2: Machine Translation
            { day: 7, week: 2, category: "Machine translation", topic: "Translation Mistakes", hook: "'Embarazada' doesn't mean embarrassed. Your translator knows that. Google Translate doesn't.", caption: "False cognates trip up automated translation. A human review catches these before they embarrass your brand.", cta: "Request a manual review of your translations", promptRef: "Day 7 · Side-by-side translation fails", status: "draft", scheduledDate: "2025-10-21" },
            { day: 8, week: 2, category: "Machine translation", topic: "Context Matters", hook: "Machine translation misses context every time.", caption: "'Send a transmission' means something specific to DA. Google Translate will butcher it.", cta: "Learn how human review protects your voice", promptRef: "Day 8 · Voice tone comparison", status: "draft", scheduledDate: "2025-10-22" },
            { day: 9, week: 2, category: "Machine translation", topic: "Public vs Private", hook: "Machine translation is fine for your notes. Not for your website.", caption: "First drafts? Sure, use automation. Public-facing copy? That needs a human.", cta: "See where translation quality matters", promptRef: "Day 9 · Flowchart: when to automate", status: "approved", scheduledDate: "2025-10-23" },
            { day: 10, week: 2, category: "Machine translation", topic: "Cost of Bad Translation", hook: "A $200 translation mistake can cost you $20,000 in lost sales.", caption: "One misplaced accent. One wrong word. Your credibility vanishes.", cta: "Talk to us about translation budgets", promptRef: "Day 10 · ROI infographic", status: "draft", scheduledDate: "2025-10-24" },
            { day: 11, week: 2, category: "Machine translation", topic: "Cultural Nuance", hook: "Language isn't just words—it's culture.", caption: "DA gets Kingman. We know the difference between Spanish and 'translated English.'", cta: "Discuss cultural fit for your brand", promptRef: "Day 11 · Kingman culture grid", status: "scheduled", scheduledDate: "2025-10-25" },
            { day: 12, week: 2, category: "Machine translation", topic: "Technical Terms", hook: "Your industry has jargon. Translators who know your industry translate better.", caption: "We specialize in tech, automation, and integrations. We speak both languages AND the terminology.", cta: "Request industry-specific translation", promptRef: "Day 12 · Technical glossary example", status: "draft", scheduledDate: "2025-10-26" },
            
            // Week 3: Trust & Culture
            { day: 13, week: 3, category: "Trust and culture", topic: "Bilingual is Respect", hook: "Bilingual isn't a feature. It's respect.", caption: "When you speak someone's language, you're saying: 'You matter. Your business matters. I'm not too busy for you.'", cta: "See what bilingual trust looks like", promptRef: "Day 13 · Community testimonial", status: "draft", scheduledDate: "2025-10-27" },
            { day: 14, week: 3, category: "Trust and culture", topic: "Details Build Trust", hook: "Small things signal big things.", caption: "A menu that works in Spanish. Forms that accept Spanish characters. These aren't nice extras—they're proof you care.", cta: "Audit your site for cultural details", promptRef: "Day 14 · Checklist: bilingual details", status: "draft", scheduledDate: "2025-10-28" },
            { day: 15, week: 3, category: "Trust and culture", topic: "One Business, Two Languages", hook: "You don't have a 'Spanish site.' You have one business that serves two languages.", caption: "DA doesn't translate websites. We rebuild them bilingual from the start. Same brand, same voice, both languages.", cta: "See the difference in approach", promptRef: "Day 15 · Architecture diagram", status: "approved", scheduledDate: "2025-10-29" },
            { day: 16, week: 3, category: "Trust and culture", topic: "Local Stories", hook: "Spanish speakers in Kingman have different stories than English speakers.", caption: "Same town, different context. Same business, different language = different conversation.", cta: "Tell your bilingual story", promptRef: "Day 16 · Story structure template", status: "scheduled", scheduledDate: "2025-10-30" },
            { day: 17, week: 3, category: "Trust and culture", topic: "Community Impact", hook: "Being bilingual isn't business. It's community.", caption: "When you get Spanish right, you're not just selling. You're saying: 'I see you. I value you. Welcome here.'", cta: "Join us in building bilingual community", promptRef: "Day 17 · Impact story", status: "draft", scheduledDate: "2025-10-31" },
            { day: 18, week: 3, category: "Trust and culture", topic: "Voice & Authenticity", hook: "Don't sound like a translator. Sound like yourself—in Spanish.", caption: "DA's voice is sharp, straight-talking, authentic. That doesn't change in Spanish. It gets stronger.", cta: "Hear the difference authenticity makes", promptRef: "Day 18 · Voice comparison audio", status: "draft", scheduledDate: "2025-11-01" },
            
            // Week 4: Digital Allies Standard
            { day: 19, week: 4, category: "Digital Allies standard", topic: "The Rebuild, Not the Patch", hook: "We don't bolt Spanish onto English sites. We rebuild.", caption: "New architecture. New flows. New content. Same brand, complete bilingual integration.", cta: "See the rebuild process", promptRef: "Day 19 · Before/after comparison", status: "draft", scheduledDate: "2025-11-02" },
            { day: 20, week: 4, category: "Digital Allies standard", topic: "Human-Reviewed Standard", hook: "Every word reviewed by a human who knows your business.", caption: "Machine translation gets 95% there. Anthony gets it the rest of the way.", cta: "Understand the review process", promptRef: "Day 20 · Review workflow diagram", status: "approved", scheduledDate: "2025-11-03" },
            { day: 21, week: 4, category: "Digital Allies standard", topic: "Bilingual Forms", hook: "Forms should work in both languages. Most don't.", caption: "Character support. Field labels. Validation messages. All of it, both languages.", cta: "Check your form setup", promptRef: "Day 21 · Form checklist", status: "scheduled", scheduledDate: "2025-11-04" },
            { day: 22, week: 4, category: "Digital Allies standard", topic: "SEO Both Ways", hook: "Spanish search and English search are different animals.", caption: "Keywords, metadata, schema—all of it bilingual. You rank in both markets.", cta: "Request bilingual SEO audit", promptRef: "Day 22 · SEO comparison", status: "draft", scheduledDate: "2025-11-05" },
            { day: 23, week: 4, category: "Digital Allies standard", topic: "Ongoing Support", hook: "Launch bilingual isn't the end. It's the start.", caption: "Content updates, form monitoring, strategy refinement. DA is here for the long game.", cta: "Discuss long-term partnership", promptRef: "Day 23 · Support roadmap", status: "draft", scheduledDate: "2025-11-06" },
            { day: 24, week: 4, category: "Digital Allies standard", topic: "Measurable Results", hook: "Bilingual should increase conversions. If it doesn't, something's broken.", caption: "We track both languages. New traffic. Better engagement. Actual sales.", cta: "See the metrics that matter", promptRef: "Day 24 · Results dashboard", status: "draft", scheduledDate: "2025-11-07" },
            { day: 25, week: 4, category: "Digital Allies standard", topic: "Pricing That Works", hook: "Strategy is free. Execution is paid. No surprises.", caption: "DA quotes are clear. No scope creep. You know what you're getting.", cta: "Request a quote", promptRef: "Day 25 · Pricing breakdown", status: "scheduled", scheduledDate: "2025-11-08" },
            { day: 26, week: 4, category: "Digital Allies standard", topic: "Kingman to Everywhere", hook: "We're local. We serve everywhere.", caption: "Based in Kingman. Native Spanish. Understanding of both markets.", cta: "Let's talk about your market", promptRef: "Day 26 · Service map", status: "draft", scheduledDate: "2025-11-09" },
            { day: 27, week: 4, category: "Digital Allies standard", topic: "First Call Is Free", hook: "Call. No obligation. Just talk.", caption: "Anthony picks up. (928) 228-5769. He'll ask smart questions. No sales pitch.", cta: "Call for a free consultation", promptRef: "Day 27 · Phone hero graphic", status: "approved", scheduledDate: "2025-11-10" },
            { day: 28, week: 4, category: "Digital Allies standard", topic: "No Ghosting", hook: "We finish what we start.", caption: "The No-Ghosting Guarantee. If we take your project, it gets done. If something changes, we tell you first.", cta: "Build with someone who delivers", promptRef: "Day 28 · Guarantee graphic", status: "draft", scheduledDate: "2025-11-11" },
            { day: 29, week: 4, category: "Digital Allies standard", topic: "Case Study: Local Business", hook: "See what bilingual did for a Kingman business like yours.", caption: "Real results. Real numbers. Real impact on their bottom line.", cta: "Read the full case study", promptRef: "Day 29 · Case study hero image", status: "draft", scheduledDate: "2025-11-12" },
            { day: 30, week: 4, category: "Digital Allies standard", topic: "Next Steps", hook: "You now know why bilingual matters. What's next?", caption: "Audit. Strategy. Build. Launch. Support. Let's walk through where you are and where you're going.", cta: "Schedule your free audit", promptRef: "Day 30 · Call-to-action hero", status: "scheduled", scheduledDate: "2025-11-13" }
        ];

        // Sample notifications
        this.data.notifications = [
            {
                id: 1,
                title: "Contact form bug assigned to you",
                message: "Priority: Medium, Due: Oct 15",
                timestamp: "2 hours ago",
                type: "bug"
            },
            {
                id: 2,
                title: "New content published",
                message: "Digital Transformation Guide is now live",
                timestamp: "4 hours ago",
                type: "content"
            },
            {
                id: 3,
                title: "Project milestone reached",
                message: "Homepage mockup completed",
                timestamp: "1 day ago",
                type: "project"
            }
        ];

        // Set current project to first project
        this.currentProject = this.data.projects[0];
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.ws-navitem').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Client Switcher
        const clientBtn = document.getElementById('da-client-btn');
        const clientMenu = document.getElementById('da-client-menu');
        
        if (clientBtn && clientMenu) {
            clientBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clientMenu.style.display = clientMenu.style.display === 'none' ? 'block' : 'none';
            });
            
            document.addEventListener('click', () => {
                if (clientMenu.style.display === 'block') {
                    clientMenu.style.display = 'none';
                }
            });
            
            clientMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Global search
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performGlobalSearch();
        });

        document.getElementById('globalSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performGlobalSearch();
            }
        });

        // Close search modal
        document.getElementById('closeSearchModal').addEventListener('click', () => {
            document.getElementById('searchModal').classList.add('hidden');
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Content management
        this.bindContentEvents();
        this.bindProjectEvents();
        this.bindResearchEvents();
        this.bindDevelopmentEvents();
        this.bindPagesEvents();
        this.bindSettingsEvents();
    }

    bindPagesEvents() {
        document.getElementById('newPageBtn').addEventListener('click', () => {
            this.showPageForm();
        });

        document.getElementById('newPageForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePage();
        });

        document.getElementById('cancelPageEdit').addEventListener('click', () => {
            this.hidePageForm();
        });

        document.getElementById('pageSearch').addEventListener('input', () => {
            this.filterPages();
        });

        document.getElementById('pageStatusFilter').addEventListener('change', () => {
            this.filterPages();
        });
    }

    bindSettingsEvents() {
        document.getElementById('settingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });

        document.getElementById('resetSettings').addEventListener('click', () => {
            if (confirm('Reset all settings to default?')) {
                this.loadDefaultSettings();
            }
        });
    }

    bindContentEvents() {
        // Content tabs
        document.querySelectorAll('.content-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchContentTab(btn.dataset.tab);
            });
        });

        // Content form
        document.getElementById('contentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContent();
        });

        // Content search and filters
        document.getElementById('contentSearch').addEventListener('input', () => {
            this.filterContent();
        });

        document.getElementById('contentTypeFilter').addEventListener('change', () => {
            this.filterContent();
        });

        document.getElementById('contentStatusFilter').addEventListener('change', () => {
            this.filterContent();
        });

        // Clear content form
        document.getElementById('clearContentForm').addEventListener('click', () => {
            document.getElementById('contentForm').reset();
        });

        // New content button
        document.getElementById('newContentBtn').addEventListener('click', () => {
            this.switchContentTab('create');
        });

        // Calendar filters
        if (document.getElementById('weekFilter')) {
            document.getElementById('weekFilter').addEventListener('change', () => {
                this.filterCalendar();
            });
        }
        if (document.getElementById('categoryFilter')) {
            document.getElementById('categoryFilter').addEventListener('change', () => {
                this.filterCalendar();
            });
        }
        if (document.getElementById('statusFilter')) {
            document.getElementById('statusFilter').addEventListener('change', () => {
                this.filterCalendar();
            });
        }
    }

    bindProjectEvents() {
        // Project selector
        document.getElementById('projectSelect').addEventListener('change', (e) => {
            const projectId = parseInt(e.target.value);
            this.currentProject = this.data.projects.find(p => p.id === projectId);
            this.renderKanbanBoard();
        });

        // New project button
        document.getElementById('newProjectBtn').addEventListener('click', () => {
            this.createNewProject();
        });
    }

    bindResearchEvents() {
        // Note form
        document.getElementById('noteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNote();
        });

        // Notes search
        document.getElementById('notesSearch').addEventListener('input', () => {
            this.filterNotes();
        });

        // New note button
        document.getElementById('newNoteBtn').addEventListener('click', () => {
            this.showNoteEditor();
        });

        // Cancel note edit
        document.getElementById('cancelNoteEdit').addEventListener('click', () => {
            this.hideNoteEditor();
        });

        // Export notes
        document.getElementById('exportNotesBtn').addEventListener('click', () => {
            this.exportNotes();
        });
    }

    bindDevelopmentEvents() {
        // Development tabs
        document.querySelectorAll('.dev-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchDevTab(btn.dataset.tab);
            });
        });

        // Development form
        document.getElementById('devForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveDevTask();
        });

        // Development filters
        document.getElementById('devStatusFilter').addEventListener('change', () => {
            this.filterDevTasks();
        });

        document.getElementById('devPriorityFilter').addEventListener('change', () => {
            this.filterDevTasks();
        });

        // New development task button
        document.getElementById('newDevTaskBtn').addEventListener('click', () => {
            this.showDevTaskForm();
        });

        // Cancel dev task
        document.getElementById('cancelDevTask').addEventListener('click', () => {
            this.hideDevTaskForm();
        });
    }

    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.ws-navitem').forEach(link => {
            link.classList.remove('is-active');
        });
        const activeLink = document.querySelector(`[data-section="${section}"]`);
        if(activeLink) activeLink.classList.add('is-active');

        // Update sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Update breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        const sectionNames = {
            dashboard: 'Dashboard',
            content: 'Content Management',
            projects: 'Project Organization',
            research: 'Research & Documentation',
            development: 'Website Development'
        };
        breadcrumb.textContent = sectionNames[section] || section;

        this.currentSection = section;
    }

    updateDashboardStats() {
        document.getElementById('totalProjects').textContent = this.data.projects.length;
        document.getElementById('totalContent').textContent = this.data.content.length;
        document.getElementById('totalNotes').textContent = this.data.notes.length;
        document.getElementById('totalTasks').textContent = this.data.development.length;
    }

    performGlobalSearch() {
        const query = document.getElementById('globalSearch').value.toLowerCase();
        if (!query) return;

        const results = [];

        // Search content
        this.data.content.forEach(item => {
            if (item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))) {
                results.push({
                    type: 'Content',
                    title: item.title,
                    excerpt: item.content.substring(0, 100) + '...',
                    section: 'content'
                });
            }
        });

        // Search notes
        this.data.notes.forEach(item => {
            if (item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))) {
                results.push({
                    type: 'Note',
                    title: item.title,
                    excerpt: item.content.substring(0, 100) + '...',
                    section: 'research'
                });
            }
        });

        // Search projects and tasks
        this.data.projects.forEach(project => {
            if (project.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'Project',
                    title: project.name,
                    excerpt: project.description,
                    section: 'projects'
                });
            }
            project.tasks.forEach(task => {
                if (task.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'Task',
                        title: task.title,
                        excerpt: `Project: ${project.name}`,
                        section: 'projects'
                    });
                }
            });
        });

        // Search development tasks
        this.data.development.forEach(item => {
            if (item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'Dev Task',
                    title: item.title,
                    excerpt: item.description,
                    section: 'development'
                });
            }
        });

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const modal = document.getElementById('searchModal');
        const resultsContainer = document.getElementById('searchResults');

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="app.navigateToSection('${result.section}')">
                    <h4 class="search-result-title">
                        <span class="search-result-type">${result.type}</span>
                        ${result.title}
                    </h4>
                    <p class="search-result-excerpt">${result.excerpt}</p>
                </div>
            `).join('');
        }

        modal.classList.remove('hidden');
    }

    handleQuickAction(action) {
        switch (action) {
            case 'new-content':
                this.navigateToSection('content');
                this.switchContentTab('create');
                break;
            case 'new-project':
                this.navigateToSection('projects');
                this.createNewProject();
                break;
            case 'new-note':
                this.navigateToSection('research');
                this.showNoteEditor();
                break;
            case 'new-task':
                this.navigateToSection('development');
                this.showDevTaskForm();
                break;
        }
    }

    // Content Management
    switchContentTab(tab) {
        document.querySelectorAll('.content-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');

        if (tab === 'calendar') {
            this.renderContentCalendar();
        }
    }

    renderContent() {
        const grid = document.getElementById('contentGrid');
        grid.innerHTML = this.data.content.map(item => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${item.title}</h3>
                    <span class="status status--${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                </div>
                <div class="content-item__meta">
                    <span class="content-item__type">${item.type}</span>
                    <small>${item.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${item.content.substring(0, 100)}...</p>
                <div class="content-item__tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editContent(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteContent(${item.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    renderPages() {
        this.filterPages();
    }

    filterPages() {
        const search = document.getElementById('pageSearch').value.toLowerCase();
        const statusFilter = document.getElementById('pageStatusFilter').value;

        let filtered = this.data.pages;

        if (search) {
            filtered = filtered.filter(page => 
                page.title.toLowerCase().includes(search) ||
                page.slug.toLowerCase().includes(search) ||
                page.content.toLowerCase().includes(search)
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(page => page.status === statusFilter);
        }

        const grid = document.getElementById('pagesGrid');
        grid.innerHTML = filtered.map(page => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${page.title}</h3>
                    <span class="status status--${page.status.toLowerCase().replace(' ', '-')}">${page.status}</span>
                </div>
                <div class="content-item__meta">
                    <small>/${page.slug}</small>
                    <small>${page.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${page.metaDesc}</p>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editPage(${page.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deletePage(${page.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    showPageForm() {
        document.getElementById('pageForm').classList.remove('hidden');
        document.getElementById('newPageForm').reset();
    }

    hidePageForm() {
        document.getElementById('pageForm').classList.add('hidden');
    }

    savePage() {
        const title = document.getElementById('pageTitle').value;
        const slug = document.getElementById('pageSlug').value;
        const metaDesc = document.getElementById('pageMetaDesc').value;
        const content = document.getElementById('pageContent').value;
        const status = document.getElementById('pageStatus').value;

        const newPage = {
            id: Date.now(),
            title,
            slug,
            metaDesc,
            content,
            status,
            createdDate: new Date().toISOString().split('T')[0]
        };

        this.data.pages.push(newPage);
        this.renderPages();
        this.hidePageForm();
        this.updateDashboardStats();
    }

    editPage(id) {
        const page = this.data.pages.find(p => p.id === id);
        if (!page) return;

        document.getElementById('pageTitle').value = page.title;
        document.getElementById('pageSlug').value = page.slug;
        document.getElementById('pageMetaDesc').value = page.metaDesc;
        document.getElementById('pageContent').value = page.content;
        document.getElementById('pageStatus').value = page.status;

        this.showPageForm();
    }

    deletePage(id) {
        if (confirm('Are you sure you want to delete this page?')) {
            this.data.pages = this.data.pages.filter(p => p.id !== id);
            this.renderPages();
            this.updateDashboardStats();
        }
    }

    filterContent() {
        const search = document.getElementById('contentSearch').value.toLowerCase();
        const typeFilter = document.getElementById('contentTypeFilter').value;
        const statusFilter = document.getElementById('contentStatusFilter').value;

        let filtered = this.data.content;

        if (search) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(search) ||
                item.content.toLowerCase().includes(search) ||
                item.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(item => item.type === typeFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        const grid = document.getElementById('contentGrid');
        grid.innerHTML = filtered.map(item => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${item.title}</h3>
                    <span class="status status--${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                </div>
                <div class="content-item__meta">
                    <span class="content-item__type">${item.type}</span>
                    <small>${item.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${item.content.substring(0, 100)}...</p>
                <div class="content-item__tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editContent(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteContent(${item.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    saveContent() {
        const title = document.getElementById('contentTitle').value;
        const type = document.getElementById('contentType').value;
        const status = document.getElementById('contentStatus').value;
        const tags = document.getElementById('contentTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        const content = document.getElementById('contentBody').value;

        const newContent = {
            id: Date.now(),
            title,
            type,
            status,
            tags,
            content,
            createdDate: new Date().toISOString().split('T')[0]
        };

        this.data.content.push(newContent);
        this.renderContent();
        this.updateDashboardStats();
        
        document.getElementById('contentForm').reset();
        this.switchContentTab('library');
    }

    editContent(id) {
        const content = this.data.content.find(c => c.id === id);
        if (!content) return;

        document.getElementById('contentTitle').value = content.title;
        document.getElementById('contentType').value = content.type;
        document.getElementById('contentStatus').value = content.status;
        document.getElementById('contentTags').value = content.tags.join(', ');
        document.getElementById('contentBody').value = content.content;

        this.switchContentTab('create');
    }

    deleteContent(id) {
        if (confirm('Are you sure you want to delete this content?')) {
            this.data.content = this.data.content.filter(c => c.id !== id);
            this.renderContent();
            this.updateDashboardStats();
        }
    }

    // Content Calendar
    renderContentCalendar() {
        this.filterCalendar();
    }

    filterCalendar() {
        const weekFilter = document.getElementById('weekFilter')?.value || '';
        const categoryFilter = document.getElementById('categoryFilter')?.value || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';

        let filtered = this.data.contentCalendar;

        if (weekFilter) {
            filtered = filtered.filter(item => item.week === parseInt(weekFilter));
        }

        if (categoryFilter) {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = filtered.map((item, index) => `
            <div class="calendar-item">
                <div class="calendar-item__day">Day ${item.day} · Week ${item.week}</div>
                <div class="calendar-item__header">
                    <h3 class="calendar-item__topic">${item.topic}</h3>
                    <span class="calendar-item__category">${item.category}</span>
                </div>
                <div class="calendar-item__hook">"${item.hook}"</div>
                <p class="calendar-item__caption">${item.caption}</p>
                <div class="calendar-item__cta">CTA: ${item.cta}</div>
                <div class="calendar-item__prompt">📸 ${item.promptRef}</div>
                <span class="calendar-item__status">${item.status}</span>
                <div style="margin-top: 12px; font-size: 11px; color: var(--fg-soft);">Scheduled: ${item.scheduledDate}</div>
                <div style="margin-top: 16px; display: flex; gap: 8px;">
                    <button class="btn btn--sm btn--secondary" onclick="app.editCalendarItem(${item.day})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteCalendarItem(${item.day})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    editCalendarItem(day) {
        const item = this.data.contentCalendar.find(c => c.day === day);
        if (!item) return;

        const newTopic = prompt('Topic:', item.topic);
        if (newTopic === null) return;

        const newHook = prompt('Hook (the eye-catching quote):', item.hook);
        if (newHook === null) return;

        const newCaption = prompt('Caption (explanation):', item.caption);
        if (newCaption === null) return;

        const newCta = prompt('CTA (call-to-action):', item.cta);
        if (newCta === null) return;

        const newPrompt = prompt('Asset prompt reference:', item.promptRef);
        if (newPrompt === null) return;

        const newStatus = prompt('Status (draft/approved/scheduled/posted):', item.status);
        if (newStatus === null) return;

        const newDate = prompt('Scheduled date (YYYY-MM-DD):', item.scheduledDate);
        if (newDate === null) return;

        item.topic = newTopic;
        item.hook = newHook;
        item.caption = newCaption;
        item.cta = newCta;
        item.promptRef = newPrompt;
        item.status = newStatus;
        item.scheduledDate = newDate;

        this.filterCalendar();
    }

    deleteCalendarItem(day) {
        if (confirm(`Delete Day ${day}?`)) {
            this.data.contentCalendar = this.data.contentCalendar.filter(c => c.day !== day);
            this.filterCalendar();
        }
    }

    applyTemplate(type) {
        this.switchContentTab('create');
        
        const templates = {
            blog: {
                title: '[Your Blog Post Title Here]',
                content: `Hook: Start with a compelling question or statement that makes readers want to continue.

Main Point 1
Explain the first key idea with examples and context.

Main Point 2
Develop the second important concept with supporting details.

Main Point 3
Present the third key takeaway with practical application.

Conclusion
Summarize the main points and include a clear call-to-action (CTA).`
            },
            press: {
                title: '[Company Announces Important News]',
                content: `[CITY, DATE] — Digital Allies today announced [what happened]. [One sentence explaining why this matters].

[2-3 sentences with the most important details. Answer: who, what, when, where, why.]

"[Add a relevant quote here]" — [Name, Title]

[Additional supporting details, facts, or context]

About Digital Allies
Digital Allies exists to close the technology gap for small businesses, nonprofits, and everyday people who deserve professional-grade tools without the professional-grade confusion.`
            },
            case: {
                title: '[Client Name] Increases [Metric] by X%',
                content: `The Challenge
[Describe the client's problem or goal in detail.]

The Solution
[Explain what Digital Allies did to address the challenge.]

The Results
[Share specific metrics, outcomes, and impact. Use numbers when possible.]

Client Testimonial
"[Add a direct quote from the client about their experience and results]" — [Client Name, Title]

What This Means
[Explain how this case study applies to similar businesses and next steps.]`
            }
        };

        const template = templates[type];
        if (template) {
            document.getElementById('contentTitle').value = template.title;
            document.getElementById('contentBody').value = template.content;
            
            // Set type based on template
            const typeMap = { blog: 'Blog Post', press: 'Press Release', case: 'Case Study' };
            document.getElementById('contentType').value = typeMap[type];
        }
    }

    // Project Management
    renderProjects() {
        const select = document.getElementById('projectSelect');
        select.innerHTML = this.data.projects.map(project => 
            `<option value="${project.id}" ${this.currentProject?.id === project.id ? 'selected' : ''}>${project.name}</option>`
        ).join('');

        this.renderKanbanBoard();
    }

    renderKanbanBoard() {
        if (!this.currentProject) return;

        const board = document.getElementById('kanbanBoard');
        board.innerHTML = this.currentProject.columns.map(column => {
            const tasks = this.currentProject.tasks.filter(task => task.column === column);
            return `
                <div class="kanban-column" data-column="${column}">
                    <div class="kanban-column__header">
                        <h3 class="kanban-column__title">${column}</h3>
                        <span class="kanban-column__count">${tasks.length}</span>
                    </div>
                    <div class="kanban-column__tasks" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)">
                        ${tasks.map(task => `
                            <div class="task-card" draggable="true" ondragstart="app.handleDragStart(event)" data-task-id="${task.id}">
                                <h4 class="task-card__title">${task.title}</h4>
                                <div class="task-card__meta">
                                    <span class="task-card__due">${task.dueDate}</span>
                                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    createNewProject() {
        const name = prompt('Enter project name:');
        if (!name) return;

        const description = prompt('Enter project description:');
        const newProject = {
            id: Date.now(),
            name,
            description: description || '',
            columns: ['To Do', 'In Progress', 'Review', 'Done'],
            tasks: []
        };

        this.data.projects.push(newProject);
        this.currentProject = newProject;
        this.renderProjects();
        this.updateDashboardStats();
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
        event.target.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    handleDrop(event) {
        event.preventDefault();
        const taskId = parseInt(event.dataTransfer.getData('text/plain'));
        const targetColumn = event.currentTarget.closest('.kanban-column');
        
        if (!targetColumn) return;
        
        const newColumn = targetColumn.dataset.column;
        
        const task = this.currentProject.tasks.find(t => t.id === taskId);
        if (task && task.column !== newColumn) {
            task.column = newColumn;
            this.renderKanbanBoard();
        }

        document.querySelectorAll('.task-card.dragging').forEach(card => {
            card.classList.remove('dragging');
        });
    }

    // Research & Notes
    renderNotes() {
        this.renderNotebooks();
        this.renderNotesGrid();
    }

    renderNotebooks() {
        const notebooks = [...new Set(this.data.notes.map(note => note.notebook))];
        const list = document.getElementById('notebookList');
        list.innerHTML = notebooks.map(notebook => 
            `<div class="notebook-item" onclick="app.filterByNotebook('${notebook}')">${notebook}</div>`
        ).join('');
    }

    renderNotesGrid() {
        const grid = document.getElementById('notesGrid');
        grid.innerHTML = this.data.notes.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    filterByNotebook(notebook) {
        const filtered = this.data.notes.filter(note => note.notebook === notebook);
        const grid = document.getElementById('notesGrid');
        grid.innerHTML = filtered.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    filterNotes() {
        const search = document.getElementById('notesSearch').value.toLowerCase();
        let filtered = this.data.notes;

        if (search) {
            filtered = filtered.filter(note => 
                note.title.toLowerCase().includes(search) ||
                note.content.toLowerCase().includes(search) ||
                note.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        const grid = document.getElementById('notesGrid');
        grid.innerHTML = filtered.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    showNoteEditor() {
        document.getElementById('noteEditor').classList.remove('hidden');
        document.getElementById('noteForm').reset();
        this.editingNote = null;
    }

    hideNoteEditor() {
        document.getElementById('noteEditor').classList.add('hidden');
        this.editingNote = null;
    }

    editNote(id) {
        const note = this.data.notes.find(n => n.id === id);
        if (!note) return;

        this.editingNote = note;
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteNotebook').value = note.notebook;
        document.getElementById('noteTags').value = note.tags.join(', ');
        document.getElementById('noteContent').value = note.content;

        this.showNoteEditor();
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value;
        const notebook = document.getElementById('noteNotebook').value;
        const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        const content = document.getElementById('noteContent').value;

        if (this.editingNote) {
            this.editingNote.title = title;
            this.editingNote.notebook = notebook;
            this.editingNote.tags = tags;
            this.editingNote.content = content;
        } else {
            const newNote = {
                id: Date.now(),
                title,
                notebook,
                tags,
                content,
                createdDate: new Date().toISOString().split('T')[0]
            };
            this.data.notes.push(newNote);
        }

        this.renderNotes();
        this.hideNoteEditor();
        this.updateDashboardStats();
    }

    exportNotes() {
        const data = JSON.stringify(this.data.notes, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes-export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Development Tracking
    switchDevTab(tab) {
        document.querySelectorAll('.dev-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    }

    renderDevelopment() {
        this.renderDevTasks();
    }

    renderDevTasks() {
        const grid = document.getElementById('devTasksGrid');
        grid.innerHTML = this.data.development.map(task => `
            <div class="dev-task-item">
                <div class="dev-task-item__header">
                    <h3 class="dev-task-item__title">${task.title}</h3>
                    <span class="status status--${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                </div>
                <div class="dev-task-item__meta">
                    <span class="dev-task-item__type dev-task-item__type--${task.type.toLowerCase()}">${task.type}</span>
                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p class="dev-task-item__description">${task.description}</p>
                <div class="dev-task-item__footer">
                    <span class="dev-task-item__due">Due: ${task.dueDate}</span>
                    <div>
                        <button class="btn btn--sm btn--secondary" onclick="app.editDevTask(${task.id})">Edit</button>
                        <button class="btn btn--sm btn--outline" onclick="app.deleteDevTask(${task.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterDevTasks() {
        const statusFilter = document.getElementById('devStatusFilter').value;
        const priorityFilter = document.getElementById('devPriorityFilter').value;

        let filtered = this.data.development;

        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        if (priorityFilter) {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        const grid = document.getElementById('devTasksGrid');
        grid.innerHTML = filtered.map(task => `
            <div class="dev-task-item">
                <div class="dev-task-item__header">
                    <h3 class="dev-task-item__title">${task.title}</h3>
                    <span class="status status--${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                </div>
                <div class="dev-task-item__meta">
                    <span class="dev-task-item__type dev-task-item__type--${task.type.toLowerCase()}">${task.type}</span>
                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p class="dev-task-item__description">${task.description}</p>
                <div class="dev-task-item__footer">
                    <span class="dev-task-item__due">Due: ${task.dueDate}</span>
                    <div>
                        <button class="btn btn--sm btn--secondary" onclick="app.editDevTask(${task.id})">Edit</button>
                        <button class="btn btn--sm btn--outline" onclick="app.deleteDevTask(${task.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showDevTaskForm() {
        document.getElementById('devTaskForm').classList.remove('hidden');
        document.getElementById('devForm').reset();
        this.editingDevTask = null;
    }

    hideDevTaskForm() {
        document.getElementById('devTaskForm').classList.add('hidden');
        this.editingDevTask = null;
    }

    editDevTask(id) {
        const task = this.data.development.find(t => t.id === id);
        if (!task) return;

        this.editingDevTask = task;
        document.getElementById('devTaskTitle').value = task.title;
        document.getElementById('devTaskType').value = task.type;
        document.getElementById('devTaskStatus').value = task.status;
        document.getElementById('devTaskPriority').value = task.priority;
        document.getElementById('devTaskDueDate').value = task.dueDate;
        document.getElementById('devTaskDescription').value = task.description;

        this.showDevTaskForm();
    }

    saveDevTask() {
        const title = document.getElementById('devTaskTitle').value;
        const type = document.getElementById('devTaskType').value;
        const status = document.getElementById('devTaskStatus').value;
        const priority = document.getElementById('devTaskPriority').value;
        const dueDate = document.getElementById('devTaskDueDate').value;
        const description = document.getElementById('devTaskDescription').value;

        if (this.editingDevTask) {
            this.editingDevTask.title = title;
            this.editingDevTask.type = type;
            this.editingDevTask.status = status;
            this.editingDevTask.priority = priority;
            this.editingDevTask.dueDate = dueDate;
            this.editingDevTask.description = description;
        } else {
            const newTask = {
                id: Date.now(),
                title,
                type,
                status,
                priority,
                dueDate,
                description
            };
            this.data.development.push(newTask);
        }

        this.renderDevTasks();
        this.hideDevTaskForm();
        this.updateDashboardStats();
    }

    deleteDevTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.data.development = this.data.development.filter(t => t.id !== id);
            this.renderDevTasks();
            this.updateDashboardStats();
        }
    }

    // Settings Management
    loadDefaultSettings() {
        this.data.settings = {
            siteName: 'Digital Allies',
            siteTagline: 'Close the technology gap',
            contactEmail: 'contact@digitalallies.net',
            primaryColor: '#3A7BD5',
            signalColor: '#C5301A',
            accentColor: '#FADEEB',
            twitterUrl: 'https://twitter.com/DigitalAlliesAZ',
            linkedinUrl: 'https://linkedin.com/company/digital-allies',
            instagramUrl: 'https://instagram.com/digitalalliesaz',
            githubUrl: 'https://github.com/Digital-Allies'
        };
        this.displaySettings();
    }

    displaySettings() {
        document.getElementById('siteName').value = this.data.settings.siteName;
        document.getElementById('siteTagline').value = this.data.settings.siteTagline;
        document.getElementById('contactEmail').value = this.data.settings.contactEmail;
        document.getElementById('primaryColor').value = this.data.settings.primaryColor;
        document.getElementById('signalColor').value = this.data.settings.signalColor;
        document.getElementById('accentColor').value = this.data.settings.accentColor;
        document.getElementById('twitterUrl').value = this.data.settings.twitterUrl;
        document.getElementById('linkedinUrl').value = this.data.settings.linkedinUrl;
        document.getElementById('instagramUrl').value = this.data.settings.instagramUrl;
        document.getElementById('githubUrl').value = this.data.settings.githubUrl;
    }

    saveSettings() {
        this.data.settings = {
            siteName: document.getElementById('siteName').value,
            siteTagline: document.getElementById('siteTagline').value,
            contactEmail: document.getElementById('contactEmail').value,
            primaryColor: document.getElementById('primaryColor').value,
            signalColor: document.getElementById('signalColor').value,
            accentColor: document.getElementById('accentColor').value,
            twitterUrl: document.getElementById('twitterUrl').value,
            linkedinUrl: document.getElementById('linkedinUrl').value,
            instagramUrl: document.getElementById('instagramUrl').value,
            githubUrl: document.getElementById('githubUrl').value
        };
        alert('Settings saved successfully!');
    }
}

// Initialize the application
const app = new BusinessDashboard();
