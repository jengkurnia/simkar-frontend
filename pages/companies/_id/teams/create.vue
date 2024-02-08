<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Create Employee</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <form class="w-full card" @submit.prevent="createTeam">
      <div class="form-group">
        <label for="name" class="text-grey">Name</label>
        <input type="text" name="name" v-model="name" class="input-field" />
      </div>
      <div class="form-group">
        <label for="icon" class="text-grey">Icon</label>
        <input
          type="file"
          name="icon"
          class="input-field"
          @change="handleFileUpload"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
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
      name: '',
      icon: '',
    }
  },

  mounted() {
    this.getTeamData()
  },

  methods: {
    handleFileUpload(event) {
      this.icon = event.target.files[0]
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

    async createTeam() {
      try {
        const form = new FormData()
        form.append('name', this.name)
        form.append('icon', this.icon)

        const response = await this.$axios.post('/team', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response) {
          this.$router.push({
            name: 'companies-id-teams',
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
