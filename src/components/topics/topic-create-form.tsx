'use client'

import { useActionState, startTransition } from 'react'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Form,
} from '@heroui/react'
import * as actions from '@/actions'
import FormButton from '@/components/common/form-button'

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      action(formData)
    })
  }

  return (
    <div>
      <Popover placement='left'>
        <PopoverTrigger>
          <Button color='primary'>New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Form onSubmit={handleSubmit}>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              placeholder='name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Enter description'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            {formState.errors._form ? (
              <div className='p-2 bg-red-200 border border-red-400 rounded'>
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Save</FormButton>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  )
}
