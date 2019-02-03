import React from 'react';
import { Provider } from './src/components/Context';
import 'what-input';
import './src/utils/theme.css';

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;
