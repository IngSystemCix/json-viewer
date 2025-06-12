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
        :host {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: blur(3px);
          transition: opacity 0.3s ease;
        }

        :host(.visible) {
          display: flex;
          opacity: 1;
        }

        .popup {
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          max-width: 80%;
          max-height: 80%;
          overflow: auto;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: fadeIn 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #888;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #333;
        }

        pre {
          text-align: left;
          white-space: pre-wrap;
          word-wrap: break-word;
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          color: #333;
          font-size: 14px;
          line-height: 1.4;
          overflow-x: auto;
        }
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
