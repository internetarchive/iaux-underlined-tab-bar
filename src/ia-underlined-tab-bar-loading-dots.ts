import { html, css, LitElement, customElement, CSSResult } from 'lit-element';

@customElement('ia-underlined-tab-bar-loading-dots')
export class LoadingDots extends LitElement {
  render() {
    return html`
      <span class="spinnyCircle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
    `;
  }

  static get styles(): CSSResult {
    const loadingDotColorCSS = css`var(--tabBarLoadingDotColor)`;
    const loadingDotDiameterCSS = css`var(--tabBarLoadingDotDiameter, 10px)`;
    const loadingDotSpacingCSS = css`var(--tabBarLoadingDotSpacing, 14px)`;
    const loadingDotCountCSS = css`var(--tabBarLoadingDotCount, 3)`;
    const loadingDotSpaceCountCSS = css`var(--tabBarLoadingDotSpaceCount, calc(${loadingDotCountCSS}-1))`;
    const loadingDotTotalSpacingCSS = css`var(--tabBarLoadingDotTotalSpacing, calc(${loadingDotDiameterCSS} + ${loadingDotSpacingCSS}))`;
    return css`
      .spinnyCircle {
        display: block;
        position: relative;
        width: calc(
          ${loadingDotCountCSS}*${loadingDotDiameterCSS}+ (${loadingDotSpaceCountCSS}*${loadingDotSpacingCSS})
        );
        height: ${loadingDotDiameterCSS};
      }
      .spinnyCircle div {
        position: absolute;
        width: ${loadingDotDiameterCSS};
        height: ${loadingDotDiameterCSS};
        border-radius: 50%;
        background-color: ${loadingDotColorCSS};
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .spinnyCircle div:nth-child(1) {
        left: 0px;
        animation: spinnyCircle1 0.6s infinite;
      }
      .spinnyCircle div:nth-child(2) {
        left: 0px;
        animation: spinnyCircle2 0.6s infinite;
      }
      .spinnyCircle div:nth-child(3) {
        left: ${loadingDotTotalSpacingCSS};
        animation: spinnyCircle2 0.6s infinite;
      }
      .spinnyCircle div:nth-child(4) {
        left: calc(2 * ${loadingDotTotalSpacingCSS});
        animation: spinnyCircle3 0.6s infinite;
      }
      @keyframes spinnyCircle1 {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes spinnyCircle3 {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }
      @keyframes spinnyCircle2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(${loadingDotTotalSpacingCSS}, 0);
        }
      }
    `;
  }
}
