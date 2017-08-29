<style>
#columns{column-width: 300px; column-gap: 15px; width: 100%; margin: 50px auto;}
div#columns figure{width: 350px; background: #fefefe; border: 2px solid #fcfcfc; box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4); margin: 0 2px 15px; padding: 15px; padding-bottom: 10px; transition: opacity .4s ease-in-out; display: inline-block; column-break-inside: avoid;}
div#columns figure img{width: 100%; height: auto; border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 5px;}
div#columns figure figcaption{font-size: .9rem; color: #444; line-height: 1.5; margin-bottom: 10px;}
div#columns small{font-size: 1rem; float: right; text-transform: uppercase; color: #aaa;}
div#columns small a{color: #666; text-decoration: none; transition: .4s color;}
div#columns:hover figure:not(:hover){opacity: 0.5;}
@media screen and (max-width: 750px){#columns{column-gap: 0px;} #columns figure{width: 100%;}}
</style>

<template>
  <div id="columns">
    <figure  v-for="(item ,index) in admin_msg">
      <figcaption>{{ new Date(item.create_at).toLocaleString() }}</figcaption>
      <figcaption>{{ item.content }}</figcaption>
      <figcaption><Button type="error" icon="trash-b" size="small" @click="delete_msg(index,item._id)">删除</Button></figcaption>
    </figure>
  </div>
</template>


<script>
    import ThisJS from './';
    export default {
      data :function(){
        return {
           admin_msg : []
        }
      },
      methods :{
         delete_msg :ThisJS.methods.delete_msg,     //删除消息
      },
      created :ThisJS.created
    }

</script>
