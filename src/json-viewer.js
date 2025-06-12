/**
 * A custom HTML element for displaying JSON data in a modal popup.
 *
 * @example
 * // Adding the element to the DOM
 * const viewer = document.createElement('json-viewer');
 * document.body.appendChild(viewer);
 *
 * // Setting JSON data
 * viewer.data = { key: "value" };
 *
 * // Showing the viewer
 * viewer.show();
 *
 * // Hiding the viewer
 * viewer.hide();
 */
class JsonViewer extends HTMLElement {
  /**
   * Constructs the JsonViewer element and initializes its shadow DOM.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        /* Styles omitted for brevity */
      </style>
      <div class="popup">
        <button class="close-btn">&times;</button>
        <pre></pre>
      </div>
    `;

    /** @private @type {HTMLPreElement} */
    this._pre = this.shadowRoot.querySelector("pre");

    /** @private @type {HTMLButtonElement} */
    this._closeBtn = this.shadowRoot.querySelector(".close-btn");

    // Event listener for the close button
    this._closeBtn.addEventListener("click", () => this.hide());
  }

  /**
   * Observed attributes for the custom element.
   *
   * @returns {string[]} The list of attributes to observe.
   */
  static get observedAttributes() {
    return ["data"];
  }

  /**
   * Callback invoked when an observed attribute changes.
   *
   * @param {string} name - The name of the changed attribute.
   * @param {string | null} _oldValue - The old value of the attribute.
   * @param {string | null} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "data") {
      try {
        const json = JSON.parse(newValue);
        this.render(json);
      } catch (e) {
        this.render({ error: "Invalid JSON in attribute" });
      }
    }
  }

  /**
   * Sets the JSON data to be displayed in the viewer.
   *
   * @param {object} json - The JSON object to display.
   */
  set data(json) {
    this.render(json);
  }

  /**
   * Gets the JSON data currently displayed in the viewer.
   *
   * @returns {object | null} The JSON object, or null if invalid.
   */
  get data() {
    try {
      return JSON.parse(this._pre.textContent);
    } catch {
      return null;
    }
  }

  /**
   * Renders the provided JSON data in the viewer.
   *
   * @param {object} json - The JSON object to render.
   */
  render(json) {
    if (typeof json !== "object" || json === null) {
      this._pre.textContent = "Invalid JSON data";
      return;
    }
    this._pre.textContent = JSON.stringify(json, null, 2);
  }

  /**
   * Shows the JSON viewer by adding the `visible` class.
   */
  show() {
    this.classList.add("visible");
  }

  /**
   * Hides the JSON viewer by removing the `visible` class.
   */
  hide() {
    this.classList.remove("visible");
  }
}

// Define the custom element
customElements.define("json-viewer", JsonViewer);
