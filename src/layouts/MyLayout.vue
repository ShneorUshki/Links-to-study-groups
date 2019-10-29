<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />
        <!--  @click="drawer = !drawer" -->
        <q-space />
        <q-btn @click="dialog = true" flat round dense icon="add">
          <q-dialog v-model="dialog" persistent>
            <q-card style="width: 350px; max-width: 80vw;">
              <q-card-section>
                <div class="text-h6">Add a group</div>
              </q-card-section>
              <q-form
                @submit.prevent.stop="onSubmit"
                class="q-pa-md"
                style="max-width: 400px"
              >
                <q-input
                  ref="name"
                  v-model="newGroup.name"
                  label="group name"
                  stack-label
                  lazy-rules
                  :rules="[val => !!val || 'group name is required']"
                />
                <q-input
                  v-model="newGroup.description"
                  label="group description"
                  stack-label
                  :rules="[val => !!val || 'group description is required']"
                />
                <q-input
                  v-model="newGroup.link"
                  label="group link (URL)"
                  stack-label
                  type="url"
                  :rules="[val => !!val || 'group link is required']"
                />
                <q-select
                  label="group type"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  filled
                  v-model="newGroup.groupType"
                  :options="options"
                  style="width: 250px"
                  :rules="[val => !!val || 'group type is required']"
                />

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="add group" color="primary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="1000"
      overlay
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Inbox</q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>Star</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>Send</q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>Drafts</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,

      drawer: false,

      options: ["WhatsApp", "Facebook", "Twitter", "Telegram"],
      newGroup: {
        name: "",
        description: "",
        link: "",
        groupType: "",
        time: null,
        img: ""
      }
    };
  },

  methods: {
    onSubmit() {
      if (this.$refs.name.hasError) {
        this.formHasError = true;
      } else {
        this.$store.dispatch("groups/addGroup", this.newGroup).then(() => {
          this.dialog = false;
          this.$q.notify({
            message: "!Group successfully added",
            icon: "thumb_up",
            color: "positive"
          });
          this.newGroup.name = "";
          this.newGroup.description = "";
          this.newGroup.link = "";
          this.newGroup.groupType = "";
        });
      }
    }
  }
};
</script>
