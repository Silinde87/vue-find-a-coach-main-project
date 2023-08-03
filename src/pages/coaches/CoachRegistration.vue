<template>
  <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </div>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/registerCoach', formData);
        this.isLoading = false;
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
