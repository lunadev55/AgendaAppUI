<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">              
        <div class="card">
            <div class="card-body">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>

                <hr>                
                <InputText type="text" v-model="user.email" ref="email" placeholder="Email" name="email"/>
                <!-- <label for="email"><b>Email</b></label>
                <input v-model="user.email" ref="email" type="email" placeholder="Email" name="email" /> -->

                <InputText type="password" v-model="user.password" ref="psw" placeholder="Password" name="pwd"/>
                <!-- <label for="psw"><b>Password</b></label>
                <input v-model="user.password" ref="psw" type="password" placeholder="Password" name="psw" /> -->

                <InputText type="password" v-model="user.repeatPassword" ref="psw" placeholder="Repeat Password" name="psw-repeat"/>
                <!-- <label for="psw-repeat"><b>Repet Password</b></label>
                <input v-model="user.repeatPassword" type="password" placeholder="Repeat Password" name="psw-repeat" /> -->

                <label>
                    <input type="checkbox" checked name="remember" style="margin-bottom: 15px;" /> Remember me
                </label>
                
                <div class="clearfix">
                    <Button label="Cancel" v-on:click="cancel" severity="danger" />
                    <Button label="Sign Up" v-on:click="signup" severity="success" />
                    <!-- <button type="button" class="cancelBtn" v-on:click="back">Cancel</button>
                    <button type="button" class="signUpBtn" v-on:click="signup">Sign Up</button> -->
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';

    export default({
        components: {
            InputText,
            Button
            // Checkbox
        },
        data() {
            return {
                user: {
                    userId: 0,
                    email: "",
                    password: "",
                    repeatPassword: ""
                }
            }
        },
        methods: {
            cancel() {
                this.$router.push({ name: 'Login' });
            },
            signup() {
                if (this.checkValidation()) {
                    axios.post(this.hostname + "/api/Auth/register", 
                        {
                            "email": this.user.email,
                            "password": this.user.password,
                            "confirmPassword": this.user.repeatPassword
                        },)
                        .then(response => {
                            if (response.data) {
                                Swal.fire("User Registered Successfully!")
                                    .then(() => {
                                        this.back();
                                    });
                            }
                            else {
                                Swal.fire("Error: Something went wrong, Try again later!")
                            }                        
                        })
                        .catch(error => {
                            if (error.response) {
                                Swal.fire(error.response.data);
                            }
                        });
                }
            },
            checkValidation() {               
                if (!this.user.email) {
                    this.$refs.email.focus();
                    Swal.fire("Email field is required!");
                    return;
                }
                if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(this.user.email)) {
                    this.$refs.email.focus();
                    Swal.fire("Invalid Email Adress!");
                    return;
                }
                if (!this.user.password) {
                    this.$refs.psw.focus();
                    Swal.fire("Password field is required!");
                    return;
                }
                if (this.user.password != this.user.repeatPassword) {
                    this.$refs.psw.focus();
                    Swal.fire("The Password fields do not Match!");
                    return;
                }
                return true;
            }
        }
    });
</script>

<style scoped>
    .container {
        width: 40%;
        padding: 16px;
    }

    input[type=text], input[type=password], input[type=email] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    } 

    input[type=text]:focus, input[type=password]:focus, input[type=email]:focus {        
        background-color: #f1f1f1;
        outline: none;
    } 

    hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
    }

    /* button {
        background-color: #04AA6D;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
    } */

    button {
        margin: 5px;
    }
</style>