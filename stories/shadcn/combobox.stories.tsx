import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Combobox, ComboboxOption, ComboboxProps } from '@shadcn/ui/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'shadcn/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no options match the search',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
    width: {
      control: 'text',
      description: 'Width of the combobox (number in px or string with units)',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Side where the popover appears',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the popover',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks: ComboboxOption[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
];

const languages: ComboboxOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' },
];

const statusOptions: ComboboxOption[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'canceled', label: 'Canceled', disabled: true },
];

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    width: 200,
  },
};

export const WithValue: Story = {
  args: {
    options: frameworks,
    value: 'next.js',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    width: 200,
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    value: 'react',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status...',
    searchPlaceholder: 'Search status...',
    emptyMessage: 'No status found.',
  },
};

export const CustomWidth: Story = {
  args: {
    options: languages,
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
    emptyMessage: 'No language found.',
    width: 300,
  },
};

export const CustomMessages: Story = {
  args: {
    options: frameworks,
    placeholder: 'Choose your framework',
    searchPlaceholder: 'Type to search...',
    emptyMessage: 'Oops! No matches found.',
    width: 250,
  },
};

export const PopoverPositioning: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    side: 'top',
    align: 'center',
    width: 200,
  },
};

// Interactive story with state management
const InteractiveComponent = (args: ComboboxProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="space-y-4">
      <Combobox {...args} value={value} onValueChange={setValue} />
      <div className="text-muted-foreground text-sm">
        Selected value: {value || 'None'}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveComponent {...args} />,
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    width: 200,
  },
};

// Controlled state story
const ControlledComponent = (args: ComboboxProps) => {
  const [value, setValue] = useState<string>('react');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setValue('vue')}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
        >
          Set to Vue.js
        </button>
        <button
          onClick={() => setValue('')}
          className="rounded bg-gray-500 px-3 py-1 text-sm text-white"
        >
          Clear
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="rounded bg-green-500 px-3 py-1 text-sm text-white"
        >
          Toggle Open
        </button>
      </div>
      <Combobox
        {...args}
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
      />
      <div className="text-muted-foreground text-sm">
        Selected: {value || 'None'} | Open: {open ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledComponent {...args} />,
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No framework found.',
    width: 200,
  },
};

// Multiple comboboxes story
const MultipleComponent = () => {
  const [framework, setFramework] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Framework</label>
          <Combobox
            options={frameworks}
            value={framework}
            onValueChange={setFramework}
            placeholder="Select framework..."
            searchPlaceholder="Search frameworks..."
            emptyMessage="No framework found."
            width={200}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>
          <Combobox
            options={languages}
            value={language}
            onValueChange={setLanguage}
            placeholder="Select language..."
            searchPlaceholder="Search languages..."
            emptyMessage="No language found."
            width={200}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <Combobox
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
            placeholder="Select status..."
            searchPlaceholder="Search status..."
            emptyMessage="No status found."
            width={200}
          />
        </div>
      </div>
      <div className="text-muted-foreground space-y-1 text-sm">
        <div>Framework: {framework || 'None'}</div>
        <div>Language: {language || 'None'}</div>
        <div>Status: {status || 'None'}</div>
      </div>
    </div>
  );
};

export const Multiple: Story = {
  render: () => <MultipleComponent />,
  args: {},
};

const LoadMoreComponent = (args: ComboboxProps) => {
  const initialOptions: ComboboxOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ];
  const allFruits: ComboboxOption[] = [
    ...initialOptions,
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
  ];

  const [options, setOptions] = useState<ComboboxOption[]>(initialOptions);
  const [value, setValue] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const currentLength = options.length;
      const newOptions = allFruits.slice(0, currentLength + 3);
      setOptions(newOptions);
      setIsLoadingMore(false);
      if (newOptions.length === allFruits.length) {
        setHasMore(false);
      }
    }, 999999999999999);
  };

  return (
    <div className="space-y-4">
      <Combobox
        {...args}
        options={options}
        value={value}
        onValueChange={setValue}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
        loadMoreText="Load more fruits"
        loadingText="Loading..."
      />
      <div className="text-muted-foreground text-sm">
        Selected value: {value || 'None'}
      </div>
    </div>
  );
};

export const WithLoadMore: Story = {
  render: (args) => <LoadMoreComponent {...args} />,
  args: {
    placeholder: 'Select fruit...',
    searchPlaceholder: 'Search fruits...',
    emptyMessage: 'No fruit found.',
  },
};
