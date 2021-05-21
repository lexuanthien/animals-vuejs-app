<template>
  <div>
    <div class="spin-wrapper" v-if="animals.length == 0">doulber.Pet loading...</div>
    <div class="grid-container" ref='animals'>
        <div class="grid-item" v-for="(item, index) in animals" :key="index" v-on:click="getDetail(index)">
            <div class="box-icon">
                <div><i class="fas fa-heart"></i></div>
                <i class="fas fa-dog" v-if="item.type == 'Dog'"></i>
                <i class="fas fa-cat" v-if="item.type == 'Cat'"></i>
            </div>
            <p class="box-name">{{item.name}}</p>
            <div class="box-info">
                <p>{{item.age}}</p>
                <p>{{item.gender}}</p>
                <p>{{item.size}}</p>
            </div>
        </div>
    </div>
    <!-- <table>
        <thead ref='animals'> 
            <tr>
                <th>#</th>
                <th>name</th>
                <th v-if="!type">type</th>
                <th>gender</th>
                <th>age</th>
                <th>status</th>
                <th>published</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in animals" :key="index" v-on:click="getDetail(index)">
                <td data-label="#">{{index+1}}</td>
                <td data-label="name">{{item.name}}</td>
                <td data-label="type" v-if="!type">{{item.type}}</td>
                <td data-label="gender">{{item.gender}}</td>
                <td data-label="age">{{item.age}}</td>
                <td data-label="status">{{item.status}}</td>
                <td data-label="published" class="last-sp">{{dateFormat(item.published_at)}}</td>
                <td><i class="fas fa-ellipsis-h"></i></td>
            </tr>
        </tbody>
    </table> -->

    <div id="modal-detail-animal" class="modal" v-bind:style="{ display: displayModal }">
        <div class="modal-content">
            <span class="close" v-on:click="hideModal()">&times;</span>
            <div class="content" v-if="Object.keys(animal).length > 0 && animal.constructor === Object">
                <div class="box-content">
                    <div>
                        <div class="text-name">
                            <h1>{{animal.name}}</h1>
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="text-type">
                            <p>{{animal.type}},</p>
                            <p>{{animal.size}},</p>
                            <p><i class="far fa-clock"></i> {{dateFormat(animal.published_at)}}</p>
                        </div>
                        <p>{{animal.description}}</p>
                        <p>- age: {{animal.age}}</p>
                        <p>- coat: {{animal.coat}}</p>
                        <p>- gender: {{animal.gender}}</p>
                        <p>- status: {{animal.status}}</p>
                        <p>- url: {{animal.url}}</p>

                    </div>
                    <div v-if="animal.photos.length > 0" v-bind:style="{backgroundImage: `url('` + animal.photos[0].large + `')` }" class="photo">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-get-items" v-if="animals.length > 0">
        <div class="pre" v-bind:class="[pagination._links.previous ? 'active' : '']"><i class="fas fa-angle-double-left" v-on:click="prePage()"></i></div>
        <div class="next" v-bind:class="[pagination._links.next ? 'active' : '']"><i class="fas fa-angle-double-right" v-on:click="nextPage()"></i></div>
        <div>on page {{pagination.current_page}}</div>
    </div>
  </div>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                token: this.$store.getters.token,
                message: '',
                animals: [],
                animal: {},
                pagination: '',
                type: false,
                displayModal: 'none'
            }
        },
        mounted() {
            this.axios
            .get('https://api.petfinder.com/v2/animals', {
                'headers' : {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + this.token,
                } 
            })
            .then((response) => {
                // this.animals = response.data.animals.filter(item => item.photos.length > 0);
                this.animals = response.data.animals
                this.pagination = response.data.pagination
            })
            .catch(error => {
                return
            });
        },
        watch: {
            $route(to) {
                let arrType = ['dog', 'cat']
                if(arrType.includes(to.query.type)) {
                    this.animals = []
                    this.axios
                    .get('https://api.petfinder.com/v2/animals?type=' + to.query.type, {
                        'headers' : {
                            'Accept' : 'application/json',
                            'Authorization' : 'Bearer ' + this.token,
                        } 
                    })
                    .then((response) => {
                        this.type = true;
                        this.animals = response.data.animals
                        this.pagination = response.data.pagination
                    })
                    .catch(error => {
                        return
                    });
                }
                // reload page
                if(to.query.action == 'reload') {
                    let query = Object.assign({}, this.$route.query);
                    delete query.action;
                    this.$router.replace({ query });
                    this.$refs['animals'].scrollIntoView(0,0);
                    this.animals = []
                    this.axios
                    .get('https://api.petfinder.com/v2/animals', {
                        'headers' : {
                            'Accept' : 'application/json',
                            'Authorization' : 'Bearer ' + this.token,
                        } 
                    })
                    .then((response) => {
                        this.type = false;
                        this.animals = response.data.animals
                        this.pagination = response.data.pagination
                    })
                    .catch(error => {
                        return
                    });
                }
            }
        },
        methods: {
            dateFormat(date) {
                moment.locale("vi")
                if(moment(date).add(5, 'days') < moment()) {
                    return moment(date).format("DD MMM, YYYY");
                } else {
                    return moment(date).format("ddd, HH:mm");
                }
            },
            nextPage() {
                if(this.pagination._links.next) {
                    this.animals = []
                    this.axios
                    .get('https://api.petfinder.com' + this.pagination._links.next.href, {
                        'headers' : {
                            'Accept' : 'application/json',
                            'Authorization' : 'Bearer ' + this.token,
                        } 
                    })
                    .then((response) => {
                        // this.animals = this.animals.concat(response.data.animals)
                        this.animals = response.data.animals
                        this.pagination = response.data.pagination
                        return
                    })
                    .catch(error => {
                        return
                    });
                }
                return
            },
            prePage() {
                if(this.pagination._links.previous) {
                    this.animals = []
                    this.axios
                    .get('https://api.petfinder.com' + this.pagination._links.previous.href, {
                        'headers' : {
                            'Accept' : 'application/json',
                            'Authorization' : 'Bearer ' + this.token,
                        } 
                    })
                    .then((response) => {
                        // this.animals = this.animals.concat(response.data.animals)
                        this.animals = response.data.animals
                        this.pagination = response.data.pagination
                        return
                    })
                    .catch(error => {
                        return
                    });
                }
                return
            },
            getDetail(index) {
                this.animal = this.animals[index]
                this.displayModal = 'block'
            },
            hideModal() {
                this.displayModal = 'none'
            },
            onClick(e) {
                if(e.target.id == "modal-detail-animal") {
                    this.hideModal()
                }
            }
        },
        created () {
            document.addEventListener('click', this.onClick);
        },
    } 
</script>
