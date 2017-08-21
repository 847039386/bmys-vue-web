<template>
	<div class="single-member effect-3">
		<div class="member-image">
		<img :src="img" alt="Member">
		</div>
		<div class="member-info">
			<h3>{{title}}</h3>
			<p>{{content}}</p>
		</div>
	</div>
</template>


<script>
  export default {
    props : {
      img :{type: String},
      title :{type: String},
      content :{type: String},
    }
  }
</script>


<style >

.effect-3 {max-height: 224px; min-height: 224px; overflow: hidden; background-color: #fff;text-align: center; position: relative; cursor: pointer; border: 1px solid #ccc; margin-bottom:5px; box-shadow: 3px 3px 3px #f3f3f3;  }
.effect-3 h3{height: 16px; line-height: 16px;margin: 2px 0 10px;  color: #333; font-size: 14px; overflow: hidden ;  text-overflow: ellipsis;  white-space: nowrap; padding: 0 5px;}
.effect-3 p {font-size: 12px; font-weight: 300; line-height: 16px; padding: 0 15px; margin-bottom: 10px; overflow: hidden;  text-overflow: ellipsis;}
.effect-3 .member-image{ width: 100%;  display: inline-block; max-width: 100%; vertical-align: middle;overflow: hidden;  transition: 0.4s; height: 130px; }
.effect-3 .member-info{transition: 2s;}
.effect-3 .member-image img{width: 100%; vertical-align: bottom;}
.effect-3:hover .member-image{height: 81px; transition: 0.4s;}

</style>
