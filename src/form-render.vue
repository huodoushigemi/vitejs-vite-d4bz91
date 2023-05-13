<script setup>
import { ref } from 'vue'

defineProps({
  model: Object,
  items: Array
})

function exec(e) {
  return typeof e === 'function' ? e() : e
}

const formRef = ref()

defineExpose({
  validate: () => formRef.value.validate(),
  resetFields: () => formRef.value.resetFields()
})
</script>

<template>
  <x-form ref="formRef" :model="model">
    <template v-for="item in items" :key="item.wrap.prop">
      <x-form-item v-if="!exec(item.hidden)" v-bind="item.wrap" :rules="exec(item.rules || item.wrap.rules)">
        <component :is="'x-' + (item.type || 'input')" :placeholder="'请输入' + item.wrap.label" v-bind="item.options" v-model:value="model[item.wrap.prop]" />
      </x-form-item>
    </template>

    <slot />
  </x-form>
</template>
