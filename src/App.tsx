import { Card, Typography } from '@supabase/ui'
import React from 'react';
import Configurator from './Configurator';

function App() {
  return (
    <div>
      <div className="w-screen min-h-screen bg-neutral-800 flex items-center justify-center flex-col p-8 dark">
        
        <img src="/smarketer_white.svg" alt="smarketer logo" className="w-16 mb-8" />
        <Typography.Title level={1} className="font-bold !text-xl">
          Smarketer Tag Manager Template Generator
        </Typography.Title>

        <Configurator />

        <div className="mt-3 text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} Smarketer GmbH |
          &nbsp;
          <a href="https://www.smarketer.de/impressum/" className='underline'>Impressum</a> |
          &nbsp;
          <a href="https://www.smarketer.de/datenschutzerklaerung/" className='underline'>Datenschutz</a>
        </div>
      </div>
    </div>
  );
}

export default App;
