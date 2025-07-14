import type { Meta, StoryObj } from '@storybook/react';

import { LifeGrid } from './LifeGrid';

const meta: Meta<typeof LifeGrid> = {
  title: 'Components/LifeGrid',
  component: LifeGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Width of the grid',
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the grid',
    },
    theme: {
      control: { type: 'text' },
      description: 'Theme',
    },
    zodiacIconSet: {
      control: { type: 'text' },
      description: 'Zodiac icon set',
    },
    lifeMode: {
      control: { type: 'text' },
      description: 'Life mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Prototype: Story = {
  args: {
    width: 900,
    height: 500,
    // theme: 'light',
    // zodiacIconSet: 'default',
    // lifeMode: 'normal',
  },
};

export const Default: Story = {
  args: {
    width: 900,
    height: 400,
    // theme: 'light',
    // zodiacIconSet: 'default',
    // lifeMode: 'normal',
  },
};

export const SeasonsGrid: Story = {
  args: {
    width: 1000,
    height: 400,
    // theme: 'light',
    // zodiacIconSet: 'default',
    // lifeMode: 'normal',
  },
};

export const MonthsGrid: Story = {
  args: {
    width: 1000,
    height: 500,
    // theme: 'light',
    // zodiacIconSet: 'default',
    // lifeMode: 'normal',
  },
};
