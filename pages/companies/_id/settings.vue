<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </a>
        <div class="text-[32px] font-semibold text-dark">Pengaturan</div>
      </div>
      <br />
    </section>

    <div class="pt-[50px] flex justify-center items-center">
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div class="card">
            <div class="text-xl font-medium text-dark">Ganti Kata Sandi</div>
            <form
              class="w-[400px] flex flex-col gap-y-4"
              @submit.prevent="changePassword"
            >
              <div class="form-group">
                <label for="current-password" class="text-grey"
                  >Kata Sandi Sekarang</label
                >
                <input
                  type="password"
                  name="current-password"
                  class="input-field"
                  v-model="currentPassword"
                />
              </div>
              <div class="form-group">
                <label for="name" class="text-grey">Kata Sandi Baru</label>
                <input
                  type="password"
                  name="new-password"
                  class="input-field"
                  v-model="newPassword"
                />
              </div>
              <div class="form-group">
                <label for="name" class="text-grey"
                  >Konfirmasi Kata Sandi Baru</label
                >
                <input
                  type="password"
                  name="new-password-confirm"
                  class="input-field"
                  v-model="newPasswordConfirm"
                />
              </div>
              <button type="submit" class="w-full btn btn-primary mt-[14px]">
                Simpan
              </button>
            </form>
            <p v-if="updateSuccess">Ubah Kata Sandi Berhasil</p>
            <p class="text-red-500" v-if="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      error: '',
      updateSuccess: false,
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    }
  },
  methods: {
    async changePassword() {
      try {
        const response = await this.$axios.put('/update-password', {
          old_password: this.currentPassword,
          new_password: this.newPassword,
          confirm_password: this.newPasswordConfirm,
        })

        if (response) {
          this.updateSuccess = true
          this.error = null
        }
      } catch (error) {
        this.error = error.response.data.message
        this.updateSuccess = false
      }
    },
  },
}
</script>
