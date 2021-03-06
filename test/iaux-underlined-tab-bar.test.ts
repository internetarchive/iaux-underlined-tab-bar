import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import type { UnderlinedTabBar } from '../src/ia-underlined-tab-bar';
import '../src/ia-underlined-tab-bar';

describe('UnderlinedTabBar', () => {
  it('has a list tag', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar></ia-underlined-tab-bar>`
    );

    const list = el.shadowRoot?.querySelector('ul');
    expect(list).to.exist;
  });

  it('has the correct number of list items', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></ia-underlined-tab-bar>`
    );

    const list = el.shadowRoot?.querySelectorAll('li');
    expect(list?.length).to.equal(2);
  });

  it('has no list items when no entries are given', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar></ia-underlined-tab-bar>`
    );

    const list = el.shadowRoot?.querySelector('li');
    expect(list).to.not.exist;
  });

  it('emits an event when item is clicked on', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></ia-underlined-tab-bar>`
    );

    const button = el.shadowRoot?.querySelector('button');
    const listener = oneEvent(el, 'itemclicked');
    button?.click();
    const { detail } = await listener;
    expect(detail.index).to.equal(0);
  });

  it('initially does not contain an active class', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar .entries=${[]}></ia-underlined-tab-bar>`
    );

    const buttons = el.shadowRoot?.querySelectorAll('button');
    await el.updateComplete;
    buttons?.forEach(button => {
      expect(button?.classList.contains('active')).to.be.true;
    });
  });

  it('has active class by default', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></ia-underlined-tab-bar>`
    );

    const button = el.shadowRoot?.querySelector('button');
    await el.updateComplete;
    expect(button?.classList.contains('active')).to.be.true;
  });

  it('adds active class to item clicked', async () => {
    const el = await fixture<UnderlinedTabBar>(
      html`<ia-underlined-tab-bar
        .entries=${[{ displayName: 'UPLOADS' }, { displayName: 'POSTS' }]}
      ></ia-underlined-tab-bar>`
    );

    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;
    expect(button?.classList.contains('active')).to.be.true;
  });

  describe('LoadingState', () => {
    it('produces loading state when button is set to true', async () => {
      const el = await fixture<UnderlinedTabBar>(
        html`<ia-underlined-tab-bar ?isLoading=${true}></ia-underlined-tab-bar>`
      );

      const loader = el.shadowRoot?.querySelector('#loadingState');
      expect(loader).to.exist;
    });

    it('doesnt produce loading state when button is set to false', async () => {
      const el = await fixture<UnderlinedTabBar>(
        html`<ia-underlined-tab-bar
          ?isLoading=${false}
        ></ia-underlined-tab-bar>`
      );

      const loader = el.shadowRoot?.querySelector('#loadingState');
      expect(loader).to.not.exist;
    });

    it('defaults to no loading state', async () => {
      const el = await fixture<UnderlinedTabBar>(
        html`<ia-underlined-tab-bar></ia-underlined-tab-bar>`
      );

      const loader = el.shadowRoot?.querySelector('#loadingState');
      expect(loader).to.not.exist;
    });
  });
});
