<!-- eslint-disable vue/multi-word-component-names -->
<template>        
    <div class="container" style="max-width: 360px;">
        <br />
        <input type="text" v-model="contact.Name" class="form-control" ref="contactName" placeholder="Name" name="name" >
        <br />
        <input type="email" v-model="contact.Email" class="form-control" ref="email" placeholder="Email" name="email" >
        <br />
        <input type="text" v-model="contact.Phonenumber" class="form-control" ref="phone" placeholder="Phone Number" name="phone" >
    </div>
    
    <br />
    <Button style="margin: 5px;" label="Save" v-on:click="save" severity="success" />
    <Button style="margin: 5px;" label="Cancel" v-on:click="cancel" severity="danger" />    
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    import Button from 'primevue/button';

    export default ({
        data() {
            return {
                contact: {
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
        },
        methods: {
            async getContact() {
                var contactId = this.$route.params.id;
                await axios.get(this.hostname + "/api/Agenda/GetContactById?id=" + contactId, this.getTokenConfig())
                        .then(response => {                            
                            this.contact = response.data;
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
                   
                    if (this.$route.params.id === '0') {
                        this.axios.post(this.hostname + "/api/Agenda/AddContact" ,
                            formData,
                            this.getTokenConfig())
                                .then(response => {
                                    if (response.data.Message === "Added Successfully!") {
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
                                    if (response.data.Message === "Updated Successfully!") {
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
            checkValidation() {               
                if (!this.contact.Name) {
                    this.$refs.contactName.focus();
                    Swal.fire("Name field is required!");
                    return;
                }
                if (!this.contact.Email) {
                    this.$refs.email.focus();
                    Swal.fire("Email Address field is required!");
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