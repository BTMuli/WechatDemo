<template>
  <div class="nav-act-item-comp">
    <slot></slot>
    <span class="title" :data-title="props.title" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

type NavActItemProps = { title: string; hoverBg?: string; hoverColor?: string };

const props = withDefaults(defineProps<NavActItemProps>(), {
  hoverBg: "#f3f3f3",
  hoverColor: "#686868",
});
const hoverBg = computed<string>(() => props.hoverBg);
const hoverColor = computed<string>(() => props.hoverColor);
</script>
<style lang="scss" scoped>
.nav-act-item-comp {
  position: relative;
  width: 46px;
  height: 25px;
  font-size: 13px;
  cursor: pointer;
  color: #686868;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;

  &:hover {
    background-color: v-bind(hoverBg);
    color: v-bind(hoverColor);
  }

  .title[data-title]::after {
    white-space: nowrap;
    content: attr(data-title);
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #686868;
    background-color: #f3f3f3;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #686868;
    opacity: 0;
    display: block;
    transition:
      opacity 0.3s,
      transform 0.3s;
  }

  &:hover .title[data-title]::after {
    transform: translateX(-50%) translateY(-5px);
    opacity: 1;
  }
}
</style>
