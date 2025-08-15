import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


/*
React doesn't directly update the real DOM (browser’s HTML elements) every time you change state.
Instead, it creates a Virtual DOM — a lightweight JavaScript object that mimics the real DOM.
When something changes (like a state update), React:
1. Re-creates a new Virtual DOM
2. Diffs it with the previous one
3. Calculates the minimal changes
4. Efficiently updates only the parts of the real DOM that changed
This is what makes React fast and efficient.

createRoot(container) initializes React’s root and sets up the connection between React’s Virtual DOM and the real DOM container.
.render(element) tells React to build the Virtual DOM from the given element and efficiently update the real DOM inside that container.
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*
In vanilla JS, when you change pages or content, the browser usually reloads the whole page and rebuilds the entire DOM tree from scratch, which 
takes time and causes the page to flicker or refresh.
In React, instead of rebuilding the whole DOM, it uses a Virtual DOM — a lightweight copy in memory — to figure out exactly what changed. 
Then React updates only those parts in the real DOM, so the page updates smoothly without a full reload.

1. Reconciliation
It’s the process React uses to update the UI efficiently.
When your app’s state or props change, React needs to figure out what changed and update the real DOM accordingly.
Reconciliation compares the new Virtual DOM tree with the old one and decides what updates are necessary.
2. Diffing Algorithm
This is the algorithm React uses during reconciliation.
It compares two Virtual DOM trees (old vs new) to find differences quickly.
Instead of comparing every single node deeply (which would be slow), React uses smart heuristics:
It compares elements at the same level
It assumes elements with different types are completely different
It reuses components when possible
The result: React knows exactly what parts of the real DOM to change.
3. Fiber
Fiber is React’s internal data structure and reimplementation of the reconciliation algorithm introduced in React 16.
It breaks rendering work into small units of work (fibers).
Allows React to pause, resume, or prioritize work (enabling concurrent rendering).
Helps React keep the UI responsive, especially during large or complex updates.
*/


