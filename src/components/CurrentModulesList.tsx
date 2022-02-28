import { Card, Typography, Checkbox, Button, Modal, Badge } from '@supabase/ui'
import { Edit, Plus, Trash } from 'react-feather';
import Configurator from '../Configurator';
import BaseModule from '../modules/BaseModule';
import './CurrentModulesList.css';

const CurrentModulesList = ({ modules, configurator, forceRerender, editModule }: { modules: BaseModule[], forceRerender: () => void, configurator: Configurator, editModule: (mod: BaseModule) => void }) => (
  <div>
    {modules.map((mod, index) => (
      <div
        key={mod.moduleName + index}
        className='mb-3 p-4 flex gap-5 justify-between items-center rounded border-2 border-neutral-500'
      >
        <div>
          <div className="mb-3">
            <Badge 
              color={mod.color as ("pink" | "gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple")}
            >
              {/* @ts-ignore */}
              <b className='text-base'>
                {mod.moduleName}
              </b>
            </Badge>
          </div>

          {mod.getDetails().length > 0 && (
            <ul>
              {mod.getDetails().map((detail, index) => (
                <li key={detail.name}>
                  <Typography.Text key={index} className='text-neutral-500 text-sm'>
                    {detail.name}: <b>{detail.value}</b>
                  </Typography.Text>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Button
            className='mb-3 mr-2 centered-module-btn'
            onClick={() => editModule(mod)}
          >
            <Edit size={15} />
          </Button>
          <Button
            className='mb-3 centered-module-btn'
            onClick={() => {
              configurator.removeModule(mod)
              forceRerender();
            }}
          >
            <Trash size={15} />
          </Button>
        </div>
      </div>
    ))}
    {modules.length === 0 && (
      <Card
        title='No modules'
        className='mb-3'
      >
        <Typography.Text className='mb-3'>
          You don't have any modules. Add a module using the button below.
        </Typography.Text>
      </Card>
    )}
  </div>
)
export default CurrentModulesList;