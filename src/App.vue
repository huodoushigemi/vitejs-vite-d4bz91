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

document.querySelector('[data-loading]')?.remove()

const formData = reactive({
  name: '',
  sex: '',
  age: 18,
  intro: '',
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
    wrap: ['姓名', 'name', { rules: [required, { max: 10, message: '不能超过10个字符' }] }]
  },
  {
    wrap: ['性别', 'sex', { rules: required }],
    type: 'select',
    el: { options: sexs }
  },
  {
    wrap: ['年龄', 'age'],
    hidden: () => formData.sex == '男',
    type: 'slider'
  },
  {
    wrap: ['介绍', 'intro'],
    rules: () => ({ required: formData.sex == '男', message: '必填' }),
    el: { type: 'textarea', autosize: true }
  },
  {
    wrap: ['描述', 'desc'],
    el: { value: `{'我叫' + data.name + '，今年' + data.age + '岁'}` }
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
