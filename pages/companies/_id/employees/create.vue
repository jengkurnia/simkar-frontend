<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Create Employee</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <form
      class="w-full card"
      @submit.prevent="createEmployee"
      enctype="multipart/form-data"
    >
      <div class="form-group">
        <label for="name" class="text-grey">Name</label>
        <input
          type="text"
          name="name"
          v-model="form.name"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="nik" class="text-grey">NIK</label>
        <input type="text" name="nik" v-model="form.nik" class="input-field" />
      </div>

      <div class="form-group">
        <label for="email" class="text-grey">Email Address</label>
        <input
          type="email"
          name="email"
          v-model="form.email"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="gender" class="text-grey">Gender</label>
        <select
          name="gender"
          v-model="form.gender"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option value="MALE" selected>Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age" class="text-grey">Age</label>
        <input
          type="number"
          name="age"
          v-model="form.age"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="address" class="text-grey">Address</label>
        <input
          type="text"
          name="address"
          v-model="form.address"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="education" class="text-grey">Education</label>
        <input
          type="text"
          name="education"
          v-model="form.education"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="phone" class="text-grey">Phone</label>
        <input
          type="text"
          name="phone"
          v-model="form.phone"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="date_entry" class="text-grey">Date Entry</label>
        <input
          type="date"
          name="date_entry"
          v-model="form.date_entry"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="year_service" class="text-grey">Year Service</label>
        <input
          type="date"
          name="year_service"
          v-model="form.year_service"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="position" class="text-grey">Position</label>
        <input
          type="text"
          name="position"
          v-model="form.position"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="team_id" class="text-grey">Team</label>
        <select
          name="team_id"
          v-model="form.team_id"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option v-for="team in team_data" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="company_id" class="text-grey">Company</label>
        <select
          name="company_id"
          v-model="form.company_id"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option v-for="company in company_data" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="photo" class="text-grey">Photo</label>
        <input
          type="file"
          name="photo"
          class="input-field"
          @change="handleFileUpload"
        />
      </div>

      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Submit
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
      team_data: [],
      company_data: [],
      form: {
        name: '',
        nik: '',
        email: '',
        gender: 'MALE',
        age: 0,
        address: '',
        education: '',
        phone: '',
        date_entry: '',
        year_service: 0,
        position: '',
        team_id: '',
        company_id: '',
      },
      photo: null,
    }
  },

  mounted() {
    this.getTeamData()
    this.getCompanyData()
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.photo = file
    },

    async getTeamData() {
      try {
        const company_id = this.$route.params.id
        console.log(company_id)
        const response = await this.$axios.get('/team', {
          params: {
            company_id,
          },
        })

        if (response.data) {
          this.team_data = response.data.result.data
        }
      } catch (error) {
        console.error(error)
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

    async createEmployee() {
      try {
        let form = new FormData()

        for (let key in this.form) {
          form.append(key, this.form[key])
        }

        form.append('photo', this.photo)

        const response = await this.$axios.post('/employee', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response) {
          this.form = {
            /* nilai default */
          }
          this.$router.push({
            name: 'companies-id',
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
