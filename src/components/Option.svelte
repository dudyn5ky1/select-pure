<svelte:options tag="option-pure" />

<script>
  import { getContext } from 'svelte';


  export let value;
  export let onChange;
  let option;

  function onSelect() {
    console.log(getContext("onChange"));
    onChange();
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
  class:selected={false}
  bind:this={option}
  on:click={onSelect}
>
  <slot />
</div>
