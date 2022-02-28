import { Card, Typography, Checkbox, Button, Modal, Badge } from '@supabase/ui'
import { Download, Plus } from 'react-feather';
const DoneModal = ({ open, setOpen }: { open: boolean, setOpen: (state: boolean) => void }) => (
  <Modal
    title="Template done"
    visible={open}
    layout="vertical"
    onCancel={() => setOpen(false)}
    hideFooter
    icon={(
      <div className='bg-green-600 rounded-full bg-opacity-50 p-3'>
        <Download size={20} />
      </div>
    )}
  >
    <div className='flex flex-col justify-center w-full'>
      <Typography.Text className='mb-3'>
        Your template has been generated successfully. You can now import it into your Tag Manager Container. 
      </Typography.Text>

      <Button
        block
        className='mb-3'
        onClick={() => setOpen(false)}
        type='outline'
      >
        Close
      </Button>
    </div>
  </Modal>
)
export default DoneModal;