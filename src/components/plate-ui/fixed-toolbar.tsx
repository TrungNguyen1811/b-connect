import { withCn } from '@udecode/cn'

import { Toolbar } from './toolbar'

export const FixedToolbar = withCn(
  Toolbar,
  'supports-backdrop-blur:bg-background/60 sticky left-0 top-[0px] w-full justify-between overflow-x-auto z-10 rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur bg-gray-300',
)
