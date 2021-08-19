<template>
  <v-row justify="center">
    <v-dialog :value="value" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">New Contact</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="First Name *" required v-model="formData.firstName"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Last name" v-model="formData.lastName"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Company" v-model="formData.company"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Job title" v-model="formData.jobTitle"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Email" v-model="formData.email"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Phone *" required v-model="formData.phone"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea label="Notes" rows="2" v-model="formData.notes" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import * as firebase from "../../utils/firebase";
export default {
  props: ["value", "edit","isEdit"],
  data: () => ({
    formData: {},
    dialog: false
  }),
  methods: {
    async createContact() {
      try {
        await firebase.contactsCollection.add({
          createdAt: new Date(),
          ...this.formData
        });
      } catch (error) {
        console.error(error);
      }
    },
    async updateContact() {
      try {
        await firebase.contactsCollection.doc(this.edit.id).update({
          updatedAt: new Date(),
          ...this.formData
        });
      } catch (error) {
        console.error(error);
      }
    },
    async submit() {
      if (this.isEdit) {
        this.updateContact();
      } else {
        console.log("creat");
        this.createContact();
      }
      this.$emit("input", false);
    },
    onClick() {
      this.dialog = !this.dialog;
    },
    onCancel() {
      this.$emit("input", false);
      this.$emit("cancel");
    }
  },
  watch: {
    edit(newData) {
      console.log("new", newData);
      this.formData = newData;
    }
  }
};
</script>