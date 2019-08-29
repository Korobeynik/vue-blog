<template>
    <el-container class="page-container">
        <el-header>
            <app-navigation></app-navigation>
        </el-header>
        <el-main>
            <nuxt />
        </el-main>
       <el-footer></el-footer>
    </el-container>
</template>

<script>
  import AppNavigation from '@/components/main/Navigation'

  export default {
    components: {
      AppNavigation
    }
  }
</script>

<style lang="sass" scoped>
    header
        border-bottom: 1px solid #ddd
        height: 100% !important
</style>
