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
        <div class="text-[32px] font-semibold text-dark">Pelanggaran</div>
      </div>
    </section>
    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark"></div>
            <p class="text-grey"></p>
          </div>

          <NuxtLink
            :to="{ name: 'companies-id-violation-create' }"
            class="btn btn-primary"
            >Tambah Data Pelanggaran</NuxtLink
          >
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-[30px]">

        <div class="items-center card !flex-row gap-4">
          <NuxtLink
            :to="{
              name: 'companies-id-violation-violationId',
              params: {
                violationId: 1,
              },
            }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></NuxtLink>
          <img src="/assets/svgs/ric-flag.svg" alt="" />
          <div>
            <div class="mb-1 font-semibold text-dark">Teguran Lisan</div>
            <p class="text-grey">
              {{ violations.find((v) => v.sp === 'TEGURAN LISAN')?.employee_count ?? 0 }}
              Karyawan
            </p>
          </div>
        </div>
        
        <div class="items-center card !flex-row gap-4">
          <NuxtLink
            :to="{
              name: 'companies-id-violation-violationId',
              params: {
                violationId: 2,
              },
            }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></NuxtLink>
          <img src="/assets/svgs/ric-flag.svg" alt="" />
          <div>
            <div class="mb-1 font-semibold text-dark">Surat Peringatan 1</div>
            <p class="text-grey">
              {{ violations.find((v) => v.sp === 'SPI')?.employee_count ?? 0 }}
              Karyawan
            </p>
          </div>
        </div>

        <div class="items-center card !flex-row gap-4">
          <NuxtLink
            :to="{
              name: 'companies-id-violation-violationId',
              params: {
                violationId: 3,
              },
            }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></NuxtLink>
          <img src="/assets/svgs/ric-flag.svg" alt="" />
          <div>
            <div class="mb-1 font-semibold text-dark">Surat Peringatan 2</div>
            <p class="text-grey">
              {{ violations.find((v) => v.sp === 'SPII')?.employee_count ?? 0 }}
              Karyawan
            </p>
          </div>
        </div>
        
        <div class="items-center card !flex-row gap-4">
          <NuxtLink
            :to="{
              name: 'companies-id-violation-violationId',
              params: {
                violationId: 4,
              },
            }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></NuxtLink>
          <img src="/assets/svgs/ric-flag.svg" alt="" />
          <div>
            <div class="mb-1 font-semibold text-dark">Surat Peringatan 3</div>
            <p class="text-grey">
              {{
                violations.find((v) => v.sp === 'SPIII')?.employee_count ?? 0
              }}
              Karyawan
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      violations: [],
    }
  },

  mounted() {
    this.fetchViolationStatistics()
  },

  methods: {
    handleSearch() {
      this.fetchViolationData()
    },

    async fetchViolationStatistics() {
      try {
        const company_id = this.$route.params.id
        const response = await this.$axios.get('violation/statistics', {
          params: {
            company_id,
          },
        })

        if (response) {
          this.violations = response.data.data
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
