// Central place for personal info — edit here, whole site updates.
export const profile = {
  name: 'Sreeharsha Kotta',
  fullName: 'Venkata Sai Sreeharsha Kotta',
  role: 'Machine Learning Engineer',
  tagline: 'I take ML systems from notebook to production — edge GPUs, training pipelines, and everything in between.',
  location: 'USA',
  email: 'sreeharshakotta@gmail.com',
  resume: '/Resume_Sreeharsha_Kotta.pdf',
  photo: '/me.jpg', // drop your picture at public/me.jpg — falls back to the logo if missing
  socials: [
    { label: 'GitHub', url: 'https://github.com/harshakvs', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sreeharsha-kvs', icon: 'linkedin' },
    { label: 'YouTube', url: '', icon: 'youtube', comingSoon: true }, // add channel URL when live
    { label: 'Medium', url: '', icon: 'medium', comingSoon: true }, // add profile URL when live
  ],
  // Lines the hero terminal "types" on load
  terminalLines: [
    { cmd: 'whoami', out: 'Sreeharsha Kotta — ML Engineer, 5+ yrs shipping production ML' },
    { cmd: 'nvidia-smi | grep -i util', out: 'GPU-Util: 98%  ·  latency: 6.8s → 1.9s @ 25 FPS' },
    { cmd: 'kubectl get pods -A | wc -l', out: '100+ edge devices · 600+ cameras · zero-downtime rollouts' },
    { cmd: './hire_me --role "AI Engineer"', out: 'exit 0 — let’s talk ↓' },
  ],
  // Facts the pixel avatar shares while roaming
  avatarFacts: [
    'Harsha cut video-pipeline latency from ~7s to under 2s at 25 FPS. I walk slower than that.',
    'He runs models on 100+ edge devices with MicroK8s. I only run on this page.',
    '4.0 GPA in his M.S. in Analytics at Georgia State. Nerd.',
    'His forecasting models saved HP $26M in spare-parts overstock.',
    'He labeled millions of tweets with LLMs before it was cool.',
    'Try the Gradient Descent game below — his loss curves converge faster.',
    'Ask the chatbot about him — I just do the walking around here.',
    'He published an IEEE paper on currency detection for the visually impaired.',
    'Monthly auto-retraining loops with drift detection. The models never get stale. Unlike my jokes.',
    'He says nobody can beat him at flag_rush in the arcade. Prove him wrong, please.',
    '28 states, 2 countries, 2 Himalayan treks. Check the travel map.',
    'PSG fan AND Ferrari tifosi. He knows suffering builds character.',
    'Played competitive cricket. The trophies are real, I have seen the shelf.',
    'His cooking gets recipe requests. My power source gets firmware updates. We are not the same.',
  ],
};
