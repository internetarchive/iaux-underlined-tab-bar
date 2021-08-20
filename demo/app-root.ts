import { html, css, LitElement, customElement, query } from 'lit-element';
import '../src/iaux-underlined-tab-bar';
import type { UnderlinedTabBar } from '../src/iaux-underlined-tab-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('iaux-underlined-tab-bar') tabBar!: UnderlinedTabBar;

  private logEventDetails(e: CustomEvent) {
    console.log(e);
    console.log(e.detail.index);
  }

  private setEntries() {
    this.tabBar.entries = [
      { displayName: 'CHANGE' },
      { displayName: 'TITLE' },
      { displayName: 'OPTIONS' },
      { displayName: 'ACTIVE' },
    ];
  }

  private loadControl() {
    console.log(this.tabBar.isLoading);
    this.tabBar.isLoading = !this.tabBar.isLoading;
  }

  private setRandomIndex() {
    this.tabBar.selectedIndex = Math.floor(
      Math.random() * this.tabBar.entries.length
    );
  }

  private increaseUnderlineWidth() {
    this.tabBar.widthMultiplier += 0.1;
  }

  private decreaseUnderlineWidth() {
    this.tabBar.widthMultiplier -= 0.1;
  }

  private increaseMinAnimationDuration() {
    this.tabBar.minAnimationDuration += 1;
  }

  private increaseMaxAnimationDuration() {
    this.tabBar.maxAnimationDuration += 1;
  }

  render() {
    return html`
      <button @click=${this.setEntries}>change options</button>
      <button @click=${this.increaseMinAnimationDuration}>
        raise min animation time
      </button>
      <button @click=${this.increaseMaxAnimationDuration}>
        raise max animation time
      </button>

      <button @click=${this.loadControl}>load on/off</button>
      <button @click=${this.setRandomIndex}>index select</button>
      <button @click=${this.increaseUnderlineWidth}>line width increase</button>
      <button @click=${this.decreaseUnderlineWidth}>line width decrease</button>
      <div class="tab-bar-container">
        <iaux-underlined-tab-bar
          @itemclicked=${this.logEventDetails}
          .entries=${[
            { displayName: 'UPLOADS' },
            { displayName: 'POSTS' },
            { displayName: 'REVIEWS' },
            { displayName: 'COLLECTIONS' },
            { displayName: 'LOANS' },
            { displayName: 'WEB ARCHIVE' },
          ]}
        >
        </iaux-underlined-tab-bar>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
    }

    .tab-bar-container {
      height: 30px;
      background-color: none;
    }

    iaux-underlined-tab-bar {
      --tabBarUnderlineThickness: 5px;
      --tabBarTextColor: grey;
      --tabBarUnderlineColor: black;
      --tabBarFontSize: 14px;
      --tabBarLoadingDotColor: grey;
      --tabBarButtonSpacing: 10px;
      --tabBarSelectedTextColor: black;
      --tabBarFontWeight: 400;
      --tabBarLoadingDotDiameter: 10px;
      --tabBarLoadingDotSpacing: 14px;
    }
  `;
}
