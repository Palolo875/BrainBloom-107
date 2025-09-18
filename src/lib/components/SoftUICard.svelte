<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    children?: any;
    class?: string;
    pressed?: boolean;
    hoverable?: boolean;
    onclick?: () => void;
    style?: string;
  }

  let { children, class: className = '', pressed = false, hoverable = true, onclick, style, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    'bg-card rounded-2xl border-none transition-all duration-300 ease-out',
    pressed ? 'soft-shadow-inset' : 'soft-shadow',
    hoverable && !pressed && 'hover:soft-shadow-hover cursor-pointer',
    onclick && 'cursor-pointer',
    className
  )}
  {onclick}
  {style}
  {...restProps}
>
  {@render children?.()}
</div>