<template>
    <div class="edit_div"
         ref="msg"
         v-html="innerText" 
         :contenteditable="canEdit"
         @input="changeText"
         @blur="blurFun"
         @focus="isLocked = true"
         >
    </div>
</template>
<script>
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {  //canEdit 标志这个div是否是可编辑的，在父组件直接使用 v-model 即可
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'(){
              // && 解决第一次输入会有光标错位,条件不能为 ||
              if (!this.isLocked && !this.innerText) { 
                this.innerText = this.value;
              }
              // if (!newvalue) {
              //   // 清空节点内所有html来清空文本
              //   this.$refs.msg.innerHTML = '';
              // } else {
              //   this.keepLastIndex(this.$refs.msg);
              // }
            }
        },
        methods: {
          blurFun(){
            this.isLocked = false;
            document.body.scrollTop = 0;
          },
          changeText(){
            this.$emit('input', this.$el.innerHTML);
          },
          keepLastIndex(obj) {
            if (window.getSelection) {
              //ie11 10 9 ff safari
              obj.focus(); //解决ff不获取焦点无法定位问题
              let range = window.getSelection(); //创建range
              range.selectAllChildren(obj); //range 选择obj下所有子内容
              range.collapseToEnd(); //光标移至最后
            } else if (document.selection) {
              //ie10 9 8 7 6 5
              let range = document.selection.createRange(); //创建选择对象
              //var range = document.body.createTextRange();
              range.moveToElementText(obj); //range定位到obj
              range.collapse(false); //光标移至最后
              range.select();
            }
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url("./editdiv.css");
</style>
