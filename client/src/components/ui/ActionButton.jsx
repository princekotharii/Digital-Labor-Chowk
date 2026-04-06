export default function ActionButton({ variant = 'primary', fullWidth = false, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70'
  const variants = {
    primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    secondary: 'border border-slate-700 bg-slate-900/70 text-white hover:border-cyan-400/50 hover:bg-slate-800',
    ghost: 'text-slate-200 hover:bg-slate-800/80',
  }

  return <button className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()} {...props} />
}
