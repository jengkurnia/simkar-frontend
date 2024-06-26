<template>
  <!-- Main Content -->
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
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
        <div class="text-[32px] font-semibold text-dark">Divisi</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full" @input="handleSearch">
          <input
            type="text"
            name=""
            id=""
            v-model="search"
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Cari Karyawan"
          />
        </form>
      </div>
    </section>

    <!-- Section Header -->
    <div class="mb-[30px]">
      <div
        class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
      >
        <div>
          <div class="text-xl font-medium text-dark"></div>
          <p class="text-grey"></p>
        </div>
      </div>
    </div>

    <!-- Teams Section -->
    <div class="pt-[50px]">
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Divisi</div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div
          v-for="employee in employees"
          :key="employee.id"
          v-if="selectedTeamIds.includes(employee.team_id)"
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
        >
          
          <img
            :src="
              employee.photo_url ??
              `/assets/images/${
                employee.gender === 'FEMALE' ? 'user-f' : 'user-m'
              }-${(employee.id % 4) + 1}.png`
            "
            width="70"
            alt=""
          />
          <div class="mt-6 mb-1 font-semibold text-center text-dark">
            {{ employee.name }}
          </div>
          <p class="text-center text-grey">{{ employee.position }}</p>

          <div class="mt-[30px] text-success flex items-center gap-[6px]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      employees: [],
      search: '',
      selectedTeamIds: [1, 2, 3],
    }
  },

  mounted() {
    this.fetchEmployeeData()
  },

  
  methods: {
    handleSearch() {
      this.fetchEmployeeData()
    },

    async fetchEmployeeData() {
      try {
        const company_id = this.$route.params.id
        const team_id = this.$route.query.team

        const response = await this.$axios.get('/employee', {
          params: {
            ...(this.search ? { name: this.search } : {}),
            company_id,
            ...(team_id ? { team_id } : {}),
          },
        })

        const newEmployeesData = response.data.data.data.map((emp) => {
          let tempPhotoUrl = emp.photo_url?.replace(/^\/storage/, '')
          const newPhotoUrl = `${this.$config.API_URL}/images/${tempPhotoUrl}`

          return {
            ...emp,
            photo_url: newPhotoUrl,
          }
        })

        this.employees = newEmployeesData
      } catch (error) {
        console.error('Error fetching employee data:', error)
      }
    },
  },
}
</script>
