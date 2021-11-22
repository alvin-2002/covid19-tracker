import { Directive, ElementRef, HostBinding, HostListener, Renderer2, EventEmitter } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // Attaching or Detching class active dynamically on button
    @HostBinding('class.active') isOpen: boolean = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    // listen to click event
    @HostListener('click') toggleOpen(): void {
        const dropdownMenu: HTMLElement = this.elRef.nativeElement.nextSibling;

        this.isOpen = !this.isOpen;
    
        if( this.isOpen ) {
          this.renderer.addClass(dropdownMenu, 'show');
        }
        else{
          this.renderer.removeClass(dropdownMenu, 'show');
        }
        console.log(this.isOpen);
    }

    // CLOSE dropdown if user click outside
    clickOutside = new EventEmitter<Event>(); 
    @HostListener('document:click', ['$event', '$event.target'])
    onClick( event: Event, targetElement: HTMLElement ): void {
  
      if (!targetElement || this.isOpen === false ) return;
  
      const dropdownMenu: HTMLElement = this.elRef.nativeElement.nextSibling;
      let clickedInside = this.elRef.nativeElement.contains(targetElement);
  
      if (!clickedInside) {
        this.clickOutside.emit(event);
        this.renderer.removeClass(dropdownMenu,'show');
        this.isOpen = false;
      }
    }
}