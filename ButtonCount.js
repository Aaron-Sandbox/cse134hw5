class ButtonCount extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
        this.root.appendChild(document.createElement('button'));

        this.count = 0;
        this.updateDisplay = this.updateDisplay.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.updateDisplay();
        this.root.querySelector('button').addEventListener('click', this.handleClick);
    }

    updateDisplay() {
        this.root.querySelector('button').textContent = `Times Clicked: ${this.count}`;
    }

    handleClick() {
        this.count++;
        this.updateDisplay();
    }
}

window.customElements.define('button-count', ButtonCount);