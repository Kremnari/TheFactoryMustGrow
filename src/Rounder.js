export const Rounder = {
  ones: 1, tens: 0, huns: 0
  ,abs: false, fail: false,
  get val() {
    return this.huns*100+this.tens*10+this.ones
  },
  calc_val(max) {
    return Math.min(this.val, max)
  },
  calc(current, max, avail) {
    return Math.min(this.val, Math.min(avail, max-current))
  }
} // absolute vs modulus, fail... on partial
