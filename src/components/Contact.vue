<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- <Layout title="Contact"></Layout> -->
    <!-- <Button style="margin: 5px;" label="Cancel" v-on:click="cancel" severity="danger" /> -->
    <!-- <label for="upload-pic" style="cursor: pointer;height: 200px;width: 200px;margin-bottom: 50px;">
        <img class="rounded-circle mt-5 imgTag" style="width: 100%;height: 100%;" :src="fileSrc" />
        <input id="upload-pic" @change="uploadImage($event)" class="upload-pic" type="file" accept="image/*" name="photo" style="display: none;" />
    </label> -->
    <br />
    <!-- <input v-model="contact.Name" type="text" placeholder="Name" ref="contactName" name="name"> -->
    <InputText style="margin: 5px;" type="text" v-model="contact.Name" ref="contactName" placeholder="Name" name="name"/>
    <br />
    <!-- <input v-model="contact.Email" type="email" placeholder="Email" ref="email" name="email"> -->
    <InputText style="margin: 5px;" type="email" v-model="contact.Email" ref="email" placeholder="Email" name="email"/>
    <br />
    <!-- <input v-model="contact.Phonenumber" type="text" placeholder="Phone Number" ref="phone" name="phone"> -->
    <InputText style="margin: 5px;" type="text" v-model="contact.Phonenumber" ref="phone" placeholder="Phone Number" name="phone"/>
    <br />
    <Button style="margin: 5px;" label="Save" v-on:click="save" severity="success" />
    <Button style="margin: 5px;" label="Cancel" v-on:click="cancel" severity="danger" />
    <!-- <button class="btn btn-primary" v-on:click="save">Save</button> -->
    <div></div>
</template>

<script>
    // import Layout from './Layout.vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';

    export default ({
        data() {
            return {
                contact: {
                    // file: "",
                    // fileSrc:require('@/assets/person1.jpg'),
                    id: 0,
                    Name: "",
                    Email: "",
                    Phonenumber: ""
                }
            }
        },
        setup() {

        },
        async created() {
            if (this.$route.params.id === '0')
                return;

            await this.getContact();
        },  
        components: {
            Button,
            InputText
        },
        methods: {
            async getContact() {
                var contactId = this.$route.params.id;
                await axios.get(this.hostname + "/api/Agenda/GetContactById?id=" + contactId, this.getTokenConfig())
                        .then(response => {
                            // console.log(response.data);
                            this.contact = response.data;

                            // if (this.contact.imgByte != null && this.contact.imgByte.length > 0) {
                            //     this.fileSrc = 'data:image/jpeg;base64' + this.contact.imgByte;
                            //     this.file = 'data:image/jpeg;base64' + this.contact.imgByte;
                            // }
                        })
                        .catch(error => {
                            if (error.response) {
                                Swal.fire(error.response.data);
                            }
                        });
            },
            getTokenConfig() {
                var token = JSON.parse(localStorage.getItem('token'));
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                return config;
            },
            save() {
                if (this.checkValidation()) {
                    const formData = new FormData();
                    formData.append("newName", this.contact.Name);
                    formData.append("newEmail", this.contact.Email);
                    formData.append("newPhonenumber", this.contact.Phonenumber);      
                    
                    // formData.append("File", this.file);
                    // formData.append("ImgBytes", this.file);

                    // for (var key in this.contact) {
                    //     formData.append(key, this.contact[key]);
                    // }

                    if (this.$route.params.id === '0') {
                        this.axios.post(this.hostname + "/api/Agenda/AddContact" ,
                            formData,
                            this.getTokenConfig())
                                .then(response => {
                                    if (response.data === "Added Successfully!") {
                                        Swal.fire("Successfully Saved!")
                                        this.$router.push({ name: "Dashboard" });
                                    } else {
                                        Swal.fire("Error: Something went wrong. Try again later!")
                                    }
                                })
                                .catch(error => {
                                    if (error.response) {
                                        Swal.fire(error.response.data);
                                    }
                                });
                    } else {
                        this.axios.post(this.hostname + "/api/Agenda/UpdateContact?id=" + this.$route.params.id,
                            formData,
                            this.getTokenConfig())
                                    .then(response => {
                                        if (response.data === "Updated Successfully!") {
                                            Swal.fire("Successfully Updated!")
                                            this.$router.push({ name: "Dashboard" });
                                        } else {
                                            Swal.fire("Error: Something went wrong. Try again later!")
                                        }
                                    })
                                    .catch(error => {
                                        if (error.response) {
                                            Swal.fire(error.response.data);
                                        }
                                    });
                    }
                    
                }
            },
            uploadImage(e) {
                this.file = e.target.files[0];
                this.fileSrc = window.URL.createObjectURL(this.file);
            },
            checkValidation() {               
                if (!this.contact.Name) {
                    this.$refs.contactName.focus();
                    Swal.fire("Name field is required!");
                    return;
                }
                if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(this.contact.Email)) {
                    this.$refs.email.focus();
                    Swal.fire("Invalid Email Adress!");
                    return;
                }
                if (!this.contact.Phonenumber) {
                    this.$refs.phone.focus();
                    Swal.fire("Phone Number field is required!");
                    return;
                }                
                return true;
            },
            cancel() {
                this.$router.push({ name: 'Dashboard' });
            },
        }
    })
</script>

<style scoped>
</style>