"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

type SliderProps = SliderPrimitive.Root.Props<number> & {
  getAriaLabel?: SliderPrimitive.Thumb.Props["getAriaLabel"]
  getAriaValueText?: SliderPrimitive.Thumb.Props["getAriaValueText"]
}

function Slider({ className, getAriaLabel, getAriaValueText, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn("w-full", className)}
      data-slot="slider"
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex h-11 w-full touch-none items-center select-none data-disabled:opacity-50">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-px w-full bg-foreground select-none"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="-top-px h-[3px] bg-primary select-none"
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          getAriaLabel={getAriaLabel}
          getAriaValueText={getAriaValueText}
          className="relative block size-5 shrink-0 cursor-grab border-2 border-primary bg-background outline-none select-none after:absolute after:-inset-3 press hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:cursor-grabbing data-dragging:bg-primary"
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
