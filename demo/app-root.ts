import { html, css, LitElement, customElement, query } from 'lit-element';
import '../src/iaux-underlined-tab-bar';
import type { UnderlinedTabBar } from '../src/iaux-underlined-tab-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('iaux-underlined-tab-bar') tabBar!: UnderlinedTabBar;

  private itemClicked(e: CustomEvent) {
    console.log(e);
    console.log(e.detail.index);
  }

  private doSomething() {
    this.tabBar.entries = [
      { displayName: 'CHANGE' },
      { displayName: 'TITLE' },
      { displayName: 'OPTIONS' },
      { displayName: 'ACITIVE' },
    ];
  }

  private loadControl() {
    console.log(this.tabBar.isLoading);
    this.tabBar.isLoading = !this.tabBar.isLoading;
  }

  private indexSelect() {
    this.tabBar.selectedIndex = Math.floor(Math.random() * 6);
  }

  private underlineWideInc() {
    this.tabBar.widthMultiplier += 0.1;
  }

  private underlineWideDec() {
    this.tabBar.widthMultiplier -= 0.1;
  }

  render() {
    return html`
      <button @click=${this.doSomething}>change options</button>
      <button @click=${this.loadControl}>load on/off</button>
      <button @click=${this.indexSelect}>index select</button>
      <button @click=${this.underlineWideInc}>line width increase</button>
      <button @click=${this.underlineWideDec}>line width decrease</button>

      <iaux-underlined-tab-bar
        @itemclicked=${this.itemClicked}
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
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }

    iaux-underlined-tab-bar {
      --underLineThick: 5px;
      --mainBackgroundColor: #a38064;
      --tabTextColor: #e9ecf0;
      --underlineColor: #e9ecf0;
    }

    iaux-underlined-tab-bar {
      --loadingDotColor: #e9ecf0;
    }
  `;
}
