import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toast-factory',
  templateUrl: './toast-factory.component.html',
  styleUrls: ['./toast-factory.component.scss']
})
export class ToastFactoryComponent implements OnInit {
  public static instance: ToastFactoryComponent;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
    ToastFactoryComponent.instance = this;
  }

  /**
   * Creates a toast with the given message. Destroys it afterwards.
   * @param {string} message - Message to display.
   * @param {number} time - Time the toast will remain open. if given value of Infinity, leaves the toast open.
   */
  public static showMessage(message: string, time?: number): ToastComponent {
    const factory: ComponentFactory<ToastComponent> = this.instance.resolver.resolveComponentFactory(ToastComponent);
    const toast: ComponentRef<ToastComponent> = this.instance.container.createComponent(factory);
    toast.instance.onInit.subscribe(() => { setTimeout(() => {
      toast.instance.onClose.subscribe(() => {
        toast.destroy();
      });

      toast.instance.show(message, (time * 1000)).then(() => {
        toast.destroy();
      });
    }); });

    return toast.instance;
  }

  public static showErrorMessage(message: string, time?: number): ToastComponent {
    const toast = ToastFactoryComponent.showMessage(message, time);
    toast.type = 'warning';
    return toast;
  }

  ngOnInit() {
  }


}
