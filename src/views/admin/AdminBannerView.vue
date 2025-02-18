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
        <h1 class="text-2xl font-semibold">Banner</h1>
        <button @click="openCreateModal" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Banner</button>
      </header>

      <div class="content">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p v-if="isLoading" class="text-center col-span-3">Loading...</p>
          <div v-for="banner in banners" :key="banner.id"
            class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden relative">
            <img :src="banner.image" :alt="banner.title" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-semibold">{{ banner.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {{ formatDate(banner.created_at) }}
              </p>
              <div class="mt-3 flex justify-end gap-2">
                <button class="text-blue-500" @click="openEditModal(banner)">Edit</button>
                <button class="text-red-500" @click="deleteBanner(banner.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? "Edit Banner" : "Add Banner" }}</h2>
        <input v-model="bannerForm.title" type="text" placeholder="Title" class="border p-2 w-full mb-3 rounded" />
        <img v-if="bannerForm.image" :src="bannerForm.image" alt="Banner" class="w-full h-48 object-cover mb-3" />
        <input type="file" class="border p-2 w-full mb-3 rounded" @change="handleFileUpload" />

        <div class="flex justify-end gap-2">
          <button class="bg-gray-500 text-white px-4 py-2 rounded" @click="closeModal">Cancel</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="isEditing ? updateBanner() : createBanner()">
            {{ isEditing ? "Update" : "Create" }}
          </button>
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

interface Banner {
  id: number;
  title: string;
  image: string;
  created_at: string;
}

export default {
  components: {
    AdminSidebar
  },
  setup() {
    const isCollapsed = ref(false);
    const banners = ref<Banner[]>([]);
    const isLoading = ref(false);
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const bannerForm = ref<Banner>({ id: 0, title: "", image: "", created_at: "" });
    const selectedBannerId = ref<number | null>(null);
    const uploadedFile = ref<File | null>(null);

    // Fetch Banners
    const fetchBanners = async () => {
      isLoading.value = true;
      try {
        const response = await axiosBase.get("/banners");
        banners.value = response.data.data;
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const formatDate = (dateString: string) => {
      return format(new Date(dateString), "dd MMM yyyy HH:mm");
    };

    // Handle File Upload
    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        uploadedFile.value = target.files[0];
        bannerForm.value.image = URL.createObjectURL(target.files[0]); // Preview
      }
    };

    // Open Create Modal
    const openCreateModal = () => {
      isEditing.value = false;
      bannerForm.value = { id: 0, title: "", image: "", created_at: "" };
      isModalOpen.value = true;
    };

    // Open Edit Modal
    const openEditModal = (banner: Banner) => {
      isEditing.value = true;
      bannerForm.value = { ...banner };
      selectedBannerId.value = banner.id;
      isModalOpen.value = true;
    };

    // Close Modal
    const closeModal = () => {
      isModalOpen.value = false;
      bannerForm.value = { id: 0, title: "", image: "", created_at: "" };
    };

    // Create Banner
    const createBanner = async () => {
      try {
        if (!uploadedFile.value) {
          console.error("No file selected");
          return;
        }

        const formData = new FormData();
        formData.append("title", bannerForm.value.title);
        formData.append("image", uploadedFile.value);

        const response = await axiosBase.post("/banners", formData, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "multipart/form-data",
          },
        });

        banners.value.push(response.data);
        await fetchBanners();
        window.location.reload();
        closeModal();
      } catch (error) {
        console.error("Error creating banner:", error);
      }
    };

    // Update Banner
    const updateBanner = async () => {
      if (!selectedBannerId.value) return;
      try {
        await axiosBase.put(`/banners/${selectedBannerId.value}`, {
          title: bannerForm.value.title,
          image: bannerForm.value.image
        });
        const index = banners.value.findIndex(b => b.id === selectedBannerId.value);
        if (index !== -1) {
          banners.value[index] = { ...bannerForm.value };
        }
        closeModal();
      } catch (error) {
        console.error("Error updating banner:", error);
      }
    };

    // Delete Banner
    const deleteBanner = async (id: number) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
      if (!confirmDelete) return;

      try {
        await axiosBase.delete(`/banners/${id}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        banners.value = banners.value.filter(b => b.id !== id);
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    };

    onMounted(fetchBanners);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      banners,
      isLoading,
      toggleSidebar,
      isModalOpen,
      isEditing,
      bannerForm,
      openCreateModal,
      openEditModal,
      closeModal,
      createBanner,
      updateBanner,
      deleteBanner,
      handleFileUpload,
      formatDate
    };
  }
};
</script>