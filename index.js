class UIBuilder {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.propertiesPanel = document.getElementById("properties-panel");
    this.previewModal = document.getElementById("preview-modal");
    this.previewContainer = document.getElementById("preview-container");
    this.selectedElement = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll(".component-item").forEach((item) => {
      item.addEventListener("dragstart", this.handleDragStart.bind(this));
    });

    this.canvas.addEventListener("dragover", this.handleDragOver.bind(this));
    this.canvas.addEventListener("drop", this.handleDrop.bind(this));
    this.canvas.addEventListener("dragleave", this.handleDragLeave.bind(this));

    this.canvas.addEventListener("click", (e) => {
      if (e.target === this.canvas) {
        this.deselectElement();
      }
    });

    // Preview functionality
    document.getElementById("previewBtn").addEventListener("click", () => {
      this.showPreview();
    });

    document.querySelector(".close-btn").addEventListener("click", () => {
      this.hidePreview();
    });

    // Responsive design controls
    document.querySelectorAll(".device-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchDevice(e.currentTarget.dataset.device);
      });
    });
  }

  switchDevice(device) {
    document.querySelectorAll(".device-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-device="${device}"]`).classList.add("active");

    this.canvas.classList.remove("desktop", "tablet", "mobile");
    if (device !== "desktop") {
      this.canvas.classList.add(device);
    }
  }

  showPreview() {
    this.previewContainer.innerHTML = this.canvas.innerHTML;
    this.previewModal.classList.add("active");
  }

  hidePreview() {
    this.previewModal.classList.remove("active");
  }

  handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.type);
  }

  handleDragOver(e) {
    e.preventDefault();
    this.canvas.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.canvas.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    this.canvas.classList.remove("dragover");

    const componentType = e.dataTransfer.getData("text/plain");
    const element = this.createComponent(componentType);

    if (element) {
      const placeholder = this.canvas.querySelector(".canvas-placeholder");
      if (placeholder) {
        placeholder.remove();
      }

      this.canvas.appendChild(element);
      this.selectElement(element);
    }
  }

  createComponent(type) {
    const element = document.createElement("div");
    element.classList.add("element");
    element.dataset.type = type;

    switch (type) {
      case "heading":
        element.innerHTML = '<h2 style="margin: 0;">New Heading</h2>';
        break;
      case "text":
        element.innerHTML = '<p style="margin: 0;">New text block</p>';
        break;
      case "button":
        element.innerHTML = "<button>New Button</button>";
        break;
      case "image":
        element.innerHTML =
          '<img src="https://via.placeholder.com/300x200" alt="Placeholder">';
        break;
      default:
        return null;
    }

    element.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectElement(element);
    });

    return element;
  }

  selectElement(element) {
    if (this.selectedElement) {
      this.selectedElement.classList.remove("selected");
    }

    this.selectedElement = element;
    element.classList.add("selected");
    this.updatePropertiesPanel();
  }

  deselectElement() {
    if (this.selectedElement) {
      this.selectedElement.classList.remove("selected");
      this.selectedElement = null;
      this.propertiesPanel.innerHTML =
        '<div class="no-selection">No element selected</div>';
    }
  }

  createSpacingControls(title, property, computedStyle) {
    return `
      <div class="property-section">
        <h3>${title}</h3>
        <div class="property-group spacing-controls">
          <div class="spacing-item">
            <label class="property-label">Top</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle[property + "Top"]
            )}"
              oninput="document.querySelector('.selected').style[\'${property}Top\'] = this.value + 'px'"
              min="0" max="100">
          </div>
          <div class="spacing-item">
            <label class="property-label">Right</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle[property + "Right"]
            )}"
              oninput="document.querySelector('.selected').style[\'${property}Right\'] = this.value + 'px'"
              min="0" max="100">
          </div>
          <div class="spacing-item">
            <label class="property-label">Bottom</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle[property + "Bottom"]
            )}"
              oninput="document.querySelector('.selected').style[\'${property}Bottom\'] = this.value + 'px'"
              min="0" max="100">
          </div>
          <div class="spacing-item">
            <label class="property-label">Left</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle[property + "Left"]
            )}"
              oninput="document.querySelector('.selected').style[\'${property}Left\'] = this.value + 'px'"
              min="0" max="100">
          </div>
        </div>
      </div>
    `;
  }

  createBorderRadiusControls(computedStyle) {
    return `
      <div class="property-section">
        <h3>Border Radius</h3>
        <div class="property-group spacing-controls">
          <div class="spacing-item">
            <label class="property-label">Top Left</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle.borderTopLeftRadius
            )}"
              oninput="document.querySelector('.selected').style.borderTopLeftRadius = this.value + 'px'"
              min="0" max="50">
          </div>
          <div class="spacing-item">
            <label class="property-label">Top Right</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle.borderTopRightRadius
            )}"
              oninput="document.querySelector('.selected').style.borderTopRightRadius = this.value + 'px'"
              min="0" max="50">
          </div>
          <div class="spacing-item">
            <label class="property-label">Bottom Left</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle.borderBottomLeftRadius
            )}"
              oninput="document.querySelector('.selected').style.borderBottomLeftRadius = this.value + 'px'"
              min="0" max="50">
          </div>
          <div class="spacing-item">
            <label class="property-label">Bottom Right</label>
            <input type="number" class="property-input" value="${parseInt(
              computedStyle.borderBottomRightRadius
            )}"
              oninput="document.querySelector('.selected').style.borderBottomRightRadius = this.value + 'px'"
              min="0" max="50">
          </div>
        </div>
      </div>
    `;
  }

  getCommonStyleControls() {
    const element = this.selectedElement;
    const computedStyle = window.getComputedStyle(element);
    const contentElement = element.querySelector("h2, p, button");

    return `
      ${this.createSpacingControls("Padding", "padding", computedStyle)}
      ${this.createSpacingControls("Margin", "margin", computedStyle)}

      <div class="property-section">
        <h3>Typography</h3>
        <div class="property-group">
          <label class="property-label">Font Size (px)</label>
          <input type="number" class="property-input" value="${parseInt(
            computedStyle.fontSize
          )}"
            oninput="document.querySelector('.selected').querySelector('h2, p, button').style.fontSize = this.value + 'px'"
            min="8" max="72">
        </div>
        <div class="property-group">
          <label class="property-label">Font Weight</label>
          <select class="property-input" 
            onchange="document.querySelector('.selected').querySelector('h2, p, button').style.fontWeight = this.value">
            <option value="normal" ${
              contentElement && contentElement.style.fontWeight === "normal"
                ? "selected"
                : ""
            }>Normal</option>
            <option value="bold" ${
              contentElement && contentElement.style.fontWeight === "bold"
                ? "selected"
                : ""
            }>Bold</option>
          </select>
        </div>
        <div class="property-group">
          <label class="property-label">Text Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.color)}"
            oninput="document.querySelector('.selected').querySelector('h2, p, button').style.color = this.value">
        </div>
      </div>

      <div class="property-section">
        <h3>Background</h3>
        <div class="property-group">
          <label class="property-label">Background Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.backgroundColor)}"
            oninput="document.querySelector('.selected').style.backgroundColor = this.value">
        </div>
      </div>

      <div class="property-section">
        <h3>Border</h3>
        <div class="property-group">
          <label class="property-label">Border Width (px)</label>
          <input type="number" class="property-input" value="${parseInt(
            computedStyle.borderWidth
          )}"
            oninput="document.querySelector('.selected').style.borderWidth = this.value + 'px'"
            min="0" max="20">
        </div>
        <div class="property-group">
          <label class="property-label">Border Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.borderColor)}"
            oninput="document.querySelector('.selected').style.borderColor = this.value">
        </div>
        <div class="property-group">
          <label class="property-label">Border Style</label>
          <select class="property-input" 
            oninput="document.querySelector('.selected').style.borderStyle = this.value">
            <option value="none" ${
              computedStyle.borderStyle === "none" ? "selected" : ""
            }>None</option>
            <option value="solid" ${
              computedStyle.borderStyle === "solid" ? "selected" : ""
            }>Solid</option>
            <option value="dashed" ${
              computedStyle.borderStyle === "dashed" ? "selected" : ""
            }>Dashed</option>
            <option value="dotted" ${
              computedStyle.borderStyle === "dotted" ? "selected" : ""
            }>Dotted</option>
          </select>
        </div>
      </div>

      ${this.createBorderRadiusControls(computedStyle)}
    `;
  }

  rgbToHex(rgb) {
    if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)")
      return "#000000";
    const rgbArr = rgb.match(/\d+/g);
    if (!rgbArr) return "#000000";
    return (
      "#" +
      rgbArr.map((x) => parseInt(x).toString(16).padStart(2, "0")).join("")
    );
  }

  updatePropertiesPanel() {
    const type = this.selectedElement.dataset.type;
    let propertiesHtml = "";

    switch (type) {
      case "heading":
      case "text":
        const content =
          type === "heading"
            ? this.selectedElement.querySelector("h2").innerHTML
            : this.selectedElement.querySelector("p").innerHTML;
        propertiesHtml = `
          <div class="property-section">
            <h3>Content</h3>
            <div class="property-group">
              <label class="property-label">Text Content</label>
              <textarea class="property-input" rows="3"
                oninput="document.querySelector('.selected ${
                  type === "heading" ? "h2" : "p"
                }').innerHTML = this.value"
              >${content}</textarea>
            </div>
          </div>
        `;
        break;
      case "button":
        propertiesHtml = `
          <div class="property-section">
            <h3>Button Properties</h3>
            <div class="property-group">
              <label class="property-label">Button Text</label>
              <input type="text" class="property-input" value="${
                this.selectedElement.querySelector("button").innerHTML
              }"
                oninput="document.querySelector('.selected button').innerHTML = this.value">
            </div>
            <div class="property-group">
              <label class="property-label">Width (px)</label>
              <input type="number" class="property-input" value="${parseInt(
                window.getComputedStyle(
                  this.selectedElement.querySelector("button")
                ).width
              )}"
                oninput="document.querySelector('.selected button').style.width = this.value + 'px'"
                min="50" max="500">
            </div>
            <div class="property-group">
              <label class="property-label">Height (px)</label>
              <input type="number" class="property-input" value="${parseInt(
                window.getComputedStyle(
                  this.selectedElement.querySelector("button")
                ).height
              )}"
                oninput="document.querySelector('.selected button').style.height = this.value + 'px'"
                min="30" max="200">
            </div>
            <div class="property-group">
              <label class="property-label">Text Alignment</label>
              <select class="property-input" 
                onchange="document.querySelector('.selected button').style.textAlign = this.value">
                <option value="left">Left</option>
                <option value="center" selected>Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div class="property-group">
              <label class="property-label">Font Weight</label>
              <select class="property-input" 
                onchange="document.querySelector('.selected button').style.fontWeight = this.value">
                <option value="100">Thin</option>
                <option value="300">Light</option>
                <option value="400" selected>Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi-Bold</option>
                <option value="700">Bold</option>
                <option value="900">Extra Bold</option>
              </select>
            </div>
          </div>
        `;
        break;
      case "image":
        propertiesHtml = `
          <div class="property-section">
            <h3>Image Properties</h3>
            <div class="property-group">
              <label class="property-label">Image URL</label>
              <input type="text" class="property-input" value="${
                this.selectedElement.querySelector("img").src
              }"
                oninput="document.querySelector('.selected img').src = this.value">
            </div>
            <div class="property-group">
              <label class="property-label">Alt Text</label>
              <input type="text" class="property-input" value="${
                this.selectedElement.querySelector("img").alt
              }"
                oninput="document.querySelector('.selected img').alt = this.value">
            </div>
          </div>
        `;
        break;
    }

    propertiesHtml += this.getCommonStyleControls();
    this.propertiesPanel.innerHTML = propertiesHtml;
  }

  getCommonStyleControls() {
    const element = this.selectedElement;
    const computedStyle = window.getComputedStyle(element);
    const contentElement = element.querySelector("h2, p, button, img");

    return `
      ${this.createSpacingControls("Padding", "padding", computedStyle)}
      ${this.createSpacingControls("Margin", "margin", computedStyle)}

      <div class="property-section">
        <h3>Alignment</h3>
        <div class="property-group">
          <label class="property-label">Horizontal Alignment</label>
          <select class="property-input" 
            onchange="document.querySelector('.selected').style.justifyContent = this.value">
            <option value="flex-start">Start (Left)</option>
            <option value="center">Center</option>
            <option value="flex-end">End (Right)</option>
          </select>
        </div>
      </div>

      <div class="property-section">
        <h3>Typography</h3>
        <div class="property-group">
          <label class="property-label">Font Size (px)</label>
          <input type="number" class="property-input" value="${parseInt(
            computedStyle.fontSize
          )}"
            oninput="document.querySelector('.selected').querySelector('h2, p, button, img').style.fontSize = this.value + 'px'"
            min="8" max="72">
        </div>
        <div class="property-group">
          <label class="property-label">Font Weight</label>
          <select class="property-input" 
            onchange="document.querySelector('.selected').querySelector('h2, p, button').style.fontWeight = this.value">
            <option value="100">Thin</option>
            <option value="300">Light</option>
            <option value="400" selected>Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semi-Bold</option>
            <option value="700">Bold</option>
            <option value="900">Extra Bold</option>
          </select>
        </div>
        <div class="property-group">
          <label class="property-label">Text Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.color)}"
            oninput="document.querySelector('.selected').querySelector('h2, p, button').style.color = this.value">
        </div>
      </div>

      <div class="property-section">
        <h3>Background</h3>
        <div class="property-group">
          <label class="property-label">Background Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.backgroundColor)}"
            oninput="document.querySelector('.selected').style.backgroundColor = this.value">
        </div>
      </div>

      <div class="property-section">
        <h3>Border</h3>
        <div class="property-group">
          <label class="property-label">Border Width (px)</label>
          <input type="number" class="property-input" value="${parseInt(
            computedStyle.borderWidth
          )}"
            oninput="document.querySelector('.selected').style.borderWidth = this.value + 'px'"
            min="0" max="20">
        </div>
        <div class="property-group">
          <label class="property-label">Border Color</label>
          <input type="color" class="property-input" 
            value="${this.rgbToHex(computedStyle.borderColor)}"
            oninput="document.querySelector('.selected').style.borderColor = this.value">
        </div>
        <div class="property-group">
          <label class="property-label">Border Style</label>
          <select class="property-input" 
            oninput="document.querySelector('.selected').style.borderStyle = this.value">
            <option value="none" ${
              computedStyle.borderStyle === "none" ? "selected" : ""
            }>None</option>
            <option value="solid" ${
              computedStyle.borderStyle === "solid" ? "selected" : ""
            }>Solid</option>
            <option value="dashed" ${
              computedStyle.borderStyle === "dashed" ? "selected" : ""
            }>Dashed</option>
            <option value="dotted" ${
              computedStyle.borderStyle === "dotted" ? "selected" : ""
            }>Dotted</option>
          </select>
        </div>
      </div>

      ${this.createBorderRadiusControls(computedStyle)}
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new UIBuilder();
});
