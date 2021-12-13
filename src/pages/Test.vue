<template>
  <div>
    <p @click="flag=!flag">
      click
    </p>
    <p v-if="flag">test 2</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {},
  created() {
  }
}

</script>

<style>

</style>
