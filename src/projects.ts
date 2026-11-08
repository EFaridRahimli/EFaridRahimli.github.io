export type Category =
  | 'Computer Vision'
  | 'NLP'
  | 'Machine Learning'
  | 'MLOps & Cloud'
  | 'Web App'
  | 'Data Analysis'

export type Project = {
  repo: string
  title: string
  category: Category
  year: number
  metric?: string
  metricLabel?: string
  summary: string
  stack: string[]
  demo?: string
  // Featured projects get a large card with a visual.
  visual?: { kind: 'image'; src: string; alt: string } | { kind: 'serengeti' } | { kind: 'camelot' }
}

export const categoryColor: Record<Category, string> = {
  'Computer Vision': '#7dd3fc',
  'Machine Learning': '#86efac',
  NLP: '#f9a8d4',
  'MLOps & Cloud': '#fcd34d',
  'Web App': '#c4b5fd',
  'Data Analysis': '#fdba74',
}

// Numbers come from each repo's notebook outputs and training logs (see the repo READMEs).
export const projects: Project[] = [
  {
    repo: 'Capstone',
    title: 'Tomato Leaf Disease Detection',
    category: 'Computer Vision',
    year: 2025,
    metric: '0.957',
    metricLabel: 'test mAP@0.5',
    summary:
      'Fine-tuned YOLOv8 to find diseased tomato leaves in field images. It beat a YOLOv5s benchmark (0.924) at 2–6 ms per image.',
    stack: ['YOLOv8', 'YOLOv5', 'PyTorch', 'CUDA'],
    visual: { kind: 'image', src: '/projects/capstone.webp', alt: 'YOLOv8 detections on tomato leaves, labelled by disease with confidence scores' },
  },
  {
    repo: 'M599_subsmission_serengeti_camera_trap_benchmarking',
    title: 'Serengeti Camera-Trap Benchmark',
    category: 'Computer Vision',
    year: 2025,
    metric: '81.1%',
    metricLabel: 'ResNet-50 val. accuracy',
    summary:
      'Benchmarked VGG-19, ResNet-50 and MobileNetV2 on Snapshot Serengeti. ResNet-50 led on accuracy; MobileNetV2 was the fastest, for 2.7 points less.',
    stack: ['TensorFlow', 'Transfer learning', 'AzCopy'],
    visual: { kind: 'serengeti' },
  },
  {
    repo: 'Grape_Leaf_Classification',
    title: 'Grape Leaf Disease Classification',
    category: 'Computer Vision',
    year: 2026,
    metric: '98.5%',
    metricLabel: 'test accuracy',
    summary:
      'A custom CNN that sorts vineyard leaf photos into four health classes. The architecture was chosen from 10 controlled experiments.',
    stack: ['TensorFlow', 'Keras', 'CNN', 'Augmentation'],
    visual: { kind: 'image', src: '/projects/grape.webp', alt: 'Grape leaf samples from the Black Rot and ESCA classes' },
  },
  {
    repo: 'keysync',
    title: 'KeySync',
    category: 'Web App',
    year: 2026,
    summary:
      'Connects to Spotify, reads each track’s key and BPM, and finds songs that mix harmonically on the Camelot wheel.',
    stack: ['React 19', 'Vercel Functions', 'Spotify API', 'OAuth PKCE'],
    demo: 'https://keysync-beta.vercel.app',
    visual: { kind: 'camelot' },
  },
  {
    repo: 'M516-Submission',
    title: 'Gamma-Ray Signal Classification',
    category: 'Machine Learning',
    year: 2025,
    metric: '86.6%',
    metricLabel: 'accuracy',
    summary: 'Separates gamma-ray signals from hadron noise in MAGIC telescope data. Tuned XGBoost beat a Keras MLP.',
    stack: ['XGBoost', 'Keras'],
  },
  {
    repo: 'bike_sharing_demand',
    title: 'Bike Sharing Demand Forecast',
    category: 'Machine Learning',
    year: 2025,
    metric: '−77%',
    metricLabel: 'Kaggle error',
    summary: 'AutoGluon ensembles for hourly rental demand; feature engineering cut the Kaggle score from 1.86 to 0.42.',
    stack: ['AutoGluon', 'CatBoost'],
  },
  {
    repo: 'hotel_cancellation',
    title: 'Hotel Cancellation Prediction',
    category: 'Machine Learning',
    year: 2024,
    metric: '89.2%',
    metricLabel: 'accuracy',
    summary: 'Predicts which bookings will be cancelled so hotels can plan staffing. XGBoost with SMOTE balancing.',
    stack: ['XGBoost', 'SMOTE'],
  },
  {
    repo: 'Movie-Sentiment-Analysis',
    title: 'Movie Review Sentiment',
    category: 'NLP',
    year: 2024,
    metric: '88.5%',
    metricLabel: 'accuracy',
    summary: 'Labels reviews positive or negative for a streaming platform, using TF-IDF and VADER features with Naive Bayes.',
    stack: ['NLTK', 'scikit-learn'],
  },
  {
    repo: 'SconeUnlimitedSubmission',
    title: 'Serverless ML Workflow',
    category: 'MLOps & Cloud',
    year: 2025,
    summary: 'An event-driven image classifier: Step Functions chain three Lambdas, with a 0.67 confidence gate and Model Monitor.',
    stack: ['SageMaker', 'Step Functions'],
  },
  {
    repo: 'DeepLearningUdacity',
    title: 'Dog Breed Classifier on SageMaker',
    category: 'MLOps & Cloud',
    year: 2025,
    summary: 'ResNet-18 transfer learning with hyper-parameter tuning, Debugger and Profiler, deployed as an inference endpoint.',
    stack: ['SageMaker', 'PyTorch'],
  },
  {
    repo: 'Car_Dealership_EDA',
    title: 'Car Dealership EDA',
    category: 'Data Analysis',
    year: 2024,
    metric: '558k',
    metricLabel: 'sales analysed',
    summary: 'Exploratory analysis to help a California dealership decide what to stock, how to price and where to expand.',
    stack: ['pandas', 'Plotly'],
  },
]

export const categories = [...new Set(projects.map((p) => p.category))]

// Validation accuracy per epoch, from the Serengeti repo's *_log.csv files.
export const serengetiLogs = [
  { model: 'ResNet-50', color: '#7dd3fc', values: [0.694, 0.724, 0.745, 0.761, 0.771, 0.775, 0.777, 0.79, 0.789, 0.791, 0.793, 0.778, 0.801, 0.8, 0.799, 0.801, 0.795, 0.8, 0.8, 0.811] },
  { model: 'VGG-19', color: '#c4b5fd', values: [0.671, 0.7, 0.728, 0.726, 0.749, 0.746, 0.754, 0.763, 0.773, 0.775, 0.78, 0.778, 0.788, 0.796, 0.785, 0.792, 0.795, 0.791, 0.799, 0.81] },
  { model: 'MobileNetV2', color: '#86efac', values: [0.675, 0.708, 0.714, 0.731, 0.743, 0.734, 0.753, 0.741, 0.751, 0.752, 0.757, 0.766, 0.779, 0.771, 0.771, 0.779, 0.773, 0.778, 0.784, 0.784] },
]
