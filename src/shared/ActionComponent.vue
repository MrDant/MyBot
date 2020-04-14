<template>
  <div class="flex flex-wrap items-center">
    <div class="w-1/2 px-1 py-1">
      <input
        id="selector"
        type="text"
        placeholder="Choose your component"
        :value="selector"
        @input="$emit('update:selector', $event.target.value)"
      />
    </div>
    <div class="w-2/6 px-1 py-1">
      <select :value="type" @input="$emit('update:type', $event.target.value)">
        <option value="click">Click</option>
        <option value="hidden">Hidden</option>
        <option value="delete">Delete</option>
        <option value="check">Check</option>
        <option value="text">Text</option>
        <option value="password">Password</option>
      </select>
      <input
        :type="type"
        :value="text"
        @input="$emit('update:text', $event.target.value)"
        :hidden="hidden"
      />
    </div>
    <div class="w-1/6 px-1">
      <button class="error" @click="removeThisAction">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheContent",
  props: ["selector", "type", "text"],
  methods: {
    removeThisAction() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
      this.$emit("removeAction");
    }
  },
  computed: {
    hidden() {
      return !(this.type == "text" || this.type == "password");
    }
  }
};
</script>

<style scoped></style>
