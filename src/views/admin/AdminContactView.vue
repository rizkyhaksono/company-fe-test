<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div
      :class="['bg-gray-800 text-white transition-width duration-300', { 'w-16': isCollapsed, 'w-64': !isCollapsed }]">
      <div class="flex items-center justify-between p-4">
        <h2 v-if="!isCollapsed" class="text-lg font-semibold">Admin Dashboard</h2>
        <button @click="toggleSidebar" class="text-white">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <AdminSidebar />
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 bg-gray-100">
      <header class="mb-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Contacts</h1>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="openModal()">Add Contact</button>
      </header>

      <div class="content">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p v-if="isLoading" class="text-center col-span-3">Loading...</p>
          <div v-for="contact in contacts" :key="contact.id"
            class="bg-white rounded-lg shadow-md overflow-hidden relative p-4">
            <h3 class="text-lg font-semibold">{{ contact.name }}</h3>
            <p class="text-gray-500 text-sm">{{ contact.email }}</p>
            <p class="text-gray-700 mt-2">{{ contact.message }}</p>
            <p class="text-gray-500 text-sm mt-2">{{ formatDate(contact.created_at) }}</p>
            <div class="mt-3 flex justify-between">
              <button class="text-blue-500" @click="openModal(contact)">Edit</button>
              <button class="text-red-500" @click="deleteContact(contact.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Contact' : 'Add Contact' }}</h2>
        <form @submit.prevent="isEditing ? updateContact() : createContact()">
          <div class="mb-4">
            <label class="block text-sm font-medium">Name</label>
            <input v-model="contactForm.name" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Email</label>
            <input v-model="contactForm.email" class="w-full p-2 border rounded" type="email" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Message</label>
            <textarea v-model="contactForm.message" class="w-full p-2 border rounded" required></textarea>
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-2 px-4 py-2 text-gray-500" @click="closeModal">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
              {{ isEditing ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdminSidebar from "@/views/admin/_components/AdminSidebar.vue";
import axiosBase from "@/services/axiosBase";
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { format } from "date-fns";

const token = ref(Cookies.get("company_token") || "");

export default {
  components: {
    AdminSidebar
  },
  setup() {
    const isCollapsed = ref(false);
    const contacts = ref<{ id: number; name: string; email: string; message: string }[]>([]);
    const isLoading = ref(false);
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const contactForm = ref({ id: null, name: "", email: "", message: "" });

    // Fetch all contacts
    const fetchContacts = async () => {
      isLoading.value = true;
      try {
        const response = await axiosBase.get("/contacts");
        contacts.value = response.data;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Create a new contact
    const createContact = async () => {
      try {
        const response = await axiosBase.post("/contacts", contactForm.value, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        contacts.value.push(response.data);
        closeModal();
      } catch (error) {
        console.error("Error creating contact:", error);
      }
    };

    // Open modal for editing or adding a contact
    const openModal = (contact = null) => {
      if (contact) {
        isEditing.value = true;
        contactForm.value = { ...contact };
      } else {
        isEditing.value = false;
        contactForm.value = { id: null, name: "", email: "", message: "" };
      }
      isModalOpen.value = true;
    };

    // Update an existing contact
    const updateContact = async () => {
      try {
        await axiosBase.put(`/contacts/${contactForm.value.id}`, contactForm.value, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        const index = contacts.value.findIndex(c => c.id === contactForm.value.id);
        if (index !== -1) contacts.value[index] = { ...contactForm.value };
        closeModal();
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    };

    // Delete a contact
    const deleteContact = async (id: number) => {
      if (!confirm("Are you sure you want to delete this contact?")) return;
      try {
        await axiosBase.delete(`/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        contacts.value = contacts.value.filter(contact => contact.id !== id);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    };

    // Close modal
    const closeModal = () => {
      isModalOpen.value = false;
    };

    const formatDate = (dateString: string) => {
      return format(new Date(dateString), "dd MMM yyyy HH:mm");
    };

    onMounted(fetchContacts);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      contacts,
      isLoading,
      deleteContact,
      toggleSidebar,
      isModalOpen,
      isEditing,
      contactForm,
      openModal,
      closeModal,
      createContact,
      updateContact,
      formatDate
    };
  }
};
</script>
