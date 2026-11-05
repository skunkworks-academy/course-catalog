import React, {type ComponentProps} from 'react';
import OriginalComponents from '@theme-original/MDXComponents';

// Infima makes wide Markdown tables scroll containers. Give keyboard users
// a focus target without changing table semantics or the shared design tokens.
function KeyboardTable(props: ComponentProps<'table'>) {
  return <table tabIndex={0} {...props} />;
}

export default {...OriginalComponents, table: KeyboardTable};
