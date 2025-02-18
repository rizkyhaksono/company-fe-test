<template>
  <nav class="space-y-4">
    <router-link to="/admin/dashboard"
      class="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
      <i class="fas fa-home"></i>
      <span v-if="!isCollapsed" class="ml-2">Dashboard</span>
    </router-link>
    <router-link to="/admin/dashboard/banner"
      class="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
      <i class="fas fa-users"></i>
      <span v-if="!isCollapsed" class="ml-2">Banner</span>
    </router-link>
    <router-link to="/admin/dashboard/description"
      class="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
      <i class="fas fa-cog"></i>
      <span v-if="!isCollapsed" class="ml-2">Description</span>
    </router-link>
    <router-link to="/admin/dashboard/contact"
      class="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
      <i class="fas fa-cog"></i>
      <span v-if="!isCollapsed" class="ml-2">Contact</span>
    </router-link>
  </nav>
</template>