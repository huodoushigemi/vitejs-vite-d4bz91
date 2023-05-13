<template>
  <form-render :items="items" ref="formRef" :model="formData" style="width: 400px; margin: 40px auto">
    <div class="space-x-1 text-center">
      <x-button type="primary" @click="onSubmit">提交</x-button>
      <x-button @click="onCancel">取消</x-button>
    </div>
  </form-render>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormRender from './form-render.vue'

document.querySelector('[data-loading]').remove()

const formData = reactive({
  name: '',
  sex: '',
  age: 18,
  desc: ''
})

// 性别选项
const sexs = [
  { label: '男', value: '男' },
  { label: '女', value: '女' }
]

const required = { required: true, message: '必填' }

// 表单
const items = [
  {
    wrap: { label: '姓名', prop: 'name' },
    rules: [required, { max: 10, message: '不能超过10个字符' }],
    options: { clearable: true }
  },
  {
    wrap: { label: '性别', prop: 'sex', rules: required },
    type: 'select',
    options: { options: sexs, clearable: true }
  },
  {
    wrap: { label: '年龄', prop: 'age' },
    hidden: () => formData.sex != '女',
    type: 'slider',
    options: { onChange: () => (formData.desc = [formData.name, formData.sex, formData.age].join(' | ')) }
  },
  {
    wrap: { label: '介绍', prop: 'desc' },
    rules: () => ({ required: formData.sex == '男', message: '必填' }),
    options: { type: 'textarea', autosize: true, clearable: true }
  }
]

const formRef = ref()

// 提交
function onSubmit() {
  formRef.value.validate().then(() => {
    alert(JSON.stringify(formData, null, ' '))
  })
}

// 取消
function onCancel() {
  formRef.value.resetFields()
}
</script>
