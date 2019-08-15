import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

/**
 * `<%= component_name %>`
 * just as a pre test of polymer developing tools.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class <%= element_name %> extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: '<%= component_name %>',
      },
    };
  }
}

window.customElements.define('<%= component_name %>', <%= element_name %>);
