# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for tiemply.com - a time tracking and employee management SaaS for businesses. Built with Vue.js 3 and served at https://tiemply.com.

## Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Docker build and run
docker build -f Dockerfile.prod -t tiemply-landing .
docker run -p 80:80 tiemply-landing
```

## Architecture

### Tech Stack
- Vue.js 3 (Composition API)
- Vite (build tool)
- Tailwind CSS + SCSS
- Vue Router (SPA routing)
- Axios (API calls)

### Key Directories
- `src/views/` - Page components (HomePage, RegisterPage, PricingPage, etc.)
- `src/components/sections/` - Reusable page sections (HeroSection, PricingSection, ContactSection, etc.)
- `src/services/api.js` - All API service calls (plansService, contactService, companyService)
- `src/composables/` - Vue composables with shared state (usePlans.js)

### Path Alias
`@` maps to `src/` directory (configured in vite.config.js)

### API Integration
- Base URL: `https://admin.tiemply.com/api` (configurable via `VITE_API_URL`)
- Services export named functions: `plansService`, `contactService`, `companyService`
- Error interceptor normalizes API errors with `type` and `message` fields

### Styling Conventions
- Global styles in `src/assets/css/main.scss`
- Custom CSS components defined in `@layer components` block (btn, card, form-input, section, etc.)
- Inter font loaded from Google Fonts
- Tailwind config extends colors with `primary`, `secondary`, `teal`, `dark` palettes

### Routes
| Path | View |
|------|------|
| `/` | HomePage |
| `/registro` | RegisterPage (3-step company registration) |
| `/registro/exito` | RegisterSuccessPage |
| `/precios` | PricingPage |
| `/caracteristicas` | FeaturesPage |

### Environment Variables
```
VITE_API_URL=https://admin.tiemply.com/api
VITE_APP_URL=https://app.tiemply.com
VITE_APP_NAME=Tiemply
```
