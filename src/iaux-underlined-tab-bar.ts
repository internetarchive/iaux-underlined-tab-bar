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

  @property({ type: Number }) selectedIndex = 0;

  @property({ type: Number }) widthMultiplier = 0.8;

  @property({ type: Boolean }) isLoading = false;

  @property({ type: Number }) minAnimationDuration = 0.25;

  @property({ type: Number }) maxAnimationDuration = 0.5;

  @internalProperty() animatedUnderline = false;

  @query('.horizontalScroll') container!: HTMLDivElement;

  @queryAll('button') listOfButtons!: HTMLButtonElement[];

  private itemClicked(e: Event, index: number) {
    const event = new CustomEvent('itemclicked', {
      detail: {
        index,
      },
    });
    const indexDistance = Math.abs(this.selectedIndex - index);
    const animationTime = Math.min(
      this.minAnimationDuration * indexDistance,
      this.maxAnimationDuration
    );
    this.style.setProperty(
      '--tabBarUnderlineAnimationDuration',
      `${animationTime}s`
    );
    this.selectedIndex = index;
    this.dispatchEvent(event);
    this.animatedUnderline = true;
  }

  private updateUnderline() {
    const selectedButton = this.listOfButtons[this.selectedIndex];
    if (!selectedButton) return;
    const boundingRect = selectedButton.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const containerDiff = boundingRect.x - containerRect.x;

    const lineWidth = boundingRect.width * this.widthMultiplier;

    const centerLineMargin = (boundingRect.width - lineWidth) / 2;
    const underlineLeft =
      containerDiff + centerLineMargin + this.container.scrollLeft;
    this.style.setProperty(
      '--tabBarUnderlineLeftPosition',
      `${underlineLeft}px`
    );
    this.style.setProperty('--tabBarUnderlineWidth', `${lineWidth}px`);
  }

  updated(changed: PropertyValues) {
    if (changed.has('selectedIndex') || changed.has('widthMultiplier')) {
      this.updateUnderline();
    }
  }

  render() {
    return html`
      <div class="head">
        <div class="horizontalScroll">
          <ul class="heading">
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
              ? html` <li>
                  <div id="loadingState">
                    <iaux-underlined-tab-bar-loading-dots></iaux-underlined-tab-bar-loading-dots>
                  </div>
                </li>`
              : nothing}
          </ul>
          <div
            class="underLine ${this.animatedUnderline ? 'animation' : ''}"
          ></div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    const lineThicknessCss = css`var(--tabBarUnderlineThickness, 5px)`;
    const tabFontSizeCss = css`var(--tabBarFontSize, 15px)`;
    const tabBarFontWeightCss = css`var(--tabBarFontWeight, 400)`;
    const tabTextColorCss = css`var(--tabBarTextColor)`;
    const underlineColorCss = css`var(--tabBarUnderlineColor)`;
    const tabBarSelectedTextColorCss = css`var(--tabBarSelectedTextColor)`;
    const tabBarHoverTextColorCss = css`var(--tabBarHoverTextColor)`;
    const buttonSpacingCss = css`var(--tabBarButtonSpacing, 10px)`;
    const underlineWidthCss = css`var(--tabBarUnderlineWidth, 0px)`;
    const tabBarUnderlineLeftPositionCss = css`var(--tabBarUnderlineLeftPosition, 0px)`;
    const tabBarUnderlineAnimationDurationCss = css`var(--tabBarUnderlineAnimationDuration, 0.6s)`;

    return css`
      .horizontalScroll {
        padding-bottom: 10px;
        overflow-x: auto;
        overflow-y: hidden;
      }

      #loadingState {
        text-align: center;
        background-color: none;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .underLine {
        position: relative;
        width: ${underlineWidthCss};
        height: ${lineThicknessCss};
        top: 0px;
        left: ${tabBarUnderlineLeftPositionCss};
        background-color: ${underlineColorCss};
        border-radius: calc(${lineThicknessCss} / 2);
      }

      .underLine.animation {
        transition-property: left, width;
        transition-delay: 0;
        transition-duration: ${tabBarUnderlineAnimationDurationCss};
      }

      .head ul {
        display: flex;
        flex-wrap: nowrap;
        margin: 0;
        padding: 0;
      }

      .heading li {
        margin-right: ${buttonSpacingCss};
        list-style: none;
      }

      li:last-child {
        margin-right: 0;
      }

      button:hover {
        cursor: pointer;
        color: ${tabBarHoverTextColorCss};
      }

      button {
        background: none;
        border: none;
        display: inline;
        color: ${tabTextColorCss};
        font-size: ${tabFontSizeCss};
        white-space: nowrap;
        font-weight: ${tabBarFontWeightCss};
      }

      button.active {
        color: ${tabBarSelectedTextColorCss};
      }

      :host {
        display: block;
      }
    `;
  }
}
