'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

type SmoothLinkProps = ComponentProps<typeof Link>;

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function SmoothLink({ href, onClick, target, ...props }: SmoothLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      target === '_blank' ||
      typeof href !== 'string' ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    event.preventDefault();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
      return;
    }

    document.documentElement.classList.add('route-transitioning');
    window.setTimeout(() => router.push(href), 120);
    window.setTimeout(() => {
      document.documentElement.classList.remove('route-transitioning');
    }, 520);
  };

  return <Link href={href} target={target} onClick={handleClick} {...props} />;
}
