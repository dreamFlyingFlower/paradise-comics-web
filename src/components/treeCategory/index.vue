<template>
  <div>
    <el-popover ref="popover" placement="bottom-start" trigger="click" @show="onShowPopover" @hide="onHidePopover">
      <el-tree ref="tree" accordion node-key="categoryId" :style="`min-width: ${treeWidth}`" class="select-tree"
        :data="options" :props="props" :expand-on-click-node="false" :default-expand-all="false"
        @node-click="onClickNode">
      </el-tree>
      <el-input slot="reference" ref="input" v-model="treeLabel" suffix-icon="el-icon-arrow-down">
      </el-input>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    props: ['categoryId']
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: 'auto',
      treeLabel: null,
      treeValue: null,
      options: [],
      props: {
        children: 'children',
        label: 'categoryName',
        value: 'categoryId'
      }
    }
  },
  created() {
    this.refresh();
    this.$nextTick(() => {
      // 获取输入框宽度同步至树状菜单宽度
      this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`;
    })
  },
  methods: {
    refresh() {
      let rootId = this.$store.getters.config.ROOT_CATEGORY_ID;
      this.$getTree('category', { id: rootId ? rootId : 0 }).then(resp => {
        // 添加最上层的所属类型
        let datas = {
          categoryId: 0,
          categoryName: '所属类型',
          children: resp.data
        };
        this.options.push(datas);
        this.$emit('curData', this.options[0]);
        this.treeLabel = this.options[0].categoryName;
      })
    },
    // 单击节点
    onClickNode(node) {
      this.relationData(node);
    },
    relationData(node) {
      this.treeLabel = node[this.props.label];
      this.treeValue = node[this.props.value];
      this.onCloseTree();
      this.$emit('clickNode', node);
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },
    // 显示时触发
    onShowPopover() {
      this.showStatus = true;
    },
    // 隐藏时触发
    onHidePopover() {
      this.showStatus = false;
      this.$emit('selected', this.treeValue);
    }
  }
}
</script>
<style>
.select-tree {
  max-height: 350px;
  overflow-y: scroll;
}

/* 菜单滚动条 */
.select-tree::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}

.select-tree::-webkit-scrollbar-track,
.select-tree::-webkit-scrollbar-corner {
  background: #fff;
}

.select-tree::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}

.select-tree::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
</style>