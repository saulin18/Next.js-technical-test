# Next.js + TypeScript + Tailwind CSS + Zustand Technical Test

A Next.js application for managing and reviewing products with an intuitive interface and real-time updates.

## Features

- Product management system with approval workflow
- Infinite scroll pagination
- Real-time status updates
- Responsive design
- Persistent state management
- Separate views for pending and reviewed products

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   
│   ├── adapters/         # Data transformation layer
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript type definitions
```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd ctihub.dev
 ```

2. Install dependencies:

```bash
npm install
 ```

3. Run the development server:

```bash
npm run dev
 ```

4. Open <http://localhost:3000> in your browser

## Scripts

- npm run dev : Start development server
- npm run build : Build for production
- npm run start : Start production server
- npm run lint : Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
