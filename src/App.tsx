import {ChangeEvent, useCallback, useEffect, useState} from 'react'
import './App.css'
import {useTelegram} from "./hooks/useTelegram.ts";

export interface FormState {
  country: string
  city: string
  street: string
}

function App() {
  const telegram = useTelegram()

  const [formState, setFormState] = useState<FormState>({
    country: '', city: '', street: '',
  })

  useEffect(() => {
    console.log(formState)
  }, [formState]);

  const setCountry = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, country: event.target.value }))
  }, [])

  const setCity = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, city: event.target.value }))
  }, [])

  const setStreet = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, street: event.target.value }))
  }, [])

  const onSubmit = useCallback(() => {
    console.log(formState)
    telegram.sendData(JSON.stringify(formState))
    // telegram.close()
  }, [formState, telegram])

  useEffect(() => {
    telegram.ready()
    telegram.MainButton.setText('Отправить')
  }, [telegram]);

  useEffect(() => {
    telegram.MainButton.onClick(onSubmit)
  }, [onSubmit, telegram]);

  useEffect(() => {
    if (formState.country && formState.city && formState.street) {
      telegram.MainButton.show()
    } else {
      telegram.MainButton.hide()
    }
  }, [formState.country, formState.city, formState.street, telegram.MainButton]);

  return (
    <div>
      <form>
        <input type="text" placeholder='Страна' value={formState.country} onChange={setCountry}/>
        <input type="text" placeholder='Город' value={formState.city} onChange={setCity}/>
        <input type="text" placeholder='Улица' value={formState.street} onChange={setStreet}/>
      </form>
    </div>
  )
}

export default App
