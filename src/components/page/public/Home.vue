<template>
  <div>
    <div class="header">
      <div class="lunbo-box">
        <Carousel :v-model="0"  :autoplay="true" arrow="always" :autoplay-speed="3500">
          <Carousel-item v-for="lb in lubos" :key="'lb'+lb._id" >
              <img :src="lb.thumb_url_g" />
          </Carousel-item>
        </Carousel>
      </div>
      <div class="tag-wxbq">
        <Card>
          <p slot="title"><Icon type="pricetags"></Icon>&nbsp;&nbsp;标签</p>
          <ul>
            <li style=" display: inline-block;" v-for="tag in tags" :key="'tag'+tag._id" @click="$store.commit('router',{ path:'/find', query :{ tag_id : tag._id,tag_name :tag.name } })">
              <Tag color="green" >{{tag.name}}</Tag>
            </li>
          </ul>
        </Card>
      </div>
    </div>
    <div class="videos">
      <Row :gutter='16'>
          <div v-for="video in videos" :key="video._id" @click="toDetails(video)">
            <Col span="6"  >
                <card-video :img="video.thumb_url_g" :content="video.digest" :title="video.title"  />
            </Col>
          </div>
      </Row>
    </div>
  </div>
</template>

<script>
  import ruku from  '@/util/ruku.js'
  import cardVideo from '../../common/cardVideo'
  export default {
    components : {
      cardVideo,
    },
    data(){
      return {
        tags :[],
        lubos :[],
        videos :[],
      }
    },
    methods :{
      toDetails(video){
        this.$store.commit('router',{ name:'Details' ,query :{ id :video._id}})
      }
		},
    async created(){
      let Video_data = await ruku.getVideos({url :this.$store.state.host + '/videos' ,query :{page :1 ,limit :10}})
      let tags = await ruku.get(this.$store.state.host + '/tags')
      this.videos = Video_data.data
      this.tags = tags
      this.lubos = Video_data.data.slice(0, 4)
    }

  }
</script>

<style>
body{ background-color: #f3f3f3;}
.header{ width: 960px; margin: auto; margin-top:15px; overflow: hidden;}
.lunbo-box{width: 600px; height: 340px; float: left;}
.tag-wxbq{ width: 360px;  height: 340px;float: left; padding: 10px;}
.videos{ margin-top: 20px;}
</style>
