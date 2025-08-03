'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import Input from '@atoms/shared/OutsideInput';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';

interface DialogForgotPasswordProps {
  children: React.ReactNode;
}

export default function DialogForgotPassword({
  children,
}: DialogForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Reset email when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Sending reset password email to:', email);
      setIsOpen(false);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonLoadable
            type="submit"
            variant="auth"
            size="xl"
            className="w-full"
            isLoading={isLoading}
            loadingText="Sending..."
          >
            Send Reset Link
          </ButtonLoadable>
        </form>
      </DialogContent>
    </Dialog>
  );
}
