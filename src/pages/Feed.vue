<template>
  <div class="feed">
    <YardCard v-for="yard of myYards" :yard="yard"/>
    <InfiniteLoading @infinite="infiniteHandler">
      <div slot="no-results"></div>
      <div slot="no-more"></div>

    </InfiniteLoading>
  </div>
</template>

<script>
import YardCard from "components/Feed/YardCard";
import {mapState, mapActions} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: "Feed",
  components: {YardCard, InfiniteLoading},
  computed: {
    ...mapState('yards', ['yards', 'yardsCount', 'foodCatOpt'])
  },
  data() {
    return {
      myYards: [],
    }
  },

  methods: {
    ...mapActions('yards', ['readYards', 'getFoodCategory']),

    /***********************loadData*****************
     *load all yards and show them in the feed      *
     ***********************************************/
    loadData() {
      return this.readYards()
        .then(() => {
          if (this.yardsCount) {
            this.myYards = [...this.yards]
            return true;
          }
          return false;
        })

    },
    /*****************infiniteHandler*****************
     *this function make infinity scroll pagination  *
     ************************************************/
    async infiniteHandler($state) {
      debugger
      console.log(this.yardsCount)
      debugger
      if (this.yardsCount) {
        const newYards = await this.loadData()
        if (newYards) {
          return $state.loaded()
        }
      }
      return $state.complete()
    }
  },
 //todo fix get error 404
  created() {
      if(!this.yardsCount)
        this.myYards=this.yards
  }


}
</script>

<style>
.feed {
  margin: 5vw ;
  display: grid;
  grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));
  /*grid-template-columns: 1fr;*/
  grid-gap: 3rem;
  align-items: center;
  justify-content: center;
}

</style>
