<template>
<div>
  <l-map class="map" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker v-for="m in marker" :key="m" :lat-lng="m"></l-marker>
    <a href="/#/map"><div  class="fullscreen-button"><img src="@/assets/fullscreen.png" alt="fullscreen"></div></a>
  </l-map>
  <!--    <div class="container free-bird">
        <row>
          <column md="10" class="mx-auto float-none white z-depth-1 py-2 px-2">
            <card-body>
              <h2 class="h2-responsive"><strong>Connect Transition</strong></h2>
              <p class="pb-4">Build a dezentralized network of self-sustainable communities</p>
            </card-body>
          </column>
        </row>
      </div> -->
  <container class="">
    <br><br>
      <row>
        <column md="12" class="mx-auto mt-4 white-box">
          <div class="media">
          <img class="align-self-center mr-3" src="@/assets/island3.png" alt="island">
            <div class="media-body">
              <h5 class="mt-0"><b>World in Transition</b></h5> All over the world a lot of projects in the field of <b>permaculture</b> and <b>self-sustainability</b> are trying to find alternatives to the prevailing system. Though all these projects are being an essential part of change and pioneers
              for human kind in the 21. century ... for now they're often like <b>islands</b> in a big ocean of money driven, centralized and out-dated structures. So they're not able to replace them.
            </div>
          </div>
          <br><br>
          <div class="media">
            <div class="media-body">
              <h5 class="mt-0"><b>Build a Decentralized Network</b></h5>To make this global movement more powerfull we want to connect all these project. Knowing that the change has to happen in real life, we want to use information technology to connect free people and self-sustainable projects to form a decentralized network.
            </div>
          <img class="align-self-center mr-3" src="@/assets/connect3.png" alt="island">
          </div>
        </column>
      </row>
      <hr/>
      <h3 class="pt-5 text-center">The Mission</h3>
      <row>
        <column md="4" class="text-center home-feature-box">
          <a href="#/projects">
            <img src="@/assets/flag_small.png"/>
            <span>making projects visible</span>
            <p>database of projects, interviews / content, share knowledge</p>
          </a>
        </column>
        <column md="4" class="text-center home-feature-box">
          <a href="#/components">
            <fa icon="globe" class="blue-text" />
            <span>building up connections</span>
            <p>event-kalender, markedplace ...</p>
          </a>
        </column>
        <column md="4" class="text-center home-feature-box">
          <a href="#/advanced">
            <fa icon="leaf" class="green-text" />
            <span>finding resources</span>
            <p>crowdfunding, voluntairing, NGOs</p>
          </a>
        </column>
      </row>
      <h3 class="pt-5 text-center">Would you like to join us?</h3>
      <ul class="py-2 text-center">
        <li><btn tag="a" size="lg" color="green" href="#/components/grid" target="_blank"><b>Sign Up for Mailing List</b></btn></li>
      </ul>
  </container>
</div>
</template>

<script>
import {
  Container,
  Column,
  Row,
  Fa,
  Navbar,
  NavbarItem,
  NavbarNav,
  NavbarCollapse,
  Btn,
  EdgeHeader,
  CardBody
} from 'mdbvue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: 'HomePage',
  components: {
    Container,
    Column,
    Row,
    Fa,
    Navbar,
    NavbarItem,
    NavbarNav,
    NavbarCollapse,
    Btn,
    EdgeHeader,
    CardBody,
    LMap,
    LTileLayer,
    LMarker,
    L
  },
  data() {
    return {
      zoom:5,
      center: L.latLng(3.413220, -70.219482),
      url:'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmV4dHF1ZXN0IiwiYSI6ImNqM2x1dzNkbDAxajUyd3F0bmc3b3E0dHQifQ.V4hEw7CC3e_76sNhMxwE3Q',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: [
        L.latLng(0.413220, -74.219482),
        L.latLng(0.433220, -70.219482),
        L.latLng(2.463220, -70.219482),
        L.latLng(4.413220, -72.219482)
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.home-feature-box {
  padding: 40px 0;
}

.home-feature-box i {
  font-size: 6rem;
}

.home-feature-box span {
  display: block;
  color: black;
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #212529;
}

.fullscreen-button
{
  position: relative;
  z-index: 10000;
  bottom: -250px;
  right: -10px;
  background-color: #fff;
  width: 38px;
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 4px;
}
.map
{height: 300px;}
</style>
