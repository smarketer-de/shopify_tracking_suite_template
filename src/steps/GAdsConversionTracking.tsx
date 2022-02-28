import { Card, Typography, Checkbox, Input } from '@supabase/ui'
import React from 'react';
import NextStepButton from '../components/NextStepButton';
import Configurator from '../Configurator';
import GoogleAdsModule from '../modules/GoogleAdsModule';

function GAdsConversionTracking({ configurator, mod } : { configurator: Configurator, mod: GoogleAdsModule }) {
  const [namePrefix, setNamePrefix] = React.useState(mod.namePrefix);
  const [conversionId, setConversionId] = React.useState(mod.conversionId);
  const [conversionLabel, setConversionLabel] = React.useState(mod.conversionLabel);
  const [withRemarketing, setWithRemarketing] = React.useState(mod.withRemarketing);

  return (
    <div>
      <Typography.Title level={2} className="font-bold !text-xl">
        Google Ads Conversion Tracking
      </Typography.Title>

      <Input 
        label="Conversion ID"
        descriptionText="The Conversion ID identifies your Google Ads Account. You can find this ID in the Google Ads Conversion Information."
        value={conversionId}
        onChange={e => setConversionId(e.target.value)}
        placeholder='1234567890'
        className='mt-6'
      />
      <Input 
        label="Conversion Label"
        descriptionText="The Conversion Label identifies the Conversion Action in your Google Ads Account. You can find this ID in the Google Ads Conversion Information."
        value={conversionLabel}
        onChange={e => setConversionLabel(e.target.value)}
        placeholder='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        className='mt-6'
      />
      <Checkbox
        label="Enable Remarketing"
        description="Adding remarketing code to your Google Ads conversion tracking code will allow you to retarget visitors across Google's ads network."
        checked={withRemarketing}
        onChange={e => setWithRemarketing(e.target.checked)}
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
        className='mt-6'
        onClick={() => {
          mod.namePrefix = namePrefix;
          mod.conversionId = conversionId;
          mod.conversionLabel = conversionLabel;
          mod.withRemarketing = withRemarketing;
          configurator.goToModulesPage();
        }}
      />
    </div>
  );
}

export default GAdsConversionTracking;
