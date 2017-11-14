<template src="./userChangePasswordVue.template.html"></template>
<script>
    export default {
        data() {
            return {
                UserPassword: "",
                Repassword: "",
                CurrentPassword: ""
            }
        },
        methods: {
            updatePassword: function () {
                let vm = this;
                if (vm.CurrentPassword == null || vm.CurrentPassword == "") {
                    // console.log("Current Password is empty");
                    vm.$store.dispatch("toastr", {type: "error", message: "Current Password should not empty", header: "Password is required"});
                    return;
                }
                else if (vm.UserPassword == "" || vm.Repassword == "") {
                    //console.log("Current Password is empty");
                    vm.$store.dispatch("toastr", {type: "error", message: "New Password and confirm password should not empty", header: "Password is required"});
                    return;
                }
                else if (vm.UserPassword !== null && vm.UserPassword !== "" && vm.UserPassword.toLowerCase() !== vm.Repassword.toLowerCase()) {
                    vm.$store.dispatch("toastr", {type: "error", message: "New Password and confirm password should match", header: "Password mismatch"});
                    //console.log("Password not match");
                    return;
                }

                let userObject = {
                    CurrentPassword: vm.CurrentPassword,
                    Password: vm.UserPassword
                };

                vm.$store.dispatch("dataRequestHandler", {
                    "key": "UpdatePassword", "params": userObject, "callback": function (err, response) {
                        //console.log(response);
                        if (err) {
                            return;
                        }
                        if(response.recordsets[0] && response.recordsets[0][0] && response.recordsets[0][0]["ErrorMessage"] != ""){
                            vm.$store.dispatch("toastr", {type: "error", message: response.recordsets[0][0]["ErrorMessage"], header: "Password match"});
                            return;
                        }
                        vm.$store.dispatch("toastr", {type: "success", message: "Password changed successfully", header: "Success"});
                        window.location.href = vm.$store.state.uiPageName + "#userProfile";
                    }
                });

            }
        },
        computed: {
            // userId() {
            //     let userId = this.$store.state.selectedUserDetail.userId;               
            //     return userId;
            // }
        },
        mounted() {

        },
        watch: {
            userId: function (value) {
                //console.log(this.userId);
            }
        }
    }

</script>