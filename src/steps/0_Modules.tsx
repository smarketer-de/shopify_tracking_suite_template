import { Card, Typography, Checkbox, Button, Modal, Badge } from '@supabase/ui'
import { saveAs } from 'file-saver';
import React from 'react';
import { Delete, Edit, Plus, Trash } from 'react-feather';
import NextStepButton from '../components/NextStepButton';
import Configurator from '../Configurator';
import BaseModule from '../modules/BaseModule';
import AddModuleModal from '../components/AddModuleModal';
import CurrentModulesList from '../components/CurrentModulesList';
import DoneModal from '../components/DoneModal';
import { generateTemplate } from '../TagManager';
import { AVAILABLE_MODULES } from '../modules/info';

function Modules({ configurator } : { configurator: Configurator }) {
  const modules = configurator.getModules().filter(mod => mod.moduleName !== 'Core');
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [doneModalOpen, setDoneModalOpen] = React.useState(false);

  const [renderForcer, setRenderForcer] = React.useState(0);
  const forceRerender = () => setRenderForcer(renderForcer + 1);

  const downloadTemplate = () => {
    const template = generateTemplate(configurator.getModules());
    const blob = new Blob([template], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'smarketer-tag-manager-template.json');
    setDoneModalOpen(true);
  }

  const editModule = (mod: BaseModule) => {
    const modInfo = AVAILABLE_MODULES.find(m => new m.mod(configurator).moduleName === mod.moduleName);
    if (!modInfo) {
      forceRerender();
      throw new Error('Module not found');
    }

    const Page = modInfo.page;
    // @ts-ignore
    configurator.goToPage(<Page configurator={configurator} mod={mod} />);
    setAddModalOpen(false);
  }

  return (
    <div className='w-full'>
      <Typography.Text className='mb-3'>
        Your modules
      </Typography.Text>

      {/* ADD NEW MODULE MODAL */}
      <AddModuleModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        configurator={configurator}
        editModule={editModule}
      />

      {/* CURRENT MODULES LIST */}
      <CurrentModulesList
        modules={modules}
        configurator={configurator}
        forceRerender={forceRerender}
        editModule={editModule}
      />

      <Button
        className='mt-6'
        block
        onClick={() => setAddModalOpen(true)}
      >
        <div className="flex items-center gap-3">
          Add module
          <Plus size={15} />
        </div>
      </Button>

      <NextStepButton
        text="Download template"
        disabled={modules.length === 0}
        type={modules.length === 0 ? 'outline' : 'primary'}
        onClick={() => {
          downloadTemplate();
        }}
      />

      <DoneModal
        open={doneModalOpen}
        setOpen={setDoneModalOpen}
      />

    </div>
  );
}

export default Modules;
