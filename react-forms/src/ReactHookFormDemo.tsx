import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  example: string
  exampleRequired: string
}

function ReactHookFormDemo () {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      example: 'defaultExample',
      exampleRequired: 'exampleRequired'
    }
  })
  const onSubmit: SubmitHandler<Inputs> = console.log

  console.log(errors)
  console.log('watch', watch('example'))
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue='test' {...register('example')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register('exampleRequired', {
          required: 'This is required',
          minLength: { value: 4, message: 'Min length is 4' }
        })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}

      <input type='submit' />
    </form>
  )
}

export { ReactHookFormDemo }
