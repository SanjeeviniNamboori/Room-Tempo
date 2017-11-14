<template src="./userProfileComponentVue.template.html"></template>
<style>
    fieldset {
        display: block;
        margin-left: 2px;
        margin-right: 2px;
        padding-top: 0.35em;
        padding-bottom: 0.625em;
        padding-left: 0.75em;
        padding-right: 0.75em;
        border: 2px groove;
    }

    legend {
        width: auto !important;
        padding: 5px !important;
    }

    .form-label label {
        color: #484747 !important;
    }

    .labels {
        font-weight: bold;
    }

    .notes {
        color: #7b8288 !important;
    }
</style>
<script>
    import Vue from 'vue'
    import VueAvatar from './vueAvatar/VueAvatar.vue'
    import VueAvatarScale from './vueAvatar/VueAvatarScale.vue'

    export default {
        data() {
            return {
                userProfile: null
            }
        },
        props: ["parentId", "parentType", "entityId", "clientId", "paramId", "listType"],
        methods: {
            saveUserProfile: function () {
                var self = this;
                var img = this.$refs.vueavatar.getImageScaled()
                this.$store.dispatch("dataRequestHandler", {
                    key: "SaveUserProfile",
                    params: {
                        profileImage: img.toDataURL(),
                        nickName: self.userProfile.NickName
                    },
                    callback: function (err, response) {
                        //console.log(response);
                    }
                });
            },
            getUserProfile: function () {
                var self = this;
                this.$store.dispatch("dataRequestHandler", {
                    key: 'GetUserProfile', params: {}, callback: function (err, response) {
                        //console.log(err + "/" + response);
                        if (response.recordsets.length === 0) {
                            return;
                        }
                        else {
                            self.userProfile = response.recordsets[0][0];
                            if (self.userProfile.ProfileImage) {
                                setTimeout(function () {
                                    self.$refs.vueavatar.loadImage(self.userProfile.ProfileImage)
                                }, 500);
                            }
                            else{
                                setTimeout(function () {
                                    self.$refs.vueavatar.loadImage("https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png")
                                }, 500);
                            }
                        }
                    }
                });
            },
            onChangeScale(scale) {
                this.$refs.vueavatar.changeScale(scale)
            },
            saveClicked() {
                var img = this.$refs.vueavatar.getImageScaled()
                // use img 
            },
            onImageReady(scale) {
                this.$refs.vueavatarscale.setScale(scale)
            }
        },
        computed: {
        },
        components: {
            VueAvatar,
            VueAvatarScale
        },
        mounted() {
            this.getUserProfile();
        }
    }

</script>