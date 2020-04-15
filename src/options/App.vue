<template>
  <div class="container mx-auto">
    <div class="flex justify-end">
      <button class="primary" @click="exportData">Export</button>
      <button class="success overflow-hidden" style="position: relative;">
        <input
          type="file"
          style="
          position: absolute;
          opacity: 0;
          top: 0;
          bottom: 0;
          rigth:0;
          left: 0;
        "
          @change="importData"
        />Import
      </button>
    </div>
    <div class="flex flex-wrap px-4 pt-4 xl:px-6">
      <div
        class="text-center w-full mt-40"
        v-if="!Object.keys(timelines).length"
      >
        <span class="text-gray-600 text-3xl">Any Timeline created</span>
      </div>
      <card
        v-for="(value, name) in timelines"
        :key="name"
        :urlMatcher="name"
        :timeline="value"
      ></card>
    </div>
  </div>
</template>

<script>
import CardVue from "./components/Card.vue";
export default {
  name: "App",
  data: function() {
    return {
      timelines: {}
    };
  },
  components: {
    card: CardVue
  },
  methods: {
    exportData: () => {
      chrome.storage.sync.get(function(data) {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(
          new Blob([JSON.stringify(data, null, 2)], { type: "text/json" })
        );
        a.download = "exportAction.json";
        // Append anchor to body.
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    onReaderLoad: function(event) {
      let obj = JSON.parse(event.target.result);
      chrome.storage.sync.get(function(data) {
        Object.keys(obj).forEach(url => {
          data[url] = obj[url];
        });
        chrome.storage.sync.set(data);
        location.reload();
      });
    },
    importData(event) {
      let reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.target.files[0]);
    },
    changeActive() {
      chrome.storage.sync.get(data => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
          let url = tabs[0].url;
          chrome.storage.sync.set({
            [url]: {
              activated: this.isActivate
            }
          });
        });
      });
    }
  },
  created() {
    chrome.storage.sync.get(data => {
      delete data.config;
      this.timelines = data;
    });
  }
};
</script>

<style scoped></style>
