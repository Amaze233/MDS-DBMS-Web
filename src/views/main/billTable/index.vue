<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>
        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>
          </template>
        </el-popconfirm>
        <el-button
            type="primary"
            :icon="Download"
            class="export-excel-btn"
            @click="handleExportExcel"
        >{{ $t('message.common.exportExcel') }}</el-button>
      </div>
      <div class="layout-container-form-search" >
        <el-input v-model="query.input" :placeholder="$t('message.common.searchTip')" @change="getTableDataByKey(true)"></el-input>
        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableDataByKey(true)">{{ $t('message.common.search') }}</el-button>
      </div>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData(false)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="运单号" label="运单号" align="center" />
        <el-table-column prop="COD金额" label="COD金额" align="center" />
        <el-table-column prop="发货成本" label="发货成本" align="center" />
        <el-table-column prop="计费重" label="计费重" align="center" />
        <el-table-column prop="物流" label="物流" align="center" />
        <el-table-column prop="发货时间" label="发货时间" align="center" />
        <el-table-column prop="更新时间" label="更新时间" align="center" />
        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t('message.common.del') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref  } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import {
  getData,
  del,
  getData_Logistics,
  getData_Logistics_Key,
  del_Logistics_Key,
  getData_Bills,
  getData_Bills_Key, del_Bills_Key
} from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { aoaToSheetXlsx } from './ExportExcel'
import type { LayerInterface } from '@/components/layer/index.vue'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete, Download } from '@element-plus/icons'
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    // 存储搜索用的数据
    const query = reactive({
      input: ''
    })
    // 存储搜索用的数据
    const { t } = useI18n()
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val: []) => {
      chooseData.value = val
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        keyword: query.input,
        ...query
      }
      getData_Bills(params)
      .then(res => {
        let data = res.data.list
        if (Array.isArray(data)) {
          data.forEach(d => {
            const select = selectData.find(select => select.value === d.choose)
            select ? d.chooseName = select.label : d.chooseName = d.choose
            const radio = radioData.find(select => select.value === d.radio)
            radio ? d.radioName = radio.label : d.radio
          })
        }
        tableData.value = res.data.list
        page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
    //关键词搜索
    const getTableDataByKey = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        keyword: query.input,
        ...query
      }
      getData_Bills_Key(params)
          .then(res => {
            let data = res.data.list
            if (Array.isArray(data)) {
              data.forEach(d => {
                const select = selectData.find(select => select.value === d.choose)
                select ? d.chooseName = select.label : d.chooseName = d.choose
                const radio = radioData.find(select => select.value === d.radio)
                radio ? d.radioName = radio.label : d.radio
              })
            }
            tableData.value = res.data.list
            page.total = Number(res.data.pager.total)
          })
          .catch(error => {
            tableData.value = []
            page.index = 1
            page.total = 0
          })
          .finally(() => {
            loading.value = false
          })
    }

    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        ids: data.map((e:any)=> {
          return e["订单号"]
        })
      }
      console.log("ids:", params.ids)
      del_Bills_Key(params)
      .then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTableData(tableData.value.length === 1 ? true : false)
      })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    // 导出Excel表格
    const handleExportExcel = () => {
      if (!unref("download").trim()) {
        ElMessage({
          showClose: true,
          message: t('message.common.exportExcelTip'),
          type: 'warning',
        })
        return
      }
      let table = unref(tableData)
      let header = ["运单号", "物流", "发货时间", "计费重", "发货成本", "COD金额", "更新时间", "订单号"];
      let data = table.map((item) => {
        let { 运单号, 物流, 发货时间, 计费重, 发货成本, COD金额, 更新时间, 订单号 } = item;
        return [运单号, 物流, 发货时间, 计费重, 发货成本, COD金额, 更新时间, 订单号];
      })
      aoaToSheetXlsx({
        data,
        header,
        filename: `${unref("download")}.xlsx`,
      })
    }

    getTableData(true)
    return {
      Plus,
      Search,
      Delete,
      Download,
      query,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      getTableDataByKey,
      handleExportExcel
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
