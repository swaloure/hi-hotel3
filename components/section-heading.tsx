import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs',
          align === 'center' && 'justify-center',
          inverse ? 'text-white/60' : 'text-accent',
        )}
      >
        <span className={cn('h-px w-8', inverse ? 'bg-white/35' : 'bg-accent/60')} />
        {eyebrow}
      </div>
      <h2
        className={cn(
          'mt-5 font-serif text-3xl font-medium leading-[1.04] tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl',
          inverse ? 'text-white' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-sm leading-7 text-pretty sm:text-base',
            align === 'center' && 'mx-auto',
            inverse ? 'text-white/65' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
