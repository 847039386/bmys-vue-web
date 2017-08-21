<template>
    <div class="video_box" v-if="video">
      <div class="video">
        <video-player class="vjs-custom-skin"  :options="videoOptions"></video-player>
      </div>
      <div class="video_list">
        <div class="video_top">
          <p class="title">{{video.title}}</p>
          <p class="">
             <Tag color="blue" v-for="tag in video.tags" :key="tag._id">{{tag.name}}</Tag>
          </p>
          <p class="createAt">{{new Date(video.create_at).toLocaleString()}} </p>
          <p class="desc">{{video.digest}}</p>
        </div>
      </div>
    </div>
</template>



<script type="text/javascript">
import ruku from  '@/util/ruku.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  props : {
    refresh :{ type :Boolean}
  },
  data () {
    return {
      video : null,
      videoOptions: {
        playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
        sources: [{
          type: "video/mp4",
          src: '',
        }],
        // autoplay: true,
        language: 'zh-CN',
        width: 670,
        height: 540,
        poster: "",
      }
    }
  },
  async created(){
    await this.getVideo();
  },
  methods :{
    async getVideo(){
      let videoURL ,videoIMG ,video_request;
      video_request = await ruku.get({url :this.$store.state.host + '/videoid',query :{id:this.$route.query.id} });
      if(video_request.success){
        this.video = video_request.data
        let thumb_url = this.video.thumb_url.split('\\')[0] == 'public' ? this.$store.state.host + '/' + this.video.thumb_url.split('\\').splice(1).join('/') : this.video.thumb_url
        let url = this.video.url.split('\\')[0] == 'public' ? this.$store.state.host + '/' + this.video.url.split('\\').splice(1).join('/') : this.video.url
        this.videoOptions.sources[0].src = url
        this.videoOptions.poster = thumb_url
      }
    }
  },
  watch: {
    refresh: async function (val, oldVal) {
      await this.getVideo();
    }
  }
}
</script>

<style>
  .video_box{ overflow: hidden;}
  .video_box .video { width: 670px; background: red; float: left;}
  .video_box .video_list { width: 290px; background: red; float: left;  height: 540px; background: #222; color: #fff; }
  .video_box .video_list .video_top{ padding: 20px 10px; height: 540px; hoverflow-x: hidden;}
  .video_box .video_list .video_top p{margin-bottom: 8px;}
  .video_box .video_list .video_top .title { font-size: 16px;}
  .video_box .video_list .video_top .createAt { font-size: 12px;  color: #bbbec4;}
  .video_box .video_list .video_top .desc { font-size: 13px;  color: #bbbec4;}
</style>
