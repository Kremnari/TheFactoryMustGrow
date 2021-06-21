import {PLATFORM} from 'aurelia-pal'

export function configure(config) {
  config.globalResources([
     PLATFORM.moduleName('resources/elements/icon-base')
    ,PLATFORM.moduleName('resources/elements/inventory.html')
    ,PLATFORM.moduleName('resources/elements/active-trigger.html')
    ,PLATFORM.moduleName('resources/value-converters/lib/ObjectFilters')
    ,PLATFORM.moduleName('resources/value-converters/valueconverters')
    ,PLATFORM.moduleName('resources/value-converters/CanMine')
    ,PLATFORM.moduleName('resources/value-converters/isVisible')
    ,PLATFORM.moduleName('resources/attributes/loading')
  ]);
}
