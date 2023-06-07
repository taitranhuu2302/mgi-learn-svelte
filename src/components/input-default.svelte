<script lang="ts">
  
  export let value: string;
  export let placeholder: string | undefined = "";
  export let className: string | undefined = "";
  let isFocus: boolean = false;
</script>

<div class={`input-control ${className}`} class:focus={isFocus}>
  <slot name="startIcon" />
  <input
    class="input-default"
    type="text"
    {placeholder}
    bind:value
    on:focusin={() => (isFocus = true)}
    on:focusout={() => (isFocus = false)}
  />
  <slot name="endIcon" />
</div>

<style scoped>
  .input-control {
    @apply flex gap-2.5 border-2 px-3 py-2 rounded;
  }

  .input-control.focus {
    @apply border-primary;
  }

  .input-default {
    @apply outline-none w-full;
  }
</style>
