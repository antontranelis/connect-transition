<template>
  <div class="container margin-top">
<div v-for="post in posts" :key="post._id">
    <!-- Grid row -->
<div class="row">

<!-- Grid column -->
<div class="col-lg-5">

  <!-- Featured image -->
  <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
    <img class="img-fluid" :src="post.imgUrl" alt="Sample image">
    <a>
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>

</div>
<!-- Grid column -->

<!-- Grid column -->
<div class="col-lg-7">

  <!-- Category -->
  <!-- Post title -->
  <h3 class="mb-3">{{post.title}}</h3>
  <!-- Excerpt -->
  <p>{{post.text}}</p>
  <!-- Post data -->
  <p>by <a><strong>{{post.project.title}}</strong></a>, {{post.date}}</p>
  <badge class="hov" color="stylish-color">Transition</badge>&nbsp;
  <badge class="hov" color="stylish-color">Network</badge>&nbsp;
  <br>
  <br>
  <span v-for="tag in post.tags" :key="tag._id">
  <badge class="hov" color="stylish-color">{{tag.title_en}}</badge>&nbsp;
  </span>
  <!-- Read more button -->

  <a class="btn btn-success btn-md">Read more</a>

</div>
<!-- Grid column -->

</div>
<!-- Grid row -->
<hr>
</div>
  </div>
      <!-- /.container -->
</template>

<script>
import {
  Container,
  Row,
  Column,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Btn,
  Fa,
  Badge
} from 'mdbvue';
import PostsService from '@/services/PostsService';

export default {
  name: 'PostsPage',
  components: {
    Container,
    Row,
    Column,
    Card,
    CardImg,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Btn,
    Fa,
    Badge
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
    },
    async deletePost(id) {
      await PostsService.deletePost(id);
      this.$router.push({
        name: 'Posts'
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-bottom {
  margin-bottom: 20px;
}

.margin-top
{
  margin-top: 1rem;
}
</style>
