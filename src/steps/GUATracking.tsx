import { Card, Typography, Checkbox, Input } from '@supabase/ui'
import React from 'react';
import NextStepButton from '../components/NextStepButton';
import Configurator from '../Configurator';
import GoogleAdsModule from '../modules/GoogleAdsModule';
import GoogleUAModule from '../modules/GoogleUAModule';

function GUATracking({ configurator, mod } : { configurator: Configurator, mod: GoogleUAModule }) {
  const [namePrefix, setNamePrefix] = React.useState(mod.namePrefix);
  const [uaId, setUaId] = React.useState(mod.uaId);

  return (
    <div>
      <Typography.Title level={2} className="font-bold !text-xl">
        Google Analytics Conversion Tracking
      </Typography.Title>

      <Input 
        label="UA ID"
        descriptionText="The UA ID identifies your Google Analytics Account. You can find it in the Analytics Dashboard."
        value={uaId}
        onChange={e => setUaId(e.target.value)}
        placeholder='UA-XXXXXXXX-X'
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
          mod.uaId = uaId;
          configurator.goToModulesPage();
        }}
      />
    </div>
  );
}

export default GUATracking;
