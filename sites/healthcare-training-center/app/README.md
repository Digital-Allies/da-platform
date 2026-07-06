# Healthcare Training Center App

A responsive web application for healthcare training modules built with React, Vite, TypeScript, and Motion.dev.

## Project Structure

```
src/
├── components/          # Reusable UI components (Button, Card, Navigation, etc.)
├── pages/              # Page components (Auth, Lobby, Courses, etc.)
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
├── styles/             # Global styles and design tokens
├── App.tsx             # Main app with routing
├── main.tsx            # React entry point
└── index.css           # Global CSS reset
```

## Design System

The app uses a comprehensive design token system defined in `src/styles/design-tokens.css`:

- **Colors**: Navy (#1E3A6E), Teal (#2B8FA9), plus 5 training room accent colors
- **Typography**: Montserrat (headings), Inter (body), Playfair Display (certificates)
- **Spacing**: 8px base unit with CSS variable scale
- **Animation**: Motion.dev for smooth transitions

## Week 1: Lobby + Navigation ✅

- [x] React + Vite + TypeScript setup
- [x] Design tokens imported
- [x] Core components (Button, Card, ProgressBar, Navigation)
- [x] Mock authentication
- [x] Lobby screen with 5 training rooms
- [x] Responsive design (mobile, tablet, desktop)
- [x] Production build passing

## Week 2: Lesson + Quiz Flow (Upcoming)

- [ ] Course/room detail page
- [ ] Lesson player with voiceover placeholder
- [ ] Module navigation rail
- [ ] Quiz interface with multiple choice questions
- [ ] Results screen with feedback
- [ ] Certificate mockup

## Week 3: Admin Dashboard + Polish (Upcoming)

- [ ] Admin login separate from learner
- [ ] Learner progress dashboard
- [ ] Course management interface
- [ ] Accessibility audit
- [ ] Performance optimization

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies

- **React 19** - UI framework
- **Vite 8** - Build tool
- **TypeScript** - Type safety
- **React Router 7** - Routing
- **Motion.dev** - Animations
- **CSS Variables** - Design tokens

## Features

- ✨ Smooth animations with Motion.dev
- 📱 Mobile-first responsive design
- ♿ Accessible UI components (in progress)
- 🎨 Cohesive design system
- 🔐 Mock authentication with localStorage persistence
- 📊 Progress tracking ready for integration

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes

- This is a demo/prototype for testing and feedback
- No data is persisted to a backend (uses localStorage only)
- Ready for future integration with a real backend API
