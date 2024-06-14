<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah  Data Pelanggaran</div>
   
    <form
      class="w-full card"
      @submit.prevent="submitViolation"
      enctype="multipart/form-data"
    >

      <div class="form-group">
        <label for="employee_id" class="text-grey">Nama</label>
        <select
          name="employee_id"
          v-model="form.employee_id"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option v-for="employee in employee_data" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="typeviolation" class="text-grey">Keterangan</label>
        <textarea
          name="typeviolation"
          v-model="form.typeviolation"
          class="rounded-[24px] input-field"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="date" class="text-grey">Tanggal Pelanggaran</label>
        <input
          type="date"
          name="date"
          v-model="form.date"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="sp" class="text-grey">Pelanggaran</label>
        <select
          name="sp"
          v-model="form.sp"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option value="TEGURAN LISAN">TEGURAN LISAN</option>
          <option value="SPI">SPI</option>
          <option value="SPII">SPII</option>
          <option value="SPIII">SPIII</option>
        </select>
      </div>

      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Simpan
      </button>
    </form>
  </section>
</template>


<script>
export default {
  layout: 'form',
  middleware: 'auth',

  data() {
    return {
      employee_data: [],
      company_data: [],
      form: {
        employee_id: '',
        typeviolation: '',
        sp: '',
        date: '',
      },
    }
  },

  mounted() {
    this.getEmployeeData()
  },

  methods: {
    async getEmployeeData() {
      try {
        const company_id = this.$route.params.id
        const response = await this.$axios.get(`/employee`, {
          params: {
            company_id,
          },
        })

        if (response.data) {
          this.employee_data = response.data.data.data
        }
      } catch (error) {
        console.error('Error fetching employee data:', error)
      }
    },

    async submitViolation() {
      try {
        const response = await this.$axios.post('/violation', {
          ...this.form,
        })

        if (response) {
          this.form = {}
          this.$router.push({
            name: 'companies-id-violation',
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
