import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
/** custom property binding */
@HostBinding("class.open") isOpen : boolean = false

@HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen
  }

  constructor(private elRef: ElementRef) { }
  ngOnInit(): void {
  }

}