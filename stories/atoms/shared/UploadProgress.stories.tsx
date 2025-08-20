import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useRef } from 'react';
import UploadProgress, {
  UploadProgressRef,
} from '@atoms/shared/UploadProgress';

const meta: Meta<typeof UploadProgress> = {
  title: 'Atoms/Shared/UploadProgress',
  component: UploadProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage text',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadProgress>;

const AnimatedUploadProgress = () => {
  const uploadProgressRef = useRef<UploadProgressRef>(null);

  useEffect(() => {
    const simulateUpload = () => {
      if (!uploadProgressRef.current) return;

      // Start upload
      uploadProgressRef.current.handleUploadStart();

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15; // Random progress increments

        if (progress >= 100) {
          progress = 100;
          uploadProgressRef.current?.handleUploadProgress({
            lengthComputable: true,
            loaded: 100,
            total: 100,
          });

          // Simulate successful upload
          setTimeout(() => {
            uploadProgressRef.current?.handleUploadSuccess({
              url: 'https://example.com/uploaded-file.jpg',
              fileId: 'file_123',
              name: 'example-file.jpg',
              filePath: '/uploads/example-file.jpg',
              size: 1024000,
              fileType: 'image/jpeg',
            });

            // Restart the animation after 2 seconds
            setTimeout(simulateUpload, 2000);
          }, 500);

          clearInterval(interval);
        } else {
          uploadProgressRef.current?.handleUploadProgress({
            lengthComputable: true,
            loaded: progress,
            total: 100,
          });
        }
      }, 100); // Update every 100ms
    };

    // Start the first upload simulation
    const timeout = setTimeout(simulateUpload, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-80 space-y-4">
      <div className="text-center text-sm text-gray-600">
        Simulated upload progress (auto-restarts)
      </div>
      <UploadProgress ref={uploadProgressRef} />
    </div>
  );
};

export const Default: Story = {
  render: () => <AnimatedUploadProgress />,
};
