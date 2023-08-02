<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">              
        <div class="card">
            <div class="card-body">
                <h1 style="font-family: Cursive;">Sign Up</h1>
                <p style="font-family: Cursive;">Please fill in this form to create an account.</p>
                <hr>        
                
                <input type="text" v-model="user.email" class="form-control" ref="email" placeholder="Email" name="email" >
                <input type="password" v-model="user.password" class="form-control" ref="psw" placeholder="Password" name="pwd" >
                <input type="password" v-model="user.repeatPassword" class="form-control" ref="psw-repeat" placeholder="Repeat Password" name="psw-repeat" >

                <label>
                    <input type="checkbox" checked name="remember" style="margin-bottom: 15px;" /> Remember me
                </label>
                
                <div class="clearfix">
                    <Button label="Cancel" v-on:click="cancel" severity="danger" />
                    <Button label="Sign Up" v-on:click="signUp" severity="success" />                   
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    import Button from 'primevue/button';

    export default({
        components: {
            Button            
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
            signUp() {
                if (this.checkValidation()) {
                    axios.post(this.hostname + "/api/Auth/register", 
                        {
                            "email": this.user.email,
                            "password": this.user.password,
                            "confirmPassword": this.user.repeatPassword
                        },)
                        .then(response => {
                            console.log(response.data);
                            if (response.data) {
                                Swal.fire("User Registered Successfully!")
                                    .then(() => {
                                        this.cancel();
                                    });
                            }
                            else {
                                Swal.fire("Error: Something went wrong, Try again later!")
                            }                        
                        })
                        .catch(error => {                            
                            if (error.response.data[0].Code) {
                                Swal.fire(error.response.data[0].Description);
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

    button {
        margin: 5px;
    }
</style>