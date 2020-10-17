export class Settings {
  rounder = {
    ones: 0,
    tens: 0,
    huns: 0,
    get count() {
      return ones + tens*10 + huns*100
    },
    from(val) {

    }
  }
}
