<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <div class="breadcrumb-inner">
      <template v-for="(item, index) in items" :key="index">
        <router-link
          v-if="item.to"
          class="crumb"
          :to="item.to"
        >{{ item.label }}</router-link>
        <span v-else class="crumb current">{{ item.label }}</span>
        <span v-if="index < items.length - 1" class="crumb-sep">/</span>
      </template>
    </div>
  </nav>
</template>
