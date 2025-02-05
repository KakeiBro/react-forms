import './App.css'
import { FormikDemo } from './FormikDemo'
import { ReactHookFormDemo } from './ReactHookFormDemo'

function App () {
  return (
    <>
      <div className='forms-container'>
        <FormikDemo />
        <ReactHookFormDemo />
      </div>
    </>
  )
}

export default App
