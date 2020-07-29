import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/index';

interface TooltipButtonProps {
  icon: IconDefinition,
  tooltip?: string,
  onClick?: VoidFunction,
  className?: string
}

/**
 * How many pixels a label MUST be off the edge of the screen.
 * this class guarantees it never goes beyond this limit.
 */
const CORNER_OFFSET = 6;

function goesBeforePage(el: HTMLElement, parentBounds: DOMRect, offset: number) {
  return parentBounds.x + offset < CORNER_OFFSET
}

function goesAfterPage(el: HTMLElement, parentBounds: DOMRect, _: number) {
  return parentBounds.x + el.offsetWidth - document.documentElement.offsetWidth > CORNER_OFFSET
}

/**
 * A component to render a clickable button to the DOM with an
 * optional tooltip that's shown when the button is hovered.
 */
export default function TooltipButton({tooltip, icon, className, ...props}: TooltipButtonProps) {
  const [offsets, setOffsets] = React.useState([0, null]);
  const labelStyle = {left: `${offsets[0]}px`}
  if (offsets[1]) {
    labelStyle['--pointer-offset'] = offsets[1];
  }

  // Adjust the position of the tooltip label such that it stays in the bounds
  // of the page.
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      const elem = ref.current as unknown as HTMLElement;
      const button = elem.parentElement as HTMLElement;
      const bounds = button.getBoundingClientRect();

      let offset = -(elem.offsetWidth - button.offsetWidth) / 2;
      let pointerOffset: any = null;
      if (goesBeforePage(elem, bounds, offset)) {
        offset = CORNER_OFFSET - bounds.x;
        pointerOffset = bounds.x + (button.offsetWidth / 2)
      } else if (goesAfterPage(elem, bounds, offset)) {
        offset = -elem.offsetWidth + bounds.width - CORNER_OFFSET
        // NOTE for some reason, right hand side works with pixels, left
        // with just units :?
        pointerOffset = `${elem.offsetWidth - (button.offsetWidth / 2)}px`
      }
      setOffsets([offset, pointerOffset]);
    }
  }, [ref.current])

  return (
    <div className={["tooltip", className].join(' ')} role="button" style={{cursor: (props.onClick) ? "pointer" : undefined}} >
      <FontAwesomeIcon {...props} icon={icon} className='icon' onClick={props.onClick} />
      {tooltip &&
        <span ref={ref} style={labelStyle} className="label">{tooltip}</span>}
    </div>
  )
}
