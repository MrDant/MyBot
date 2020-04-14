<template>
  <div class="text-right">
    <button class="primary" @click="$emit('savePopup')">
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    isActive: Boolean
  }
};
</script>

<style scoped></style>
