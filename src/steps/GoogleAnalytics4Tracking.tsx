import { Card, Typography, Checkbox, Input } from '@supabase/ui'
import React from 'react';
import NextStepButton from '../components/NextStepButton';
import Configurator from '../Configurator';
import GoogleAnalytics4Module from '../modules/GoogleAnalytics4Module';

function GoogleAnalytics4Tracking({ configurator, mod } : { configurator: Configurator, mod: GoogleAnalytics4Module }) {
  const [namePrefix, setNamePrefix] = React.useState(mod.namePrefix);
  const [id, setId] = React.useState(mod.id);

  return (
    <div>
      <Typography.Title level={2} className="font-bold !text-xl">
        Google Analytics 4 Conversion Tracking
      </Typography.Title>

      <Input 
        label="ID"
        descriptionText="The ID identifies your Google Analytics Account. You can find it in the Analytics Dashboard."
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder='1234567890'
        className='mt-6'
      />
      <Input 
        label="Name Prefix (optional)"
        descriptionText="Name prefixes can be used to differentiate multiple Google Ads conversion tags. Leave this empty to not use a prefix."
        value={namePrefix}
        onChange={e => setNamePrefix(e.target.value)}
        className='mt-6'
      />
      
      <NextStepButton
        text="Save module"
        onClick={() => {
          mod.namePrefix = namePrefix;
          mod.id = id;
          configurator.goToModulesPage();
        }}
      />
    </div>
  );
}

export default GoogleAnalytics4Tracking;
