<template>
  <section class="flex flex-col items-center justify-center py-10 px-9">
    <div class="flex items-center gap-4">
      <form class="shrink md:w-[516px] w-full" @submit.prevent="handleSearch">
        <input
          type="text"
          name=""
          id=""
          v-model="search"
          class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
          placeholder=""
        />
      </form>
    </div>

    <div class="text-[32px] font-semibold text-dark mt-20">Profil Karyawan</div>

    <div v-if="!showPopup" class="overflow-x-auto">
      <table class="w-full mt-20 border-2 border-collapse border-gray-400">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-3 text-center border border-gray-800">Nama</th>
            <th class="p-3 text-center border border-gray-800">NIK</th>
            <th class="p-3 text-center border border-gray-800">Email</th>
            <th class="p-3 text-center border border-gray-800">
              Jenis Kelamin
            </th>
            <th class="p-3 text-center border border-gray-800">Umur</th>
            <th class="p-3 text-center border border-gray-800">Alamat</th>
            <th class="p-3 text-center border border-gray-800">Pendidikan</th>
            <th class="p-3 text-center border border-gray-800">
              Nomor Telepon
            </th>
            <th class="p-3 text-center border border-gray-800">
              Tanggal Masuk
            </th>
            <th class="p-3 text-center border border-gray-800">
              Periode Kerja
            </th>
            <th class="p-3 text-center border border-gray-800">Posisi</th>
             <th class="p-3 text-center border border-gray-800">Peningkatan Posisi</th>
            <th class="p-3 text-center border border-gray-800">Divisi</th>
            <th class="p-3 text-center border border-gray-800">Cabang</th>
            <th class="p-3 text-center border border-gray-800" colspan="2"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(employee, index) in data.data || []"
            :key="employee.id"
            class="bg-white"
          >
            <td class="p-3 text-center border border-gray-800">
              {{ employee.name }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.nik }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.email }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{  employee.gender | formatGender }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.age }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.address }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.education }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.phone }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.date_entry }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.year_service }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ employee.position }}
            </td>
             <td class="p-3 text-center border border-gray-800">
              {{ employee.promotion }}
            </td>

            <td class="p-3 text-center border border-gray-800">
              {{ getTeamName(employee.team_id) }}
            </td>
            <td class="p-3 text-center border border-gray-800">
              {{ getCompanyName(employee.company_id) }}
            </td>

            <td class="p-3 text-center border border-gray-800">
              <button
                @click="editEmployee = employee"
                class="px-4 py-2 text-white bg-green-500 rounded-md"
              >
                Ubah
              </button>
            </td>
            <td class="p-3 text-center border border-gray-800">
              <button
                @click="confirmDelete(employee.id)"
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

    <div v-if="editEmployee" class="popup">
      <div class="popup-content">
        <span class="close" @click="closeForm">&times;</span>
        <h2 class="my-6 text-3xl font-semibold text-dark">Ubah</h2>

        <form @submit.prevent="updateEmployee" class="mt-4">
          <div class="mb-4 form-group">
            <label for="name" class="text-grey">Nama</label>
            <input
              type="text"
              name="name"
              v-model="editEmployee.name"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="nik" class="text-grey">NIK</label>
            <input
              type="text"
              name="nik"
              v-model="editEmployee.nik"
              class="input-field"
            />
          </div>

          <div class="mb-4 form-group">
            <label for="email" class="text-grey">Email</label>
            <input
              type="email"
              name="email"
              v-model="editEmployee.email"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="gender" class="text-grey">Jenis Kelamin</label>
            <select
              name="gender"
              v-model="editEmployee.gender"
              class="appearance-none input-field form-icon-chevron_down"
            >
              <option value="MALE" selected>Laki-laki</option>
              <option value="FEMALE">Perempuan</option>
            </select>
          </div>
          <div class="mb-4 form-group">
            <label for="age" class="text-grey">Umur</label>
            <input
              type="number"
              name="age"
              v-model="editEmployee.age"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="address" class="text-grey">Alamat</label>
            <input
              type="text"
              name="address"
              v-model="editEmployee.address"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="education" class="text-grey">Pendidikan</label>
            <input
              type="text"
              name="education"
              v-model="editEmployee.education"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="phone" class="text-grey">Nomor Telepon</label>
            <input
              type="text"
              name="phone"
              v-model="editEmployee.phone"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="date_entry" class="text-grey">Tanggal Masuk</label>
            <input
              type="date"
              name="date_entry"
              v-model="editEmployee.date_entry"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="year_service" class="text-grey">Periode Kerja</label>
            <input
              type="date"
              name="year_service"
              v-model="editEmployee.year_service"
              class="input-field"
            />
          </div>
          <div class="mb-4 form-group">
            <label for="position" class="text-grey">Posisi</label>
            <input
              type="text"
              name="position"
              v-model="editEmployee.position"
              class="input-field"/>
          </div>

           <div class="mb-4 form-group">
            <label for="promotion" class="text-grey">Peningkatan Posisi</label>
            <input
              type="text"
              name="promotion"
              v-model="editEmployee.promotion"
              class="input-field"/>
          </div>

          <div class="mb-4 form-group">
            <label for="team_id" class="text-grey">Divisi</label>
            <select
              name="team_id"
              v-model="editEmployee.team_id"
              class="appearance-none input-field form-icon-chevron_down"
            >
              <option v-for="team in team_data" :value="team.id">
                {{ team.name }}
              </option>
            </select>
          </div>

          <div class="mb-4 form-group">
            <label for="company_id" class="text-grey">Cabang</label>
            <select
              name="company_id"
              v-model="editEmployee.company_id"
              class="appearance-none input-field form-icon-chevron_down"
            >
              <option v-for="company in company_data" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>

          <button
            type="submit"
            class="px-4 py-2 text-white bg-red-500 rounded-md"
          >
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
      team_data: [],
      search: '',
      company_data: [],
      layout: 'form',
      data: {},
      editEmployee: null,
      form: {
        name: '',
        nik: '',
        email: '',
        gender: '',
        age: '',
        address: '',
        education: '',
        phone: '',
        date_entry: '',
        year_service: '',
        position: '',
        promotion: '',
        team_id: '',
        company_id: '',
      },
    }
  },

   filters: {
    formatGender(gender) {
      return gender === 'MALE' ? 'LAKI-LAKI' : gender === 'FEMALE' ? 'PEREMPUAN' : gender;
    }
  },

  mounted() {
    // Panggil fungsi untuk mengambil data dari API saat komponen dimuat
    this.getDataFromApi()
    this.getTeamData()
    this.getCompanyData()
  },
  methods: {
   
  

    handleSearch() {
      this.getDataFromApi()
    },


    formatGender(gender) {
    return gender === 'MALE' ? 'LAKI-LAKI' : gender === 'FEMALE' ? 'PEREMPUAN' : gender;
  },

    async getDataFromApi() {
      try {
        const company_id = this.$route.params.id
        // ambil data employee
        const response = await this.$axios.get('/employee', {
          params: {
            ...(this.search ? { name: this.search } : {}),
            company_id,
          },
        })
        // Assign data dari API ke properti data
        this.data = response.data.data
      } catch (error) {
        console.error('Gagal mengambil data dari API:', error)
      }
    },

    async updateEmployee() {
      try {
        const response = await this.$axios.post(
          `http://localhost:8000/api/employee/update/${this.editEmployee.id}`,
          this.editEmployee
        )

        // Update data langsung dari API
        await this.getDataFromApi()

        // Menutup formulir penyuntingan
        this.closeForm()

        // Tampilkan popup sukses (ganti dengan implementasi popup yang sesuai)
        alert('Data berhasil diperbarui!')
      } catch (error) {
        console.error('Gagal mengedit data karyawan:', error)

        // Tampilkan pesan kesalahan jika ada
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(`Gagal mengedit data karyawan: ${error.response.data.message}`)
        } else {
          alert('Terjadi kesalahan saat mengedit data karyawan.')
        }
      }
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

    getCompanyName(companyId) {
      const company = this.company_data.find(
        (company) => company.id === companyId
      )
      return company ? company.name : 'N/A' // Tampilkan 'N/A' jika tidak ada data perusahaan
    },

    async getTeamData() {
      try {
        const response = await this.$axios.get('/team')
        if (response.data) {
          this.team_data = response.data.result.data
        }
      } catch (error) {
        console.error(error)
      }
    },

    getTeamName(teamId) {
      const team = this.team_data.find((team) => team.id === teamId)
      return team ? team.name : 'N/A' // Tampilkan 'N/A' jika tidak ada data perusahaan
    },

    confirmDelete(employeeId) {
      const isConfirmed = window.confirm(
        'Apakah Anda yakin ingin menghapus data ini?'
      )

      if (isConfirmed) {
        this.deleteEmployee(employeeId)
      }
    },

    async deleteEmployee(employeeId) {
      try {
        await this.$axios.delete(
          `http://localhost:8000/api/employee/delete/${employeeId}`
        )

        // Instead of reloading the entire page, you can remove the deleted employee from the local data
        this.data.data = this.data.data.filter(
          (employee) => employee.id !== employeeId
        )

        // Tampilkan popup sukses (ganti dengan implementasi popup yang sesuai)
        alert('Data berhasil dihapus!')
      } catch (error) {
        console.error('Gagal menghapus data karyawan:', error)

        // Tampilkan pesan kesalahan jika ada
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(`Gagal menghapus data karyawan: ${error.response.data.message}`)
        } else {
          alert('Terjadi kesalahan saat menghapus data karyawan.')
        }
      }
    },

    showEditForm(employee) {
      this.editEmployee = { ...employee } // Clone the employee object to avoid two-way binding issues
      document.body.style.overflow = 'hidden' // overflow: hidden pada elemen body
    },
    closeForm() {
      this.editEmployee = null

      document.body.style.overflow = '' // Kembalikan overflow ke nilai semula
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
  overflow: auto;
}

.popup-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 500%;
  max-width: 800px;
  overflow: auto;
  margin-top: 500px;
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
