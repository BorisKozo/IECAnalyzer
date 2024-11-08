import { createRoot } from 'react-dom/client';
import Main from "./Main";
import React from 'react';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<Main />);