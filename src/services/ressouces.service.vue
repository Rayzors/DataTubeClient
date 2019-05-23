<script>
export default {
  methods: {
    async getRessouces(countryID, categoryID, subscriberRange) {
      const response = await fetch(
        `https://datatubeapi.kevinmanssat.fr/ressources/country/${countryID}/category/${categoryID}/subscribers/${subscriberRange}`,
      );
      const datas = await response.json();

      return datas;
    },
  },
};
</script>
