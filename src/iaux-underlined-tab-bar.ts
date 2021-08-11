import {
  html,
  css,
  LitElement,
  property,
  customElement,
  query,
  queryAll,
  PropertyValues,
  internalProperty,
  CSSResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import './iaux-underlined-tab-bar-loading-dots';

export interface TopTab {
  displayName: string;
  tabTitle?: string;
}

@customElement('iaux-underlined-tab-bar')
export class UnderlinedTabBar extends LitElement {
  @property({ type: Array }) entries: TopTab[] = [];

  @property({ type: String }) title = 'Hey There';

  @property({ type: Number }) counter = 0;

  @property({ type: Number }) selectedIndex = 0;

  @property({ type: Number }) widthMultiplier = 0.8;

  @property({ type: Boolean }) isLoading = false;

  @internalProperty() firstAnimationLine = false;

  @query('.horizontalScroll') container!: HTMLDivElement;

  @queryAll('button') listOfButtons!: HTMLButtonElement[];

  private itemClicked(e: Event, index: number) {
    const event = new CustomEvent('itemclicked', {
      detail: {
        index,
      },
    });
    const indexDistance = Math.abs(this.selectedIndex - index);
    const animationTime = Math.min(0.25 * indexDistance, 0.5);
    this.style.setProperty('--underlineAnimationDuration', `${animationTime}s`);
    this.selectedIndex = index;
    this.dispatchEvent(event);
    this.firstAnimationLine = true;
  }

  private updateUnderline() {
    const buttonSelected = this.listOfButtons[this.selectedIndex];
    if (!buttonSelected) return;
    const boundingRect = buttonSelected.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const containerDiff = boundingRect.x - containerRect.x;

    const lineWidth = boundingRect.width * this.widthMultiplier;

    const centerLineMargin = (boundingRect.width - lineWidth) / 2;
    const underlineLeft =
      containerDiff + centerLineMargin + this.container.scrollLeft;
    this.style.setProperty('--underlineLeftPosition', `${underlineLeft}px`);
    this.style.setProperty('--underlineWidth', `${lineWidth}px`);
  }

  updated(changed: PropertyValues) {
    if (changed.has('selectedIndex') || changed.has('widthMultiplier')) {
      this.updateUnderline();
    }
  }

  render() {
    return html`
      <div class="headD">
        <div class="horizontalScroll">
          <ul class="headding">
            ${this.entries.map(
              (entry, index) =>
                html`
                  <li>
                    <button
                      @click=${(e: Event) => this.itemClicked(e, index)}
                      class=${index === this.selectedIndex ? 'active' : ''}
                    >
                      ${entry.displayName}
                    </button>
                  </li>
                `
            )}
            ${this.isLoading
              ? html`<div id="loadingState">
                  <iaux-underlined-tab-bar-loading-dots></iaux-underlined-tab-bar-loading-dots>
                </div>`
              : nothing}
          </ul>
          <div
            class="underLine ${this.firstAnimationLine ? 'animation' : ''}"
          ></div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    const lineThicknessCss = css`var(--underLineThick, 5px)`;
    const mainBackgroundColorCss = css`var(--mainBackgroundColor)`;
    const tabTextColorCss = css`var(--tabTextColor)`;
    const underlineColorCss = css`var(--underlineColor)`;
    return css`
      .horizontalScroll {
        padding-bottom: 10px;
        overflow-x: auto;
        overflow-y: hidden;
      }

      #loadingState {
        text-align: center;
        width: 65px;
        height: 17px;
        background-color: none;
        margin-top: 12px;
        margin-left: 10px;
        color: white;
      }

      .underLine {
        position: relative;
        width: var(--underlineWidth, 0px);
        height: ${lineThicknessCss};
        top: 0px;
        left: var(--underlineLeftPosition, 0px);
        background-color: ${underlineColorCss};
        border-radius: calc(${lineThicknessCss} / 2);
      }

      .underLine.animation {
        transition-property: left, width;
        transition-delay: 0;
        transition-duration: var(--underlineAnimationDuration, 0.6s);
      }

      .headD {
        background-color: ${mainBackgroundColorCss};
        height: 70px;
        width: 100%;
        padding-top: 10px;
        color: white;
        font-size: 18px;
        margin-top: 5px;
      }
      .headD ul {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 0;
        padding-left: 10;
      }

      .headding li {
        display: inline;
        font-size: 15px;
        font-family: Ariauxl, Helvetica, sans-serif;
      }

      button:hover {
        cursor: pointer;
      }

      button {
        background: none;
        border: none;
        display: inline;
        color: ${tabTextColorCss};
        background-color: ${mainBackgroundColorCss};
        font-size: 15px;
        font-family: Ariauxl, Helvetica, sans-serif;
        padding: 10px;
        white-space: nowrap;
      }
      :host {
        display: block;
        color: var(--your-webcomponent-text-color, #000);
      }
    `;
  }
}
