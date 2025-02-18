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
        <h1 class="text-2xl font-semibold">Description</h1>
        <button @click="openCreateModal" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Description</button>
      </header>

      <div class="content">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p v-if="isLoading" class="text-center col-span-3">Loading...</p>
          <div v-for="description in descriptions" :key="description.id"
            class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden relative">
            <div class="p-4">
              <h3 class="text-lg font-semibold">{{ description.content }}</h3>
              <p class="text-gray-500 text-sm mt-1">
                {{ formatDate(description.created_at) }}
              </p>
              <div class="mt-3 flex justify-end gap-2">
                <button class="text-blue-500" @click="openEditModal(description)">Edit</button>
                <button class="text-red-500" @click="deleteDescription(description.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-lg font-semibold mb-4">{{ isEditing ? 'Edit Description' : 'Add Description' }}</h2>
          <textarea v-model="descriptionText" type="text" placeholder="Enter description"
            class="w-full p-2 border rounded-md" />
          <div class="flex justify-end mt-4 gap-2">
            <button @click="isModalOpen = false" class="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
            <button @click="isEditing ? updateDescription() : createDescription()"
              class="bg-blue-500 text-white px-4 py-2 rounded-md">
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
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
    const descriptions = ref<{ id: number; content: string; created_at: string }[]>([]);
    const isLoading = ref(false);
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const descriptionText = ref("");
    const currentDescriptionId = ref<number | null>(null);

    // Fetch all descriptions
    const fetchDescriptions = async () => {
      isLoading.value = true;
      try {
        const response = await axiosBase.get("/descriptions");
        descriptions.value = response.data;
      } catch (error) {
        console.error("Error fetching descriptions:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Open modal for adding new description
    const openCreateModal = () => {
      descriptionText.value = "";
      isEditing.value = false;
      isModalOpen.value = true;
    };

    const formatDate = (dateString: string) => {
      return format(new Date(dateString), "dd MMM yyyy HH:mm");
    };

    // Open modal for editing existing description
    const openEditModal = (description: { id: number; content: string }) => {
      descriptionText.value = description.content;
      currentDescriptionId.value = description.id;
      isEditing.value = true;
      isModalOpen.value = true;
    };

    // Create a new description
    const createDescription = async () => {
      if (!descriptionText.value.trim()) return;
      try {
        const response = await axiosBase.post("/descriptions", { content: descriptionText.value }, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        descriptions.value.push(response.data); // Add to local list
        isModalOpen.value = false;
      } catch (error) {
        console.error("Error creating description:", error);
      }
    };

    // Update an existing description
    const updateDescription = async () => {
      if (!descriptionText.value.trim() || currentDescriptionId.value === null) return;
      try {
        await axiosBase.put(`/descriptions/${currentDescriptionId.value}`,
          { content: descriptionText.value },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            }
          }
        );
        const index = descriptions.value.findIndex((desc) => desc.id === currentDescriptionId.value);
        if (index !== -1) descriptions.value[index].content = descriptionText.value;
        isModalOpen.value = false;
      } catch (error) {
        console.error("Error updating description:", error);
      }
    };

    // Delete a description
    const deleteDescription = async (id: number) => {
      if (!confirm("Are you sure you want to delete this description?")) return;
      try {
        await axiosBase.delete(`/descriptions/${id}`, {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        descriptions.value = descriptions.value.filter((desc) => desc.id !== id); // Remove from local list
      } catch (error) {
        console.error("Error deleting description:", error);
      }
    };

    onMounted(fetchDescriptions);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      descriptions,
      isLoading,
      isModalOpen,
      isEditing,
      descriptionText,
      openCreateModal,
      openEditModal,
      createDescription,
      updateDescription,
      deleteDescription,
      toggleSidebar,
      formatDate
    };
  }
};
</script>
