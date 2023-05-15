<script setup>
import { ref } from 'vue'

const props = defineProps({
  model: Object,
  items: Array
})

function exec(e) {
  return typeof e === 'function' ? e() : e
}

function isExp(exp) {
  return exp?.trim().match(/^\{(.*?)\}$/)
}

function execExp(exp, prop) {
  const matched = isExp(exp)
  if (!matched) return exp
  const func = new Function('data', `return ${matched[1]}`)
  const val = func(props.model)
  return (props.model[prop] = val)
}

// ================================================================================

const is = item => 'x-' + (item.type || 'input')

const placeholder = item => '请输入' + item.wrap[0]

const value = item => execExp(item.el?.value, item.wrap[1]) ?? props.model[item.wrap[1]]

const disabled = item => isExp(item.el?.value) || item.el?.disabled

// ================================================================================

const formRef = ref()

defineExpose({
  validate: () => formRef.value.validate(),
  resetFields: () => formRef.value.resetFields()
})
</script>

<template>
  <x-form ref="formRef" :model="model">
    <template v-for="item in items" :key="item[1]">
      <x-form-item v-if="!exec(item.hidden)" :label="item.wrap[0]" :prop="item.wrap[1]" v-bind="item.wrap[2]" :rules="exec(item.rules || item.wrap[2]?.rules)">
        <component :is="is(item)" :placeholder="placeholder(item)" v-bind="item.el" :value="value(item)" :disabled="disabled(item)" @update:value="model[item.wrap[1]] = $event" />
      </x-form-item>
    </template>

    <slot />
  </x-form>
</template>
