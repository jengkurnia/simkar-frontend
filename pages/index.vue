<template>
  <section class="py-[200px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-4">Pilih Cabang</div>
    <div class="w-full card">
      <div class="form-group">
        <label for="" class="text-grey">Cabang</label>

        <p v-if="$fetchState.pending">Mengambil cabang...</p>
        <select
          v-else
          v-model="selectedCompany"
          name="companies"
          id=""
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option
            v-bind:key="company.id"
            :value="company.id"
            v-for="company in companies.data.result.data"
          >
            {{ company.name }}
          </option>
        </select>
      </div>
      <button
        @click="openCompany()"
        type="button"
        class="w-full btn btn-primary mt-[14px]"
      >
        Selanjutnya
      </button>
      <div class="text-center">atau</div>
      <NuxtLink
        :to="{ name: 'companies-create' }"
        class="w-full border btn btn-white"
      >
        Buat Cabang Baru
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      companies: [],
      selectedCompany: '',
    }
  },
  async fetch() {
    const data = await this.$axios.get('/company?limit=100')
    this.companies = data
  },
  methods: {
    openCompany() {
      this.$router.push({
        name: 'companies-id',
        params: {
          id: this.selectedCompany,
        },
      })
    },
  },
}
</script>
