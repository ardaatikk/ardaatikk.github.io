const projects = [
  {
    id: "histopathology-cancer-detection",
    title: "Histopathology Cancer Detection",
    description: {
      en: "Breast cancer metastasis detection using ResNet-18, slide-independent 5-fold cross-validation (94.57% accuracy), and explainable AI with Grad-CAM and Integrated Gradients.",
      tr: "ResNet-18, slayt bağımsız 5 katlı çapraz doğrulama (%94,57 doğruluk), Grad-CAM ve Integrated Gradients ile açıklanabilir meme kanseri metastaz tespiti."
    },
    tags: [
      "Python",
      "PyTorch",
      "ResNet-18",
      "Computer Vision",
      "Grad-CAM",
      "Integrated Gradients",
      "Cross-Validation"
    ],
    repo: "histopathology-cancer-detection",
    featured: true,
    order: 1
  },
  {
    id: "human-action-recognition",
    title: "Human Action Recognition",
    description: {
      en: "Deep learning pipeline for human action recognition using CNN-LSTM and pose-based models, featuring ablation studies, temporal analysis, and multi-seed experiments.",
      tr: "CNN-LSTM ve poz tabanlı modellerle insan hareketi tanıma; ablation çalışmaları, zamansal analiz ve çoklu seed deneyleri içeren derin öğrenme projesi."
    },
    tags: ["Python", "PyTorch", "MediaPipe", "Computer Vision", "Deep Learning", "LSTM"],
    repo: "human-action-recognition",
    featured: true,
    order: 2
  },
  {
    id: "ai4i-machine-failure-prediction",
    title: "AI4I Machine Failure Prediction",
    description: {
      en: "Machine learning pipeline for industrial machine-failure prediction and operational risk analysis.",
      tr: "Endüstriyel makine arızalarını tahmin etmek ve operasyonel riski analiz etmek için makine öğrenmesi hattı."
    },
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    repo: "ai4i-machine-failure-prediction",
    featured: false,
    order: 3
  },
  {
    id: "fraud-detection-ml-api",
    title: "Fraud Detection ML API",
    description: {
      en: "End-to-end fraud detection system exposing machine-learning predictions through a containerized API.",
      tr: "Makine öğrenmesi tahminlerini container tabanlı bir API üzerinden sunan uçtan uca dolandırıcılık tespit sistemi."
    },
    tags: ["Python", "Machine Learning", "FastAPI", "Docker", "API"],
    repo: "fraud-detection-ml-api",
    featured: true,
    order: 4
  },
  {
    id: "glass-bottle-inspection",
    title: "Glass Bottle Inspection",
    description: {
      en: "Computer-vision and data-analysis work for automated glass-bottle inspection.",
      tr: "Otomatik cam şişe denetimi için bilgisayarlı görü ve veri analizi çalışması."
    },
    tags: ["Python", "Computer Vision", "Data Analysis"],
    repo: "glass-bottle-inspection",
    featured: false,
    order: 5
  },
  {
    id: "ergonomic-posture-monitor",
    title: "Ergonomic Posture Monitor",
    description: {
      en: "Real-time computer vision system for personalized posture monitoring, actionable feedback, and session analytics.",
      tr: "Kişiselleştirilmiş duruş takibi, anlık geri bildirim ve oturum analitiği sunan gerçek zamanlı bilgisayarlı görü sistemi."
    },
    tags: ["Python", "MediaPipe", "OpenCV", "Computer Vision"],
    repo: "ergonomic-posture-monitor",
    featured: true,
    order: 6
  },
  {
    id: "stroke-prediction",
    title: "Stroke Prediction",
    description: {
      en: "Machine-learning classification project for stroke-risk prediction using structured healthcare data.",
      tr: "Yapılandırılmış sağlık verileriyle inme riski tahmini için makine öğrenmesi sınıflandırma projesi."
    },
    tags: ["Python", "Scikit-learn", "Classification", "Data Analysis"],
    repo: "stroke-prediction",
    featured: false,
    order: 7
  },
  {
    id: "retail-customer-tracking",
    title: "Retail Customer Tracking",
    description: {
      en: "Single-camera person tracking and behavior analytics with YOLO11 and ByteTrack, featuring live RTSP capture, recorded-video replay, confirmed track exports, and zone-based analytics.",
      tr: "YOLO11 ve ByteTrack ile tek kamera üzerinden kişi takibi ve davranış analizi; canlı RTSP akışı, kayıtlı videodan tekrar test, onaylı takip kayıtları ve bölge bazlı analiz."
    },
    tags: ["Python", "YOLO11", "ByteTrack", "OpenCV", "RTSP", "Computer Vision"],
    repo: "retail-customer-tracking",
    featured: false,
    order: 8
  },
];
