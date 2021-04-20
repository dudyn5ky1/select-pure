<svelte:options tag="select-pure" />

<script>
  import { selected } from "./../store.js";
  let label;
  let dropdownVisible = false;
  let select;

  const unsubscribeValue = selected.subscribe(value => {
    // callback
	});

  function toggleDropdown() {
    dropdownVisible = !dropdownVisible;
    const options = select.parentNode.querySelectorAll("option-pure");
    console.log(select);
    console.log(options);
    console.log($$slots);
  }

  function onChange() {
    console.log("ON CHANGE!");
  }
</script>

<div class="select" on:click={toggleDropdown} bind:this={select}>
  {#if $selected.value}
    <span>{$selected.label}</span>
  {/if}
  <select
    class:visible="{dropdownVisible}"
    class="dropdown"
  >
    <slot></slot>
  </select>
</div>

<style>
  .select {
    align-items: center;
    background: #f9f9f8;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    color: #363b3e;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    justify-content: left;
    min-height: 44px;
    padding: 5px 10px;
    position: relative;
    transition: 0.2s;
    width: 100%;
  }
  .dropdown {
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    color: #363b3e;
    display: none;
    left: 0;
    max-height: 221px;
    overflow-y: scroll;
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 5;
  }
  .visible {
    display: block;
  }
</style>
