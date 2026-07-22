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
      'End-to-end detection platform running on-device inference across 100+ edge boxes and 600+ cameras (MicroK8s at the edge, EKS in the cloud). Multi-model pipeline: YOLO, pose estimation, 3D CNNs, temporal transformers, and vision-language models for scene description and semantic video search.',
    metrics: ['6–7s → <2s latency @ 25 FPS', '600+ cameras', '~9,000 segments/camera → 1–2 alerts'],
    tags: ['PyTorch', 'MicroK8s', 'EKS', 'SageMaker', 'ArgoCD', 'VLMs'],
  },
  {
    title: 'MLOps: Auto-Retraining with Drift Detection',
    status: 'shipped',
    summary:
      'Monthly retraining loops fed by production feedback — model monitoring, drift detection, CI gating tests, and a model registry so only validated models roll out to every customer and device. Plus a privacy-preserving face-blurring pipeline for compliant data handling.',
    metrics: ['7K+ labeled clips, versioned', 'CI-gated promotions', 'site onboarding 7h → 30min'],
    tags: ['SageMaker Pipelines', 'Lambda', 'GitLab CI', 'Helm', 'Prometheus/Grafana'],
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
      'Time-series forecasting (ML + DL, Python/R) for part demand, repairs, and call volumes on Azure Databricks — plus an NLP/LLM-powered part-replacement recommendation engine for service agents.',
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
  { name: 'Optimize', tools: 'CUDA · batching · quantization · threshold tuning', desc: 'Make it fast' },
  { name: 'Serve', tools: 'K8s (edge + EKS) · Helm · ArgoCD · CI gates', desc: 'Ship safely' },
  { name: 'Observe', tools: 'Prometheus · Grafana · Loki · drift detection', desc: 'Watch & retrain' },
];
