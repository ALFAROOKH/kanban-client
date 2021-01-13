const app = new Vue({
    el: '#app',
    data: {
        msg: "ALOHAA!!",
        page: 'register',
        task: [],
        addTask: {
            title: '',
            category: ''
        },
        editTask: {
            title: '',
            category: ''
        },
        regist: {
            username: '',
            email: '',
            password: ''
        },
        dataLogin: {
            email: '',
            password: ''
        },
        myUrl: 'http://localhost:3000'
    },
    methods: {
        show(page) {
            this.page = page
        },
        cekAuth() {
            if (localStorage.getItem('access_token')) {
                this.show('kanban')
                this.getKanban()
            } else {
                this.show('login')
            }
        },
        getKanban() {
            axios({
                method: `GET`,
                url: `${this.myUrl}/task`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    console.log(response.data, '----------')
                    this.task = response.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        add() {
            console.log(this.addTask.title)
            console.log(this.addTask.category)
            axios({
                method: `POST`,
                url: `${this.myUrl}/task`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.addTask.title,
                    category: this.addTask.category
                }
            })
                .then(response => {
                    console.log(response.data, '----------')
                    this.show('kanban')
                    this.getKanban()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        edit() {
            console.log(this.editTask)
            // axios({
            //     method: `PUT`,
            //     url: `${this.myUrl}/task`,
            //     headers: {
            //         access_token: localStorage.getItem('access_token')
            //     },
            //     data: {
            //         title: this.editTask
            //     }
            // })
            //     .then(response => {
            //         this.cekAuth()
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },
        register() {
            axios({
                method: `POST`,
                url: `${this.myUrl}/register`,
                data: {
                    username: this.regist.username,
                    email: this.regist.email,
                    password: this.regist.password
                }
            })
                .then(response => {
                    this.regist.username = ''
                    this.regist.email = ''
                    this.regist.password = ''
                    this.cekAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        login() {
            axios({
                method: `POST`,
                url: `${this.myUrl}/login`,
                data: {
                    email: this.dataLogin.email,
                    password: this.dataLogin.password
                }
            })
                .then(response => {
                    this.dataLogin.email = ''
                    this.dataLogin.password = ''
                    localStorage.setItem('access_token', response.data.access_token)
                    this.cekAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout() {
            localStorage.clear()
            this.cekAuth()
        }
    },
    created() {
        this.cekAuth()
    }
})
