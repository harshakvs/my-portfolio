export type Project = {
  title: string;
  status: 'shipped' | 'building' | 'planned';
  summary: string;
  metrics: string[];
  tags: string[];
  github?: string; // add repo URLs as you publish them
  article?: string; // slug of a related blog post
};

// The portfolio pipeline: shipped work + the public builds targeting AI-engineer roles.
// Add a `github` URL to any card and the "View code" button appears automatically.
export const projects: Project[] = [
  {
    title: 'Real-Time Edge Video Understanding Platform',
    status: 'shipped',
    summary:
      'Built as the first ML engineer at an early-stage startup: real-time detection across 100+ edge boxes and 600+ cameras. YOLO-Pose flags candidate events, then 6 frames tiled into a grid let Qwen-VL reason over time. Cloud VLMs run on vLLM with cross-camera batching and a fast-check → detailed-analysis cascade over 3s snippets, traced end to end in Langfuse.',
    metrics: ['95%+ precision · 92% recall in production', 'record → alert in 5–6s (from ~20s)', 'edge latency 6–7s → <2s via FP16', '600+ cameras · 1–2 alerts/camera/day'],
    tags: ['PyTorch', 'vLLM', 'Qwen-VL', 'YOLO-Pose', 'Langfuse', 'MicroK8s', 'EKS'],
  },
  {
    title: 'MLOps & Platform: Retraining, GitOps, CI/CD',
    status: 'shipped',
    summary:
      'Monthly retraining loops fed by production feedback — model monitoring, drift detection, CI gating tests, and a model registry so only validated models roll out to every customer and device. CI/CD built from scratch: self-hosted GitLab runners, Trivy scans, Renovate, and ArgoCD across edge devices and dev/test/prod EKS.',
    metrics: ['7K+ labeled clips, versioned', 'CI-gated promotions', 'site onboarding 7h → 30min'],
    tags: ['SageMaker Pipelines', 'GitLab CI', 'ArgoCD', 'Trivy', 'External Secrets', 'Prometheus/Grafana'],
  },
  {
    title: 'GPT From Scratch',
    status: 'building',
    summary:
      'Implementing a GPT-style transformer from first principles — tokenizer, attention, KV cache, training loop, and scaling experiments — documented step by step as a build log.',
    metrics: ['from-scratch attention + KV cache', 'training + inference'],
    tags: ['PyTorch', 'Transformers', 'CUDA'],
  },
  {
    title: 'CUDA Inference Engineering',
    status: 'building',
    summary:
      'Kernel-level inference optimization: profiling, batching strategies, quantization, and custom CUDA kernels — benchmarked against TensorRT and vLLM baselines.',
    metrics: ['profiling → kernels → benchmarks'],
    tags: ['CUDA', 'TensorRT', 'Quantization', 'Nsight'],
  },
  {
    title: 'Spare-Parts Demand Forecasting @ HP',
    status: 'shipped',
    summary:
      'Time-series forecasting (ML + DL, Python/R) for part demand, repairs, and call volumes on Azure Databricks — plus a Transformer-based NLP part-replacement recommendation engine for service agents.',
    metrics: ['89% forecast accuracy', '$26M savings', '120 labor-hours/month automated'],
    tags: ['Databricks', 'PySpark', 'Time Series', 'NLP'],
  },
  {
    title: 'AI Video Summarization & Deepfake Synthesis',
    status: 'shipped',
    summary:
      'SSD face detection + Wav2Lip lip-sync with NLP summarization (Gensim, spaCy, TF-IDF), Tortoise TTS voice conversion, and a Streamlit interface — built with explicit guardrails around ethical deepfake use.',
    metrics: ['end-to-end demo app'],
    tags: ['OpenCV', 'Wav2Lip', 'TTS', 'Streamlit'],
  },
];

export const pipelineStages = [
  { name: 'Data', tools: 'PySpark · Databricks · S3 data lakes · streaming', desc: 'Ingest, clean, version' },
  { name: 'Features', tools: 'Feature pipelines · labeling QA · augmentation', desc: 'Curate & govern' },
  { name: 'Train', tools: 'PyTorch · SageMaker Pipelines · experiment tracking', desc: 'Reproducible runs' },
  { name: 'Optimize', tools: 'FP16 · batching · frame sampling · threshold tuning', desc: 'Make it fast' },
  { name: 'Serve', tools: 'vLLM · K8s (edge + EKS) · ArgoCD · CI gates', desc: 'Ship safely' },
  { name: 'Observe', tools: 'Langfuse · Prometheus · Grafana · drift detection', desc: 'Watch & retrain' },
];
