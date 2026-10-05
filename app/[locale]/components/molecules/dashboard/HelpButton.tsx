'use client';

import { BadgeQuestionMark } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

export default function HelpButton() {
  const t = useTranslations('Dashboard');

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="xl"
              type="button"
              className="hover:bg-hover h-10 w-10 cursor-pointer rounded-md"
              aria-label={t('help')}
            >
              <BadgeQuestionMark
                className="text-title size-6"
                aria-hidden="true"
              />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('help')}</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('helpDialogTitle')}</DialogTitle>
          <DialogDescription>{t('helpDialogDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              {t('helpDialogCancel')}
            </Button>
          </DialogClose>
          <Button asChild variant="default" type="button">
            <a href="https://discord.com/invite/35nBjqV4KC">
              {t('helpDialogAction')}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
