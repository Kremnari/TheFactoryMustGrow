export default async function URLQuery(mgrs) {
  let cmd = location.search.split("=")[1]
  if(!cmd) return

  let reset = true
  switch(cmd) {
    case "setDev":
      await mgrs.idb.set("dev", true)
      break;
    case "unsetDev":
      await mgrs.idb.set("dev", false)
      break;
    case "resetSave":
      await mgrs.baseApp.resetSave();
      break;
    case "resetDS":
      await mgrs.idb.del("last_ds")
      break;
    default:
      reset = false
  }
  if(reset) location.href = location.href.slice(0, location.href.lastIndexOf("/")+1)
  debugger
  switch(cmd) {
    case "jumpStart":
      mgrs.baseApp.showTut = false
      mgrs.baseApp.jumpStart()
      break;
    case "testing":
      mgrs.baseApp.showTut = false
      mgrs.baseApp.testing()
      break;
  }
}
