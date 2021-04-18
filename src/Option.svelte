<svelte:options tag="option-pure" />

<script>
  import { selected } from "./store.js";

  export let value;
  let option;

  function onSelect() {
    selected.update(() => ({value, label: option.parentNode.host.textContent}));
  }
</script>

<style>
  .option {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    box-sizing: border-box;
    height: 44px;
    line-height: 25px;
    padding: 10px;
  }
</style>


<div
  class="option"
  class:selected={value === $selected?.value}
  bind:this={option}
  on:click={onSelect}
>
  <slot />
</div>
