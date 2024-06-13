<template>
  <section class="flex flex-col items-center justify-center py-10 px-9">
    <div class="flex items-center gap-4">
      <form class="shrink md:w-[516px] w-full">
        <input
          type="text"
          name=""
          v-model="search"
          class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
          placeholder=""
        />
      </form>
    </div>
 
    <div class="text-[32px] font-semibold text-dark mt-20">
      Profil Pelanggaran
    </div>

    <div class="overflow-x-auto">
      <table class="w-full mt-20 border-2 border-collapse border-gray-400">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-3 text-center border border-gray-800">NIK</th>
            <th class="p-3 text-center border border-gray-800">Nama</th>
            <th class="p-3 text-center border border-gray-800">Posisi</th>
            <th class="p-3 text-center border border-gray-800">Pelanggaran</th>
            <th class="p-3 text-center border border-gray-800">Tanggal Pelanggaran</th>
            <th class="p-3 text-center border border-gray-800">Keterangan</th>
            <th class="p-3 text-center border border-gray-800">Cabang</th>
            <th class="p-3 text-center border border-gray-800" colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="violation in filteredViolations"
            :key="violation.id"
            class="bg-white"
          >
            <td class="p-3 text-center border border-gray-800">
              {{ violation.employees[0].nik }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ violation.employees[0].name }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ violation.employees[0].position }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              <template v-if="!violation.editingTypeViolation">
                {{ violation.typeviolation }}
              </template>
              <template v-else>
                <textarea
                  v-model="violation.typeviolation"
                  class="input-field"
                  style="width: 100%; height: 100px;"
                ></textarea>
              </template>
            </td>
            
            <td class="p-3 text-center border border-gray-800">
              <template v-if="!violation.editingDate">
                {{ violation.date }}
              </template>
              <template v-else>
                <input
                  type="date"
                  v-model="violation.date"
                  class="input-field"
                  style="width: 100%;"
                />
              </template>
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ violation.sp }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ violation.company_name }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              <button
                @click="editViolationData(violation.id)"
                class="px-4 py-2 text-white bg-green-500 rounded-md"
              >
                Ubah
              </button>
            </td>
            <td class="p-3 text-center border border-gray-800">
              <button
                @click="confirmDelete(violation.id)"
                class="px-4 py-2 text-white bg-red-500 rounded-md"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Pop-up -->
    <div v-if="editViolation" class="popup">
      <div class="popup-content">
        <span class="close" @click="closeForm">&times;</span>
        <h2 class="mb-3 text-lg font-semibold">Ubah Data Pelanggaran</h2>
        <form class="w-full" @submit.prevent="updateviolation">
          <div class="mb-3 form-group">
            <label for="employee_id" class="text-grey">Nama</label>
            <input
              disabled
              type="text"
              name="typeviolation"
              class="input-field"
              :value="editViolation.employees[0].name"
            />
          </div>

          <div class="mb-3 form-group">
            <label for="typeviolation" class="text-grey">Keterangan</label>
            <textarea
              name="typeviolation"
              v-model="editViolation.typeviolation"
              class="rounded-[24px] input-field"
            ></textarea>
          </div>

          <div class="mb-3 form-group">
            <label for="date" class="text-grey">Tanggal Pelanggaran</label>
            <input
              type="date"
              name="date"
              v-model="editViolation.date"
              class="input-field"
            />
          </div>

         <div class="mb-3 form-group">
            <label for="sp" class="text-grey">Pelanggaran</label>
            <select
              name="sp"
              v-model="editViolation.sp"
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
      </div>
    </div>
  </section>
</template>


<script>
export default {
  layout: 'form',

  data() {
    return {
      violations: [],
      search: '',
      company_data: [],
      employee_data: [],
      editViolation: null,
    }
  },

  mounted() {
    this.getDataFromApi()
    this.getCompanyData()
  },

  computed: {
    filteredViolations() {
      return this.violations.filter((v) =>
        v.employees[0].name.toLocaleLowerCase().includes(this.search)
      )
    },
  },

  methods: {
    async getDataFromApi() {
      try {
        const company_id = this.$route.params.id
        const violation_id = this.$route.params.violationId.toString()
        let sp = 'TEGURAN LISAN'

        switch (violation_id) {
          case '1':
            sp = 'TEGURAN LISAN'
            break
          case '2':
            sp = 'SPI'
            break
          case '3':
            sp = 'SPII'
            break
          case '4':
            sp = 'SPIII'
            break
        }

        const response = await this.$axios.get('/violation', {
          params: {
            company_id,
            sp,
          
          },
        })

        if (response) {
          this.violations = response.data.data
        }

        // Jika Anda ingin mengatur ulang editViolation setiap kali mendapatkan data baru, tambahkan baris berikut:
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    },

    // Fungsi untuk menutup formulir edit
    closeForm() {
      this.editViolation = null
    },

    async getCompanyData() {
      try {
        const response = await this.$axios.get('/company')
        if (response.data) {
          this.company_data = response.data.result.data
        }
      } catch (error) {
        console.error(error)
      }
    },

    async updateviolation() {
      try {
        if (this.editViolation && this.editViolation.id) {
          const response = await this.$axios.post(
            `/violation/update/${this.editViolation.id}`,
            {
              typeviolation: this.editViolation.typeviolation,
              sp: this.editViolation.sp,
              date: this.editViolation.date,
            }
          )

          if (response) {
            // Refresh data
            this.getDataFromApi()

            // Tutup formulir setelah berhasil mengupdate
            this.closeForm()
          }
        } else {
          console.error('ID tidak valid atau tidak ditemukan')
        }
      } catch (error) {
        console.error('Gagal mengedit data:', error)

        // Cetak informasi kesalahan dari respons
        if (error.response) {
          console.error('Response data:', error.response.data)
        }
      }
    },

    editViolationData(violationId) {
      // Dapatkan data violation berdasarkan ID dari violations
      const selectedViolation = this.violations.find(
        (v) => v.id === violationId
      )

      // Pastikan employees tidak kosong dan pilihannya ada
      if (
        selectedViolation.employees &&
        selectedViolation.employees.length > 0
      ) {
        // Setel editViolation dengan data violation yang dipilih
        this.editViolation = {
          ...selectedViolation,
        }
      } else {
        console.error('Data employees kosong atau tidak valid.')
      }
    },

    async deleteViolation(violationId) {
      try {
        const response = await this.$axios.delete(
          `/violation/delete/${violationId}`
        )

        if (response) {
          // Instead of reloading the entire page, you can remove the deleted employee from the local data
          this.violations = this.violations.filter(
            (violation) => violation.id !== violationId
          )

          // Tampilkan popup sukses (ganti dengan implementasi popup yang sesuai)
          alert('Data berhasil dihapus!')
        }
      } catch (error) {
        console.error('Gagal menghapus data violation:', error)

        // Tampilkan pesan kesalahan jika ada
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(
            `Gagal menghapus data violation: ${error.response.data.message}`
          )
        } else {
          alert('Terjadi kesalahan saat menghapus data violation.')
        }
      }
    },

    confirmDelete(violationId) {
      const isConfirmed = window.confirm(
        'Apakah Anda yakin ingin menghapus data ini?'
      )

      if (isConfirmed) {
        this.deleteViolation(violationId)
      }
    },
  },
}
</script>

<style>
/* Styles for the pop-up */
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.popup-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 800%;
  max-width: 400px;
  margin-top: 0px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
