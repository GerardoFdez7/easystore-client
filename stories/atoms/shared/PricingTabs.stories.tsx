import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@atoms/shared/PricingTabs';
import { useState } from 'react';

const meta: Meta = {
  title: 'Atoms/Shared/PricingTabs',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const tabs = [
  { value: 'tab1', label: 'Monthly', content: 'This is the Monthly tab.' },
  { value: 'tab2', label: 'Yearly', content: 'This is the Yearly tab.' },
];

const TabsExample = () => {
  const [value, setValue] = useState('tab1');

  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <p>{tab.content}</p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export const Default: StoryObj = {
  render: () => <TabsExample />,
};
