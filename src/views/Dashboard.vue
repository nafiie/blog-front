<template>
  <div class="min-h-screen bg-slate-50">
    <Navbar />
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-slate-800">My Dashboard</h1>
            <p class="text-slate-600 mt-2">Manage and view your posts</p>
          </div>
          <router-link 
            to="/create" 
            class="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            New Post
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-red-700">{{ error }}</span>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0 && !loading" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-700 mb-2">No posts yet</h3>
          <p class="text-slate-500 mb-6">Get started by creating your first post</p>
          <router-link 
            to="/create-post" 
            class="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Create Post
          </router-link>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="post in posts" 
          :key="post._id" 
          class="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          <!-- Post Image -->
          <div v-if="post.image" class="aspect-w-16 aspect-h-9 bg-slate-100">
            <img 
              :src="post.image" 
              :alt="post.title" 
              class="w-full h-48 object-cover"
            />
          </div>
          
          <!-- Post Content -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-800 mb-3 line-clamp-2 leading-tight">
              {{ post.title }}
            </h3>
            
            <!-- Author Info -->
            <div v-if="post.author && typeof post.author === 'object'" class="flex items-center mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {{ post.author.username ? post.author.username.charAt(0).toUpperCase() : 'U' }}
              </div>
              <span class="text-slate-600 text-sm ml-2">
                {{ post.author.username || 'Unknown' }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <div class="flex space-x-3">
                <router-link 
                  :to="`/post/${post._id}`"
                  class="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors duration-200 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View
                </router-link>
                
                <router-link 
                  v-if="isOwner(post)"
                  :to="`/edit/${post._id}`"
                  class="text-slate-600 hover:text-slate-700 font-medium text-sm transition-colors duration-200 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit
                </router-link>
              </div>
              
              <button 
                v-if="isOwner(post)"
                @click="deletePost(post._id)"
                class="text-coral-600 hover:text-coral-700 font-medium text-sm transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref, onMounted } from 'vue';
import api from '../service/api';
import { useRouter } from 'vue-router';

const posts = ref([]);
const loading = ref(false);
const error = ref('');
const router = useRouter();

const userId = ref('');

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    userId.value = res.data._id;
  } catch (err) {
    router.push('/login');
  }
};

const fetchPosts = async () => {
  loading.value = true;
  error.value = '';
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get('/posts', {
      headers: { Authorization: `Bearer ${token}` }
    });
    posts.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch posts';
  } finally {
    loading.value = false;
  }
};

const isOwner = (post) => {
  // If author is populated as an object
  if (post.author && typeof post.author === 'object') {
    return post.author._id === userId.value;
  }
  // If author is just an ID
  return post.author === userId.value;
};

const deletePost = async (postId) => {
  if (!confirm('Are you sure you want to delete this post?')) return;
  try {
    const token = localStorage.getItem('authToken');
    await api.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    posts.value = posts.value.filter(p => p._id !== postId);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete post';
  }
};

onMounted(async () => {
  await fetchProfile();
  await fetchPosts();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-16 {
  position: relative;
}

.aspect-w-16::before {
  content: '';
  display: block;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>