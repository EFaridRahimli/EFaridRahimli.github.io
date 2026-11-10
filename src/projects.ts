import synced from './repos.json';

export type Category = 'Vision' | 'NLP' | 'Data' | 'MLOps' | 'Apps' | 'Other';

export type Project = {
  repo: string; // GitHub repo name: the key that links curated text to synced repos
  title: string;
  tagline: string;
  category: Category;
  summary: string;
  quote: string; // headline result
  delta?: string; // change vs a named baseline, only where the project measured one
  results: string[];
  stack: string[];
  url: string;
  demo?: string;
  coursework?: 'Coursework' | 'Capstone';
  featured?: boolean;
};

type Curated = Omit<Project, 'url'>;

// Hand-checked against each repo's README (2026-11-10). Repos not listed here still appear, built from GitHub data.
const CURATED: Curated[] = [
  {
    repo: 'gdpr-rag',
    featured: true,
    title: 'GDPR RAG Assistant',
    tagline: 'Cited GDPR answers and Article 13/14 policy audits.',
    category: 'NLP',
    summary:
      'A retrieval-augmented generation app that answers questions about the EU GDPR and audits uploaded privacy policies against Articles 13 and 14, linking every claim to the paragraph it comes from. Retrieval, answers and the compliance check each have an evaluation, and CI fails if retrieval regresses.',
    quote: 'Recall@5 1.00',
    results: [
      'Retrieval: 1.00 recall@5, 0.96 MRR on 50 questions; 0.97 MRR on 30 held-out',
      'Answers: 0.98 faithful, 0.98 citations correct; 10/10 out-of-scope declined',
      'Compliance: 8 of 8 planted gaps found, 1 of 24 covered items wrongly flagged',
    ],
    stack: ['Python', 'FastAPI', 'SQLite FTS5', 'sqlite-vec', 'React'],
  },
  {
    repo: 'tomato-leaf-disease-detection',
    featured: true,
    title: 'Tomato Leaf Disease Detection',
    tagline: 'YOLOv8 detection of tomato leaf disease in field images.',
    category: 'Vision',
    summary:
      'Fine-tunes YOLOv8 to detect tomato-leaf diseases in field images, benchmarked against YOLOv5s, to automate slow and costly manual crop surveys.',
    quote: 'mAP50-95 0.840',
    delta: '+0.152 vs YOLOv5s',
    results: ['mAP@0.5 of 0.957 on 1,051 test images', 'mAP@0.5:0.95 of 0.840 vs 0.688 for YOLOv5s', '2.8 ms per image (YOLOv8n)'],
    stack: ['YOLOv8', 'YOLOv5', 'PyTorch'],
    coursework: 'Capstone',
  },
  {
    repo: 'serengeti-camera-trap-benchmark',
    featured: true,
    title: 'Serengeti Camera-Trap Benchmark',
    tagline: 'Wildlife classification from camera-trap images.',
    category: 'Vision',
    summary:
      'Benchmarks VGG-19, ResNet-50 and MobileNetV2 on Snapshot Serengeti Season 8, weighing accuracy against latency for conservation AI and edge deployment.',
    quote: 'Accuracy 81.1%',
    results: ['ResNet-50: 81.09% validation accuracy', 'MobileNetV2: fastest at 5.23 ms per image', 'Accuracy vs latency trade-off study'],
    stack: ['ResNet-50', 'MobileNetV2', 'VGG-19'],
    coursework: 'Coursework',
  },
  {
    repo: 'grape-leaf-disease-classification',
    title: 'Grape Leaf Disease Classification',
    tagline: 'CNN flagging grape-leaf disease early.',
    category: 'Vision',
    summary: 'Classifies grape-leaf photos as Black Rot, ESCA, Leaf Blight or Healthy, so vineyard cameras can flag disease early.',
    quote: 'Accuracy 98.5%',
    results: ['98.5% test accuracy', 'Best of 10 controlled architecture experiments'],
    stack: ['Keras', 'TensorFlow'],
  },
  {
    repo: 'gamma-ray-classification',
    title: 'Gamma-Ray Signal Classification',
    tagline: 'Separating gamma signals from hadron noise.',
    category: 'Data',
    summary: 'Classifies MAGIC Gamma Telescope events as gamma-ray signals or hadronic background noise.',
    quote: 'Accuracy 86.6%',
    results: ['Tuned XGBoost: 86.6% accuracy', 'Beat a Keras MLP on this tabular problem'],
    stack: ['XGBoost', 'Keras', 'scikit-learn'],
    coursework: 'Coursework',
  },
  {
    repo: 'bike-sharing-demand-forecast',
    title: 'Bike Sharing Demand Forecast',
    tagline: 'Hourly rental demand with AutoML.',
    category: 'Data',
    summary: 'Forecasts hourly bike-rental demand for the Kaggle Bike Sharing Demand competition with AutoGluon.',
    quote: 'Kaggle 0.421',
    delta: 'from 1.864 baseline',
    results: ['Kaggle score improved from 1.864 to 0.421'],
    stack: ['AutoGluon', 'pandas'],
    coursework: 'Coursework',
  },
  {
    repo: 'hotel-cancellation-prediction',
    title: 'Hotel Cancellation Prediction',
    tagline: 'Predicting which bookings get cancelled.',
    category: 'Data',
    summary: 'Predicts whether a hotel booking will be cancelled so a hotel chain can plan staffing and avoid overbooking.',
    quote: 'Accuracy 89.2%',
    results: ['XGBoost: 89.2% accuracy on 10,883 bookings', 'Chosen from five tuned classifiers'],
    stack: ['XGBoost', 'scikit-learn'],
  },
  {
    repo: 'movie-review-sentiment',
    title: 'Movie Review Sentiment',
    tagline: 'Review sentiment for a streaming platform.',
    category: 'NLP',
    summary: 'Labels movie reviews as positive or negative to power "Popular" and "Top" sections and recommendations.',
    quote: 'Accuracy 88.5%',
    results: ['88.5% accuracy on 8,000 held-out reviews', 'Trained on 40,000 IMDB reviews'],
    stack: ['scikit-learn', 'NLP'],
  },
  {
    repo: 'serverless-ml-workflow-aws',
    title: 'Serverless ML Workflow',
    tagline: 'Event-driven image classification on AWS.',
    category: 'MLOps',
    summary: 'Classifies delivery-vehicle images by chaining Lambda functions with Step Functions, with Model Monitor on live inference.',
    quote: 'Confidence ≥ 0.67',
    results: ['Low-confidence predictions filtered at 0.67', 'SageMaker endpoint + Model Monitor'],
    stack: ['SageMaker', 'Lambda', 'Step Functions'],
    coursework: 'Coursework',
  },
  {
    repo: 'dog-breed-classifier-sagemaker',
    title: 'Dog Breed Classifier',
    tagline: 'ResNet-18 fine-tuned and deployed on SageMaker.',
    category: 'MLOps',
    summary: 'Fine-tunes a pretrained ResNet-18 for dog breeds with SageMaker tuning, Debugger, Profiler and a deployed endpoint.',
    quote: 'Deployed',
    results: ['Hyperparameter search over learning rate and batch size', 'Deployed as a SageMaker endpoint'],
    stack: ['PyTorch', 'SageMaker', 'S3'],
    coursework: 'Coursework',
  },
  {
    repo: 'car-dealership-eda',
    title: 'Car Dealership EDA',
    tagline: 'What to stock, price and where to expand.',
    category: 'Data',
    summary: 'Exploratory analysis of 558,837 US used-car sales to help a California dealership decide what to stock and how to price.',
    quote: '558,837 sales',
    results: ['558,837 sales analysed', 'Price vs market (MMR) index feature'],
    stack: ['pandas', 'Matplotlib', 'Seaborn'],
  },
];

const pretty = (name: string) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

/** Public repos from the last sync, in curated order, with uncurated repos (newest first) after them. */
export function buildProjects(repos = synced.repos): Project[] {
  const byName = new Map(repos.map(r => [r.name, r]));
  const curated = CURATED.filter(c => byName.has(c.repo)).map(c => ({...c, url: byName.get(c.repo)!.url}));
  const known = new Set(CURATED.map(c => c.repo));
  const extra = repos
    .filter(r => !known.has(r.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
    .map(
      (r): Project => ({
        repo: r.name,
        title: pretty(r.name),
        tagline: r.description || 'New project on GitHub.',
        category: 'Other',
        summary: r.description,
        quote: r.language || 'Code',
        results: [],
        stack: r.language ? [r.language] : [],
        url: r.url,
        demo: r.homepage || undefined,
      }),
    );
  return [...curated, ...extra];
}

export const projects = buildProjects();
export const syncedAt = synced.syncedAt;
