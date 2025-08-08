import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MediaUploader from '@molecules/variant/MediaUploader';

const meta: Meta<typeof MediaUploader> = {
  title: 'Molecules/Variant/MediaUploader',
  component: MediaUploader,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof MediaUploader>;

const t = (k: string) =>
  (
    ({
      multimedia: 'Multimedia',
      dragDropImage: 'Drag & drop image here',
      addImage: 'Add Image',
    }) as Record<string, string>
  )[k] ?? k;

export const Empty: Story = {
  render: () => {
    const inputRef = React.createRef<HTMLInputElement>();
    return (
      <div className="w-[720px]">
        <MediaUploader
          t={t}
          preview={null}
          onPick={() => {}}
          onFile={() => {}}
          onDrop={() => {}}
          fileInputRef={inputRef as React.RefObject<HTMLInputElement>}
        />
      </div>
    );
  },
};

export const WithPreview: Story = {
  render: () => {
    const inputRef = React.createRef<HTMLInputElement>();
    // Placeholder preview (data URL)
    const preview =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"180\"><rect fill=\"#eee\" width=\"100%\" height=\"100%\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\">Preview</text></svg>',
      );
    return (
      <div className="w-[720px]">
        <MediaUploader
          t={t}
          preview={preview}
          onPick={() => {}}
          onFile={() => {}}
          onDrop={() => {}}
          fileInputRef={inputRef as React.RefObject<HTMLInputElement>}
        />
      </div>
    );
  },
};
