const app = new Vue({
    el: '#app',
    data() {
        return {
            firstTweets: null,
            secondTweets: null,
            thirdTweets: null,
            loading: true,
            errored: false,
            number: 30,
        }
    },
    methods: {
        changeLayout: function () {
            console.log({ background: this.background, number: this.number });
            localStorage.setItem('number', JSON.stringify(this.number));
            document.getElementById("no").value = "";
            if (localStorage.getItem('number')) {
                this.number = JSON.parse(localStorage.getItem('number'));
            }
            axios
                .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=${this.number}&screen_name=makeschool`)
                .then(response => {
                    NProgress.configure({ easing: 'ease', speed: 2000 });
                    NProgress.start()
                    console.log(response.data)
                    this.firstTweets = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => NProgress.done());
            axios
                .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=${this.number}&screen_name=ycombinator`)
                .then(response => {
                    NProgress.configure({ easing: 'ease', speed: 2000 });
                    NProgress.start()
                    console.log(response.data)
                    this.secondTweets = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => NProgress.done());
            axios
                .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=${this.number}&screen_name=newsycombinator`)
                .then(response => {
                    NProgress.configure({ easing: 'ease', speed: 2000 });
                    NProgress.start()
                    console.log(response.data[0].entities.urls[0].url)
                    this.thirdTweets = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => NProgress.done())
        },
    },
    mounted() {
        axios
            .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool`)
            .then(response => {
                console.log(response.data)
                this.firstTweets = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false);
        axios
            .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator`)
            .then(response => {
                console.log(response.data)
                this.secondTweets = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false);
        axios
            .get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator`)
            .then(response => {
                console.log(response.data[0].entities.urls[0].url)
                this.thirdTweets = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    },
    filters: {
        truncate: function (value) {
            if (value.length > 140) {
                value = value.substring(0, 112) + '...';
            }
            return value
        },
        formatDate: function (value) {
            if (value) {
                return moment(String(value)).format('MMM Do YYYY, h:mm:ss a')
            }
        }
    }

})