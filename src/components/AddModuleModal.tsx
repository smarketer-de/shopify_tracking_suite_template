import { Card, Typography, Checkbox, Button, Modal, Badge } from '@supabase/ui'
import { Plus } from 'react-feather';
import Configurator from '../Configurator';
import BaseModule from '../modules/BaseModule';
import { AVAILABLE_MODULES } from '../modules/info';

const AddModuleModal = ({ addModalOpen, setAddModalOpen, configurator, editModule }: { addModalOpen: boolean, setAddModalOpen: (state: boolean) => void, configurator: Configurator, editModule: (mod: BaseModule) => void }) => (
  <Modal
    title="Add module"
    visible={addModalOpen}
    layout="vertical"
    onCancel={() => setAddModalOpen(false)}
    hideFooter
    icon={(
      <div className='bg-green-600 rounded-full bg-opacity-50 p-3'>
        <Plus size={20} />
      </div>
    )}
  >
    <div className='flex flex-col justify-center w-full'>
      <Typography.Text className='mb-3'>
        Please select a module to add.
      </Typography.Text>

      {AVAILABLE_MODULES.map(mod => (
        <Button
          block
          key={mod.name}
          className='mb-3'
          onClick={() => {
            const modInstance = new mod.mod(configurator);
            configurator.addModule(modInstance);
            editModule(modInstance);
            setAddModalOpen(false);
          }}
        >
          {mod.name}
        </Button>
      ))}

      <Button
        block
        className='mb-3'
        onClick={() => setAddModalOpen(false)}
        type='outline'
      >
        Close
      </Button>
    </div>
  </Modal>
)
export default AddModuleModal;