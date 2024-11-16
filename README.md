
# Country Explorer

Country Explorer is a web application that enables users to explore detailed information about various countries and manage international cooperation agreements. Built with Next.js, TypeScript, Redux Toolkit, and Shadcn UI, the application offers a modern and responsive user interface.

## Features

- 🌍 **Explore Countries:** View a comprehensive list of countries with flags and basic information
- 🔍 **Search & Sort:** Search for countries by name and sort them by different criteria
- 📄 **Detailed Information:** Access detailed country information, including:
  - Capital
  - Population
  - Currency
  - Languages
  - Continent
  - Area
  - GDP
  - Independence status
- 🤝 **Manage Cooperation:** Add or remove cooperation agreements with selected countries
- 🌓 **Dark Mode:** Toggle between light and dark themes
- 📱 **Responsive Design:** Optimized for both desktop and mobile devices

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites

- Node.js v14 or later
- npm or Yarn

### Installation

1. **Clone Repository:**
   ```bash
   git clone https://github.com/username/country-explorer.git
   ```

2. **Navigate to Project Directory:**
   ```bash
   cd country-explorer
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Application in Browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  ├── app/                    # Next.js app directory with routes and layout
  ├── components/             # Reusable React components
  │   ├── CountryDetail/      # Country details component
  │   ├── CooperationList/    # Cooperation agreements management
  │   ├── Countries/          # Countries listing and exploration
  │   ├── admin-panel/        # Admin panel components
  │   └── ui/                 # UI components like Card, Button, etc.
  ├── lib/                    # Utilities, Redux store, and services
  │   ├── features/          # Redux slices for state management
  │   ├── services/          # API services
  │   └── store.ts           # Redux store configuration
  └── __test__/              # Test files
```

## Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Testing
npm run test
npm run test:watch

# Linting
npm run lint
```

## Testing

The project uses Jest and React Testing Library for testing. To run tests:

```bash
npm run test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Create a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
