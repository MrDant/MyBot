<template>
  <div class="pt-5 px-5">
    <app-header
      :isActive="data.activated"
      @update:isActive="saveIsActived"
    ></app-header>
    <app-content :timeline="data.timeline"></app-content>
    <app-footer @savePopup="savePopup"></app-footer>
  </div>
</template>

<script>
import TheHeaderVue from "./components/TheHeader.vue";
import TheContentVue from "./components/TheContent.vue";
import TheFooterVue from "./components/TheFooter.vue";
import * as _ from "lodash";
export default {
  name: "App",
  data: () => {
    return {
      data: { actived: false, timeline: [] },
      urlMatcher: ""
    };
  },
  methods: {
    saveIsActived(value) {
      this.data.activated = value;
      this.saveData();
    },
    savePopup() {
      console.log(this.data.timeline);
      this.saveData(() => {
        window.close();
      });
    },
    saveData(callback = null) {
      chrome.storage.sync.set({ [this.urlMatcher]: this.data }, callback);
    }
  },
  components: {
    "app-header": TheHeaderVue,
    "app-content": TheContentVue,
    "app-footer": TheFooterVue
  },
  created() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      this.urlMatcher = tabs[0].url;
      chrome.storage.sync.get(this.urlMatcher, result => {
        _.assign(this.data, result[this.urlMatcher]);
      });
    });
  }
};
</script>

<style scoped></style>
