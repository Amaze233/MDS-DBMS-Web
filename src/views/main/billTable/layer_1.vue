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
      <el-form-item label="邮寄方式：" prop="邮寄方式">
        <el-input v-model="form['邮寄方式']" placeholder="请输入邮寄方式"></el-input>
      </el-form-item>
      <el-form-item label="目的国家：" prop="目的国家">
        <el-input v-model="form['目的国家']" placeholder="请输入目的国家"></el-input>
      </el-form-item>
      <el-form-item label="城市：" prop="城市">
        <el-input v-model="form['城市']" placeholder="请输入城市"></el-input>
      </el-form-item>
      <el-form-item label="类目：" prop="类目">
        <el-input v-model="form['类目']" placeholder="请输入类目"></el-input>
      </el-form-item>
      <el-form-item label="内部名：" prop="内部名">
        <el-input v-model="form['内部名']" placeholder="请输入内部名"></el-input>
      </el-form-item>
      <el-form-item label="SKU：" prop="SKU">
        <el-input v-model="form['SKU']" placeholder="请输入SKU"></el-input>
      </el-form-item>
      <el-form-item label="属性：" prop="属性">
        <el-input v-model="form['属性']" placeholder="请输入属性"></el-input>
      </el-form-item>
      <el-form-item label="总价(NTS)：" prop="总价（NTS）">
        <el-input-number v-model="form['总价（NTS）']" placeholder="请输入总价"></el-input-number>
      </el-form-item>
      <el-form-item label="下单时间：" prop="下单时间">
        <el-date-picker v-model="form['下单时间']" type="datetime" placeholder="选择下单时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="发货时间：" prop="发货时间">
        <el-date-picker v-model="form['发货时间']" type="datetime" placeholder="选择发货时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="抵达目的国时间：" prop="抵达目的国时间">
        <el-date-picker v-model="form['抵达目的国时间']" type="datetime" placeholder="选择抵达时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="签收时间：" prop="签收时间">
        <el-date-picker v-model="form['签收时间']" type="datetime" placeholder="选择签收时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="派送次数：" prop="派送次数">
        <el-input-number v-model="form['派送次数']" placeholder="请输入派送次数"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="状态">
        <el-input v-model="form['状态']" placeholder="请输入状态"></el-input>
      </el-form-item>
      <el-form-item label="订单渠道：" prop="订单渠道">
        <el-input v-model="form['订单渠道']" placeholder="请输入订单渠道"></el-input>
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
import {add, add__Logistics, add_Logistics, update, update__Logistics, update_Bills, add_Bills} from '@/api/table'
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
      '订单号': '',
      '运单号': '',
      '物流': '',
      '邮寄方式': '',
      '目的国家': '',
      '城市': '',
      '类目': '',
      '内部名': '',
      'SKU': '',
      '属性': '',
      '总价（NTS）': 0.0,
      '下单时间': null,
      '发货时间': null,
      '抵达目的国时间': null,
      '签收时间': null,
      '派送次数': 0.0,
      '状态': '',
      '订单渠道': '',
      '更新时间': null
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
            const id = this.form['订单号']
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
      add_Logistics(params)
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
      update__Logistics(params, id)
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
