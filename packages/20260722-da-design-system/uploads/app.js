// Digital Allies Business Management Dashboard
class BusinessDashboard {
    constructor() {
        // In-memory data storage (not using localStorage as per requirements)
        this.data = {
            projects: [],
            content: [],
            notes: [],
            development: [],
            notifications: []
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
    }

    loadSampleData() {
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
                title: "Digital Transformation Guide",
                type: "Blog Post",
                status: "Published",
                tags: ["business", "technology", "guide"],
                content: "A comprehensive guide to digital transformation for small businesses. This guide covers the essential steps and strategies needed to successfully modernize your business operations.",
                createdDate: "2025-10-08",
                publishDate: "2025-10-10"
            },
            {
                id: 2,
                title: "Welcome Email Template",
                type: "Email Template",
                status: "Draft",
                tags: ["email", "template", "welcome"],
                content: "Welcome to Digital Allies! We're excited to have you join our community of forward-thinking business owners.",
                createdDate: "2025-10-09"
            },
            {
                id: 3,
                title: "Social Media Strategy",
                type: "Social Media",
                status: "Review",
                tags: ["social", "marketing", "strategy"],
                content: "Comprehensive social media strategy for Q4 2025 focusing on LinkedIn and Twitter engagement.",
                createdDate: "2025-10-09"
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

        // Sidebar toggle for mobile
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

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

        // Notifications
        document.querySelector('.btn.btn--outline.btn--sm').addEventListener('click', () => {
            this.showNotifications();
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
    }

    showNotifications() {
        // Create notifications dropdown
        let existingDropdown = document.getElementById('notificationsDropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }

        const dropdown = document.createElement('div');
        dropdown.id = 'notificationsDropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 8px;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            padding: 16px;
            border-bottom: 1px solid var(--color-border);
            font-weight: var(--font-weight-semibold);
        `;
        header.textContent = 'Notifications';

        const content = document.createElement('div');
        content.innerHTML = this.data.notifications.map(notification => `
            <div style="padding: 12px 16px; border-bottom: 1px solid var(--color-border); cursor: pointer; transition: background 0.15s;" 
                 onmouseover="this.style.background='var(--color-secondary)'" 
                 onmouseout="this.style.background='transparent'">
                <div style="font-weight: var(--font-weight-medium); margin-bottom: 4px;">${notification.title}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: 4px;">${notification.message}</div>
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${notification.timestamp}</div>
            </div>
        `).join('');

        dropdown.appendChild(header);
        dropdown.appendChild(content);

        // Position relative to notification button
        const notificationBtn = document.querySelector('.btn.btn--outline.btn--sm');
        notificationBtn.style.position = 'relative';
        notificationBtn.appendChild(dropdown);

        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && e.target !== notificationBtn) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
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

        // Hide sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
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
        
        // Clear form and switch to library
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

    renderContentCalendar() {
        const calendar = document.getElementById('contentCalendar');
        const daysInMonth = 31;
        const startDay = 2; // October 2025 starts on Wednesday (0=Sunday, 1=Monday, etc.)
        
        let calendarHTML = '';
        
        // Header row
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            calendarHTML += `<div class="calendar-day-header">${day}</div>`;
        });

        // Empty cells for days before month starts
        for (let i = 0; i < startDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `2025-10-${day.toString().padStart(2, '0')}`;
            const hasContent = this.data.content.some(content => 
                content.publishDate === dateStr || content.createdDate === dateStr
            );
            
            calendarHTML += `
                <div class="calendar-day ${hasContent ? 'has-content' : ''}">
                    <div class="calendar-day-number">${day}</div>
                    ${hasContent ? '<div class="calendar-content">📝</div>' : ''}
                </div>
            `;
        }

        calendar.innerHTML = calendarHTML;
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
        
        // Find and update the task
        const task = this.currentProject.tasks.find(t => t.id === taskId);
        if (task && task.column !== newColumn) {
            task.column = newColumn;
            this.renderKanbanBoard();
        }

        // Remove dragging class from all cards
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

        // Update notebook selection
        document.querySelectorAll('.notebook-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');
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
            // Update existing note
            this.editingNote.title = title;
            this.editingNote.notebook = notebook;
            this.editingNote.tags = tags;
            this.editingNote.content = content;
        } else {
            // Create new note
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
            // Update existing task
            this.editingDevTask.title = title;
            this.editingDevTask.type = type;
            this.editingDevTask.status = status;
            this.editingDevTask.priority = priority;
            this.editingDevTask.dueDate = dueDate;
            this.editingDevTask.description = description;
        } else {
            // Create new task
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
}

// Initialize the application
const app = new BusinessDashboard();