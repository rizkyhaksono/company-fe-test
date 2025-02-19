<template>
	<div class="flex flex-col min-h-screen">
		<header class="bg-[#4e598c] text-white p-4">
			<nav class="flex justify-between items-center max-w-7xl mx-auto">
				<img src="/logo.png" alt="Logo" class="h-10" />
				<div class="flex items-center space-x-4">
					<button class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-[#4e598c]"
						@click="isDarkMode = !isDarkMode">
						{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
					</button>
					<div v-if="token" class="relative">
						<button @click="isDropdownOpen = !isDropdownOpen"
							class="px-4 py-2 hover:bg-gray-300 hover:text-[#4e598c] rounded-lg flex items-center">
							{{ username }}
							<span class="ml-2">▼</span>
						</button>
						<div v-if="isDropdownOpen"
							class="absolute right-0 mt-2 w-48 bg-white text-[#4e598c] rounded-lg shadow-xl py-2">
							<a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
							<a v-if="isAdmin" href="/admin/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard Admin</a>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="handleLogout">Logout</button>
						</div>
					</div>
					<a v-else href="/login" class="px-4 py-2 hover:bg-gray-300 hover:text-[#4e598c] rounded-lg">Masuk</a>
				</div>
			</nav>
		</header>

		<div class="bg-white dark:bg-gray-900">
			<!-- Hero Section -->
			<section id="home" class="bg-[#4e598c] text-white h-96 flex items-center justify-center text-3xl font-bold">
				<div class="text-center">
					<p class="mb-6">Jadilah Tenant pada Event Pilihanmu dengan Mudah, Cepat, dan Terpercaya.</p>
					<img src="/logo.png" alt="Logo" class="h-20" />
				</div>
			</section>

			<!-- Banner Section -->
			<section id="services" class="py-20 dark:bg-gray-900 dark:text-white px-10">
				<div class="max-w-7xl mx-auto text-center mb-8">
					<h2 class="text-3xl font-semibold mb-2">Event Terpopuler</h2>
					<p class="text-gray-500 dark:text-gray-400">Yuk kepoin event yang lagi trending.</p>
				</div>

				<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<p v-if="isLoading" class="text-center col-span-3">Loading...</p>
					<div v-for="event in banners" :key="event.id"
						class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img :src="event.image" :alt="event.title" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">{{ event.title }}</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
								{{ event.created_at }}
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- About Section -->
			<section id="about" class="bg-gray-100 py-20 dark:bg-gray-950 dark:text-white px-10">
				<h2 class="text-3xl font-semibold mb-6 text-center">Tentang Kami</h2>
				<div v-for="description in descriptions" :key="description.id"
					class="max-w-7xl mx-auto flex items-center gap-8">
					<p class="text-lg">-</p>
					<p class="text-lg">{{ description.content }}</p>
				</div>
			</section>

			<!-- Contact Section -->
			<section id="contact" class="py-20 dark:bg-gray-900 dark:text-white px-10">
				<div class="max-w-7xl mx-auto text-center mb-8">
					<h2 class="text-3xl font-semibold mb-2">Hubungi Kami</h2>
					<p class="text-gray-500 dark:text-gray-400">Ada pertanyaan? Jangan ragu untuk menghubungi kami.</p>
				</div>

				<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
					<div v-for="contact in contacts" :key="contact.id" class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
						<h3 class="text-lg font-semibold">{{ contact.name }}</h3>
						<p class="text-gray-500 dark:text-gray-400 mt-2">{{ contact.email }}</p>
						<p class="text-gray-500 dark:text-gray-400 text-sm">{{ contact.message }}</p>
					</div>
				</div>
			</section>
		</div>

		<footer class="bg-[#4e598c] text-white py-12 px-10">
			<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<img src="/logo.png" alt="Logo" class="h-10 mb-4" />
					<p class="font-bold text-lg">Hubungi Kami</p>
					<div class="flex items-center mt-2">
						<img src="https://img.freepik.com/free-psd/phone-icon-design_23-2151311652.jpg" alt="Email Icon"
							class="h-6 w-6 mr-2 rounded-xl">
						<div>
							<p class="text-sm">Email</p>
							<a href="mailto:support@haventwined.com" class="text-sm">support@haventwined.com</a>
						</div>
					</div>
					<div class="flex items-center mt-2">
						<img src="https://img.freepik.com/free-psd/whatsapp-call-icon-psd-editable_314999-3666.jpg"
							alt="WhatsApp Icon" class="h-6 w-6 mr-2 rounded-xl">
						<div>
							<p class="text-sm">WhatsApp Customer Service</p>
							<p class="text-sm">+62 822-9944-9708</p>
						</div>
					</div>
				</div>

				<div>
					<p class="font-bold text-lg">Jelajahi Event</p>
					<ul class="mt-4">
						<li class="mb-2"><a href="#" class="hover:underline text-sm">Festival - Fair - Bazaar</a></li>
						<li class="mb-2"><a href="#" class="hover:underline text-sm">Exhibition - Expo - Pameran</a></li>
						<li><a href="#" class="hover:underline text-sm">Pensi - Acara Sekolah - Acara Kampus</a></li>
					</ul>
				</div>

				<div>
					<p class="font-bold text-lg">Dukungan</p>
					<ul class="mt-4">
						<li class="mb-2"><a href="#" class="hover:underline text-sm">FAQ</a></li>
						<li class="mb-2"><a href="#" class="hover:underline text-sm">Kebijakan Privasi</a></li>
						<li><a href="#" class="hover:underline text-sm">Syarat & Ketentuan</a></li>
					</ul>
				</div>
			</div>
			<hr class="border-white mt-6 opacity-50">
			<div class="max-w-7xl mx-auto text-center mt-4">
				<p class="text-xs">© 2024 Haventwined</p>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axiosBase from "@/services/axiosBase";
import Cookies from "js-cookie";

const router = useRouter();

const token = ref(Cookies.get("company_token") || "");
const username = ref(null);
const isAdmin = ref(false);
const isDropdownOpen = ref(false);
const isDarkMode = ref(false);

const banners = ref<
	{
		id: number;
		title: string;
		image: string;
		created_at: string;
	}[]
>([]);
const descriptions = ref<
	{
		id: number;
		content: string;
		created_at: string;
	}[]
>([]);
const contacts = ref<
	{
		id: number;
		name: string;
		email: string;
		message: string;
	}[]
>([]);
const isLoading = ref(true);

const handleLogout = async () => {
	Cookies.remove("company_token");
	await axiosBase.post("/logout", null, {
		headers: { Authorization: `Bearer ${token.value}` },
	});
	router.push("/login");
};

watchEffect(() => {
	if (isDarkMode.value) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}

	axiosBase.get(
		"/banners"
	).then((response) => {
		banners.value = response.data.data;
		isLoading.value = false;
	});

	axiosBase.get(
		"/descriptions"
	).then((response) => {
		descriptions.value = response.data;
		isLoading.value = false;
	});

	axiosBase.get(
		"/contacts"
	).then((response) => {
		contacts.value = response.data;
		isLoading.value = false;
	});

	if (token.value) {
		axiosBase.get(
			"/user", {
			headers: {
				Authorization: `Bearer ${token.value}`,
			}
		}
		).then((response) => {
			username.value = response.data.name;
			Cookies.set("company_role", response.data.role);
			if (response.data.role === "admin") {
				isAdmin.value = true;
			}
		});
	}
})
</script>