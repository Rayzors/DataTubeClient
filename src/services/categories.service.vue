<script>
export default {
  methods: {
    async getAllCategories() {
      const response = await fetch(
        'https://datatubeapi.kevinmanssat.fr/categories',
      );
      const datas = await response.json();

      return datas;
    },
  },
};
</script>
