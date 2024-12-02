<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="地区：" prop="地区">
        <el-input v-model="form['地区']" placeholder="请输入地区"></el-input>
      </el-form-item>
      <el-form-item label="物流：" prop="物流">
        <el-input v-model="form['物流']" placeholder="请输入物流公司"></el-input>
      </el-form-item>
      <el-form-item label="订单号：" prop="订单号">
        <el-input v-model="form['订单号']" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="内部名：" prop="内部名">
        <el-input v-model="form['内部名']" placeholder="请输入内部名"></el-input>
      </el-form-item>
      <el-form-item label="总价(NTS)：" prop="总价(NTS)">
        <el-input-number v-model="form['总价（NTS）']" placeholder="请输入总价"></el-input-number>
      </el-form-item>
      <el-form-item label="属性：" prop="属性">
        <el-input v-model="form['属性']" placeholder="请输入属性"></el-input>
      </el-form-item>
      <el-form-item label="SKU：" prop="SKU">
        <el-input v-model="form['SKU']" placeholder="请输入SKU"></el-input>
      </el-form-item>
      <el-form-item label="购买产品数量：" prop="购买产品数量">
        <el-input-number v-model="form['购买产品数量']" placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="下单时间：" prop="下单时间">
        <el-date-picker v-model="form['下单时间']" type="datetime" placeholder="选择下单时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态：" prop="订单状态">
        <el-input v-model="form['订单状态']" placeholder="请输入订单状态"></el-input>
      </el-form-item>
      <el-form-item label="邮寄方式：" prop="邮寄方式">
        <el-input v-model="form['邮寄方式']" placeholder="请输入邮寄方式"></el-input>
      </el-form-item>
      <el-form-item label="运单号：" prop="运单号">
        <el-input v-model="form['运单号']" placeholder="请输入运单号"></el-input>
      </el-form-item>
      <el-form-item label="国家：" prop="国家">
        <el-input v-model="form['国家']" placeholder="请输入国家"></el-input>
      </el-form-item>
      <el-form-item label="城市：" prop="城市">
        <el-input v-model="form['城市']" placeholder="请输入城市"></el-input>
      </el-form-item>
      <el-form-item label="区域：" prop="区域">
        <el-input v-model="form['区域']" placeholder="请输入区域"></el-input>
      </el-form-item>
      <el-form-item label="全地址：" prop="全地址">
        <el-input v-model="form['全地址']" placeholder="请输入全地址"></el-input>
      </el-form-item>
      <el-form-item label="邮编：" prop="邮编">
        <el-input v-model="form['邮编']" placeholder="请输入邮编"></el-input>
      </el-form-item>
      <el-form-item label="产品外文名称：" prop="产品外文名称">
        <el-input v-model="form['产品外文名称']" placeholder="请输入产品外文名称"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名：" prop="客户姓名">
        <el-input v-model="form['客户姓名']" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="主电话：" prop="主电话">
        <el-input v-model="form['主电话']" placeholder="请输入主电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="邮箱">
        <el-input v-model="form['邮箱']" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="付款方式：" prop="付款方式">
        <el-input v-model="form['付款方式']" placeholder="请输入付款方式"></el-input>
      </el-form-item>
      <el-form-item label="更新时间：" prop="更新时间">
        <el-date-picker v-model="form['更新时间']" type="datetime" placeholder="选择更新时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="留言备注：" prop="留言备注">
        <el-input v-model="form['留言备注']" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import {
  add,
  add_Orders,
  update,
  update__Logistics,
  update__Orders,
  update_Orders
} from '@/api/table'
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
      '地区': '',
      '物流': '',
      '订单号': '',
      '内部名': '',
      '总价（NTS）': '',
      '属性':'',
      'SKU': '',
      '购买产品数量': '',
      '留言备注': '',
      '下单时间': null,
      '订单状态': '',
      '邮寄方式': '',
      '运单号': '',
      '国家': '',
      '城市': '',
      '区域': '',
      '全地址': '',
      '邮编': '',
      '产品外文名称': '',
      '客户姓名': '',
      '主电话': '',
      '邮箱': '',
      '付款方式': '',
      '更新时间': null
    })
    const rules = {

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
      add_Orders(params)
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
      update_Orders(params, id)
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
