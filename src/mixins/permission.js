import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    hasPermission(point) {
      return this.roles?.points.includes(point)
    }
  }
}
