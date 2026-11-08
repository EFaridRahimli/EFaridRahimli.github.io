import { Dialog as D } from 'radix-ui'
import { X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

// shadcn/ui dialog, trimmed to the parts this site uses
export const Dialog = D.Root
export const DialogTitle = D.Title
export const DialogDescription = D.Description

export function DialogContent({ className, children, ...props }: ComponentProps<typeof D.Content>) {
  return (
    <D.Portal>
      <D.Overlay className="dialog-overlay fixed inset-0 z-50 bg-ink/25 backdrop-blur-[3px]" />
      <D.Content
        className={cn(
          'dialog-content fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-paper shadow-[0_30px_80px_-20px_rgb(24_24_23/0.35)] outline-none',
          className,
        )}
        {...props}
      >
        {children}
        <D.Close className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line bg-paper/80 text-ink/70 backdrop-blur transition hover:rotate-90 hover:text-ink">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </D.Close>
      </D.Content>
    </D.Portal>
  )
}
