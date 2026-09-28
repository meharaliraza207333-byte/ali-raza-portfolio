import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './MagneticButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const update = ({ target: { name, value } }) => { setForm((old) => ({ ...old, [name]: value })); setErrors((old) => ({ ...old, [name]: '' })); setSent(false) }
  const submit = (event) => {
    event.preventDefault(); const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email.'
    if (form.message.trim().length < 10) next.message = 'Please share at least 10 characters.'
    setErrors(next); if (!Object.keys(next).length) setSent(true)
  }
  return (
    <section id="contact" className="section contact" data-section aria-labelledby="contact-title">
      <div className="container" data-section-inner>
        <header className="section-head section-head--light"><span className="section-index">06 / CONTACT</span><p>Have an idea? Let&apos;s make it real.</p></header>
        <h2 id="contact-title"><span>LET&apos;S</span><span>BUILD</span><span className="outline">SOMETHING</span><span>GREAT</span></h2>
        <div className="contact__lower">
          <div className="contact__availability"><i /><p>Available for freelance<br/>projects and opportunities.</p></div>
          <form className="contact__form" onSubmit={submit} noValidate>
            <label><span>01 / YOUR NAME</span><input name="name" value={form.name} onChange={update} placeholder="Ali Raza" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label><span>02 / YOUR EMAIL</span><input name="email" type="email" value={form.email} onChange={update} placeholder="hello@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
            <label><span>03 / TELL ME ABOUT IT</span><textarea name="message" rows="3" value={form.message} onChange={update} placeholder="A few words about your project..." aria-invalid={Boolean(errors.message)} />{errors.message && <small>{errors.message}</small>}</label>
            <div className="contact__send"><MagneticButton type="submit" className="btn btn--light" ariaLabel="Send message"><span>Send message</span><ArrowUpRight size={19} /></MagneticButton>{sent && <p className="contact__success" role="status">Looks good — connect a form backend when you&apos;re ready to receive it.</p>}</div>
          </form>
        </div>
      </div>
    </section>
  )
}
