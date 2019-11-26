<template>
  <div style="margin-left: 11%; margin-right: 10%; margin-top: 35px; z-index: 0">
    <h3>
      <b>Users</b>
    </h3>
    <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="4" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:Topic>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="my-1">
      </b-col>
      <b-col lg="4" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(rating)="row">
        <star-rating v-if="row" v-bind:star-size="20" v-model="row.value"></star-rating>
      </template>

    </b-table>

    <b-row>
      <b-col sm="2" md="3" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="5" class="my-1">
      </b-col>
      <b-col sm="3" md="4" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
// Vue.component('star-rating', StarRating);
export default {
  data() {
    return {
      items: [
        { Location: 'class a', price: 40, name:  'laravel', time: '4:00pm 1hour', rating: 4 },
        { Location: 'class b', price: 21, name:  'vue', time: '5:00pm 1hour', rating: 3 },
        {
          Location: 'class c',
          price: 9,
          name:  'angular',
          time: '1:00pm 1hour',
          rating: 2
        },
        { Location: 'class d', price: 89, name:  'math', time: '2:00pm 1hour', rating: 1 },
        { Location:'class e', price: 38, name:  'english', time: '3:00pm 1hour', rating: 5 },
        { Location: 'class f', price: 27, name:  'science', time: '10:00am 1hour', rating: 2 },
        { Location: 'class g', price: 40, name:  'physics', time: '11:00am 1hour', rating: 3 },
        {
          Location: 'class h',
          price: 87,
          name:  'chemistry',
          time: '12:00am 1hour', rating: 4
        },
        { Location: 'class i', price: 26, name:  'topology', time: '1:00pm 1hour', rating: 2 },
        { Location: 'class j', price: 22, name:  'programming', time: '2:00pm 1hour', rating: 3 },
        { Location: 'class k', price: 38, name:  'AOA', time: '3:00pm 1hour', rating: 1 },
        { Location: 'class l', price: 29, name:  'S2C', time: '4:00pm 1hour', rating: 3 }
      ],
      fields: [
        { key: 'name', label: 'Topic', sortable: true, sortDirection: 'desc' },
        { key: 'price', label: 'price', sortable: true, class: 'text-center' },
        {
          key: 'Location',
          label: 'Location',
        },
        {
          key: 'rating',
          lable: 'Rating'
        },
        { key: 'time', label: 'Time and length' },
        { key: 'actions', label: 'Details' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  components: {
    StarRating
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}

</script>
