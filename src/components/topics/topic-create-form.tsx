import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@heroui/react'
import * as actions from '@/actions'

export default function TopicCreateForm() {
  return (
    <div>
      <Popover placement='left'>
        <PopoverTrigger>
          <Button color='primary'>New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.createTopic}>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              id='name'
              label='Name'
              labelPlacement='outside'
              placeholder='name'
            />
            <Textarea
              id='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Enter description'
            />
            <Button type='submit'>Submit</Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  )
}
