<template>
  <div>
    <hr class="my-2" />
    <div class="px-2 text-center">
      <h2 class="text-sm text-left text-orange-500 font-bold mb-2">
        Actions list :
      </h2>
      <div class="grid grid-cols-2 pl-2">
        <h2>Selectors</h2>
        <h2>Actions</h2>
      </div>
      <actions
        v-for="(action, index) in timeline"
        :key="index"
        v-bind.sync="action"
        @removeAction="removeAction(index)"
      ></actions>
      <button class="success" @click="addAction">Add an action</button>
    </div>
    <hr class="my-2" />
  </div>
</template>

<script>
import ActionComponentVue from "../../shared/ActionComponent.vue";
export default {
  name: "TheContent",
  props: {
    timeline: Array
  },
  data: () => {
    return {
      data: null
    };
  },
  components: {
    actions: ActionComponentVue
  },
  methods: {
    addAction() {
      this.timeline.push({ selector: "", type: "click", text: "" });
    },
    removeAction(index) {
      this.timeline.splice(index, 1);
    },
    updateAction(index, action) {
      this.timeline[index] = action;
    }
  }
};
</script>

<style scoped></style>
