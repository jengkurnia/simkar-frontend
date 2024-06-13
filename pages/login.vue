<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="/assets/images/dazzle-logo.png" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Masuk</div>
   


    <form class="w-full card" @submit.prevent="login">
      <div class="form-group">
        <label for="" class="text-grey">Email</label>
        <input type="email" class="input-field" v-model="email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Kata Sandi</label>
        <div class="relative w-full">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="w-full input-field"
            v-model="password"
          />
          <svg
            class="absolute w-6 h-6 text-gray-500 cursor-pointer right-4 top-3"
            @click="toggleShowPassword"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 12s3 5.5 10 5.5S22 12 22 12"
            ></path>
          </svg>
        </div>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Masuk
      </button>
    </form>

    <div v-if="showErrorPopup" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
  <div class="flex flex-col items-center w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
    <div class="mb-4 text-6xl font-bold text-red-500">
      !
    </div>
        <div class="mb-4 text-gray-700">
          {{ errorMessage }}
        </div>
        <button @click="closeErrorPopup" class="w-full btn btn-primary">
          OK
        </button>
      </div>
    </div>


  </section>
</template>

<script>
export default {
  components: {},
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      showErrorPopup: false, 
      errorMessage: '', 
    }
  },

  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },

    async login() {
    try {
      const response = await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      })
      if (response) {
        this.$router.push({ path: '/' })
      }
    } catch (err) {
      console.error(err)
      this.errorMessage = 'Email atau password yang anda masukkan salah !' 
      this.showErrorPopup = true 
    }
  },

  closeErrorPopup() {
    this.showErrorPopup = false
  }
},
}
</script>
