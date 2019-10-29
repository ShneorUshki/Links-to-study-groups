<template>
  <q-page class="q-px-md-xl">
    <div class="q-pa-md" v-for="group in data" :key="group.id">
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="3rem">
              <img :src="group.img" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ group.name }}</q-item-label>
            <q-item-label caption>{{ group.description }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ group.time }}</q-item-label>
            <div class="text-orange">
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
            </div>
            <q-icon
              class="q-pt-lg"
              :name="group.groupType.icon"
              size="lg"
              :color="group.groupType.color"
            />
          </q-item-section>
        </q-item>

        <q-expansion-item expand-icon-toggle switch-toggle-side>
          <q-card>
            <q-card-section>
              <div class="row justify-center">
                <a :href="group.link" target="_blank" rel="noopener noreferrer">
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    label="join up"
                  />
                </a>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator spaced inset />
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      groupType: null
    };
  },
  mounted() {
    this.$store.dispatch("groups/getDataGroups");
  },
  computed: {
    data() {
      return this.$store.state.groups.dataGroup;
    }
  },
  methods: {}
};
</script>
