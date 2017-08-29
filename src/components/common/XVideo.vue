<template>
  <Row class="vlist-item">
      <Col span="5">
        <img @click="toVideo" :src="ims">
      </Col>
      <Col  class="content" span="18" offset="1">
          <p @click="toVideo" class="title">{{title}}</p>
          <p class="desc">{{desc}}</p>
          <p class="tag" v-if="tags.length > 0">
             <span v-for="tag in tags" :key="tag._id" @click="$store.commit('router',{ path:'/find', query :{ tag_id : tag._id,tag_name :tag.name } })">
               <Tag color="red" >{{tag.name}}</Tag>
             </span>
          </p>
          <p class="time">{{time}}</p>
      </Col>
  </Row>
</template>

<style>
    .vlist-item{ padding: 10px; background: #fff; border:1px solid #ccc;border-radius: 5px; margin: 5px;}
    .vlist-item img{width: 100%; padding: 5px; border-radius: 5px; border: 1px solid #ccc;cursor: pointer; }
    .vlist-item .content{padding-right :10px;}
    .vlist-item .content .title{ font-weight: 800; color: #1c2438; font-size: 15px; cursor: pointer; color:#7BA3F3;}
    .vlist-item .content .desc{ height: 55px; overflow: hidden; margin-top: 3px; color: #495060;}
    .vlist-item .content .tag{ height: 25px; overflow: hidden; margin-top: 3px; color: #495060;}
    .vlist-item .content .time{ text-align: right; color: #80848f;}
</style>

<script>
  export default {
    props : {
      id :{type: String},
      img :{type: String},
      title :{type: String},
      desc :{type: String},
      createAt :{type: String},
      tags :{type :Array}
    },
    data(){
      return {
        ims :'',
        time :''
      }
    },
    methods :{
      toVideo(){
        let id = this.id
        this.$store.commit('router',{ name:'Details' ,query :{ id :id}})
      }
    },
    created(){
      this.ims = this.$store.state.host + '/' + this.img.split('\\').splice(1).join('/')
      this.time = new Date(this.createAt).toLocaleString()
    }
  }
</script>
