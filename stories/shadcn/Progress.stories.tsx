import type { Meta, StoryObj } from '@storybook/nextjs';
import { Progress } from '@shadcn/ui/progress';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Shadcn/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset to 0 when reaching 100%
        }
        return prev + 1;
      });
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(timer);
  }, []);

  return <Progress value={progress} className="w-80" />;
};

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};
