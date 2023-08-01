<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- <Layout title="Dashboard"></Layout> -->
    <Button style="margin: 5px;" label="Log Out" v-on:click="logout" severity="danger" />
    <Button style="margin: 5px;" label="Add New Contact" v-on:click="addContact" severity="success" />
    <br />
    <hr />

    <!-- <button v-on:click="addContact" class="my-button" style="margin: 10px 0 10px 0;">Add New Contact</button> -->
    <!-- <table class="basic-table">
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
                    <button v-on:click="editContact(contact.Id)" class="my-button" style="float: left;">Edit</button>
                    <button v-on:click="deleteContact(contact.Id)" class="my-button" style="float: left;margin-right: 5px;">Delete</button>
                </td>
            </tr>
        </tbody>
    </table> -->

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="contact in contacts" :key="contact.Id">
                <td>
                    <img style="width: 50px; height: 50px;" src="./../assets/person1.jpg" alt="contact-photo"> 
                </td>
                <td>{{ contact.Name }}</td>
                <td>{{ contact.Email }}</td>
                <td>{{ contact.Phonenumber }}</td>
                <td>
                    <!-- <button v-on:click="editContact(contact.Id)" class="my-button" style="float: left;">Edit</button> -->
                    <!-- <button v-on:click="deleteContact(contact.Id)" class="my-button" style="float: left;margin-right: 5px;">Delete</button> -->
                    
                    <Button style="margin: 5px;" v-on:click="editContact(contact.Id)" rounded outlined icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
                    <Button style="margin: 5px;" v-on:click="deleteContact(contact.Id)" rounded outlined icon="pi pi-times" severity="danger" aria-label="Cancel" />
                </td>
            </tr>
        </tbody>
    </table>

    <hr/>

    
</template>

<script>
    // import Layout from './Layout.vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';

    // import DataTable from 'primevue/datatable';
    // import Column from 'primevue/column';
    import Button from 'primevue/button';

    // import ColumnGroup from 'primevue/columngroup';   // optional
    // import Row from 'primevue/row';                   // optional

    export default ({
        components: {
            // Layout,
            // DataTable,
            // Column,
            Button
            // ColumnGroup,
            // Row
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
            logout() {
                window.localStorage.clear();
                this.$router.push({ name: 'Login' });
            },
        }
    })
</script>

<style scoped>
    /* th, td {
        border: 1px solid black;
        border-radius: 10px;
    } */

    img {
        border-radius: 50%;
    }
</style>