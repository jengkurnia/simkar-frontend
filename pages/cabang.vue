<template>
  <section class="py-[200px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-4">Pilih Cabang</div>
    <div class="w-full card">
      <div class="form-group">
        <label for="" class="text-grey">Cabang</label>

        <p v-if="$fetchState.pending">Mengambil cabang...</p>
        <div v-else class="h-full"> <!-- Menambahkan ketinggian penuh pada container -->
          <div v-for="(company, index) in companies.data.result.data" :key="company.id">
            <button @click="selectCompany(company.id)" class="w-full btn btn-primary mt-[14px]">{{ company.name }}</button>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-[14px]">
        <button @click="cancel()" class="btn btn-secondary">Kembali</button>
        <NuxtLink :to="{ name: 'companies-create' }" class="border btn btn-white">Buat Cabang Baru</NuxtLink>
      </div>
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
    selectCompany(companyId) {
      this.$router.push({
        name: 'companies-id',
        params: {
          id: companyId,
        },
      })
    },
    cancel() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya
    },
  },
}
</script>

<style scoped>
/* Gaya untuk tombol perusahaan bulat */
.rounded-full {
  border-radius: 9999px;
}
</style>
