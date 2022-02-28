import { Card, Typography, Checkbox, Input } from '@supabase/ui'
import React from 'react';
import NextStepButton from '../components/NextStepButton';
import Configurator from '../Configurator';
import MicrosoftAdsModule from '../modules/MSAdsModule';

function MicrosoftAdsConversionTracking({ configurator, mod } : { configurator: Configurator, mod: MicrosoftAdsModule }) {
  const [namePrefix, setNamePrefix] = React.useState(mod.namePrefix);
  const [uetTag, setUetTag] = React.useState(mod.uetTag);

  return (
    <div>
      <Typography.Title level={2} className="font-bold !text-xl">
        Microsoft Ads Conversion Tracking
      </Typography.Title>

      <Input 
        label="UET Tag ID"
        descriptionText="The UET Tag ID identifies your Microsoft Ads Account. You can find this ID in the Microsoft Ads Conversion Information."
        value={uetTag}
        onChange={e => setUetTag(e.target.value)}
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
          mod.uetTag = uetTag;
          configurator.goToModulesPage();
        }}
      />
    </div>
  );
}

export default MicrosoftAdsConversionTracking;
