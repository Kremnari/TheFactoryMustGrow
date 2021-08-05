// regenerator-runtime is to support async/await syntax in ESNext.
// If you target latest browsers (have native support), or don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import 'bootstrap';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-animator-css'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));


  aurelia.start().then(() => {
    aurelia.setRoot(PLATFORM.moduleName('app')) 
  });
}

window.debugIf = function(obj, flag) {
  if(obj.$$_debug && obj.$$_debug.includes(flag)) debugger
}
window.debugCheck = function(obj, flag) {
  !obj.$$_debug && (obj.$$_debug = [])
  obj.$$_debug.push(flag)
}

Object.walkPath = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (isObject(o) && k in o) {
          o = o[k];
      } else {
          Error("Couldn't walk the path completely");
      }
  }
  return o;
}
