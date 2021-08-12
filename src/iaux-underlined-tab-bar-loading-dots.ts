import { html, css, LitElement, customElement, CSSResult } from 'lit-element';

@customElement('iaux-underlined-tab-bar-loading-dots')
export class LoadingDots extends LitElement {
  render() {
    return html`
      <div class="spinnyCircle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    const loadingDotColorCSS = css`var(--tabBarLoadingDotColor)`;
    return css`
      .spinnyCircle {
        display: block;
        position: relative;
        width: 58px;
        height: 10px;
      }
      .spinnyCircle div {
        position: absolute;
        width: 10px;
        height: 10px;
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
        left: 24px;
        animation: spinnyCircle2 0.6s infinite;
      }
      .spinnyCircle div:nth-child(4) {
        left: 48px;
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
          transform: translate(24px, 0);
        }
      }
    `;
  }
}
