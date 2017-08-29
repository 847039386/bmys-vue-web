<template>
    <Row class="example">
      <Col span="12" class="example-demo">
          <div class="example-case">
              <span v-for="(item,index) in tags" @click="updateTag(index ,item._id ,item.name)" :key="item._id"  >
                <Tag  closable color="red" :name="item._id+'/'+index" @on-close="removeTag">{{ item.name }}</Tag>
              </span>
          </div>
          <div class="example-header"><span>标签添加说明</span></div>
          <div class="example-desc">以上的标签是目前有的，请不要重复添加标签。点击标签则修改标签，点击标签中x号将删除标签。</div>
      </Col>
      <div class="example-split"></div>
      <Col span="12" class="example-code">
          <div class="f_setting">
            <Input type="text" v-model="tag"  placeholder="tag"><span slot="prepend">标签：</span></Input></br>
            <Button type="success" long @click="addTag()">确认添加</Button>
          </div>
      </Col>
    </Row>

</template>

<script>
    import ruku from  '@/util/ruku.js'
    import ThisJS from './'
    export default {
        data: function(){
            return {
               tags :[],
               tag : '',
               up_tag :'',
               addTag_url : this.$store.state.host + '/admin/tag/add_tag',
               removeTag_url : this.$store.state.host + '/admin/tag/removeById',
               updateTag_url : this.$store.state.host + '/admin/tag/update',
               selectTag_url : this.$store.state.host + '/tags'
            }
        },
        methods: {
          addTag :ThisJS.methods.addTag,    //添加标签
          removeTag :ThisJS.methods.removeTag,    //删除标签
          updateTag :ThisJS.methods.updateTag     //修该标签
        },
        created :ThisJS.created

    }
</script>

<style >
 .example{ border: 1px solid #eee; border-radius: 6px;  margin-bottom: 20px;}
 .example-demo{ padding: 20px 0; }
 .example-demo .example-case{ padding: 0 20px; }
 .example-demo .example-header { font-weight: 500; margin: 30px 0 10px; position: relative;}
 .example-demo .example-header:before{content: ""; display: block;  width: 100%;height: 1px;background: #eee;position: absolute;top: 10px;left: 0;}
 .example-demo .example-header span {display: inline-block;background: #fff;padding: 0 5px 0 18px;position: relative;margin-left: 30px;font-size: 14px;}
 .example-demo .example-desc{ font-size: 12px; padding: 0 20px;}
 .example-split{display: block;position: absolute;top: 0;bottom: 0;left: 50%;border: 1px dashed #eee;}
 .example-code { padding: 10px;}
 .f_setting{ vertical-align: middle;}
 .vitals{ color: #ed3f14; font-weight: bold; word-wrap:break-word; font-size: 14px;}
</style>
