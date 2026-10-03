import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@shadcn/ui/table';

const meta: Meta<typeof Table> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>Example of a simple table.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alex Johnson</TableCell>
          <TableCell>alex@email.com</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria Smith</TableCell>
          <TableCell>maria@email.com</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>2 users</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
