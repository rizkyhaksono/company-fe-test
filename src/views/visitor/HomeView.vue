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
							<a v-if="isAdmin" href="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard Admin</a>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="handleLogout">Logout</button>
						</div>
					</div>
					<a v-else href="/login" class="px-4 py-2 hover:bg-gray-300 hover:text-[#4e598c] rounded-lg">Masuk</a>
				</div>
			</nav>
		</header>

		<div class="bg-white dark:bg-gray-800">
			<!-- Hero Section -->
			<section id="home" class="bg-[#4e598c] text-white h-96 flex items-center justify-center text-3xl font-bold">
				<div class="text-center">
					<p class="mb-6">Jadilah Tenant pada Event Pilihanmu dengan Mudah, Cepat, dan Terpercaya.</p>
					<img src="/logo.png" alt="Logo" class="h-20" />
				</div>
			</section>

			<!-- Event Section -->
			<section id="services" class="py-20 dark:bg-gray-900 dark:text-white">
				<div class="max-w-7xl mx-auto text-center mb-8">
					<h2 class="text-3xl font-semibold mb-2">Event Terpopuler</h2>
					<p class="text-gray-500 dark:text-gray-400">Yuk kepoin event yang lagi trending.</p>
				</div>
				<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<!-- Event Card 1 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 1" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">FISIP UI NIGHT RUN</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">15 Feb 2025 - 15 Feb 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">Jalan Lingkar Universitas Indonesia</p>
							<p class="text-sm mt-2">1500+ orang</p>
						</div>
					</div>
					<!-- Event Card 2 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 2" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">Charm and Prosperity</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">24 Jan 2025 - 09 Feb 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">Main Atrium - Pluit Village</p>
							<p class="text-sm mt-2">10000+ orang</p>
						</div>
					</div>
					<!-- Event Card 3 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 3" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">Another K-POP Art & Illustration Market</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">19 Apr 2025 - 19 Apr 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">AD Premier, Jakarta Selatan</p>
							<p class="text-sm mt-2">10000+ orang</p>
						</div>
					</div>
					<!-- Event Card 4 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 4" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">House of Zaw Batch 7</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">04 Feb 2025 - 08 Feb 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">House of Zaw Jl Mangkuuyudan no 36 ...</p>
							<p class="text-sm mt-2">10000+ orang</p>
						</div>
					</div>
					<!-- Event Card 5 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 5" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">Votre Ville Food & Beverages</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">01 Mei 2025 - 04 Mei 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">Avenue of Star - Lippo Mall Kemang</p>
							<p class="text-sm mt-2">10000+ orang</p>
						</div>
					</div>
					<!-- Event Card 6 -->
					<div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
						<img src="/logo.png" alt="Event 6" class="w-full h-48 object-cover">
						<div class="p-4">
							<h3 class="text-lg font-semibold">FISIP UI NIGHT RUN</h3>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">15 Feb 2025 - 15 Feb 2025</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm">Jalan Lingkar Universitas Indonesia</p>
							<p class="text-sm mt-2">1500+ orang</p>
						</div>
					</div>
				</div>
			</section>

			<!-- About Section -->
			<section id="about" class="bg-gray-100 py-20 dark:bg-gray-800 dark:text-white">
				<div class="max-w-7xl mx-auto text-center">
					<h2 class="text-3xl font-semibold mb-6">About Us</h2>
					<p class="text-lg">Our company is dedicated to providing top-notch technology solutions to help businesses
						grow.
						We believe in quality and innovation.</p>
				</div>
			</section>

			<!-- Contact Section -->
			<section id="contact" class="py-20 dark:bg-gray-800 dark:text-white">
				<div class="max-w-7xl mx-auto text-center">
					<h2 class="text-3xl font-semibold mb-6">Contact Us</h2>
					<p class="text-lg">Have any questions? Reach out to us, and we'll get back to you as soon as possible.</p>
					<p class="mt-4">Email us at: <a href="mailto:info@company.com" class="text-blue-600 dark:text-blue-400">
							info@company.com
						</a></p>
				</div>
			</section>
		</div>

		<footer class="bg-[#4e598c] text-white py-12">
			<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<img src="/logo.png" alt="Logo" class="h-10 mb-4" />
					<p class="font-bold text-lg">Hubungi Kami</p>
					<div class="flex items-center mt-2">
						<!-- <img src="/email.png" alt="Email Icon" class="h-6 w-6 mr-2"> -->
						<div>
							<p class="text-sm">Email</p>
							<a href="mailto:support@haventwined.com" class="text-sm">support@haventwined.com</a>
						</div>
					</div>
					<div class="flex items-center mt-2">
						<!-- <img src="/whatsapp.png" alt="WhatsApp Icon" class="h-6 w-6 mr-2"> -->
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
import axiosBase from "@/services/axiosBase";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const token = ref(Cookies.get("company_token") || "");
const username = ref(null);
const isAdmin = ref(false);
const isDropdownOpen = ref(false);
const isDarkMode = ref(false);
const router = useRouter();

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