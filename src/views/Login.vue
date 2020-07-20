<template>
    <div class="text-center">
	<mdb-container class="d-flex justify-content-center">
		<mdb-row>
			<mdb-card reverse>
        <mdb-card-body class="text-center" cascade>
        <mdb-card-title><strong>Login</strong></mdb-card-title>

        <form @submit="logIn">
          <div class="text-left">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Your email" v-model="email">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Your password"
                     v-model="password">
            </div>
          </div>

          <div class="text-center">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
        </mdb-card-body>

</mdb-card>
		</mdb-row>
	</mdb-container>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    logIn(e) {
      e.preventDefault();
      let data = {
        email: this.email,
        password: this.password,
      }
      axios({
        method: "POST",
        url: `${process.env.VUE_APP_ROOT_API}/admin/login`,
        data: data
      })
      .then(res => {
        console.log(res.status);
        if(res.data.status == 200) {
          let token = res.data.access_token
          let role = res.data.user.user_role
          let nama = res.data.user.nama
          let email = res.data.user.email
          let isLoggedIn = true
          localStorage.setItem('token', token)
          localStorage.setItem('role', role)
          localStorage.setItem('nama', nama)
          localStorage.setItem('email', email)
          localStorage.setItem('LoggedUser', true)
          this.$router.push({ name: 'dashboard' })
          window.location.reload();
        } else {
          localStorage.setItem('LoggedUser', false)
        }
      })
      .catch(err => {
        console.log(err)
        console.log("Gagal Login");
        localStorage.setItem('LoggedUser', false)
      })
    }
  },
}
</script>
