<style scoped>
    .backg{ background-color: #f8f8f9;}
    .over_h { overflow: hidden;}
    .float_l { float: left;}
    .float_r { float: right;}
    .m_5 { margin-bottom: 5px;}
    .m_30 { margin-bottom: 20px;}
    .ibox {  height: 100px; text-align: center; background-color: #000; color: #FFF;}
    .admin_msg .am_time{color: #9ea7b4; font-size: 10px;}
    .admin_msg .am_detailed { margin-top: 10px; color: #657180; font-size: 12px;}
    .yc{word-wrap:break-word;}

    .segment { background: #000; padding: 15px 0; height: 125px;}
    .statistic .value { font-weight: 400;line-height: 1em;  color: #FFF; font-size: 4rem!important; text-transform: uppercase;text-align: center; overflow: hidden;}
    .statistic .label{font-size: 1em; font-weight: 700; color: #FFF; text-transform: uppercase;text-align: center; overflow: hidden;}
</style>

<template>
  <div>

    <Row :gutter="16"  class="m_30" >
        <Col span="4">
          <Button-group vertical >
              <Button v-for="(item,index) in links" :key="'link'+index" :type="item.type" :icon="item.icon" @click="$store.commit('router',{ path: item.link})" >{{item.title}}</Button>
          </Button-group>
        </Col>
        <Col span="4" v-for="(ibox,i) in iboxs" :key="'ibox'+i">
              <div class="segment">
                  <div class="ui olive  inverted statistic">
                  <div class="value" :title="ibox.num">{{ibox.num}}</div>
                  <div class="label">{{ibox.title}}</div>
                </div>
              </div>
        </Col>
    </Row>

    <div class="m_30">
      <Row :gutter="16" >
        <Col span="8">
          <Row>
            <Col span="24">
              <Card class="backg m_30">
                <p slot="title">反馈邮件</p>
                <p slot="extra"><Button size="small" shape="circle" icon="plus-round" type="error" @click="$store.commit('router',{ path:'/admin_msg'})">更多</Button></p>
                <p v-if="admin_msg.length==0">暂无消息</p>
                <Card class="admin_msg" v-for="(amsg ,index) in admin_msg" :key="'amsg'+index" >
                    <div class="am_box over_h">
                      <div class="float_r am_time">{{ new Date(amsg.create_at).toLocaleString() }}</div>
                    </div>
                    <div class="am_detailed">{{amsg.content}}</div>
                </Card>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span="16">
          <Row>
              <Col v-if="$store.state.new_uploads.length > 0 || $store.state.uploads.length > 0" span="24">
                <Card class="m_30" >
                  <p slot="title">上传的文件</p>
                  <p slot="extra"><router-link to="/video_upload" tag="div"><Button size="small" shape="circle" icon="plus-round" type="error">更多</Button></router-link></p>
                  <Row :gutter="16">
                        <Col span="12" v-for="(a,i) in $store.state.new_uploads" :key="'new_uploads'+i" >
                          <Card class="m_5 backg" style="padding:2px; margin:5px;">
                            <span class="yc"><Icon type="ios-film"></Icon>&nbsp;&nbsp;{{a.name}}</span>
                            <Progress :percent="a.percentage" :stroke-width="5"></Progress>
                          </Card>
                        </Col>
                        <Col span="12" v-for="(a,i) in $store.state.uploads" :key="'uploads'+i">
                            <Card class="m_5 backg" style="padding:2px; margin:5px;">
                              <span class="yc"><Icon type="ios-film"></Icon>&nbsp;&nbsp;{{a.name}}</span>
                              <Progress :percent="a.percentage" :stroke-width="5"></Progress>
                              <Button type="primary" size="small" @click="$store.commit('router',{ path:'/video_save', query :{ type :'create' ,url : a.url,vcurl_id :a.vcurl_id } })">添加数据</Button>
                              <Button type="primary" size="small" @click="$store.commit('delProgress',i)">放到后台</Button>
                            </Card>
                        </Col>
                  </Row>
                </Card>
              </Col>
              <Col span="24">
                <Card class="backg">
                  <p slot="title">电视剧数据表</p>
                  <p slot="extra"><Button size="small" shape="circle" icon="plus-round" type="error" @click="$store.commit('router',{ path:'/video_select'})">更多</Button></p>
                  <Table size="small" border :columns="Video.columns" :data="Video.datas"></Table>
                </Card>
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
    import ThisJS from './';
    export default {
       data :function(){
         return {
            iboxs : [ ],
            links : [
               {title :'上传视频' , link :'/video_upload' ,icon :'upload' ,type:'info'},
               {title :'添加标签' , link :'/tag' ,icon :'pricetags' ,type:'success'},
               {title :'查看视频' , link :'/video_select' ,icon :'film-marker' ,type:'error'},
               {title :'查看反馈' , link :'/admin_msg' ,icon :'email' ,type:'warning'}
            ],
            admin_msg : [],
            Video : { columns :[
              { title: '电影名' ,key: 'title' ,align: 'center'},
              { title: '标签' ,key: 'tag_g' ,align: 'center'},
              { title: '创建时间' ,key: 'create_at' ,align: 'center'},
            ] ,datas :[] },
            admin_log : []
         }
       },
       created :ThisJS.created
    }

</script>
