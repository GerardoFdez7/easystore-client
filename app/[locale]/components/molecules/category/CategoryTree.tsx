'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@shadcn/ui/button';

type Node = { label: string; children?: Node[] };

const DATA: Node[] = [
  {
    label: 'Electronics',
    children: [
      {
        label: 'Computers',
        children: [
          {
            label: 'Laptops',
            children: [
              { label: 'Gaming' },
              { label: 'Ultrabooks' },
              { label: 'Workstations' },
            ],
          },
          {
            label: 'Desktops',
            children: [
              { label: 'All-in-One' },
              { label: 'Mini PC' },
              { label: 'Towers' },
            ],
          },
          {
            label: 'Accessories',
            children: [
              { label: 'Keyboards' },
              { label: 'Mice' },
              { label: 'Monitors' },
            ],
          },
        ],
      },
      {
        label: 'Mobile Phones',
        children: [
          {
            label: 'Smartphones',
            children: [
              { label: 'Android' },
              { label: 'iOS' },
              { label: 'Foldables' },
            ],
          },
          {
            label: 'Wearables',
            children: [{ label: 'Smartwatches' }, { label: 'Fitness Bands' }],
          },
          {
            label: 'Accessories',
            children: [
              { label: 'Cases' },
              { label: 'Chargers' },
              { label: 'Cables' },
            ],
          },
        ],
      },
      {
        label: 'Audio & Video',
        children: [
          { label: 'Headphones' },
          { label: 'Speakers' },
          {
            label: 'TV',
            children: [{ label: 'LED' }, { label: 'OLED' }, { label: 'QLED' }],
          },
        ],
      },
    ],
  },
  {
    label: 'Fashion',
    children: [
      {
        label: 'Women',
        children: [
          { label: 'Dresses' },
          { label: 'Tops' },
          {
            label: 'Shoes',
            children: [
              { label: 'Heels' },
              { label: 'Sneakers' },
              { label: 'Boots' },
            ],
          },
        ],
      },
      {
        label: 'Men',
        children: [
          { label: 'Shirts' },
          { label: 'Pants' },
          {
            label: 'Shoes',
            children: [
              { label: 'Sneakers' },
              { label: 'Formal' },
              { label: 'Boots' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Home & Garden',
    children: [
      {
        label: 'Furniture',
        children: [
          {
            label: 'Living Room',
            children: [
              { label: 'Sofas' },
              { label: 'Coffee Tables' },
              { label: 'TV Stands' },
            ],
          },
          {
            label: 'Bedroom',
            children: [
              { label: 'Beds' },
              { label: 'Wardrobes' },
              { label: 'Nightstands' },
            ],
          },
          {
            label: 'Office',
            children: [{ label: 'Desks' }, { label: 'Chairs' }],
          },
        ],
      },
      {
        label: 'Garden',
        children: [
          { label: 'Plants' },
          { label: 'Tools' },
          { label: 'Outdoor Furniture' },
        ],
      },
      {
        label: 'Kitchen',
        children: [
          { label: 'Appliances' },
          { label: 'Cookware' },
          { label: 'Storage' },
        ],
      },
    ],
  },
  {
    label: 'Sports & Outdoors',
    children: [
      {
        label: 'Fitness',
        children: [
          { label: 'Weights' },
          { label: 'Cardio' },
          { label: 'Accessories' },
        ],
      },
      {
        label: 'Outdoor',
        children: [
          {
            label: 'Camping',
            children: [
              { label: 'Tents' },
              { label: 'Sleeping Bags' },
              { label: 'Stoves' },
            ],
          },
          { label: 'Cycling' },
          { label: 'Hiking' },
        ],
      },
    ],
  },
  {
    label: 'Books & Media',
    children: [
      {
        label: 'Books',
        children: [
          { label: 'Fiction' },
          { label: 'Non-Fiction' },
          { label: 'Kids' },
        ],
      },
      { label: 'Music' },
      { label: 'Movies' },
    ],
  },
  {
    label: 'Toys & Games',
    children: [
      { label: 'Building' },
      { label: 'Educational' },
      { label: 'Board Games' },
    ],
  },
  {
    label: 'Health & Beauty',
    children: [
      {
        label: 'Skincare',
        children: [
          { label: 'Cleansers' },
          { label: 'Moisturizers' },
          { label: 'Serums' },
        ],
      },
      { label: 'Haircare' },
      { label: 'Makeup' },
    ],
  },
];

function TreeItem({ node, level = 0 }: { node: Node; level?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.children?.length;

  return (
    <div className="select-none">
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 py-1 text-left text-sm text-[#423f3d] hover:bg-gray-100"
        onClick={() => hasChildren && setOpen((v) => !v)}
        aria-expanded={hasChildren ? open : undefined}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )
        ) : (
          <span className="inline-block h-4 w-4" />
        )}
        <span className={level ? 'pl-1' : ''}>{node.label}</span>
      </Button>

      {open && node.children && (
        <div className="pl-5">
          {node.children.map((child) => (
            <TreeItem key={child.label} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree() {
  return (
    <div className="rounded-lg p-4">
      {DATA.map((n) => (
        <TreeItem key={n.label} node={n} />
      ))}
    </div>
  );
}
