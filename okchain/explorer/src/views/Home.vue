<template>
  <div>
    <HomeBanner />
    <HomeBlocks />
    <div class="container">
      <div class="row">
        <HomeValidators />
<!--         <HomeTradePairs /> -->
        <HomeTokens />
      </div>
      <HomeTransactions />
    </div>
  </div>
</template>

<script>

import HomeBanner from '@/components/home/HomeBanner.vue'
import HomeBlocks from '@/components/home/HomeBlocks.vue'
import HomeValidators from '@/components/home/HomeValidators.vue'
// import HomeTradePairs from '@/components/home/HomeTradePairs.vue'
import HomeTokens from '@/components/home/HomeTokens.vue'
import HomeTransactions from '@/components/home/HomeTransactions.vue'

export default {
  name: 'Home',
  components: {
    HomeBanner,
    HomeBlocks,
    HomeValidators,
    // HomeTradePairs,
    HomeTokens,
    HomeTransactions
  }
}
</script>
