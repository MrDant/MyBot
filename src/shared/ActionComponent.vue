<template>
  <div class="flex flex-wrap items-center px-3">
    <div class="w-1/2 px-1 py-1">
      <input
        type="text"
        placeholder="Choose your component"
        :value="selector"
        @input="$emit('update:selector', $event.target.value)"
      />
    </div>
    <div class="w-2/6 px-1 py-1">
      <select :value="type" @input="$emit('update:type', $event.target.value)">
        <option value="_click">Click</option>
        <option value="_hidden">Hidden</option>
        <option value="_delete">Delete</option>
        <option value="_check">Check</option>
        <option value="_text">Text</option>
        <option value="_password">Password</option>
      </select>
      <input
        :type="inputType"
        :value="text"
        @input="$emit('update:text', $event.target.value)"
        :hidden="hidden"
      />
    </div>
    <div class="w-1/6 px-1">
      <button class="error" @click="$emit('removeAction')">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheContent",
  props: ["selector", "type", "text"],
  computed: {
    inputType() {
      return this.type.substring(1);
    },
    hidden() {
      return !(this.type == "_text" || this.type == "_password");
    }
  }
};
</script>

<style scoped></style>
