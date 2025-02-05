import { Form, Formik, useField } from 'formik'
import { ReactNode } from 'react'
import * as Yup from 'yup'

interface InputProps {
  label: string
  name: string
  id?: string
  type?: string
  placeholder?: string
}

interface ChildrenInputProps extends InputProps {
  children: ReactNode
}

interface CheckboxProps extends Omit<ChildrenInputProps, 'label'> {
  label?: string
}

const MyTextInput = ({ label, ...props }: InputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <input className='text-input' {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckbox = ({ children, ...props }: CheckboxProps) => {
  // React treats radios and checkbox inputs differently from other input types:
  // select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <div>
      <label className='checkbox-input'>
        <input type='checkbox' {...field} {...props} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MySelect = ({ label, ...props }: ChildrenInputProps) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

function FormikDemo () {
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),

          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),

          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Formik</h1>
          <MyTextInput
            label='First Name'
            name='firstName'
            type='text'
            placeholder='Jane'
          />

          <MyTextInput
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Doe'
          />

          <MyTextInput
            label='Email Address'
            name='email'
            type='email'
            placeholder='jane@formik.com'
          />

          <MySelect label='Job Type' name='jobType'>
            <option value=''>Select a job type</option>
            <option value='designer'>Designer</option>
            <option value='development'>Developer</option>
            <option value='product'>Product Manager</option>
            <option value='other'>Other</option>
          </MySelect>

          <MyCheckbox name='acceptedTerms'>
            I accept the terms and conditions
          </MyCheckbox>

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export { FormikDemo }
