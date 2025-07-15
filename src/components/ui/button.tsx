import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  ",
  {
    variants: {
      variant: {
        default: 'bg-white text-primary-foreground shadow-xs  cursor-pointer ',
        destructive:
          ' text-white shadow-xs  focus-visible:ring-destructive/20  dark:bg-destructive/60',
        outline: 'border  shadow-xs   dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: ' text-secondary-foreground shadow-xs ',
        ghost: 'hover:bg-accent  dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        cancel: 'text-[#605DEC] border border-[#605DEC] rounded  ',
        upgrade: 'text-[#fff]  bg-[#605DEC] rounded  ',
      },
      size: {
        default: ' w-[168px] py-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        cancel:
          'w-[95px] py-3  inline-block hover:bg-[#605DEC] lg:text-base hover:text-white cursor-pointer',
        upgrade: 'w-[185px] py-3  inline-block  lg:text-base  cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
