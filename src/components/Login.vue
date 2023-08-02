<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="col-md-12">
        <div class="container">
            <h3 style="font-family: Cursive;">Agenda Tool Application</h3>            
            <img src="./../assets/agenda-svg.svg" alt="agenda image" style="width: 30%;" />
            <hr/>
            <div class="card">
                <div class="card-body">
                    <div class="form-group">   
                        <input type="text" v-model="user.username" class="form-control" ref="username" placeholder="Username" name="username" aria-describedby="basic-addon1" >    
                    </div>
                    <hr />
                    <div class="form-group">    
                        <input type="password" v-model="user.password" class="form-control" ref="psw" placeholder="Password" name="pwd" aria-describedby="basic-addon1" >
                    </div>
                    <br />
                    <div class="form-group form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" name="remember"> Remember me                            
                        </label>
                    </div>
                    <div class="clearfix">                        
                        <Button label="Sign in" v-on:click="logIn" />                        
                        <Button label="Sign up" v-on:click="signUp" severity="help" />

                        <div id="loader" hidden class="loader"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    import Button from 'primevue/button';

    export default {                  
        components: {
            Button,
        },
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            signUp() {
                this.$router.push({ name: 'Register' });
            },
            logIn() {
                if (this.checkValidation()) {  
                    document.getElementById('loader').hidden = false;
                    axios.post(this.hostname + "/api/Auth/login", 
                        {
                            "email": this.user.username,
                            "password": this.user.password
                        },)
                        .then(response => {
                            if (response.data) {
                                localStorage.setItem('token', JSON.stringify(response.data));
                                response.data = "";
                                this.$router.push({ name: "Dashboard" });
                            }
                        })
                        .catch(error => {
                            if (error.response) {
                                document.getElementById('loader').hidden = true;
                                Swal.fire(error.response.data);                                
                            }
                        })
                }
            },
            checkValidation() {
                if (!this.user.username) {      
                    this.$refs.username.focus();                               
                    Swal.fire("Username is a required field!");
                    return;
                }

                if (!this.user.password) {
                    this.$refs.psw.focus();
                    Swal.fire("Password is a required field!");
                    return;
                }
                
                return true;
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 360px;
    }

    button {
        margin: 5px;
    }    

    .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid black; 
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
        margin-left: 45%;
        margin-bottom: 10px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>