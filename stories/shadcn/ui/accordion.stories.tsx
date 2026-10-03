import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@shadcn/ui/accordion';

const meta: Meta<typeof Accordion> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'What is EasyStore?' });
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await storybookExpect(
      canvas.getByText('All-in-one commerce platform to sell anywhere.'),
    ).toBeVisible();
  },
  title: 'Shadcn/UI/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is EasyStore?</AccordionTrigger>
        <AccordionContent>
          All-in-one commerce platform to sell anywhere.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is there a free plan?</AccordionTrigger>
        <AccordionContent>
          Yes, start free and upgrade anytime.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
