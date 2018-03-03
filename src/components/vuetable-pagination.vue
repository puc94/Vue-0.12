<template>
  <div class="l-level__right">
    <div class="l-level__item">
      <nav class="c-pagination c-pagination--bordered">
        <a v-if="!isOnFirstPage" v-on="click: loadPage('prev')" class="c-pagination__item">Prev</a>
        <span v-if="isOnFirstPage" class="c-pagination__item {{ css.disabledClass }}">Prev</span>

        <template v-if="notEnoughPages">
          <a v-repeat="n in totalPage" v-on="click: loadPage(n+1)" v-html="n+1" class="c-pagination__item" v-class="{'is-active': isCurrentPage(n+1)}"></a>
        </template>
        <template v-else>
          <a v-repeat="n in windowSize" v-on="click: loadPage(windowStart+n-1)" class="c-pagination__item" v-class="{'is-active': isCurrentPage(windowStart+n-1)}"></a>
        </template>

        <a v-if="!isOnLastPage" v-on="click: loadPage('next')" class="c-pagination__item">Next</a>
        <span v-if="isOnLastPage" class="c-pagination__item {{ css.disabledClass }}">Next</span>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  name: "vuetable-pagination",
  props: {
    css: {
      type: Object,
      default () {
        return {
          wrapperClass: 'ui right floated pagination menu',
          activeClass: 'active large',
          disabledClass: 'is-disabled',
          pageClass: 'item',
          linkClass: 'icon item',
          paginationClass: 'ui bottom attached segment grid',
          paginationInfoClass: 'left floated left aligned six wide column',
          dropdownClass: 'ui search dropdown',
          icons: {
            first: 'angle double left icon',
            prev: 'left chevron icon',
            next: 'right chevron icon',
            last: 'angle double right icon',
          }
        }
      }
    },
    onEachSide: {
      type: Number,
      default () {
        return 2
      }
    },
  },
  data: function() {
    return {
      tablePagination: null
    }
  },
  computed: {
    totalPage () {
      return this.tablePagination === null
        ? 0
        : this.tablePagination.last_page
    },
    isOnFirstPage () {
      return this.tablePagination === null
        ? false
        : this.tablePagination.current_page === 1
    },
    isOnLastPage () {
      return this.tablePagination === null
        ? false
        : this.tablePagination.current_page === this.tablePagination.last_page
    },
    notEnoughPages () {
      return this.totalPage < (this.onEachSide * 2) + 4
    },
    windowSize () {
      return this.onEachSide * 2 +1;
    },
    windowStart () {
      if (!this.tablePagination || this.tablePagination.current_page <= this.onEachSide) {
        return 1
      } else if (this.tablePagination.current_page >= (this.totalPage - this.onEachSide)) {
        return this.totalPage - this.onEachSide*2
      }
 
      return this.tablePagination.current_page - this.onEachSide
    },
  },
  methods: {
    loadPage (page) {

      this.$dispatch('onChangePage', page)
    },
    isCurrentPage (page) {
      return page === this.tablePagination.current_page
    },
    resetData () {
      this.tablePagination = null
    },
    setTablePagination: function(tablePagination) {
      this.tablePagination = tablePagination
    }
  }
}
</script>