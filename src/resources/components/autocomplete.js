import {bindingMode, observable} from 'aurelia-binding';
import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';

let nextID = 0;

@inject(Element)
export class Autocomplete {
  @bindable service;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable placeholder = '';
  @bindable delay = 300;
  id = nextID++;
  expanded = false;
  @observable inputValue = '';
  updatingInput = false;
  suggestions = [];
  index = -1;
  suggestionsUL = null;
  userInput = '';
  
  constructor(element) {
    this.element = element;
  }
  
  display(name) {
    this.updatingInput = true;
    this.inputValue = name;
    this.updatingInput = false;
  }
  
  getName(suggestion) {
    if (suggestion == null) {
      return '';
    }
    return this.service.getName(suggestion);
  }
  
  collapse() {
    this.expanded = false;
    this.index = -1;
  }
  
  select(suggestion) {
    this.value = suggestion;
    const name = this.getName(this.value);
    this.userInput = name;
    this.display(name);
    this.collapse();
  }
  
  valueChanged() {
    this.select(this.value);
  }
  
  inputValueChanged(value) {
    if (this.updatingInput) {
      return;
    }
    this.userInput = value;
    if (value === '') {
      this.value = null;
      this.collapse();
      return;
    }
    this.service.suggest(value)
      .then(suggestions => {
        this.index = -1;
        this.suggestions.splice(0, this.suggestions.length, ...suggestions);
        if (suggestions.length === 1) {
          this.select(suggestions[0]);
        } else if (suggestions.length === 0) {
          this.collapse();
        } else {
          this.expanded = true;
        }
      });
  }
  
  scroll() {
    const ul = this.suggestionsUL;
    const li = ul.children.item(this.index === -1 ? 0 : this.index);
    if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
      ul.scrollTop += li.offsetHeight;
    } else if(li.offsetTop < ul.scrollTop) {
      ul.scrollTop = li.offsetTop;
    }
  }
  
  keydown(key) {
    if (!this.expanded) {
      return true;
    }
    
    // down
    if (key === 40) {
      if (this.index < this.suggestions.length - 1) {
        this.index++;
        this.display(this.getName(this.suggestions[this.index]));
      } else {
        this.index = -1;
        this.display(this.userInput);
      } 
      this.scroll();
      return;
    }
    
    // up
    if (key === 38) {
      if (this.index === -1) {
        this.index = this.suggestions.length - 1;
        this.display(this.getName(this.suggestions[this.index]));
      } else if (this.index > 0) {
        this.index--;
        this.display(this.getName(this.suggestions[this.index]));
      } else {
        this.index = -1;
        this.display(this.userInput);
      }
      this.scroll();
      return;  
    }
    
    // escape
    if (key === 27) {
      this.display(this.userInput);
      this.collapse();
      return;
    }
    
    // enter
    if (key === 13) {
      if (this.index >= 0) {
        this.select(this.suggestions[this.index]);
      }
      return;
    }
    
    return true;
  }
  
  blur() {
    this.select(this.value);
    this.element.dispatchEvent(DOM.createCustomEvent('blur'));
  }
  
  suggestionClicked(suggestion) {
    this.select(suggestion);
  }
  
  focus() {
    this.element.firstElementChild.focus();
  }
}

// aria-activedescendant
// https://webaccessibility.withgoogle.com/unit?unit=6&lesson=13
// https://www.w3.org/TR/wai-aria/states_and_properties#aria-autocomplete
// https://www.w3.org/TR/wai-aria/roles#combobox
