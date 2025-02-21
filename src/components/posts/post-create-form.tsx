'use client'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@heroui/react'
import FormButton from '../common/form-button'
import { useActionState } from 'react'
import * as actions from '@/actions'

interface PostCreateFormProps {
  slug: string
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  )
  return (
    <div>
      <Popover placement='left'>
        <PopoverTrigger>
          <Button color='primary'>Add Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className='flex flex-col gap-4 p-4 w-80'>
              <h3 className='text-lg text-bold'>Create a New Post</h3>
              <Input
                name='title'
                label='Title'
                placeholder='Title of your post'
                labelPlacement='outside'
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(', ')}
              />
              <Textarea
                name='content'
                label='Content'
                labelPlacement='outside'
                placeholder='The body of your content'
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(', ')}
              />
              {formState.errors._form ? (
                <div className='rounded p-2 bg-red-200 border border-red-400'>
                  {formState.errors._form.join(', ')}
                </div>
              ) : null}
              <FormButton isLoading={isPending}>Submit</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  )
}
