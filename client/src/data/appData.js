export const languages = [
  { label: 'हिंदी', value: 'hi', active: true },
  { label: 'हरियाणवी', value: 'hn' },
  { label: 'English', value: 'en' },
]

export const appStats = [
  { label: 'Active workers', value: '1,248' },
  { label: 'Nearby chowks', value: '18' },
  { label: 'Verified shops', value: '64' },
]

export const skillCategories = [
  { name: 'Plumber', icon: '🔧', hint: 'Leak repair, fitting, maintenance' },
  { name: 'Electrician', icon: '⚡', hint: 'Wiring, fault fixing, meter work' },
  { name: 'Painter', icon: '🎨', hint: 'Interior, exterior, polish' },
  { name: 'Helper', icon: '🧱', hint: 'Loading, shifting, site support' },
  { name: 'Mason', icon: '🧰', hint: 'Brickwork, plaster, tile laying' },
  { name: 'Carpenter', icon: '🪵', hint: 'Doors, frames, furniture' },
]

export const nearbyWorkers = [
  { name: 'Har Ki Pauri Chowk', distance: '1.2 km', workers: 24, demand: 'High demand', status: 'Live' },
  { name: 'Jwalapur Labor Chowk', distance: '3.4 km', workers: 18, demand: 'Steady', status: 'Updated 2 min ago' },
  { name: 'Ranipur More', distance: '4.8 km', workers: 31, demand: 'Many available', status: 'Live' },
]

export const trustMetrics = [
  { label: 'Punctuality rating', value: '4.7/5', note: 'Rated by employers after each job' },
  { label: 'Payment behavior', value: '4.5/5', note: 'Rated by workers for on-time payment' },
  { label: 'Completed jobs', value: '2,180', note: 'Verified jobs across local chowks' },
]

export const directoryItems = [
  { name: 'Sharma Hardware', type: 'Hardware shop', location: 'BHEL Road, Haridwar', service: 'Cement, paint, tools' },
  { name: 'Khan Rentals', type: 'Equipment rental', location: 'Sidcul, Haridwar', service: 'Drill, mixer, ladder' },
  { name: 'Ganga Tools', type: 'Tool supplier', location: 'Jwalapur', service: 'Safety gear, pliers, pipes' },
]

export const workflowSteps = [
  {
    title: 'Worker goes available',
    detail: 'One tap makes the worker visible for the next 12 hours at nearby chowks.',
  },
  {
    title: 'Employer searches nearby',
    detail: 'Map and list views filter workers within a 5 km radius or specific chowks.',
  },
  {
    title: 'Job gets booked and rated',
    detail: 'Both sides rate skill, punctuality, and payment behavior to build trust.',
  },
]
