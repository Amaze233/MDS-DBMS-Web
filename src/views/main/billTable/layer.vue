<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="订单号：" prop="订单号">
        <el-input v-model="form['订单号']" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="运单号：" prop="运单号">
        <el-input v-model="form['运单号']" placeholder="请输入运单号"></el-input>
      </el-form-item>
      <el-form-item label="物流：" prop="物流">
        <el-input v-model="form['物流']" placeholder="请输入物流公司"></el-input>
      </el-form-item>
      <el-form-item label="发货时间：" prop="发货时间">
        <el-date-picker v-model="form['发货时间']" type="datetime" placeholder="选择发货时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="计费重：" prop="计费重">
        <el-input-number v-model="form['计费重']" placeholder="请输入计费重量"></el-input-number>
      </el-form-item>
      <el-form-item label="发货成本：" prop="发货成本">
        <el-input-number v-model="form['发货成本']" placeholder="请输入发货成本"></el-input-number>
      </el-form-item>
      <el-form-item label="COD金额：" prop="COD金额">
        <el-input-number v-model="form['COD金额']" placeholder="请输入COD金额"></el-input-number>
      </el-form-item>
      <el-form-item label="更新时间：" prop="更新时间">
        <el-date-picker v-model="form['更新时间']" type="datetime" placeholder="选择更新时间"></el-date-picker>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import {add, add_Bills, add_Logistics, update, update_Bills, update__Logistics} from '@/api/table'
import { selectData, radioData } from './enum'
import Layer from '@/components/layer/index.vue'
export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    let form = ref({
      '运单号': '',
      '物流': '',
      '发货时间': '',
      '计费重': '',
      '发货成本': '',
      'COD金额': '',
      '更新时间': null,
      '订单号': ''
    })
    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
      choose: [{ required: true, message: '请选择', trigger: 'blur' }],
      radio: [{ required: true, message: '请选择', trigger: 'blur' }]
    }
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {

      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      radioData
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            const id = this.form['运单号']
            if (this.layer.row) {
              this.updateForm(params,id)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      add_Bills(params)
      .then(res => {
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.$emit('getTableData', true)
        this.layerDom && this.layerDom.close()
      })
    },
    // 编辑提交事件
    updateForm(params: object, id: string) {
      update_Bills(params, id)
      .then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.$emit('getTableData', false)
        this.layerDom && this.layerDom.close()
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
