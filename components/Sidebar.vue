<template>
  <!-- Sidebar -->
  <div
    class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <a href="#" class="flex justify-center">
          <img src="/assets/images/dazzle-logo.png" alt="" />
        </a>
        <a href="#" id="toggleCloseSidebar" class="lg:hidden">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </a>
      </div>
      <div class="flex flex-col gap-4">
        <NuxtLink :to="{ name: 'companies-id' }" class="nav-link">
          <img src="/assets/svgs/ic-users.svg" alt="" />
          Karyawan
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies-id-teams' }" class="nav-link">
          <img src="/assets/svgs/ic-briefcase.svg" alt="" />
          Divisi
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies-id-violation' }" class="nav-link">
          <img src="/assets/svgs/ic-flag.svg" alt="" />
          Pelanggaran
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Lainnya</div>

        <NuxtLink :to="{ name: 'cabang' }" class="nav-link">
          <img src="/assets/svgs/ic-grid.svg" alt="" />
          Cabang
        </NuxtLink>

        <NuxtLink :to="{ name: 'companies-id-settings' }" class="nav-link">
          <img src="/assets/svgs/ic-settings.svg" alt="" />
          Pengaturan
        </NuxtLink>

        <button class="nav-link" @click="confirmLogout">
          <img src="/assets/svgs/ic-signout.svg" alt="" />
          Keluar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async confirmLogout() {
      const confirmLogout = confirm('Kamu yakin ingin keluar?')
      this.login.email = ''
      this.login.password = ''
      if (confirmLogout) {
        await this.logout()
      }
    },

    async logout() {
      try {
        await this.$auth.logout()

        // Clear the token data from local storage or wherever it is stored
        this.$auth.reset()

        // Redirect to the login page
        this.$router.push('/login')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    },
  },
}
</script>
