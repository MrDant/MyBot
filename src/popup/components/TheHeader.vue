<template>
  <div class="grid grid-cols-2">
    <h1>My Butler</h1>
    <div class="text-right text-gray-500 font-bold">
      <label class="text-sm">Activate for this site</label>
      <input
        class
        type="checkbox"
        :checked="isActive"
        @input="$emit('update:isActive', $event.target.checked)"
      />
    </div>
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
