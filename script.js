const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    ID: '',
    Name: '',
    age: '',
    number: '',
    adress: '',
    dataList: [],
    headers: [
      { text: 'ID', value: 'ID' },
      { text: '名前', value: 'Name' },
      { text: '年齢', value: 'age' },
      { text: '郵便番号', value: 'number' },
      { text: 'アドレス', value: 'adress' },
      { text: 'アクション', value: 'actions', sortable: false }
    ],
    loading: false,
    error: null,
    dialogNew: false,
    dialogUpdate: false
  },
  methods: {
    addData: async function() {
      if (!this.ID || isNaN(this.ID)) {
        console.log("IDに数値が入力されていません");
        return;
      }
      const param = {
        ID: this.ID,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      try {
        this.loading = true;
        const response = await axios.post('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/INSERT', param);
        console.log(response.data);
        this.readData();
        this.dialogNew = false;
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    readData: async function() {
      try {
        this.loading = true;
        const response = await axios.get('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/SELECT');
        console.log(response.data);
        this.dataList = response.data.List;
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    deleteData: async function(id) {
      try {
        this.loading = true;
        const response = await axios.delete(`https://m3h-ogasawarafunctionapi.azurewebsites.net/api/DELETE`, { data: { ID: id } });
        console.log(response.data);
        this.readData();
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    updateData: async function(id) {
      const param = {
        ID: id,
        Name: this.Name,
        age: this.age,
        number: this.number,
        adress: this.adress
      };
      try {
        this.loading = true;
        const response = await axios.put('https://m3h-ogasawarafunctionapi.azurewebsites.net/api/UPDATE', param);
        console.log(response.data);
        this.readData();
        this.dialogUpdate = false;
      } catch (error) {
        this.error = error;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    openUpdateDialog: function(item) {
      this.ID = item.ID;
      this.Name = item.Name;
      this.age = item.age;
      this.number = item.number;
      this.adress = item.adress;
      this.dialogUpdate = true;
    }
  }
});