<template>
  <div>
    <ContactsAdd
      v-model="dialog"
      change="onClick"
      :edit="selectedContact"
      :isEdit="isEdit"
      @cancel="onCancel"
    />
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-container>
      <v-card-title>
        Contacts
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="loading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="contacts"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn color="primary" dark class="mb-2" @click="onClick">Create Contact</v-btn>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <p>There are no contacts yet</p>
          <v-btn color="primary" dark class="mb-2" @click="onClick">Create Contact</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import ContactsAdd from "../ContactsAdd";
import * as firebase from "../../utils/firebase";

export default {
  components: { ContactsAdd },
  data: () => ({
    isEdit: false,
    snackbar: false,
    snackbarText: `Contact deleted`,
    selectedContact: {},

    dialogDelete: false,
    dialog: false,
    loading: false,
    search: "",
    headers: [
      {
        text: "First Name",
        value: "firstName"
      },
      { text: "Last Name", value: "lastName" },
      { text: "Company", value: "company" },
      { text: "Job Title", value: "jobTitle" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    contacts: []
  }),
  created() {
    this.loading = true;
    this.fetchContacts();
  },
  methods: {
    async deleteItemConfirm() {
      this.dialogDelete = false;
      await firebase.contactsCollection.doc(this.selectedContact.id).delete();
      this.snackbar = true;
      this.selectedContact = {};
    },
    deleteItem(item) {
      this.selectedContact = { ...item };

      this.dialogDelete = true;
    },
    onCancel() {
      this.isEdit = false;
      this.selectedContact = {};
    },

    closeDelete() {
      this.dialogDelete = false;
      this.selectedContact = {};
    },
    onClick() {
      this.dialog = !this.dialog;
    },
    editItem(item) {
      this.selectedContact = { ...item };
      this.isEdit = true;
      this.dialog = true;
    },
    async fetchContacts() {
      try {
        firebase.contactsCollection.onSnapshot(querySnapshot => {
          const contacts = [];

          querySnapshot.forEach(doc => {
            contacts.push({ ...doc.data(), id: doc.id });
          });
          this.loading = false;
          this.contacts = contacts;
          console.log("contacts", contacts);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>