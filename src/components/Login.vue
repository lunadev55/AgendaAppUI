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
                        <!-- <label for="username">Username:</label>
                        <input v-model="user.username" ref="username" type="text" class="form-control" placeholder="Username" name="username" /> -->      
                        <!-- <InputText id="username" v-model="user.username" ref="username" name="username" />
                        <label for="username">Username</label> -->
                        <!-- <span class="p-float-label">
                            <InputText id="username" v-model="user.username" ref="username" name="username" />
                            <label for="username">Username</label>
                        </span> -->
                        <!-- <label for="username">Username:</label> -->
                        <InputText type="text" v-model="user.username" ref="username" placeholder="Username" name="username"/>
                    </div>
                    <hr />
                    <div class="form-group">
                        <!-- <label for="pwd">Password:</label>
                        <input v-model="user.password" ref="psw" type="password" class="form-control" placeholder="Password" name="pwd" /> -->
                        <InputText type="password" v-model="user.password" ref="psw" placeholder="Password" name="pwd"/>
                    </div>
                    <br />
                    <div class="form-group form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" name="remember"> Remember me
                            <!-- <Checkbox v-model="checked" :binary="true" name="remember" /> Remember me -->
                        </label>
                    </div>
                    <div class="clearfix">
                        <!-- <button type="button" class="signin" v-on:click="login">Sign in</button> -->
                        <!-- <Button label="Sign in" v-on:click="login" /> -->
                        <Button label="Sign in" v-on:click="login" />
                        <!-- <button type="button" class="signup" v-on:click="signup">Sign up</button> -->
                        <!-- <Button label="Sign up" v-on:click="signup" /> -->
                        <Button label="Sign up" v-on:click="signup" severity="help" />
                    </div>
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
    // import Checkbox from 'primevue/checkbox';

    export default {    
        components: {
            InputText,
            Button
            // Checkbox
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
            signup() {
                this.$router.push({ name: 'Register' });
            },
            login() {
                if (this.checkValidation()) {  
                    axios.post(this.hostname + "/api/Auth/entrar", 
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
                                Swal.fire(error.response.data);
                            }
                        })
                }
            },
            checkValidation() {
                if (!this.user.username) {
                    this.$refs.username.focus();
                    // this.$refs['username'].focus();
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

    /* button {
        background-color: red;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
    }

    button:hover {
        opacity: 1;
    } */
</style>