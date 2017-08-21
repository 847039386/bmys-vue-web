<style scoped>
.layout{border:1px solid #d7dde4;background:#f5f7f9;position:relative;border-radius:4px;overflow:hidden}
.layout-breadcrumb{padding:10px 15px 0}
.layout-content{min-height:745px;margin:15px;overflow:hidden;background:#fff;border-radius:4px}
.layout-content-main{padding:10px}
.layout-copy{text-align:center;padding:10px 0 20px;color:#9ea7b4}
.layout-menu-left{background:#464c5b}
.layout-header{height:60px;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,.1)}
.layout-logo-left{width: 90%;height: 30px;background: #5b6270;border-radius: 3px;margin: 15px auto;}

.layout-hide-text .layout-text{display:none}
.ivu-col{transition:width .2s ease-in-out}



</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
        <v-header></v-header>
        <Row type="flex">
            <template>
              <i-col :span="spanLeft" class="layout-menu-left ">
                  <Menu :active-name="setActive" theme="dark" width="auto" @on-select="routeTo">
                      <!-- <div class="layout-logo-left">
                          信息
                      </div> -->
                      <div v-for="(menu ,index) in Menus" :key="'menup'+index">
                        <Menu-item v-if="menu.child.length == 0" :name="menu.index">
                          <Icon :type="menu.icon" :size="iconSize"></Icon>
                          <span class="layout-text" >{{ menu.title }}</span>
                        </Menu-item>
                        <Submenu v-else :name="index">
                          <template slot="title">
                            <Icon :type="menu.icon" :size="iconSize"></Icon>
                            <span class="layout-text">{{ menu.title }}</span>
                          </template>
                            <Menu-item v-for="(item ,i) in menu.child" :key="'menuc_'+index+'_'+i" :name="item.index" >{{ item.title }}</Menu-item>
                        </Submenu>
                      </div>
                  </Menu>
              </i-col>
            </template>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <v-footer></v-footer>
            </i-col>
        </Row>
        <Back-top></Back-top>
    </div>
</template>
<script>
    import vHeader from './Header.vue'
    import vFooter from '../common/Footer'
    export default {
       components : {
         vHeader,
         vFooter
       },
        data () {
            return {
                spanLeft: 3,
                spanRight: 21,
                Menus : [
                   { title :"主页" ,icon :'home' ,child : [] ,index :'home' },
                   { title :"消息" ,icon :'chatbox-working' ,child : [{title :"邮件" ,index :'admin_msg'}]},
                   { title :"视频" ,icon :'android-film' ,child : [{title :"视频管理" ,index :'video'},{title :"添加标签" ,index :'tag'},{title :'上传视频' ,index :'upload_video'} ]},
                   { title :"系统" ,icon :'settings' ,child : [{title :"设置" ,index :'setting'},{title :"Api" ,index :'api'}]},
                ]
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 3 ? 14 : 24;
            },
            setActive() {
              return this.$route.path.replace('/','');
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            routeTo(e){
                this.$router.push(e);
                // return this.$route.path.replace('/','');
            }
        }
    }
</script>
