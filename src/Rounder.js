export const Rounder = {
  ones: 1, tens: 0, huns: 0
  ,abs: false, fail: false,
  get val() {
    //console.log(this.huns, this.tens, this.ones);
    //console.log(this.huns*100+this.tens*10);
    return parseInt(this.huns)*100+parseInt(this.tens)*10+parseInt(this.ones)
  },
  calc_val(max) {
    return Math.min(this.val, max)
  },
  calc(current, max, avail) {
    //console.log("c:"+current+" m:"+max+" a:"+avail+" r:"+this.val)
    let ret = Math.min(this.val, Math.min(avail, max-current))
    //console.log("ret:"+ret)
    return ret
  }
} // absolute vs modulus, fail... on partial