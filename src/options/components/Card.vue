<template>
  <div class="w-full md:w-1/2 xl:w-1/3">
    <div class="card md:m-4 lg:m-6">
      <div class="px-6 py-4 flex flex-wrap items-center card-header">
        <div
          class="font-bold text-xl mb-2 text-blue-500 w-2/3  whitespace-no-wrap overflow-hidden"
          style="text-overflow: ellipsis;"
        >
          <a
            :href="urlMatcher"
            target="_blank"
            @mouseleave="hiddenLink(true)"
            @mouseenter="hiddenLink(false)"
          >
            {{ timeline.title }}</a
          >
          <div
            class="absolute whitespace-no-wrap text-sm rounded-lg bg-gray-800 text-green-300 p-2"
            ref="urlMatcher"
            hidden
          >
            {{ urlMatcher }}
          </div>
        </div>
        <div class="w-1/3 text-right items-center text-gray-500 font-bold">
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
        <button class="error" @click="deleteTimeline">Delete</button>
        <button class="primary" @click="saveData" :disabled="disabled">
          Save
        </button>
      </div>
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
    hiddenLink(hidden) {
      this.$refs.urlMatcher.hidden = hidden;
    },
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
