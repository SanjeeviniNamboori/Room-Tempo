<template src="./reservationListVue.template.html"></template>
<script>
export default {
  name: "reservationListComponent",
  props: [],
  data() {
    return {
      reservationList: [
        {
          GuestName: "Washington George",
          StartDate: "Oct 22",
          Adults: "2",
          Children: "1",
          EndDate: "Oct 27",
          Nights: "5",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "123.00",
          Status: "Confirmed"
        },
        {
          GuestName: "Clinton B.",
          StartDate: "Oct 24",
          Adults: "1",
          Children: "2",
          EndDate: "Oct 25",
          Nights: "3",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "249.00",
          Status: "Reserved"
        },
        {
          GuestName: "Jefferson Thomas",
          StartDate: "Oct 27",
          Adults: "3",
          Children: "1",
          EndDate: "Oct 29",
          Nights: "2",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "850.00",
          Status: "Cancelled"
        },
        {
          GuestName: "Trump Donald",
          StartDate: "Oct 26",
          Adults: "2",
          Children: "3",
          EndDate: "Oct 27",
          Nights: "6",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "5823.00",
          Status: "Departed"
        },
        {
          GuestName: "John Trump",
          StartDate: "Oct 25",
          Adults: "1",
          Children: "1",
          EndDate: "Oct 27",
          Nights: "7",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "124.00",
          Status: "In House"
        },
        {
          GuestName: "Jackson Michel",
          StartDate: "Oct 21",
          Adults: "3",
          Children: "2",
          EndDate: "Oct 21",
          Nights: "1",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "145.00",
          Status: "Confirmed"
        },
        {
          GuestName: "Michel David",
          StartDate: "Oct 23",
          Adults: "2",
          Children: "1",
          EndDate: "Oct 23",
          Nights: "5",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "745.00",
          Status: "Reserved"
        },
        {
          GuestName: "Washington George",
          StartDate: "Oct 22",
          Adults: "3",
          Children: "3",
          EndDate: "Oct 27",
          Nights: "4",
          Unit: "143N-503",
          UnitType: "3 BR",
          Amount: "621.00",
          Status: "Departed"
        }
      ],
      headerColumnList: {
        GuestName: {
          Label: "Guest Name",
          IsChecked: true,
          ColumnName: "GuestName"
        },
        StartDate: { Label: "Stay", IsChecked: true, ColumnName: "StartDate" },
        // EndDate: { Label: "", IsChecked: true, ColumnName: "EndDate" },
        Unit: { Label: "Unit", IsChecked: true, ColumnName: "Unit" },
        Status: { Label: "Status", IsChecked: false, ColumnName: "Status" },
        Amount: { Label: "Amount", IsChecked: true, ColumnName: "Amount" }
      },
      listType: "list",
      RowsPerPage: 10,
      totalCount: 0
    };
  },
  methods: {
    createNewInstance: function() {
      let uiPageName = this.$store.state.uiPageName;
      window.location.href = uiPageName + "#user/0";
    },
    getData: function() {
      //call action to get data
      let self = this;
      this.$store.dispatch("dataRequestHandler", {
        key: "GetUserList",
        params: {},
        callback: function(err, response) {
          self.userList = response[0];
        }
      });
    },
    editParentInstance: function() {
      window.location.href =
        this.$store.state.uiPageName +
        "#client/" +
        this.clientId +
        "/entity/" +
        this.entityId +
        "/edit";
    },
    editUser: function(userObj) {
      //console.log(userObj);
      window.location.href =
        this.$store.state.uiPageName + "#user/" + userObj.vwUserIdText;
    },
    switchView() {
      if (this.listType == "list") this.listType = "card";
      else this.listType = "list";
    },
    /* Method to call node API to write data to excel sheet and download it */
    exportToExcel() {
      // creating a dynamic form to send values to backend route. More DOM elements can be added here //
      var form = document.createElement("form");
      var filename = document.createElement("input");
      var modulename = document.createElement("input");
      form.method = "POST";
      form.action = this.$store.state.reportHttpUrl + "/exportToExcel";
      filename.value = "reservation";
      filename.name = "filename";
      filename.hidden = true;
      form.appendChild(filename);
      modulename.value = "reservations";
      modulename.name = "modulename";
      modulename.hidden = true;
      form.appendChild(modulename);
      document.body.appendChild(form);
      form.submit();
    }
    /* Method to call node API to write data to excel sheet and download it */
  },
  computed: {},
  watch: {
    // clientId: function (value) {
    //     this.getData();
    // }
  },
  mounted() {
    //this.getData();
    console.log("Reservations mount");
  }
};
</script>