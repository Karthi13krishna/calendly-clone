'use client';

import { Copy, CopyCheck, CopyX } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

type CopyState = 'idle' | 'copied' | 'error';
type ButtonVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost';

export function CopyEventButton({
  eventId,
  clerkUserId,
  variant,
  ...buttonProps
}: Omit<React.ComponentProps<'button'>, 'children' | 'onClick'> & {
  eventId: string;
  clerkUserId: string;
  variant: ButtonVariant;
}) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const CopyIcon = getCopyIcon(copyState);
  return (
    <Button
      {...buttonProps}
      variant={variant}
      onClick={() =>
        navigator.clipboard
          .writeText(`${location.origin}/book/${clerkUserId}/${eventId}`)
          .then(() => {
            setCopyState('copied');
            setTimeout(() => setCopyState('idle'), 2000);
          })
          .catch(() => {
            setCopyState('error');
            setTimeout(() => setCopyState('idle'), 2000);
          })
      }
    >
      <CopyIcon className="size-4 mr-2" />
      {getChildren(copyState)}
    </Button>
  );
}

function getCopyIcon(copyState: CopyState) {
  switch (copyState) {
    case 'idle':
      return Copy;
    case 'copied':
      return CopyCheck;
    case 'error':
      return CopyX;
  }
}

function getChildren(copyState: CopyState) {
  switch (copyState) {
    case 'idle':
      return 'Copy Link';
    case 'copied':
      return 'Copied';
    case 'error':
      return 'Error';
  }
}
