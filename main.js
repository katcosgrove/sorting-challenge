const app = new Vue({
  el: '#code-challenge-table',
  data: {
    objects: [],
    currentSort: 'borrower_country',
    currentSortDir: 'asc',
    pageSize: 10,
    currentPage: 1,
  },

  created:function() {
    fetch('https://finances.worldbank.org/resource/45tv-a6qy.json')
    .then(res => res.json())
    .then(res => {
      this.objects = res;
    })
  },

  methods: {
    sort:  function(sort) {
      if(sort === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc' ? 'desc' : 'asc';
      }
      this.currentSort = sort;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.objects.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
  },

  computed:{
    sortedObjects:function() {
      return this.objects.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {

        if(index >= ((this.currentPage-1) * this.pageSize) && index < (this.currentPage * this.pageSize)) return true;
      });
    }
  }
})
