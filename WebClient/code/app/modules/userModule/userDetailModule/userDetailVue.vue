<template src="./userDetailVue.template.html"></template>
<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                editMode: false,
                showNewUser: false,
                newEntity: null,
                userDetail: null,
                emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                searchUserResultsArray: [],
                designationList: [],
                campusList: [],
                newUserObject: {
                    response: {
                        "name": "",
                        "vwUserIdText": null,
                        "FirstName": "",
                        "LastName": "",
                        "EmailId": "",
                        "MobileNumber": "",
                        "UserPassword": "",
                        "Repassword": "",
                        "PayrollId": "",
                        "NickName": "",
                        "ProfileImage": null,
                        "deviceIds": {
                            apps: {
                                Android: [],
                                IOS: [],
                                Web: [],
                                Email: [],
                                SMS: []
                            }
                        },
                        "CampusId": null,
                        "DesignationId": null,
                        "ReportingManagerId": "",
                        "ReportingManagerName": ""
                    }
                },
                phoneNumberRegEx: /^\d{10}$/
            }
        },
        methods: {
            deleteUser: function () {
            },
            editUser: function () {
                this.editMode = !this.editMode;
            },
            saveUser: function () {
                let vm = this;
                let userDetail = vm.userDetail.response;

                if (!vm.emailRegEx.test(userDetail.EmailId)) {
                    //console.log("Invalid email");
                    vm.$store.dispatch("toastr", { type: "error", message: "Please enter valid E-mail Id", header: "Email" });
                    return;
                }
                else if (userDetail.vwUserIdText == null && userDetail.UserPassword.toLowerCase() !== userDetail.Repassword.toLowerCase()) {
                    //console.log("Password not match");
                    vm.$store.dispatch("toastr", { type: "error", message: "New Password and confirm password should match", header: "Password mismatch" });
                    return;
                } 
                else if (vm.userDetail.response.MobileNumber != "" && vm.userDetail.response.MobileNumber != null && (isNaN(Number(vm.userDetail.response.MobileNumber)) || !vm.phoneNumberRegEx.test(vm.userDetail.response.MobileNumber))) {
                    vm.$store.dispatch("toastr", { type: "error", message: "Please enter valid mobile number", header: "Validation" });
                    return;
                }

                let userObject = {
                    name: vm.userDetail.response.FirstName + " " + vm.userDetail.response.LastName,
                    type: vm.userDetail.response.type,
                    vwUserIdText: vm.userDetail.response.vwUserIdText,
                    firstName: vm.userDetail.response.FirstName,
                    lastName: vm.userDetail.response.LastName,
                    nickName: vm.userDetail.response.NickName,
                    email: vm.userDetail.response.EmailId,
                    mobileNumber: vm.userDetail.response.MobileNumber,
                    password: vm.userDetail.response.UserPassword,
                    profileImage: vm.userDetail.response.ProfileImage,
                    payrollId: vm.userDetail.response.PayrollId,
                    deviceIds: vm.userDetail.response.deviceIds,
                    reportingManagerId: vm.userDetail.response.ReportingManagerId,
                    designationId: vm.userDetail.response.DesignationId,
                    campusId: vm.userDetail.response.CampusId
                };

                vm.$store.dispatch("dataRequestHandler", {
                    "key": "CreateUser", "params": userObject, "callback": function (err, response) {
                        //console.log(response);
                        if (err) {
                            return;
                        }

                        vm.userDetail = $.extend(true, {}, vm.newUserObject);
                        window.location.href = vm.$store.state.uiPageName + "#users";
                    }
                });

            },
            getUserDetail: function () {
                let self = this;
                if (this.userId != 0) {
                    this.$store.dispatch("dataRequestHandler", {
                        "key": "GetUserDetail", "params": { "vwUserId": this.userId }, "callback": function (err, response) {
                            //console.log(response);
                            if (err) {
                                return;
                            }

                            self.userDetail = { "response": response[0][0] };
                        }
                    });
                }
                else {
                    self.userDetail = $.extend(true, {}, self.newUserObject);
                }

                //get Designation and Campus List
                let vm = this;

                this.designationList.splice(0, this.designationList.length);
                this.campusList.splice(0, this.campusList.length);

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetDesignationList",
                    params: {},
                    callback: (err, response) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        if (Array.isArray(response)) {
                            vm.designationList.splice(0, vm.designationList.length, ...response);
                        }
                    }
                });

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetCampusList",
                    params: {},
                    callback: (err, response) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        if (Array.isArray(response)) {
                            vm.campusList.splice(0, vm.campusList.length, ...response);
                        }
                    }
                });
            },
            //assign user to role
            onUserSearch(options) {
                let that = this;
                that.$store.dispatch("dataRequestHandler", {
                    key: "SearchUsers",
                    params: {
                        query: options.query
                    },
                    callback: (err, response) => {
                        if (Array.isArray(response)) {
                            this.searchUserResultsArray.splice(0, Infinity, ...response[0]);
                        }
                    }
                });
            },
            toggleUserSearch(instruction) {
                let showUserSearch = typeof instruction === "boolean" ? instruction : false;
                if (!showUserSearch) {
                    this.searchUserResultsArray.splice(0);
                }
            },
            assignUserToRole(selectedUserInstance) {
                //console.log(selectedUserInstance);
                this.userDetail.response.ReportingManagerId = selectedUserInstance.vwUserIdText;
            },
        },
        computed: {
            userId() {
                let userId = this.$store.state.selectedUserDetail.userId;
                return userId;
            },
            // isValidEmail() {
            //     if (this.userDetail && this.userDetail.response && this.userDetail.response.firstName != "") {
            //         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //         return re.test(this.userDetail.response.EmailId);
            //     }
            //     return true;
            // }
        },
        mounted() {
            //console.log("user detail");
            this.getUserDetail();
        },
        watch: {
            userId: function (value) {
                //console.log(this.userId);
                this.getUserDetail()
            }
        }
    }

</script>