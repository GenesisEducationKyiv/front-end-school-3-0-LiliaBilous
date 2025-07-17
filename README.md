# 🎵 Music Track Manager

A Vue 3 frontend application for managing music tracks with advanced features including audio playback, waveform visualization, and real-time updates. Built with **Vue 3 + TypeScript** and integrated with a provided **Node.js** backend.

## 🚀 Quick Start

### Prerequisites

- Node.js `v20.13.1` or higher
- NPM `v10+` or higher

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will be available at: [http://localhost:8000](http://localhost:8000)  
GraphQL Playground: [http://localhost:8000/graphql](http://localhost:8000/graphql)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

### Frontend

- **Vue 3** + Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Vite** for fast development and building
- **WaveSurfer.js** for audio waveform visualization
- **Playwright** for E2E & Component testing
- **Vitest** for unit testing
- **Apollo Client** for GraphQL integration

### Backend (Provided)

- **Node.js** with Express
- **GraphQL** with Apollo Server (migrated from REST API)
- **TypeScript** for type safety
- **File upload** handling
- **REST API** endpoints
- **Vitest** for testing

## ✨ Features

### Core Functionality

- 📋 **Track Management** - Create, edit, delete tracks
- 🎧 **Audio Playback** - Play tracks with waveform visualization
- 📁 **File Upload** - Upload audio files with validation
- 🔍 **Advanced Filtering** - Filter by genre, artist, title
- 📄 **Pagination** - Efficient track list navigation
- 🏷️ **Genre Management** - Add/remove genre tags

### Advanced Features

- ✅ **Bulk Operations** - Select and delete multiple tracks
- ✅ **Real-time Updates** - GraphQL subscriptions for live sync
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Accessibility** - Keyboard navigation and ARIA support

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm run test          # Unit tests (Vitest)
npm run test:e2e      # E2E tests (Playwright)
npm run test:ct       # Component tests (Playwright CT)
```

### Backend Tests

```bash
cd backend
npm run test          # Unit tests (Vitest)
```

## 📁 Project Structure

```
├── frontend/                 # Vue 3 + TypeScript application
│   ├── src/
│   │   ├── features/         # Feature-based modules
│   │   │   ├── tracks/       # Track management
│   │   │   ├── filters/      # Search and filtering
│   │   │   └── audio/        # Audio playback
│   │   ├── shared/           # Reusable components & utilities
│   │   └── tests/            # Test files
│   ├── docs/                 # Documentation & ADRs
│   └── public/               # Static assets
├── backend/                  # Provided Node.js + GraphQL API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── graphql/          # GraphQL schema & resolvers
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utilities
│   ├── data/                 # Database files
│   └── uploads/              # Uploaded audio files
└── .github/workflows/        # CI/CD pipeline
```

## 🔧 Development

### Available Scripts

#### Frontend

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
```

#### Backend

```bash
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run test         # Run tests
```

## 📊 Performance & Quality

- ✅ **Bundle Analysis** - Track bundle size with rollup-plugin-visualizer
- ✅ **Lighthouse Reports** - Performance, accessibility, SEO scores
- ✅ **Security Audit** - Regular security assessments
- ✅ **Code Coverage** - Comprehensive test coverage
- ✅ **CI/CD Pipeline** - Automated quality checks

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Detailed frontend documentation
- [Backend README](./backend/README.md) - Backend API documentation
- [Architecture Decision Records](./frontend/docs/adr/) - ADR documentation
- [Security Audit Reports](./frontend/docs/audit/) - Security assessments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🎯 Learning Objectives

This project demonstrates:

- **Modern Frontend Architecture** with Vue 3 + TypeScript
- **API Integration** with GraphQL (migrated from REST) and REST endpoints
- **Testing Strategies** (Unit, Component, E2E)
- **CI/CD Best Practices** with GitHub Actions
- **Documentation Standards** with ADRs and comprehensive READMEs
- **Performance Optimization** with bundle analysis and Lighthouse
- **Security Awareness** with regular audits
- **Engineering Culture** with proper project structure and conventions
