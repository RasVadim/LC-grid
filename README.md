# LC-Grid

A React component for displaying a life calendar (weeks grid) using the Canvas API.

## Features

- Display 52 weeks per year as a grid
- Configurable size and colors
- Interactive (click, hover)
- Custom cell rendering support
- TypeScript support
- Storybook for development and documentation

## Installation

```bash
yarn add lc-grid
```

## Usage

```tsx
import { LifeGrid } from 'lc-grid';

function App() {
  return (
    <LifeGrid
      width={800}
      height={400}
      // You can pass other props as needed
    />
  );
}
```

## Props

| Prop            | Type                        | Default   | Description                        |
|-----------------|-----------------------------|-----------|------------------------------------|
| `width`         | `number`                    | `800`     | Width of the grid in pixels        |
| `height`        | `number`                    | `400`     | Height of the grid in pixels       |
| `weeks`         | `IWeek[]`                   | `[]`      | Weeks data (optional)              |
| `theme`         | `Record<string, string>`    | -         | Theme object (optional)            |
| `zodiacIconSet` | `TZodiacIconSet`            | -         | Zodiac icons (optional)            |
| `lifeMode`      | `TLifeMode`                 | -         | Life mode (months, seasons, years) |
| `setLifeMode`   | `(mode: TLifeMode) => void` | -         | Callback to set life mode          |



## Development

### Clone repo

```bash
git clone git@github.com:RasVadim/LC-grid.git 
```

### Install dependencies

```bash
yarn 
```

### Start Storybook

```bash
yarn storybook
```

Storybook will be available at http://localhost:6006

### Build

```bash
yarn build
```

### Publish

```bash
yarn publish
```

## Project Structure

```
src/
├── components/
│   ├── lifeGrid/
│   │   ├── LifeGrid.tsx         # Main component
│   │   └── LifeGrid.stories.tsx # Storybook stories
│   └── index.ts                 # Exports
├── types/                       # TypeScript types
└── index.ts                     # Main entry point
```

## License

MIT
