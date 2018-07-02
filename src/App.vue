<template>
<div id="app" class="flyout">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark z-index">
    <a class="navbar-brand" href="/">
  <!--  <img src="/static/sun-64x64.png" width="30" height="30" class="d-inline-block align-top" alt="">-->
      Connect Transition
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" v-on:click="close" href="#/projects">Projects<span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>
  <main class="margin-bottom">
    <router-view></router-view>
  </main>

</div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    close() {
      document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
    }
  }
};
</script>

<style>
.flyout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #f1e767 0%,#feb645 100%);
}

.z-index {
  z-index: 100;
}

.margin-bottom {
  margin-bottom: 2rem;
}

.bg-dark
{
/*  background: linear-gradient(#3e2723, #4e342e) !important; */
  background-color: #3e2723 !important;
}
</style>
