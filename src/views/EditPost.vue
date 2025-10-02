<template>
  <div class="min-h-screen bg-slate-50">
    <Navbar />
    
    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-gradient-to-r from-coral-500 to-orange-400 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-slate-800">Edit Post</h1>
            <p class="text-slate-600 mt-1">Update your post content and publish changes</p>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Form Header Strip -->
        <div class="bg-gradient-to-r from-coral-500 to-orange-400 h-2"></div>
        
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Loading State -->
            <div v-if="loading && !title" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>

            <template v-else>
              <!-- Title Input -->
              <div>
                <label for="title" class="block text-sm font-medium text-slate-700 mb-3">Post Title</label>
                <input 
                  id="title" 
                  v-model="title" 
                  type="text" 
                  class="w-full px-4 py-4 text-lg font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white placeholder-slate-500"
                  placeholder="Enter a compelling title..."
                  required
                >
              </div>

              <!-- Content Input -->
              <div>
                <label for="content" class="block text-sm font-medium text-slate-700 mb-3">Post Content</label>
                <textarea 
                  id="content" 
                  v-model="content" 
                  class="w-full h-96 p-6 resize-none border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white placeholder-slate-500"
                  placeholder="Write your story here..."
                  required
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-3">Featured Image</label>
                
                <!-- Current Image -->
                <div v-if="imagePreview && !imageFile" class="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p class="text-sm text-slate-600 mb-2">Current Image:</p>
                  <img :src="imagePreview" alt="Current post image" class="max-h-48 rounded-lg shadow" />
                </div>
                
                <!-- Upload Area -->
                <div 
                  @click="$refs.fileInput.click()"
                  class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-teal-400 hover:bg-teal-50/50"
                  :class="{ 'border-teal-400 bg-teal-50/50': imageFile }"
                >
                  <input 
                    ref="fileInput"
                    type="file" 
                    accept="image/*" 
                    @change="handleImageUpload" 
                    class="hidden" 
                  />
                  
                  <div v-if="!imageFile">
                    <svg class="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p class="text-slate-600 font-medium">Click to upload a new image</p>
                    <p class="text-slate-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  
                  <div v-else class="flex flex-col items-center">
                    <img :src="imagePreview" alt="New image preview" class="max-h-48 rounded-lg shadow-md mb-4" />
                    <p class="text-teal-600 font-medium">New image selected! Click to change</p>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-red-700">{{ error }}</span>
              </div>

              <!-- Submit Button -->
              <div class="flex items-center justify-between pt-8 border-t border-slate-200">
                <div class="flex space-x-4">
                  <button
                    type="button"
                    @click="router.push('/dashboard')"
                    class="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to Dashboard
                  </button>
                  
                  <button
                    type="button"
                    @click="router.push(`/post/${route.params.id}`)"
                    class="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    View Post
                  </button>
                </div>
                
                <button 
                  type="submit" 
                  :disabled="loading"
                  class="bg-gradient-to-r from-coral-600 to-orange-500 hover:from-coral-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ loading ? 'Updating...' : 'Update Post' }}
                </button>
              </div>
            </template>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../service/api';

const route = useRoute();
const router = useRouter();
const title = ref('');
const content = ref('');
const imageFile = ref(null);
const imagePreview = ref('');
const loading = ref(false);
const error = ref('');
const userId = ref('');

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    userId.value = res.data._id;
  } catch (err) {
    userId.value = '';
  }
};

const fetchPost = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.get(`/posts/${route.params.id}`);
    const post = res.data.data || res.data;
    
    // Check if user owns the post
    if (post.author && typeof post.author === 'object' && post.author._id !== userId.value) {
      error.value = 'You do not have permission to edit this post';
      setTimeout(() => router.push('/dashboard'), 2000);
      return;
    }
    
    title.value = post.title;
    content.value = post.content;
    imagePreview.value = post.image || '';
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch post';
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'Image size must be less than 10MB';
      return;
    }
    
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
    error.value = '';
  } else {
    imageFile.value = null;
    imagePreview.value = '';
  }
};

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    error.value = 'Please fill in all required fields';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('title', title.value.trim());
    formData.append('content', content.value.trim());
    if (imageFile.value) {
      formData.append('image', imageFile.value);
    }
    
    await api.put(`/posts/${route.params.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update post';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchProfile();
  await fetchPost();
});
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 0 8px 8px 0;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>