<!-- eslint-disable vue/multi-word-component-names -->
<template>    
    <Button style="margin: 5px;" label="Log Out" v-on:click="logOut" severity="danger" />
    <Button style="margin: 5px;" label="Add New Contact" v-on:click="addContact" severity="success" />
    <br />
    <hr />

    <table class="table table-striped">
        <thead>
            <tr>                
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="contact in contacts" :key="contact.Id">                
                <td>{{ contact.Name }}</td>
                <td>{{ contact.Email }}</td>
                <td>{{ contact.Phonenumber }}</td>
                <td>    
                    <Button v-on:click="editContact(contact.Id)" rounded outlined icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
                    <Button style="margin: 5px;" v-on:click="deleteContact(contact.Id)" rounded outlined icon="pi pi-times" severity="danger" aria-label="Cancel" />
                </td>
            </tr>
        </tbody>
    </table>

    <template v-if="!contacts || !contacts.length">
        <span style="color: red;" id="emptyAgenda">No Contacts Saved on your Agenda!</span>
    </template>
    <hr/>    
</template>

<script>    
    import axios from 'axios';
    import Swal from 'sweetalert2'; 

    import Button from 'primevue/button';    

    export default ({
        components: {           
            Button            
        },
        data() {
            return {
                contacts: []
            }
        },        
        async created() {
            await this.getContacts();
        },
        setup() {
        },
        methods: {
            addContact() {
                this.$router.push({ name: "Contact", params: { id: 0 }})
            },
            editContact(Id) {
                this.$router.push({ name: "Contact", params: { id: Id }})
            },
            deleteContact(Id) {
                axios.delete(this.hostname + "/api/Agenda/Delete?Id=" + Id, this.getTokenConfig())
                        .then(response => {
                            Swal.fire(response.data);
                            var removeIndex = this.contacts.findIndex(x => x.Id === Id);
                            ~removeIndex && this.contacts.splice(removeIndex, 1);
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
           async getContacts() {
                await axios.get(this.hostname + "/api/Agenda/", this.getTokenConfig())
                        .then(response => {
                            this.contacts = response.data;
                        })
                        .catch(error => {
                            if (error.response) {
                                Swal.fire(error.response.data);
                            }
                        });
            },
            logOut() {
                window.localStorage.clear();
                this.$router.push({ name: 'Login' });
            },
        }
    })
</script>

<style scoped>        
</style>