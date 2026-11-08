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
  metric: string
  metricLabel: string
  summary: string
  stack: string[]
  demo?: string
  featured?: boolean
}

// Numbers come from each repo's notebook outputs (see the repo READMEs).
export const projects: Project[] = [
  {
    repo: 'Capstone',
    title: 'Tomato Leaf Disease Detection',
    category: 'Computer Vision',
    year: 2025,
    metric: '0.957',
    metricLabel: 'test mAP@0.5',
    summary:
      'Fine-tuned YOLOv8 to detect tomato-leaf diseases in field images. It beat a YOLOv5s benchmark (0.924) at 2–6 ms per image.',
    stack: ['YOLOv8', 'YOLOv5', 'PyTorch', 'CUDA'],
    featured: true,
  },
  {
    repo: 'M599_subsmission_serengeti_camera_trap_benchmarking',
    title: 'Serengeti Camera-Trap Benchmark',
    category: 'Computer Vision',
    year: 2025,
    metric: '81.1%',
    metricLabel: 'accuracy at 3.4M params',
    summary:
      'Benchmarked VGG-19, ResNet-50 and MobileNetV2 on Snapshot Serengeti. MobileNetV2 matched ResNet-50 with about 7× fewer parameters, which suits edge camera traps.',
    stack: ['TensorFlow', 'Transfer learning', 'MobileNetV2', 'AzCopy'],
    featured: true,
  },
  {
    repo: 'keysync',
    title: 'KeySync',
    category: 'Web App',
    year: 2026,
    metric: 'Live',
    metricLabel: 'deployed on Vercel',
    summary:
      'Connects to Spotify, reads key and BPM, and finds tracks that mix harmonically on the Camelot wheel. Built for DJs and playlist makers.',
    stack: ['React 19', 'Vite', 'Vercel Functions', 'Spotify API', 'OAuth PKCE'],
    demo: 'https://keysync-beta.vercel.app',
    featured: true,
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
    featured: true,
  },
  {
    repo: 'M516-Submission',
    title: 'Gamma-Ray Signal Classification',
    category: 'Machine Learning',
    year: 2025,
    metric: '86.6%',
    metricLabel: 'accuracy · AUC 0.838',
    summary:
      'Separates gamma-ray signals from hadronic noise in MAGIC telescope data. Tuned XGBoost beat a Keras MLP on this tabular problem.',
    stack: ['XGBoost', 'Keras', 'scikit-learn'],
  },
  {
    repo: 'bike_sharing_demand',
    title: 'Bike Sharing Demand Forecast',
    category: 'Machine Learning',
    year: 2025,
    metric: '1.86 → 0.42',
    metricLabel: 'Kaggle score',
    summary:
      'AutoGluon ensembles for hourly rental demand. Log targets, rush-hour features and tuning cut the Kaggle error by 77%.',
    stack: ['AutoGluon', 'CatBoost', 'LightGBM', 'pandas'],
  },
  {
    repo: 'hotel_cancellation',
    title: 'Hotel Cancellation Prediction',
    category: 'Machine Learning',
    year: 2024,
    metric: '89.2%',
    metricLabel: 'test accuracy',
    summary:
      'Predicts which bookings will be cancelled so hotels can plan staffing. Five tuned classifiers were compared, with SMOTE for class balance.',
    stack: ['XGBoost', 'scikit-learn', 'SMOTE'],
  },
  {
    repo: 'Movie-Sentiment-Analysis',
    title: 'Movie Review Sentiment',
    category: 'NLP',
    year: 2024,
    metric: '88.5%',
    metricLabel: 'accuracy on 8k reviews',
    summary:
      'An NLP pipeline for a streaming platform: NLTK cleaning, TF-IDF and VADER features, and a tuned Naive Bayes classifier.',
    stack: ['NLTK', 'TF-IDF', 'VADER', 'scikit-learn'],
  },
  {
    repo: 'SconeUnlimitedSubmission',
    title: 'Serverless ML Workflow',
    category: 'MLOps & Cloud',
    year: 2025,
    metric: '3',
    metricLabel: 'Lambdas in a Step Function',
    summary:
      'An event-driven image classifier on AWS. Step Functions chain the Lambdas, a 0.67 confidence gate filters weak predictions, and Model Monitor captures live data.',
    stack: ['SageMaker', 'Lambda', 'Step Functions', 'Model Monitor'],
  },
  {
    repo: 'DeepLearningUdacity',
    title: 'Dog Breed Classifier on SageMaker',
    category: 'MLOps & Cloud',
    year: 2025,
    metric: 'HPO → Endpoint',
    metricLabel: 'full SageMaker lifecycle',
    summary:
      'ResNet-18 transfer learning with hyper-parameter tuning, Debugger and Profiler. It ends in a deployed inference endpoint.',
    stack: ['SageMaker', 'PyTorch', 'S3'],
  },
  {
    repo: 'Car_Dealership_EDA',
    title: 'Car Dealership EDA',
    category: 'Data Analysis',
    year: 2024,
    metric: '558k',
    metricLabel: 'sales records analysed',
    summary:
      'Exploratory analysis to help a California dealership decide what to stock, how to price and where to expand.',
    stack: ['pandas', 'Seaborn', 'Plotly'],
  },
]

export const categories = ['All', ...new Set(projects.map((p) => p.category))]
