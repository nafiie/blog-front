<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
    <!-- 🌟 NAVBAR -->
    <header class="bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200 fixed top-0 left-0 w-full z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1
            class="text-4xl font-bold italic bg-gradient-to-r from-pink-400 via-amber-500 to-emerald-400 bg-clip-text text-transparent">
            Nafii Talks
          </h1>
        </router-link>

        <!-- Desktop Buttons -->
        <div class="hidden md:flex space-x-3">
          <!-- About Link -->
          <router-link
            to="/about"
            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            About
          </router-link>

          <router-link
            v-if="!isAuthenticated"
            to="/login"
            @click="router.push('/dashboard')"
            class="bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </router-link>

          <router-link
            v-if="!isAuthenticated"
            to="/register"
            @click="router.push('/dashboard')"
            class="bg-gradient-to-r from-amber-500 to-orange-400 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Join Now
          </router-link>

          <button
            v-if="isAuthenticated"
            @click="logout"
            class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu"
          class="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-700" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-700" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <div v-if="menuOpen" class="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
        <div class="flex flex-col items-center space-y-4 py-6 font-medium">

          <!-- About (mobile) -->
          <router-link
            @click="closeMenu"
            to="/about"
            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl w-11/12 text-center font-semibold flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            About
          </router-link>

          <router-link
            v-if="!isAuthenticated"
            @click="closeMenu"
            to="/login"
            class="bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-8 py-4 rounded-xl w-11/12 text-center font-semibold flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </router-link>

          <router-link
            v-if="!isAuthenticated"
            @click="closeMenu"
            to="/register"
            class="bg-gradient-to-r from-amber-500 to-orange-400 text-white px-8 py-4 rounded-xl w-11/12 text-center font-semibold flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Join Now
          </router-link>

          <button
            v-if="isAuthenticated"
            @click="logout"
            class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-xl w-11/12 text-center font-semibold flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
  <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-24 mt-24 text-center px-4 relative overflow-hidden">

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div class="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg italic">Welcome to .....</span>
          <span class="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent ml-2">
            <span class="italic">Nafii Talks</span>
          </span>
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-emerald-100">
          Inspiration lives here!Read, create, and connect with stories that matter. Your next idea starts now!
        </p>
        <div v-if="isAuthenticated" class="mt-8">
          <div class="bg-emerald-100 text-emerald-800 rounded-2xl px-6 py-4 shadow-lg border border-emerald-200 inline-block">
            <p class="text-lg font-semibold flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Welcome back! You can view and engage with posts.
            </p>
          </div>
        </div>
      </div>
      <!-- Unauthenticated message moved further down -->
      <div v-if="!isAuthenticated" class="flex justify-center mt-20">
        <div class="bg-gradient-to-r from-amber-200 via-orange-100 to-rose-100 text-amber-900 rounded-3xl px-8 py-6 shadow-2xl border-2 border-amber-300 animate-bounce-in inline-block">
          <p class="text-3xl md:text-4xl font-extrabold italic underline decoration-emerald-400 mb-2 tracking-wide">
            Want to see what we have?
          </p>
          <p class="text-lg md:text-xl font-medium text-emerald-700 italic">
            Scroll down to explore our amazing stories and join the conversation!
          </p>
        </div>
      </div>
    </section>

    <!-- Blog Posts Section -->
    <section class="max-w-7xl mx-auto py-16 px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl tracking-tight animate-pulse">
          <span class="inline-block px-6 py-3 rounded-3xl shadow-2xl border-2 border-emerald-300 bg-gradient-to-r from-white via-amber-100 to-white text-emerald-700 backdrop-blur-lg">
            <span class="font-black italic">Discover, Connect & Be Inspired!</span>
            <svg class="inline-block w-8 h-8 ml-2 text-amber-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </span>
        </h2>
        <div class="w-24 h-1 bg-gradient-to-red from-emerald-500 to-teal-600 mx-auto rounded-full"></div>
     </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
      <div v-if="error" class="text-center py-8">
        <div class="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-700 text-lg">{{ error }}</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="post in posts"
          :key="post._id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200 group"
        >
          <!-- Image Container -->
          <div class="relative overflow-hidden">
            <img
              v-if="post.image"
              :src="post.image"
              alt="Post Image"
              class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div v-else class="w-full h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <svg class="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
              {{ post.title }}
            </h3>
            <p class="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
              {{ post.excerpt || post.content.slice(0, 120) + '...' }}
            </p>
            
            <!-- Author Info -->
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                {{ post.author?.username ? post.author.username.charAt(0).toUpperCase() : 'U' }}
              </div>
              <span class="text-slate-700 font-medium text-sm">
                {{ post.author?.username || 'Unknown' }}
              </span>
            </div>

            <!-- Action Button -->
            <div class="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                v-if="isAuthenticated"
                @click="$router.push(`/post/${post._id}`)"
                class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center group/btn"
              >
                <span>Read More</span>
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
             <div v-else class="text-slate-500 text-sm flex items-center">
  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
  </svg>
  <router-link
    to="/register"
    class="text-emerald-600 font-semibold hover:underline hover:text-emerald-700 transition-colors duration-200"
  >
    Join to Read More
  </router-link>
</div>

            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0 && !loading" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-700 mb-3">No posts yet</h3>
          <p class="text-slate-600 mb-6">Be the first to share your story with the community!</p>
          <button 
            v-if="isAuthenticated"
            @click="$router.push('/create')"
            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold inline-flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Create First Post
          </button>
        </div>
      </div>
    </section>

</div>
<footer class="bg-amber-50 text-gray-700 border-t border-amber-100 mt-20">
  <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <!-- Left side -->
    <div class="text-center md:text-left">
      <h3 class="text-lg font-extrabold text-amber-600">Nafii Talks.....</h3>
      <p class="text-md text-gray-600 italic">Where thoughts meet words 🌿</p>
    </div>
    <!-- Center links -->
    <div class="flex space-x-6 text-sm">
      <router-link to="/" class="hover:text-amber-600 transition italic">Home</router-link>
      <router-link to="/about" class="hover:text-amber-600 transition italic">About</router-link>
      <router-link to="/register" class="hover:text-amber-600 transition italic">Join Now</router-link>
      <router-link to="/login" class="hover:text-amber-600 transition italic">Login</router-link>
    </div>
    <!-- Right side -->
    <div class="text-sm text-gray-500 text-center md:text-right">
      <p>&copy; {{ new Date().getFullYear() }} Nafii Talks. All rights reserved.</p>
    </div>
  </div>
</footer>
<!-- ====== END FOOTER ====== -->

</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../service/api'
// router instance
const router = useRouter()

// reactive data
const posts = ref([])
const loading = ref(false)
const error = ref('')
const isAuthenticated = ref(!!localStorage.getItem('authToken'))
const menuOpen = ref(false)

// fetch posts
const fetchPosts = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/posts')
    posts.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch posts'
  } finally {
    loading.value = false
  }
}

// menu controls
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

// logout
const logout = () => {
  localStorage.removeItem('authToken')
  isAuthenticated.value = false
  router.push('/login')
}

// run on page load
onMounted(() => {
  fetchPosts()
})
</script>


