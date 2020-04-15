<template>
  <div class="card bg-gray-300 overflow-hidden">
    <div class="px-6 py-4 flex flex-wrap items-center card-header">
      <div class="font-bold text-xl mb-2 text-blue-500 w-1/2">
        {{ title }}
      </div>
      <div class="w-1/2 text-right items-center text-gray-500 font-bold">
        <label class="text-sm">Activate</label>
        <input type="checkbox" v-model="activated" />
      </div>
    </div>
    <app-action
      v-for="(action, index) in timeline.actions"
      :key="index"
      v-bind.sync="action"
      v-on:removeAction="removeAction(index)"
    ></app-action>
    <div class="px-6 py-4 text-right align-bottom">
      <span class="url link">
        <a :href="urlMatcher" target="blank">link</a>
        <span class="popuptext">{{ urlMatcher }}</span>
      </span>
      <button class="error" @click="deleteTimeline">Delete</button>
      <button class="primary" @click="saveData" :disabled="disabled">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import ActionComponentVue from "../../shared/ActionComponent.vue";
export default {
  name: "Card",
  props: ["urlMatcher", "timeline"],
  components: {
    "app-action": ActionComponentVue
  },
  data: () => {
    return {
      disabled: true
    };
  },
  methods: {
    deleteTimeline() {
      chrome.storage.sync.remove(this.urlMatcher, () => {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      });
    },
    removeAction(index) {
      this.timeline.actions.splice(index, 1);
    },
    saveData() {
      chrome.storage.sync.set(
        { [this.urlMatcher]: this.timeline },
        () => (this.disabled = true)
      );
    },
    comparTo(obj1, obj2) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      if (typeof obj1 != typeof obj2) {
        return false;
      }
      if (typeof obj1 == "object") {
        if (Object.keys(obj1) != Object.keys(obj2)) {
          return false;
        }
        Object.keys(obj1).forEach(key => {
          if (!this.comparTo(obj1[key], obj2[key])) {
            return false;
          }
        });
        return true;
      }
      if (typeof obj1 == "array") {
        for (let index = 0; index < array.length; index++) {
          if (!this.comparTo(obj1[index], obj[index])) {
            return false;
          }
        }
        return true;
      }
      return obj1 === obj2;
    }
  },
  watch: {
    timeline: {
      handler(value, oldValue) {
        this.disabled = this.comparTo(value, oldValue);
      },
      deep: true
    }
  },
  computed: {
    activated: {
      get() {
        return this.timeline.activated;
      },
      set(value) {
        this.timeline.activated = value;
        this.saveData();
      }
    },
    title() {
      return this.urlMatcher.substring(8, 20);
    }
  }
};
</script>

<style scoped>
.card-header {
  background: #4a5568;
  margin-bottom: 1rem;
}
</style>
