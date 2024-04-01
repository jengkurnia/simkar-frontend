<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Divisi</div>
   
    <form class="w-full card" @submit.prevent="createTeam">
      <div class="form-group">
        <label for="name" class="text-grey">Nama</label>
        <input type="text" name="name" v-model="name" class="input-field" />
      </div>
      <div class="form-group">
        <label for="icon" class="text-grey">Ikon</label>
        <input
          type="file"
          name="icon"
          class="input-field"
          @change="handleFileUpload"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Selanjutnya
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
