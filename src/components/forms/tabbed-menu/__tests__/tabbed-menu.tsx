import React from 'react';
import renderer from 'react-test-renderer';
import { TabbedMenuProps, TabbedMenuViewType, TabbedMenu } from '../index';

function performRender(props: Omit<TabbedMenuProps, 'views'>) {
  const tree = renderer
    .create(<TabbedMenu {...props} views={TEST_VIEW_ITEMS} />)
    .toJSON()
  return {
    tabs: tree.children[0].children,
    tab: tree.children[1].children[0],
  }
}

enum TestViews {
  FOO = 'foo',
  BAR = 'bar',
  BAZ = 'baz',
}

const TEST_VIEW_ITEMS: { [key in TestViews]: TabbedMenuViewType } = {
  [TestViews.FOO]: {
    key: 'Foo',
    children: () => <p>foo</p>
  },
  [TestViews.BAR]: {
    key: 'Bar',
    children: () => <p>bar</p>
  },
  [TestViews.BAZ]: {
    key: 'Baz',
    children: () => <p>baz</p>
  },
}

describe('tabbed-menu', () => {
  it('renders each tab in sidebar', () => {
    const tree = performRender({ active: TestViews.FOO })

    Object.entries(TEST_VIEW_ITEMS)
      .forEach(([key, val]) => {
        const exists = tree.tabs.find((i) => i.children[0] === val.key)
        expect(exists).toBeTruthy()
      })
  })

  it('highlights the active tab in the sidebar', () => {
    Object.values(TestViews)
      .forEach((key) => {
        const tree = performRender({ active: key })
        const selected = tree.tabs.find(tab => tab.props.className === 'selected')
        expect(selected).toBeTruthy()
        expect(selected.children[0]).toBe(TEST_VIEW_ITEMS[key].key)
      })
  })

  it("doesn't highlight multiple active tabs on the sidebar at once", () => {
    Object.values(TestViews)
      .forEach((key) => {
        const tree = performRender({ active: key })
        const selected = tree.tabs.filter(
          tab => tab.props.className === 'selected')
        expect(selected.length).toBe(1)
      })
  })

  it('renders the active tab', () => {
    Object.values(TestViews)
      .forEach((key) => {
        const tree = performRender({ active: key })
        const shouldBe = renderer
          .create(TEST_VIEW_ITEMS[key].children())
          .toJSON()

        expect(tree.tab).toEqual(shouldBe)
      })
  })
})
