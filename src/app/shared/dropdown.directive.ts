import {Directive, HostBinding, HostListener, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false

  @HostListener('mouseenter') open() {
    this.isOpen = true
  }

  @HostListener('mouseleave') close() {
    this.isOpen = false
  }
}
