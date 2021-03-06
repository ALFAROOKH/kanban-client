
const app = new Vue({
    el: '#app',
    data: {
        msg: "ALOHAA!!",
        page: 'register',
        task: [],
        addTask: {
            title: '',
            category: '',
            id: ''
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
                    this.task = response.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        add() {
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
                    this.addTask.title = ''
                    this.addTask.category = ''        
                    this.cekAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getOne(id) {
            axios({
                method: `GET`,
                url: `${this.myUrl}/task/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({ data }) => {
                    this.editTask.title = data.title
                    this.editTask.category = data.category
                    this.editTask.id = data.id
                    this.show('edit-task')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        edit(id) {
            axios({
                method: `PUT`,
                url: `${this.myUrl}/task/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.editTask.title,
                    category: this.editTask.category
                }
            })
                .then(({ data }) => {
                    this.cekAuth()

                })
                .catch(err => {
                    console.log(err)
                })


        },
        delTask(id) {
            axios({
                method: `DELETE`,
                url: `${this.myUrl}/task/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(response => {
                    this.cekAuth()
                })
                .catch(err => {
                    console.log(err)
                })

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
            this.show('login')
        }
    },
    created() {
        this.cekAuth()
    },
    computed: {
        backlog() {
            return this.task.filter(el => {
                return el.category == 'backlog'
            })
        },
        todo() {
            return this.task.filter(el => {
                return el.category == 'todo'
            })
        },
        doing() {
            return this.task.filter(el => {
                return el.category == 'doing'
            })
        },
        done() {
            return this.task.filter(el => {
                return el.category == 'done'
            })
        }
    }
})
