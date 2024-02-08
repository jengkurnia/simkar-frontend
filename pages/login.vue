<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="/assets/images/dazzle-logo.png" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign In</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Manage your employees to achieve <br />
      a bigger goals for your company
    </p>
    <form class="w-full card" @submit.prevent="login">
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input type="email" class="input-field" v-model="email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <div class="w-full relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-field w-full"
            v-model="password"
          />
          <svg
            class="cursor-pointer h-6 w-6 text-gray-500 absolute right-4 top-3"
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
        Sign In
      </button>
    </form>
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
      }
    },
  },
}
</script>
