<script>
export default {
  methods: {
    async getAllRegions() {
      const response = await fetch(
        'https://datatubeapi.kevinmanssat.fr/regions',
      );
      const datas = await response.json();

      return datas;
    },
  },
};
</script>
