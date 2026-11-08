export type Category = 'Vision' | 'Data' | 'NLP' | 'MLOps' | 'Apps'

export type Project = {
  slug: string
  title: string
  tagline: string
  category: Category
  summary: string
  results: string[]
  stack: string[]
  repo: string
  demo?: string
  coursework?: 'Coursework' | 'Capstone'
}

const gh = (name: string) => `https://github.com/EFaridRahimli/${name}`

export const projects: Project[] = [
  {
    slug: '01-tomato-leaf-detection',
    title: 'Tomato Leaf Disease Detection',
    tagline: 'YOLOv8 detection of tomato leaf disease in field images.',
    category: 'Vision',
    summary:
      'A computer-vision capstone that fine-tunes YOLOv8 to detect tomato-leaf diseases in field images, benchmarked against YOLOv5s, to automate slow and costly manual crop surveys.',
    results: ['mAP@0.5 of 0.957 on 1,051 test images', 'mAP@0.5:0.95 of 0.840 vs 0.688 for YOLOv5s', '~2–6 ms inference per image'],
    stack: ['YOLOv8', 'YOLOv5', 'PyTorch'],
    repo: gh('Capstone'),
    coursework: 'Capstone',
  },
  {
    slug: '02-serengeti-camera-trap',
    title: 'Serengeti Camera-Trap Benchmark',
    tagline: 'Wildlife classification from camera-trap images.',
    category: 'Vision',
    summary:
      'Benchmarks VGG-19, ResNet-50 and MobileNetV2 on Snapshot Serengeti Season 8, weighing accuracy against latency for conservation AI and edge deployment.',
    results: ['ResNet-50: 81.09% validation accuracy', 'MobileNetV2: fastest at 5.23 ms / image', 'Accuracy vs latency trade-off study'],
    stack: ['CNNs', 'ResNet-50', 'MobileNetV2', 'VGG-19'],
    repo: gh('M599_subsmission_serengeti_camera_trap_benchmarking'),
    coursework: 'Coursework',
  },
  {
    slug: '03-grape-leaf-classification',
    title: 'Grape Leaf Disease Classification',
    tagline: 'CNN flagging grape-leaf disease early.',
    category: 'Vision',
    summary:
      'A CNN that classifies grape-leaf photos as Black Rot, ESCA, Leaf Blight or Healthy, so vineyard cameras can flag disease before manual inspection would.',
    results: ['98.5% test accuracy', 'Best of 10 controlled architecture experiments'],
    stack: ['CNN', 'Keras', 'TensorFlow'],
    repo: gh('Grape_Leaf_Classification'),
  },
  {
    slug: '04-keysync',
    title: 'KeySync',
    tagline: 'Find Spotify tracks that mix harmonically.',
    category: 'Apps',
    summary:
      'Connects to Spotify, reads the key and BPM of your tracks, and finds Camelot-wheel compatible songs so DJs and playlist makers can build smooth, in-key transitions.',
    results: ['Spotify OAuth 2.0 + PKCE login', 'Camelot-wheel harmonic matching', 'Live web app'],
    stack: ['TypeScript', 'Spotify API', 'Vercel'],
    repo: gh('keysync'),
    demo: 'https://keysync-beta.vercel.app',
  },
  {
    slug: '05-gamma-ray-classification',
    title: 'Gamma-Ray Signal Classification',
    tagline: 'Separating gamma signals from hadron noise.',
    category: 'Data',
    summary:
      'Classifies MAGIC Gamma Telescope events as valuable gamma-ray signals or hadronic background noise, the filtering the Cherenkov Telescope Array needs.',
    results: ['Tuned XGBoost: 86.6% accuracy', 'Beat a Keras MLP on this tabular problem'],
    stack: ['XGBoost', 'Keras', 'scikit-learn'],
    repo: gh('M516-Submission'),
    coursework: 'Coursework',
  },
  {
    slug: '06-bike-sharing-demand',
    title: 'Bike Sharing Demand Forecast',
    tagline: 'Hourly rental demand with AutoML.',
    category: 'Data',
    summary:
      'Forecasts hourly bike-rental demand for the Kaggle Bike Sharing Demand competition with AutoGluon, driven by feature engineering and tuning.',
    results: ['Kaggle score improved from 1.864 to 0.421'],
    stack: ['AutoGluon', 'pandas', 'Kaggle'],
    repo: gh('bike_sharing_demand'),
    coursework: 'Coursework',
  },
  {
    slug: '07-hotel-cancellation',
    title: 'Hotel Cancellation Prediction',
    tagline: 'Predicting which bookings get cancelled.',
    category: 'Data',
    summary:
      'Predicts whether a hotel booking will be cancelled so a hotel chain can plan staffing and avoid both empty rooms and overbooking.',
    results: ['XGBoost: 89.2% accuracy on 10,883 bookings', 'Chosen from five tuned classifiers'],
    stack: ['XGBoost', 'scikit-learn'],
    repo: gh('hotel_cancellation'),
  },
  {
    slug: '08-movie-review-sentiment',
    title: 'Movie Review Sentiment',
    tagline: 'Review sentiment for a streaming platform.',
    category: 'NLP',
    summary:
      'An NLP pipeline that labels movie reviews as positive or negative to power "Popular" and "Top" sections and recommendations without reading reviews by hand.',
    results: ['88.5% accuracy on 8,000 held-out reviews', 'Trained on 40,000 IMDB reviews'],
    stack: ['NLP', 'scikit-learn'],
    repo: gh('Movie-Sentiment-Analysis'),
  },
  {
    slug: '09-serverless-ml-workflow',
    title: 'Serverless ML Workflow',
    tagline: 'Event-driven image classification on AWS.',
    category: 'MLOps',
    summary:
      'An end-to-end, event-driven workflow that classifies delivery-vehicle images, chaining Lambda functions with Step Functions and monitoring live inference with Model Monitor.',
    results: ['Low-confidence predictions filtered at 0.67', 'SageMaker endpoint + Model Monitor'],
    stack: ['SageMaker', 'Lambda', 'Step Functions'],
    repo: gh('SconeUnlimitedSubmission'),
    coursework: 'Coursework',
  },
  {
    slug: '10-dog-breed-classifier',
    title: 'Dog Breed Classifier',
    tagline: 'ResNet-18 fine-tuned and deployed on SageMaker.',
    category: 'MLOps',
    summary:
      'Fine-tunes a pretrained ResNet-18 to classify dog breeds using the SageMaker toolkit: hyperparameter tuning, Debugger, Profiler and a deployed inference endpoint.',
    results: ['Hyperparameter search over learning rate and batch size', 'Deployed as a live SageMaker endpoint'],
    stack: ['PyTorch', 'SageMaker', 'S3'],
    repo: gh('DeepLearningUdacity'),
    coursework: 'Coursework',
  },
  {
    slug: '11-car-dealership-eda',
    title: 'Car Dealership EDA',
    tagline: 'What to stock, price and where to expand.',
    category: 'Data',
    summary:
      'Exploratory analysis of 558,837 US used-car sales to help a California dealership decide what to stock, how to price, and where to expand.',
    results: ['558,837 sales analysed', 'Price vs market (MMR) index feature'],
    stack: ['pandas', 'Matplotlib', 'Seaborn'],
    repo: gh('Car_Dealership_EDA'),
  },
]
